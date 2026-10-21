/* Shared "Edit profile" dialog (Personal, About, Contact, Additional, Org chart). Used by every design's profile page.
   Edits are saved in this browser (localStorage) until the real backend is connected. */
(function () {
  // Apply a person's saved edits before the page reads their name, title and manager.
  window.loadProfileEdits = (p) => {
    p.edit = typeof PROFILE_SEED === "function" ? PROFILE_SEED(p) : {};   // starter values until something is saved
    try {
      const s = JSON.parse(localStorage.getItem(`p5-edit-${p.id}`) || "null");
      if (s) { p.name = s.name; p.title = s.title; p.manager = s.manager; p.edit = s.edit || {}; }
    } catch { /* storage unavailable */ }
    delete p.edit.bio;   // the bio is no longer part of the profile
  };

  window.initProfileEdit = ({ p, boss, email }) => {
    // Tenant-specific "additional columns". Each tenant can change this list; the form and the profile are built from it.
    const CUSTOM_FIELDS = [
      ["management", "Management", () => ""],
      ["entity", "Entity", () => ""],
      ["businessLine", "Department/Business Line", () => ""],
      ["officeDays", "Office Days", () => ""],
    ];
    const LANGUAGES = [["en-US", "English (US) - English (US)"], ["en-GB", "English (UK) - English (UK)"], ["es", "Español - Spanish"], ["fr", "Français - French"], ["de", "Deutsch - German"], ["pt-BR", "Português (Brasil) - Portuguese (Brazil)"], ["hi", "हिन्दी - Hindi"]];
    /* ===== Edit profile dialog (Personal, About, Contact, Org chart) ===== */
    let dlg = document.getElementById("editDlg");
    if (!dlg) { dlg = document.createElement("dialog"); dlg.id = "editDlg"; dlg.className = "p5-dlg"; dlg.setAttribute("aria-label", "Edit profile"); document.body.append(dlg); }
    const PRONOUNS = ["She/her", "He/him", "They/them", "She/they", "He/they", "Ze/zir", "Prefer not to say"];
    const ZONES = [["America/New_York", "(GMT-04:00) Eastern Time - New York"], ["America/Chicago", "(GMT-05:00) Central Time - Chicago"], ["America/Denver", "(GMT-06:00) Mountain Time - Denver"], ["America/Los_Angeles", "(GMT-07:00) Pacific Time - Los Angeles"], ["Europe/London", "(GMT+01:00) British Time - London"], ["Europe/Paris", "(GMT+02:00) Central European Time - Paris"], ["Asia/Kolkata", "(GMT+05:30) India Standard Time - Kolkata"], ["Asia/Tokyo", "(GMT+09:00) Japan Standard Time - Tokyo"], ["Australia/Sydney", "(GMT+10:00) Australian Eastern Time - Sydney"]];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const SOCIAL = [["linkedin", "LinkedIn", "https://www.linkedin.com/in/username"], ["x", "X (Twitter)", "https://x.com/username"], ["facebook", "Facebook", "https://www.facebook.com/username"], ["instagram", "Instagram", "https://www.instagram.com/username"], ["youtube", "YouTube", "https://www.youtube.com/@channel"]];
    const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    p.edit = p.edit || {};
    const pad = String(p.id).padStart(2, "0");
    const DEF = {
      phone: `(212) 555-01${pad}`, mobile: `(917) 555-02${pad}`, employeeNumber: `E-${1000 + p.id}`, userType: "Employee",
      officeDays: ["Mon, Wed, Thu", "Tue, Wed, Thu", "Mon, Tue, Fri", "Wed, Thu"][p.id % 4],
    };
    const got = (k) => p.edit[k] ?? DEF[k] ?? "";   // a cleared field is "" and stays hidden on the profile
    const val = (k, fallback = "") => p.edit[k] ?? fallback;

    const text = (name, label, { max = 255, required = false, placeholder = "", type = "text", fallback = "" } = {}) =>
      `<label class="f"><span>${label}${required ? ' <b aria-hidden="true">*</b>' : ""}</span><input name="${name}" type="${type}" maxlength="${max}" ${required ? "required" : ""} placeholder="${esc(placeholder)}" value="${esc(val(name, fallback))}"></label>`;
    // Searchable dropdown: type to filter the list; the stored value is kept in a hidden field, and "×" clears it.
    const picker = (name, label, options, current, note = "") => {
      const sel = options.find(([v]) => String(v) === String(current));
      return `<div class="f"><span>${label}</span><div class="pk">
        <input type="text" list="dl-${name}" data-pk="${name}" placeholder="Search…" autocomplete="off" value="${esc(sel ? sel[1] : "")}">
        <input type="hidden" name="${name}" value="${esc(sel ? sel[0] : "")}">
        <button type="button" class="pk-clear" data-clear="${name}" aria-label="Clear ${label}">×</button>
        <datalist id="dl-${name}">${options.map(([v, l]) => `<option value="${esc(l)}"></option>`).join("")}</datalist></div>${note ? `<small>${note}</small>` : ""}</div>`;
    };
    const people = PEOPLE.filter((q) => q.id !== p.id).sort((a, b) => a.name.localeCompare(b.name)).map((q) => [q.id, `${q.name} — ${q.title}`]);
    const mgrFace = (q) => q ? `${avatar(q)}<span><strong>${esc(q.name)}</strong><small>${esc(q.title)}</small></span>` : `<span class="none"><strong>No manager</strong><small>Top of the organization</small></span>`;
    const first = p.name.split(" ")[0], last = p.name.split(" ").slice(1).join(" ");

    const formHtml = () => `
      <form id="editForm" novalidate>
        <div class="dlg-head"><h2>Edit profile</h2><button type="button" class="dlg-x" data-close aria-label="Close">×</button></div>
        <div class="dlg-tabs" role="tablist">${["Personal", "About", "Contact", "Additional", "Org chart"].map((t, i) => `<button type="button" role="tab" data-dtab="${i}" aria-selected="${i === 0}">${t}</button>`).join("")}</div>
        <div class="dlg-body">
          <fieldset data-pane="0"><legend>Personal</legend>
            <div class="grid2">
              ${text("first", "First name", { max: 80, required: true, fallback: first })}
              ${text("last", "Last name", { max: 80, required: true, fallback: last })}
            </div>
            ${text("jobTitle", "Job title", { required: true, fallback: p.title })}
            <div class="grid2">
              ${text("company", "Company name")}
              ${text("entity", "Entity")}
              ${text("department", "Department")}
              ${text("division", "Division")}
            </div>
            ${picker("pronouns", "Pronouns", PRONOUNS.map((x) => [x, x]), val("pronouns"))}
            ${text("address1", "Address 1")}
            ${text("address2", "Address 2")}
            <div class="grid3">
              ${text("city", "City")}
              ${text("state", "State/Province")}
              ${text("zip", "ZIP/Postal code")}
            </div>
            ${text("country", "Country")}
          </fieldset>

          <fieldset data-pane="1" hidden><legend>About</legend>
            <div class="grid2">
              <label class="f"><span>Birthday</span><input name="birthday" type="date" value="${esc(val("birthday", val("bMonth") && val("bDay") ? `2000-${String(val("bMonth")).padStart(2, "0")}-${String(val("bDay")).padStart(2, "0")}` : ""))}"></label>
              <label class="f"><span>Hire date</span><input name="hire" type="date" value="${esc(val("hire"))}"></label>
            </div>
          </fieldset>

          <fieldset data-pane="2" hidden><legend>Contact</legend>
            ${text("email", "Email", { type: "email", required: true })}
            ${picker("timezone", "Time zone", ZONES, val("timezone"))}
            <div class="grid3">
              ${text("phone", "Phone", { type: "tel" })}
              ${text("ext", "Extension")}
              ${text("mobile", "Mobile phone", { type: "tel" })}
            </div>
            ${text("zoom", "Zoom Personal Meeting ID", { placeholder: "123 456 7890" })}
            <div class="f"><span>Social links</span><div class="social">${SOCIAL.map(([k, l, ph]) => `<label><i>${l}</i><input name="social_${k}" type="url" placeholder="${ph}" value="${esc(val("social_" + k))}"></label>`).join("")}</div></div>
          </fieldset>

          <fieldset data-pane="3" hidden><legend>Additional</legend>
            <div class="grid2">
              ${text("employeeNumber", "Employee number", {})}
              ${text("userType", "User type", {})}
            </div>
            <label class="f"><span>Language</span><select name="language"><option value="">Select language</option>${LANGUAGES.map(([v, l]) => `<option value="${v}" ${val("language") === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
            ${CUSTOM_FIELDS.map(([k, l, def]) => text("cf_" + k, l, { max: 1024, fallback: def() })).join("")}
          </fieldset>

          <fieldset data-pane="4" hidden><legend>Org chart</legend>
            <div class="f"><span>Manager</span><div class="mgr"><input type="hidden" name="manager" value="${boss ? boss.id : ""}"><button type="button" class="mgr-btn" data-mgr-toggle aria-haspopup="listbox" aria-expanded="false">${mgrFace(boss)}</button><div class="mgr-pop" hidden><ul role="listbox" aria-label="Manager">${[null, ...PEOPLE.filter((q) => q.id !== p.id).sort((a, b) => a.name.localeCompare(b.name))].map((q) => `<li role="option" tabindex="-1" data-mgr-id="${q ? q.id : ""}" data-mgr-name="${q ? esc(q.name + " " + q.title).toLowerCase() : "no manager top of the organization"}">${mgrFace(q)}</li>`).join("")}</ul></div></div><small>The org chart is driven by this one field.</small></div>
          </fieldset>
        </div>
        <div class="dlg-foot"><button type="button" class="btn-line" data-close>Cancel</button><button type="submit" class="btn-save">Save changes</button></div>
      </form>`;

    const openEdit = () => {
      dlg.innerHTML = formHtml();
      dlg.showModal();
    };
    const setPane = (n) => {
      dlg.querySelectorAll("[data-pane]").forEach((el) => { el.hidden = +el.dataset.pane !== n; });
      dlg.querySelectorAll("[data-dtab]").forEach((b) => b.setAttribute("aria-selected", String(+b.dataset.dtab === n)));
    };
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg || e.target.closest("[data-close]")) { dlg.close(); return; }
      const mgr = dlg.querySelector(".mgr");
      if (mgr && !e.target.closest(".mgr")) mgr.querySelector(".mgr-pop").hidden = true;
      if (e.target.closest("[data-mgr-toggle]")) {
        const pop = mgr.querySelector(".mgr-pop"); pop.hidden = !pop.hidden;
        mgr.querySelector("[data-mgr-toggle]").setAttribute("aria-expanded", String(!pop.hidden));
        if (!pop.hidden) pop.querySelector("[data-mgr-id]")?.focus();
        return;
      }
      const opt = e.target.closest("[data-mgr-id]");
      if (opt) {
        mgr.querySelector("input[name=manager]").value = opt.dataset.mgrId;
        mgr.querySelector("[data-mgr-toggle]").innerHTML = opt.innerHTML;
        mgr.querySelector(".mgr-pop").hidden = true;
        return;
      }
      const dt = e.target.closest("[data-dtab]");
      if (dt) { setPane(+dt.dataset.dtab); return; }
      const clr = e.target.closest("[data-clear]");
      if (clr) {
        const n = clr.dataset.clear;
        dlg.querySelector(`[data-pk="${n}"]`).value = ""; dlg.querySelector(`input[name="${n}"]`).value = "";
        return;
      }
    });
    // Picker: typing an exact option label stores that option's value
    dlg.addEventListener("input", (e) => {
      if (e.target.classList.contains("mgr-search")) {
        const q = e.target.value.trim().toLowerCase();
        dlg.querySelectorAll("[data-mgr-id]").forEach((li) => { li.hidden = q && !li.dataset.mgrName.includes(q); });
        return;
      }
      const pk = e.target.closest("[data-pk]");
      if (!pk) return;
      const opt = [...dlg.querySelectorAll(`#dl-${pk.dataset.pk} option`)].find((o) => o.value === pk.value);
      const all = { pronouns: PRONOUNS.map((x) => [x, x]), timezone: ZONES }[pk.dataset.pk];
      const hit = opt && all.find(([, l]) => l === opt.value);
      dlg.querySelector(`input[name="${pk.dataset.pk}"]`).value = hit ? hit[0] : "";
    });
    dlg.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const bad = form.querySelector(":invalid");
      if (bad) setPane(+bad.closest("[data-pane]").dataset.pane);
      if (!form.reportValidity()) return;
      const f = new FormData(form);
      const data = Object.fromEntries(f.entries());
      Object.assign(p.edit, data);
      p.name = `${data.first.trim()} ${data.last.trim()}`.trim();
      p.title = data.jobTitle.trim() || p.title;
      const newManager = data.manager === "" ? null : +data.manager;
      if (newManager !== p.manager) p.manager = newManager;
      try { localStorage.setItem(`p5-edit-${p.id}`, JSON.stringify({ name: p.name, title: p.title, manager: p.manager, edit: p.edit })); sessionStorage.setItem("p5-saved", "1"); } catch { /* storage unavailable: edits last until reload */ }
      dlg.close();
      location.reload();
    });


    return { open: openEdit };
  };

  // "Profile updated." confirmation after the page reloads from a save
  addEventListener("DOMContentLoaded", () => {
    let saved = false;
    try { saved = sessionStorage.getItem("p5-saved") === "1"; sessionStorage.removeItem("p5-saved"); } catch { /* ignore */ }
    if (!saved) return;
    const t = document.createElement("p");
    t.className = "pe-toast"; t.setAttribute("role", "status"); t.textContent = "Profile updated.";
    document.body.append(t);
    setTimeout(() => t.remove(), 3500);
  });
})();
