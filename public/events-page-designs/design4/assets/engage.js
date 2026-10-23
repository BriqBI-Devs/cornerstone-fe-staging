// Reactions and comments (local only; the real requests go here once the backend exists)
    (() => {
      const $ = (id) => document.getElementById(id);
      const status = (text) => { $("engageStatus").textContent = text; setTimeout(() => { $("engageStatus").textContent = ""; }, 2000); };
      const toggle = (button) => { const on = button.getAttribute("aria-pressed") !== "true"; button.setAttribute("aria-pressed", String(on)); return on; };
      $("likeBtn").addEventListener("click", () => { $("likeCount").textContent = 8 + (toggle($("likeBtn")) ? 1 : 0); });
      $("favBtn").addEventListener("click", () => status(toggle($("favBtn")) ? "Added to favourites" : "Removed from favourites"));
      $("shareBtn").addEventListener("click", () => { navigator.clipboard.writeText(location.href); status("Link copied"); });
      $("commentBtn").addEventListener("click", () => { $("commentInput").scrollIntoView({ behavior: "smooth", block: "center" }); $("commentInput").focus({ preventScroll: true }); });
      const escapeHtml = (t) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
      const thumb = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 11v9H4v-9h3Zm0 0 4-7c1.7 0 2.5 1.2 2.2 2.8L12.6 10H19a1.6 1.6 0 0 1 1.6 1.9l-1.3 6.5A2 2 0 0 1 17.3 20H7"/></svg>';
      $("commentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const text = $("commentInput").value.trim();
        if (!text) return;
        const li = document.createElement("li");
        li.className = "comment-card";
        li.innerHTML = '<div class="comment-head"><span class="comment-avatar" aria-hidden="true">JD</span><div><strong>Jordan Davis</strong><small>Just now</small></div></div><p class="comment-text">' + escapeHtml(text) + '</p><div class="comment-foot"><button type="button" aria-pressed="false">' + thumb + ' Like</button></div>';
        li.querySelector("button").addEventListener("click", (ev) => toggle(ev.currentTarget));
        $("commentList").prepend(li);
        $("commentInput").value = "";
        $("commentCount").textContent = $("commentList").children.length;
      });
    })();
