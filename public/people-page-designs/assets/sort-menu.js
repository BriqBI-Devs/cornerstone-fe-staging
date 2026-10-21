/* Shared "Sort by" dropdown for the People directories.
   Choose what to sort by (Name, Company, Job title, Department) and the order (A to Z, Z to A).
   A page only needs <div class="sortdd" id="sortdd"><input type="hidden" id="sort" value="name-asc"></div>:
   the hidden input keeps working like the old <select> (its value is "<field>-<asc|desc>" and it fires "input"). */
const SORT_FIELDS = [
  ["name", "Name", (p) => p.name],
  ["company", "Company", (p) => FACETS.company(p)],
  ["title", "Job title", (p) => p.title],
  ["department", "Department", (p) => FACETS.department(p)],
];
const SORT_COMPARE = {};   // "name-asc", "name-desc", "company-asc", ... -> compare function; ties stay in name order
SORT_FIELDS.forEach(([key, , get]) => ["asc", "desc"].forEach((order) => {
  SORT_COMPARE[`${key}-${order}`] = (a, b) => get(a).localeCompare(get(b)) * (order === "desc" ? -1 : 1) || a.name.localeCompare(b.name);
}));
// Column headers: clicking the field that is already sorted flips the order, any other field starts at A to Z.
const nextSort = (current, field) => {
  const [key, order] = current.split("-");
  return key === field ? `${key}-${order === "asc" ? "desc" : "asc"}` : `${field}-asc`;
};

(() => {
  const mount = document.getElementById("sortdd");
  if (!mount) return;
  const input = mount.querySelector("#sort");
  let value = input.value || "name-asc";
  const radio = (attr, val, label) => `<button type="button" role="radio" ${attr}="${val}" aria-checked="false">${label}</button>`;
  mount.insertAdjacentHTML("beforeend", `
    <button type="button" class="${mount.dataset.btnClass || ""} sortdd-btn" id="sortBtn" aria-haspopup="true" aria-expanded="false">
      <span>Sort by: <b id="sortLabel"></b></span>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="sortdd-panel" id="sortPanel" hidden>
      <p class="sortdd-h">Sort by</p>
      <div role="radiogroup" aria-label="Sort by">${SORT_FIELDS.map(([key, label]) => radio("data-field", key, label)).join("")}</div>
      <p class="sortdd-h">Order</p>
      <div role="radiogroup" aria-label="Order">${radio("data-order", "asc", "A to Z")}${radio("data-order", "desc", "Z to A")}</div>
    </div>`);
  const panel = mount.querySelector("#sortPanel"), button = mount.querySelector("#sortBtn");
  const paint = () => {
    const [key, order] = value.split("-");
    mount.querySelector("#sortLabel").textContent = `${SORT_FIELDS.find(([k]) => k === key)[1]}, ${order === "desc" ? "Z–A" : "A–Z"}`;
    panel.querySelectorAll("[data-field]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.field === key)));
    panel.querySelectorAll("[data-order]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.order === order)));
  };
  // Page code can still read and set $("sort").value; setting it updates the dropdown.
  Object.defineProperty(input, "value", { get: () => value, set: (v) => { if (SORT_COMPARE[v]) { value = v; paint(); } } });
  const setOpen = (open) => { panel.hidden = !open; button.setAttribute("aria-expanded", String(open)); };
  button.addEventListener("click", () => setOpen(panel.hidden));
  panel.addEventListener("click", (e) => {
    const b = e.target.closest("button[role=radio]");
    if (!b) return;
    const [key, order] = value.split("-");
    value = `${b.dataset.field || key}-${b.dataset.order || order}`;
    paint();
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  document.addEventListener("click", (e) => { if (!e.target.closest("#sortdd")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { setOpen(false); button.focus(); } });
  paint();
})();
