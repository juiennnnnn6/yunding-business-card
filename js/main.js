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
  const companies = cfg.companies || [];
  const shared = cfg.shared || {};

  // ── 頁首品牌組合：兩家 Logo + 短名 ＋ 共用行業別（只一次）──
  const lockup = $("lockup");
  const brands = document.createElement("div");
  brands.className = "brands";

  companies.forEach((c) => {
    const row = document.createElement("div");
    row.className = "brand";

    const logo = document.createElement("span");
    logo.className = "brand__logo";
    if (c.logoType === "image" && c.logoSrc) {
      const img = document.createElement("img");
      img.src = c.logoSrc;
      img.alt = (c.name || c.short || "") + " Logo";
      if (c.logoScale) img.style.transform = "scale(" + c.logoScale + ")";
      logo.appendChild(img);
    }
    // 文字型公司（無圖檔）不再重複印一次字標；保留空 Logo 欄讓名字對齊

    const nm = document.createElement("span");
    nm.className = "brand__name";
    nm.textContent = c.short || c.name || "";

    row.append(logo, nm);
    brands.appendChild(row);
  });

  lockup.appendChild(brands);

  if (cfg.companySuffix) {
    const suffix = document.createElement("div");
    suffix.className = "suffix";
    suffix.textContent = cfg.companySuffix;
    lockup.appendChild(suffix);
  }

  // 副標（以「‧」分隔的每段各自換行）
  if (cfg.siteTagline) {
    const lines = cfg.siteTagline.split("‧").map((s) => escapeHtml(s.trim())).filter(Boolean);
    $("siteTagline").innerHTML = lines.join("<br>");
  }

  // ── 電話（點擊撥打）──────────────────────────────────
  if (shared.phone) {
    const digits = shared.phone.replace(/[^0-9+]/g, "");
    $("phoneBlock").setAttribute("href", "tel:" + digits);
    $("phoneText").textContent = shared.phone;
  }

  // ── 傳真（顯示在電話卡內，不可撥打）───────────────────
  if (shared.fax && shared.fax.trim()) {
    $("faxText").textContent = shared.fax.trim();
    $("faxLine").hidden = false;
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
    lineBtn.classList.add("line-btn--disabled");
    lineBtn.removeAttribute("href");
    $("lineBtnText").textContent = "LINE 即將開放";
    lineBtn.addEventListener("click", (e) => e.preventDefault());
  }

  // ── 底部：統一編號（標題只寫一次，每家各一行）─────────
  const taxParts = companies
    .filter((c) => c.taxId)
    .map((c) => escapeHtml(c.short || c.name || "") + " <b>" + escapeHtml(c.taxId) + "</b>");
  if (taxParts.length) {
    $("footTax").innerHTML = "統一編號<br>" + taxParts.join("<br>");
  }

  // ── 小工具 ───────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
