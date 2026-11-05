import { useState } from "react";
import { PEOPLE } from "../../data";

/** Search by name, title or team; choosing a match shows that person in the chart. */
export function OrgSearch({ onChoose }: { onChoose: (id: number) => void }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const found = q ? PEOPLE.filter((p) => `${p.name} ${p.title} ${p.team}`.toLowerCase().includes(q)).slice(0, 6) : [];

  const choose = (id: number) => {
    onChoose(id);
    setQuery("");
  };

  return (
    <div className="relative mb-6 w-[min(320px,100%)]">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && found[0]) choose(found[0].id);
          if (e.key === "Escape") setQuery("");
        }}
        placeholder="Search by name, title or team"
        aria-label="Search people"
        autoComplete="off"
        className="h-10 w-full rounded-lg border-[1.25px] border-[#737373] bg-white px-3.5 text-sm focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-[#0079db]"
      />
      {found.length > 0 && (
        <ul className="absolute inset-x-0 top-11 z-20 rounded-lg border border-[#d4d4d4] bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
          {found.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => choose(p.id)} className="block min-h-10 w-full rounded-md px-2.5 py-1 text-left text-sm hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] focus-visible:outline-none">
                {p.name}
                <small className="block text-xs text-[#737373]">{p.title} · {p.team}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
