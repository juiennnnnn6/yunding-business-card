/* =====================================================================
   允鑽 / 允鼎 電子名片 — 程式
   職責：把 data/config.js 的資料帶進畫面、設定撥打/導航/LINE 連結。
   （一般維護不需要動這個檔，改內容請改 data/config.js）
   ===================================================================== */

(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  if (!cfg) {
    console.error("找不到 SITE_CONFIG，請確認 data/config.js 有正確載入。");
    return;
  }

  const $ = (id) => document.getElementById(id);

  // ── 頁首 ──────────────────────────────────────────────
  // 標題支援 \n 換行
  $("siteTitle").innerHTML = String(cfg.siteTitle || "")
    .split("\n").map(escapeHtml).join("<br>");
  $("siteTagline").textContent = cfg.siteTagline || "";

  // ── 兩間公司 ─────────────────────────────────────────
  const companiesEl = $("companies");
  (cfg.companies || []).forEach((c) => {
    const card = document.createElement("article");
    card.className = "company";

    // Logo
    const logo = document.createElement("div");
    logo.className = "company__logo";
    if (c.logoType === "image" && c.logoSrc) {
      const img = document.createElement("img");
      img.src = c.logoSrc;
      img.alt = (c.name || "") + " Logo";
      logo.appendChild(img);
    } else {
      const t = document.createElement("span");
      t.className = "company__logo-text";
      t.textContent = c.logoText || c.name || "";
      logo.appendChild(t);
    }

    // 名稱
    const name = document.createElement("h2");
    name.className = "company__name";
    name.textContent = c.name || "";

    // 統編
    const tax = document.createElement("p");
    tax.className = "company__tax";
    tax.innerHTML = "統一編號　<b>" + escapeHtml(c.taxId || "") + "</b>";

    card.append(logo, name, tax);
    companiesEl.appendChild(card);
  });

  const shared = cfg.shared || {};

  // ── 電話（點擊撥打）──────────────────────────────────
  if (shared.phone) {
    const digits = shared.phone.replace(/[^0-9+]/g, "");
    $("phoneBlock").setAttribute("href", "tel:" + digits);
    $("phoneText").textContent = shared.phone;
  }

  // ── 地址（地圖導航）──────────────────────────────────
  if (shared.address) {
    $("addressText").textContent = shared.address;
  }
  // 地圖連結：優先用精準連結 mapUrl → 其次地標名稱 mapQuery → 最後地址
  let mapHref = "";
  if (shared.mapUrl && shared.mapUrl.trim()) {
    mapHref = shared.mapUrl.trim();
  } else {
    const q = (shared.mapQuery && shared.mapQuery.trim()) || shared.address || "";
    if (q) {
      mapHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
    }
  }
  if (mapHref) $("mapBlock").setAttribute("href", mapHref);

  // ── 服務項目 ─────────────────────────────────────────
  const list = $("servicesList");
  (shared.services || []).forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    list.appendChild(li);
  });

  // ── LINE 按鈕 ────────────────────────────────────────
  const lineBtn = $("lineBtn");
  if (shared.lineUrl && shared.lineUrl.trim()) {
    lineBtn.setAttribute("href", shared.lineUrl.trim());
    lineBtn.setAttribute("target", "_blank");
    lineBtn.setAttribute("rel", "noopener");
  } else {
    // 尚未提供連結：不亂連，顯示為停用狀態
    lineBtn.classList.add("line-btn--disabled");
    lineBtn.removeAttribute("href");
    $("lineBtnText").textContent = "LINE 即將開放";
    lineBtn.addEventListener("click", (e) => e.preventDefault());
  }

  // ── 底部版權 ─────────────────────────────────────────
  const year = new Date().getFullYear();
  const names = (cfg.companies || []).map((c) => c.name).join(" ‧ ");
  $("footText").textContent = "© " + year + "　" + names;

  // ── 小工具 ───────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
