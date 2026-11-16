// Keeps the admin console (src/admin) separate from the employee site. Run with `npm run lint:boundaries`
// (also part of `npm run lint`). Prints every broken rule and exits with 1 if there is any.
//
// 1. Files in src/admin may import only: src/admin itself, src/components/ui and src/lib.
// 2. Admin features (src/admin/features/<name>) must not import each other; shared code goes in src/admin/components or src/admin/lib.
// 3. Files outside src/admin may import only src/admin/index.ts.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const admin = join(src, "admin");
const sharedRoots = [join(src, "components", "ui"), join(src, "lib")];

const inside = (file, dir) => file === dir || file.startsWith(dir + sep);

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(ts|tsx)$/.test(entry.name)) yield full;
  }
}

// Relative specifiers from import/export ... from "x", import("x") and side-effect imports.
const specifiers = (code) =>
  [...code.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)].map((m) => m[1]).filter((s) => s.startsWith("."));

const featureOf = (file) => {
  const rel = relative(join(admin, "features"), file);
  return rel.startsWith("..") ? null : rel.split(sep)[0];
};

const problems = [];
for (const file of walk(src)) {
  const code = readFileSync(file, "utf8");
  const fromAdmin = inside(file, admin);
  for (const spec of specifiers(code)) {
    const target = resolve(dirname(file), spec);
    const name = relative(root, file);
    if (fromAdmin) {
      if (!inside(target, admin) && !sharedRoots.some((dir) => inside(target, dir))) {
        problems.push(`${name}: "${spec}" reaches employee code. Admin may import only src/components/ui and src/lib.`);
      }
      const from = featureOf(file);
      const to = featureOf(target);
      if (from && to && from !== to) {
        problems.push(`${name}: "${spec}" imports another admin feature (${to}). Move shared code to src/admin/components or src/admin/lib.`);
      }
    } else if (inside(target, admin) && target !== admin && target !== join(admin, "index")) {
      problems.push(`${name}: "${spec}" reaches inside src/admin. Import only from "../admin".`);
    }
  }
}

if (problems.length) {
  console.error(`Admin boundary check failed:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
  process.exit(1);
}
console.log("Admin boundary check passed.");
