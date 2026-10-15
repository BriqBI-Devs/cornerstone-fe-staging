// All events: search, date filter and paginated agenda.
const { api, formatDate, dateOf, eventList, skeletonRows, emptyState, listHref } = EventsKit;
const PAGE_SIZE = 10;
const searchInput = document.getElementById("searchInput");
const listContent = document.getElementById("listContent");
const pager = document.getElementById("pager");
const resultsSummary = document.getElementById("resultsSummary");
const urlParams = new URLSearchParams(location.search);
const state = {
  query: urlParams.get("q") || "",
  date: urlParams.get("date") || "future",
  day: urlParams.get("day") || "",
  page: Math.max(1, Number.parseInt(urlParams.get("page"), 10) || 1),
};
const syncUrl = () => {
  const url = new URL(listHref({ q: state.query, date: state.date, day: state.day }), location.href);
  if (state.page > 1) url.searchParams.set("page", String(state.page));
  history.replaceState(null, "", `${url.pathname}${url.search}`);
};

const describeFilters = () => {
  const parts = [];
  if (state.query) parts.push(`“${state.query}”`);
  if (state.day) parts.push(formatDate(state.day, { weekday: "long", month: "long", day: "numeric" }));
  document.getElementById("pageTitle").textContent = parts.length ? `Results for ${parts.join(" · ")}` : "Events";
};

const pageWindow = (current, total) => {
  const sorted = [...new Set([1, total, current - 1, current, current + 1])].filter((v) => v >= 1 && v <= total).sort((a, b) => a - b);
  return sorted.flatMap((value, index) => (index && value - sorted[index - 1] > 1 ? ["…", value] : [value]));
};
const renderPager = (result) => {
  const first = result.total ? (result.page - 1) * result.pageSize + 1 : 0;
  const last = Math.min(result.total, result.page * result.pageSize);
  resultsSummary.textContent = result.total ? `Showing ${first}–${last} of ${result.total} events` : "";
  pager.hidden = result.totalPages <= 1;
  if (pager.hidden) return;
  pager.innerHTML = `
    <button type="button" class="pager-btn" data-page="${result.page - 1}" ${result.page === 1 ? "disabled" : ""}>‹ Previous</button>
    <span class="pager-pages">${pageWindow(result.page, result.totalPages).map((value) => value === "…"
      ? `<span class="pager-gap" aria-hidden="true">…</span>`
      : `<button type="button" class="pager-btn page${value === result.page ? " active" : ""}" data-page="${value}" aria-label="Page ${value}" ${value === result.page ? 'aria-current="page"' : ""}>${value}</button>`).join("")}</span>
    <button type="button" class="pager-btn" data-page="${result.page + 1}" ${result.page === result.totalPages ? "disabled" : ""}>Next ›</button>`;
};
pager.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target.closest("[data-page]");
  if (!button || button.disabled) return;
  state.page = Number(button.dataset.page);
  load({ scroll: true });
});

// Late responses from superseded requests are discarded.
let requestId = 0;
const load = async ({ scroll = false } = {}) => {
  const thisRequest = ++requestId;
  syncUrl();
  describeFilters();
  document.querySelectorAll("#dateSegment [data-date]").forEach((b) => b.classList.toggle("active", b.dataset.date === state.date));
  listContent.setAttribute("aria-busy", "true");
  listContent.innerHTML = skeletonRows(5);
  pager.hidden = true;
  try {
    const result = await api.listEvents({ page: state.page, pageSize: PAGE_SIZE, q: state.query, date: state.date, day: state.day });
    if (thisRequest !== requestId) return;
    state.page = result.page;
    syncUrl();
    listContent.innerHTML = result.items.length
      ? eventList(result.items, `index.html${location.search}`)
      : emptyState("No events found", "Try another search or clear your filters.");
    renderPager(result);
    if (scroll) document.getElementById("searchForm").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    if (thisRequest !== requestId) return;
    console.error("Unable to load events.", error);
    resultsSummary.textContent = "";
    listContent.innerHTML = emptyState("We couldn't load events", `Check your connection and try again.<br><button type="button" class="btn" id="retryLoad" style="margin-top:14px">Retry</button>`);
    document.getElementById("retryLoad").addEventListener("click", () => load());
  } finally {
    if (thisRequest === requestId) listContent.removeAttribute("aria-busy");
  }
};
const applyFilters = () => { state.page = 1; load(); };

document.querySelectorAll("#dateSegment [data-date]").forEach((button) => button.addEventListener("click", () => {
  state.date = button.dataset.date;
  applyFilters();
}));
document.getElementById("clearFilters").addEventListener("click", () => {
  Object.assign(state, { query: "", date: "future", day: "" });
  searchInput.value = "";
  applyFilters();
});
document.getElementById("searchForm").addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault();
  clearTimeout(searchTimer);
  state.query = searchInput.value.trim();
  applyFilters();
});
let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.query = searchInput.value.trim(); applyFilters(); }, 250);
});
document.addEventListener("keydown", (keyEvent) => {
  if ((keyEvent.metaKey || keyEvent.ctrlKey) && keyEvent.key.toLowerCase() === "k") {
    keyEvent.preventDefault();
    searchInput.focus();
  }
});

searchInput.value = state.query;
load();
