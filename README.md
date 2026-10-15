# 允鑽 ‧ 允鼎 不銹鋼企業社 — 電子名片

一頁式電子名片，整合兩間公司資訊，可透過單一網址分享給客戶。
純 HTML / CSS / JavaScript，無需安裝任何工具，部署於 Vercel。

---

## 📁 檔案說明

| 檔案 | 用途 |
|------|------|
| `index.html` | 網頁結構 |
| `css/style.css` | 樣式（深色＋金屬銀、大字、響應式） |
| `js/main.js` | 把資料帶入畫面、設定撥打／導航／LINE |
| **`data/config.js`** | **★所有可修改的內容都在這裡** |
| `images/yunding-logo.svg` | 允鼎 Logo |

---

## ✏️ 如何更新內容（只改 `data/config.js`）

用記事本或任何文字編輯器打開 **`data/config.js`**，改好存檔即可。

### 1. 填入 LINE 連結
找到這一行，把連結填進引號內：
```js
lineUrl: "",            // ← 改成  lineUrl: "https://line.me/ti/p/你的ID",
```
> 填了按鈕就會自動生效；留空則顯示「LINE 即將開放」。

### 2. 修改服務項目
找到 `services`，每個 `"項目"` 就是一項，可自由增減：
```js
services: [
  "不銹鋼門窗",
  "白鐵欄杆扶手",
  // 想加就加一行 "新項目",
],
```

### 3. 改電話 / 地址 / 統編 / 公司名
直接改對應欄位引號內的文字即可。

### 4. 之後允鑽有 Logo 圖檔時
1. 把圖檔（建議 `.svg` 或透明背景 `.png`）放進 `images/` 資料夾，例如 `images/yunzuan-logo.svg`
2. 在 `config.js` 的允鑽那段，把：
   ```js
   logoType: "text",
   logoText: "允鑽",
   ```
   改成：
   ```js
   logoType: "image",
   logoSrc: "images/yunzuan-logo.svg",
   ```

---

## 🖥️ 在電腦上預覽
直接用瀏覽器打開 `index.html` 即可（雙擊開啟）。

---

## 🚀 部署到 Vercel

### 方式 A：拖資料夾上傳（最簡單）
1. 到 [vercel.com](https://vercel.com) 註冊／登入
2. 新增專案 → 選擇「上傳資料夾」，把整個 `允鼎電子名片` 資料夾拖上去
3. Framework 選 **Other**，直接部署 → 取得網址

### 方式 B：連接 Git（適合長期維護）
1. 把專案推到 GitHub
2. Vercel → New Project → 匯入該 repository → Deploy
3. 以後改 `config.js` 推上 GitHub，網站會自動更新
