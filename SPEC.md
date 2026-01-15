# 13月亮曆 KIN 能量計算器 - 完整產品規格

**專案名稱**: 13月亮曆 KIN 能量計算系統  
**版本**: 1.0  
**狀態**: 開發中（可用）  
**最後更新**: 2026年1月14日

---

## 📌 項目概述

**13月亮曆 KIN 能量計算器** 是一個以馬雅 Tzolkin（13月亮曆）為核心的能量管理與自我認知系統。

### 核心功能
- ✅ 基於日期計算 KIN 編號（1-260）
- ✅ 展示對應的圖騰（20個印記循環）與調性（13個波動）
- ✅ 提供能量指導訊息（同步訊息、高頻/低頻表現、對齊建議）
- ✅ 支持多種界面實現（HTML/React）

### 核心理念
> 每一天都有其獨特的能量頻率。通過精確計算與理解自己的 KIN 印記，我們可以與宇宙的 260 日周期同步，做出更有意識的選擇與行動。

---

## 🏗️ 項目結構

### 完整目錄樹

```
260/
├─── 📄 核心計算引擎
│    ├── kin-calculator.js         原生 JS 計算引擎（167 行）
│    ├── Cover.jsx                 React 計算組件
│    └── RedRoom.jsx               React 完整應用
│
├─── 📊 數據模組
│    ├── kinData.js                KIN 能量訊息庫（1-260，含4個維度）
│    ├── core/
│    │  ├── temple-core.js         通用數據（圖騰名、調性、常數表）
│    │  ├── kin-card-core.js       卡片組件核心
│    │  ├── render-core.js         渲染引擎核心
│    │  ├── temple_brain_final.js  邏輯集合
│    │  └── old/                   歷史版本
│    │
│    └── images/                   圖騰資源（20 個 PNG 檔）
│        └── 01.png ~ 20.png
│
├─── 🌐 應用層（多入口）
│    ├── 📍 主應用
│    │  ├── index.html             主頁面（987 行，完整功能）
│    │  ├── cover.html             簡化版頁面
│    │  └── test-kin-display.html  測試頁面
│    │
│    ├── 🔴 紅屋應用（Red Room）
│    │  ├── index.html             紅屋主頁
│    │  ├── red-brain.js           紅屋專用邏輯
│    │  ├── index-0113.html        版本測試
│    │  ├── index-0114.html
│    │  ├── index-0114-OK.html
│    │  └── index-0114 copy.html
│    │
│    ├── 🤍 白屋應用（White House）
│    │  ├── index.html
│    │  ├── index-CLAUDE.html      Claude 版本
│    │  ├── index-gemini.html      Gemini 版本
│    │  └── index-CLAUDE copy.html
│    │
│    ├── 🔵 藍屋應用（Blue Room）
│    │  ├── index.html             藍屋主頁
│    │  ├── blue_room_ready.html
│    │  └── blue_0115-GPT.html
│    │
│    └── 🟡 黃屋應用（Yellow Room）
│        └── index.html
│
├─── 📚 文檔
│    ├── SPEC.md                   此文件（完整規格說明）
│    ├── KIN_CALCULATOR_README.md  計算公式完整教學
│    ├── RedRoom_Notes.md          紅屋邏輯驗證報告
│    └── TempleCore-Spec.md        核心規格（規劃中）
│
└─── 🔧 其他
     ├── .git/                     版本控制
     ├── index                     索引文件
     ├── index-0110.html           存檔版本
     └── index-test.html
```

### 文件分類統計

| 分類 | 數量 | 說明 |
|------|------|------|
| HTML 文件 | 17 | 多個應用入口 + 測試版本 |
| JavaScript | 7 | 計算引擎、邏輯、核心模組 |
| React 組件 | 2 | Cover.jsx、RedRoom.jsx |
| 文檔 | 4 | SPEC、README、Notes |
| 圖像資源 | 20 | PNG 圖騰文件 |
| 應用子目錄 | 4 | 紅、白、藍、黃房間 |

---

## 🎯 核心功能模組詳解

### 1️⃣ KIN 計算引擎

**關鍵文件**: `kin-calculator.js`、`Cover.jsx`

#### 計算公式
```
KIN = (年份常數 + 月份常數 + 日期) mod 260
若結果為 0，則設為 260
若日期為 2 月 29 日（閏年），直接顯示「Hunab Ku」（例外處理）
若為閏年且日期 ≥ 3 月 1 日，KIN 額外加 1（修正跳過 2/29 的偏移）
```

#### 月份常數表
| 月份 | 常數 | 月份 | 常數 |
|------|------|------|------|
| 1月  | 0    | 7月  | 181  |
| 2月  | 31   | 8月  | 212  |
| 3月  | 59   | 9月  | 243  |
| 4月  | 90   | 10月 | 13   |
| 5月  | 120  | 11月 | 44   |
| 6月  | 151  | 12月 | 74   |

#### 年份常數表（2014-2035）
| 年份 | 常數 | 年份 | 常數 | 年份 | 常數 |
|------|------|------|------|------|------|
| 2014 | 62   | 2021 | 17   | 2028 | 232  |
| 2015 | 167  | 2022 | 122  | 2029 | 77   |
| 2016 | 12   | 2023 | 227  | 2030 | 182  |
| 2017 | 117  | 2024 | 72   | 2031 | 27   |
| 2018 | 222  | 2025 | 177  | 2032 | 132  |
| 2019 | 67   | 2026 | 22   | 2033 | 237  |
| 2020 | 172  | 2027 | 127  | 2034 | 82   |
|      |      |      |      | 2035 | 187  |

#### 計算範例

**例 1**: 2026/01/06（今日）
```
年份常數: YEAR_CONSTANTS[2026] = 22
月份常數: MONTH_CONSTANTS[1] = 0  
日期: 6
計算: 22 + 0 + 6 = 28

結果: KIN 28 (月亮的黃星星)
圖騰: 08.png
調性: 月亮
```

**例 2**: 2024/03/15（閏年）
```
年份常數: YEAR_CONSTANTS[2024] = 72
月份常數: MONTH_CONSTANTS[3] = 59
日期: 15
基本計算: 72 + 59 + 15 = 146
閏年修正: +1 (3月1日之後)
結果: 146 + 1 = 147

最終: KIN 147 (光譜的藍手)
圖騰: 07.png
調性: 光譜
```

#### 特殊情況處理

| 情況 | 規則 | 範例 |
|------|------|------|
| **2 月 29 日** | 直接顯示 Hunab Ku，不計算 KIN | 2024/02/29 |
| **閏年 3 月 1 日後** | 正常計算 + 1 修正 | 2024/03/01 |
| **無效日期** | 顯示「請輸入有效日期」| 2024/02/30 ❌ |
| **年份超範圍** | 顯示「系統支援 2014-2035 年」| 2013/01/01 ❌ |
| **結果為 0** | 自動改為 260 | 計算結果為 0 → 260 |

#### 閏年判定邏輯
```javascript
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 閏年列表 (2014-2035 中):
// 2016, 2020, 2024, 2028, 2032
```

---

### 2️⃣ 圖騰與調性系統

**檔案**: `core/temple-core.js`

#### 銀河調性 (13 個)

這 13 個調性代表時間的 13 種頻率波動：

```javascript
1. 磁性      7. 共振      13. 宇宙
2. 月亮      8. 銀河      
3. 電力      9. 太陽      
4. 自我存在   10. 行星     
5. 超頻      11. 光譜     
6. 韻律      12. 水晶     
```

#### 太陽圖騰 (20 個)

20 個圖騰代表宇宙中的 20 種原型能量：

```
第1組 (紅)         第6組 (白)         第11組 (藍)        第16組 (黃)
1-紅龍            6-白世界橋         11-藍猴            16-黃戰士
2-白風            7-藍手             12-黃人            17-紅地球

第3組 (藍)        第8組 (黃)         第13組 (紅)        第18組 (白)
3-藍夜            8-黃星星           13-紅天行者        18-白鏡
4-黃種子          9-紅月             14-白巫師          19-藍風暴
5-紅蛇           10-白狗             15-藍鷹            20-黃太陽
```

#### 組合規則

```javascript
// 給定 KIN 編號 N (1-260)，計算調性和圖騰：

const tone = (N - 1) % 13 + 1;           // 結果: 1-13
const seal = (N - 1) % 20 + 1;           // 結果: 1-20

// 範例: KIN 28
const tone = (28 - 1) % 13 + 1 = 27 % 13 + 1 = 1 + 1 = 2  // 月亮
const seal = (28 - 1) % 20 + 1 = 27 % 20 + 1 = 7 + 1 = 8  // 黃星星

// 結果: 月亮的黃星星 (KIN 28)
```

#### 圖片對應規則

```javascript
// 圖騰 ID → 圖檔名稱對應
const imageFile = `images/${String(sealId).padStart(2, '0')}.png`;

// 範例:
seal = 1  → images/01.png (紅龍)
seal = 8  → images/08.png (黃星星)
seal = 20 → images/20.png (黃太陽)
```

---

### 3️⃣ KIN 訊息庫

**檔案**: `kinData.js` (309 行)

包含完整的 260 個 KIN 能量訊息資料庫。數據結構如下：

```javascript
export const kinData = {
  "1": {
    synchronicMessage: "磁性的紅龍，把你帶回「最原初的滋養」...",
    highFrequency: "信任生命、願意被支持，把新開始落在日常...",
    lowFrequency: "過度逞強、把需求吞下去，或用忙碌掩蓋...",
    alignment: "給自己一個溫柔的開始：補水、吃一頓像家...",
  },
  "2": { /* ... */ },
  // ... 共 260 個
};
```

#### 四層訊息結構詳解

| 層次 | 欄位名 | 說明 | 範例 |
|------|--------|------|------|
| **同步訊息** | synchronicMessage | 詩化的能量主題，靈魂層級的指引 | 「磁性的紅龍，把你帶回最原初的滋養」|
| **高頻表現** | highFrequency | 人在最佳狀態下的正面表現 | 「信任生命、願意被支持」|
| **低頻警示** | lowFrequency | 需要警惕的陷阱、扭曲或失衡 | 「過度逞強、把需求吞下去」|
| **行動建議** | alignment | 具體可行的日常實踐方法 | 「給自己一個溫柔的開始」|

#### 資料存取方式

```javascript
// 支援字串和數字鍵訪問
const kinNum = 28;
const message1 = kinData[kinNum];        // ✅ 數字鍵
const message2 = kinData[String(kinNum)]; // ✅ 字串鍵
const message3 = kinData["28"];          // ✅ 直接字串

// 邊界檢查與容錯機制
if (isNaN(kinNum) || kinNum < 1 || kinNum > 260) {
  return { synchronicMessage: "能量讀取中..." };
}

// 資料存在性檢查
if (kinData[kinNum]) {
  return kinData[kinNum];
}

// 最終 Fallback
return {
  synchronicMessage: "能量讀取中...",
  highFrequency: "能量讀取中...",
  lowFrequency: "能量讀取中...",
  alignment: "能量讀取中..."
};
```

---

## 🎨 使用者界面層

### 多房間架構（核心設計模式）

該系統採用多個獨立應用的"房間"設計理念，代表不同的使用場景或體驗流程：

| 房間 | 檔案位置 | 主要用途 | 開發狀態 | 版本數 |
|------|---------|---------|---------|--------|
| **主頁** | index.html | 系統入口，完整功能展示 | ✅ 完成 | 1 |
| **紅屋** | red-room/ | 主應用，訊息深度展示 | ✅ 主力 | 4+ |
| **白屋** | white-house/ | AI 實驗版本（Claude/Gemini） | 🔄 開發 | 3 |
| **藍屋** | blue-room/ | 功能實驗 | 🔄 開發 | 2 |
| **黃屋** | yellow-room/ | 功能實驗 | 🔄 開發 | 1 |

#### 紅屋 (Red Room) - 主應用詳解

**目的**: 提供完整的 KIN 計算與深層訊息查詢體驗

**核心功能**:
- ✅ 日期選擇器（原生 HTML5）
- ✅ 實時 KIN 計算
- ✅ 圖騰視覺化展示
- ✅ 四層訊息展示
- ✅ 響應式設計
- ✅ 觸摸設備優化

**檔案組成**:
- [red-room/index.html](red-room/index.html) - UI 介面與佈局
- [red-room/red-brain.js](red-room/red-brain.js) - 邏輯與交互
- [RedRoom.jsx](RedRoom.jsx) - React 組件版本

**特色功能**:
- 漢堡菜單導航（移動端友好）
- 容錯設計（日期驗證、資料缺失處理）
- 深色/淺色主題支持（推測）
- 動畫反饋

---

## 📊 技術棧與依賴

| 層級 | 技術選型 | 版本/描述 |
|------|---------|---------|
| **計算引擎** | Vanilla JavaScript | 無外部依賴，純邏輯 |
| **前端框架** | React | JSX 組件版本 |
| **標記語言** | HTML5 | 17 個 HTML 實現版本 |
| **樣式** | CSS3 + Google Fonts | 響應式設計 |
| **圖形資源** | PNG 向量圖 | 20 個圖騰（01-20.png） |
| **字體** | Noto Serif TC | 中文優化 |
| **模組化** | ES6 Modules | export/import 語法 |
| **版本控制** | Git | 本地倉庫（.git） |
| **Icon 庫** | Font Awesome | v6.4.0 |

### 核心依賴圖

```
index.html (主頁面)
├── kin-calculator.js (計算引擎)
├── kinData.js (訊息庫)
├── core/temple-core.js (常數表)
└── images/ (圖騰資源)

red-room/index.html (紅屋)
├── red-brain.js (邏輯)
├── kinData.js (共用訊息庫)
├── core/temple-core.js (共用常數)
└── images/ (共用圖騰)

React 版本
├── RedRoom.jsx
├── kin-calculator.js
├── kinData.js
└── core/temple-core.js
```

---

## 🔌 核心 API 簽名

### kin-calculator.js

```javascript
/**
 * 計算指定日期的 KIN 編號
 * @param {Number} year - 年份 (2014-2035)
 * @param {Number} month - 月份 (1-12)
 * @param {Number} day - 日期 (1-31)
 * @returns {Number} KIN 編號 (1-260) 或 null (2月29日)
 */
function calculateKIN(year, month, day) → Number | null

/**
 * 獲取圖騰名稱
 * @param {Number} kinNumber - KIN 編號
 * @returns {String} 圖騰名稱 (如 "黃星星")
 */
function getSealName(kinNumber) → String

/**
 * 獲取調性名稱
 * @param {Number} kinNumber - KIN 編號
 * @returns {String} 調性名稱 (如 "月亮")
 */
function getToneName(kinNumber) → String

/**
 * 獲取完整的 KIN 名稱
 * @param {Number} kinNumber - KIN 編號
 * @returns {String} 完整名稱 (如 "月亮的黃星星")
 */
function getFullName(kinNumber) → String
```

### kinData.js

```javascript
/**
 * KIN 訊息資料庫
 * @key {String} KIN 編號 (1-260)
 * @value {Object} 訊息物件
 *   - synchronicMessage: 同步訊息
 *   - highFrequency: 高頻表現
 *   - lowFrequency: 低頻警示
 *   - alignment: 行動建議
 */
export const kinData = { ... }

/**
 * 獲取指定 KIN 的訊息
 * @param {Number} kinNumber - KIN 編號
 * @returns {Object} 訊息物件或 Fallback
 */
function getKinMessage(kinNumber) → Object
```

### core/temple-core.js

```javascript
/**
 * 年份常數對照表
 */
const YEAR_CONSTANTS = {
  2014: 62, 2015: 167, ..., 2035: 187
}

/**
 * 月份常數對照表
 */
const MONTH_CONSTANTS = {
  1: 0, 2: 31, 3: 59, ..., 12: 74
}

/**
 * 調性名稱列表
 */
const TONES = [
  "磁性", "月亮", "電力", ..., "宇宙"
]

/**
 * 圖騰名稱列表
 */
const SEALS = [
  "紅龍", "白風", "藍夜", ..., "黃太陽"
]
```

---

## 🧪 測試與驗證

### 測試檔案清單

| 檔案名 | 位置 | 用途 | 描述 |
|--------|------|------|------|
| test-kin-display.html | 根目錄 | KIN 顯示測試 | 驗證計算引擎輸出 |
| index-test.html | 根目錄 | 整體流程測試 | 端到端測試 |
| index-0110.html | 根目錄 | 版本存檔 | v0.1.1.0 測試版 |
| blue_0115-GPT.html | blue-room/ | AI 版本測試 | GPT 生成版本 |
| index-CLAUDE.html | white-house/ | AI 版本測試 | Claude 生成版本 |
| index-gemini.html | white-house/ | AI 版本測試 | Gemini 生成版本 |

### 驗證清單

**計算準確性**:
- [ ] 日期 2026/01/06 → KIN 28
- [ ] 日期 2024/03/15 → KIN 147（閏年）
- [ ] 日期 2024/02/29 → Hunab Ku（特殊）
- [ ] 邊界值：KIN 1, 260, 261 mod = 1

**資料完整性**:
- [ ] kinData.js 包含全部 260 個 KIN
- [ ] 每個 KIN 有 4 個訊息欄位
- [ ] 圖騰圖片 01-20.png 全部存在
- [ ] 年份常數覆蓋 2014-2035

**UI/UX 驗證**:
- [ ] 日期輸入在所有設備正常
- [ ] 圖騰圖片正確加載
- [ ] 訊息文字完整顯示
- [ ] 響應式佈局適配

---

## 📋 資料規範與驗證規則

### 日期輸入規範

```javascript
// 有效日期範圍
START_YEAR: 2014
END_YEAR: 2035
FORMAT: "YYYY-MM-DD"
MIN_DATE: "2014-01-01"
MAX_DATE: "2035-12-31"

// 驗證邏輯
function validateDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  
  // 範圍檢查
  if (year < 2014 || year > 2035) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  
  // 實際日期檢查
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}
```

### KIN 輸出規範

```javascript
// 有效範圍
MIN_KIN: 1
MAX_KIN: 260
CYCLE_LENGTH: 260

// 計算結果標準化
function normalizeKIN(rawValue) {
  let kin = rawValue % 260;
  return kin === 0 ? 260 : kin;
}
```

### 錯誤狀態處理

```javascript
// 錯誤訊息對照表
ERRORS = {
  INVALID_DATE: "請輸入有效日期",
  YEAR_OUT_OF_RANGE: "系統支援 2014-2035 年",
  DATA_MISSING: "能量讀取中...",
  UNKNOWN_ERROR: "發生未知錯誤，請重試"
}

// 容錯優先級
1. 日期有效性檢查
2. 年份常數存在性
3. KIN 資料查詢
4. UI Fallback 訊息
```

---

## 🎨 視覺設計規範

### 色彩系統

```css
/* 主色盤 */
--bg-main: #EDE9E4;        /* 暖米色背景 */
--text-primary: #3a3632;   /* 深棕色文字 */
--text-secondary: #6a655c; /* 淺棕色輔文字 */
--text-dark: #2d2a26;      /* 炭灰色標題 */

/* 輔助色 */
--shadow-light: rgba(255, 255, 255, 0.4);
--shadow-dark: rgba(0, 0, 0, 0.12);
```

### 字體排版

```css
/* 標題字體 */
font-family: 'Noto Serif TC';
font-size: 48px;           /* 主標題 */
font-weight: 900;          /* 加粗 */
letter-spacing: 0.12em;    /* 字距 */
line-height: 1.3;          /* 行距 */

/* 正文字體 */
font-family: 'Noto Serif TC';
font-size: 16px;
font-weight: 500-700;
line-height: 1.5;
```

### 響應式斷點

```css
/* 設備分類 */
Mobile: max-width: 480px      /* 單欄佈局 */
Tablet: 481px ~ 1024px        /* 雙欄或適應 */
Desktop: 1025px+              /* 完整體驗 */

/* 主容器限制 */
max-width: 1100px;
padding: 32px;
margin: 0 auto;
```

### 動畫與過渡

```css
/* 脈動動畫 */
@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* 應用位置 */
.hunab-ku img {
  animation: gentlePulse 8s ease-in-out infinite;
}

/* 投影效果 */
filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12));

/* 過渡時間 */
transition: all 0.3s ease-in-out;
```

---

## 📚 資訊架構與導航

### 應用結構圖

```
13月亮曆系統
│
├─ 主入口
│  └─ index.html (987 行)
│     ├─ 頁頭區域 (Hunab Ku + 標題)
│     ├─ 日期選擇器
│     ├─ KIN 計算區塊
│     └─ 訊息面板
│
├─ 紅屋應用 (主力)
│  ├─ red-room/index.html
│  ├─ red-brain.js
│  └─ RedRoom.jsx (React)
│
├─ 白屋應用 (AI 實驗)
│  ├─ white-house/index.html
│  ├─ index-CLAUDE.html
│  └─ index-gemini.html
│
├─ 藍屋應用 (開發中)
│  ├─ blue-room/index.html
│  ├─ blue_room_ready.html
│  └─ blue_0115-GPT.html
│
└─ 黃屋應用 (開發中)
   └─ yellow-room/index.html
```

### 資料流程

```
User Input (Date)
    ↓
Date Validation
    ↓
KIN Calculation (kin-calculator.js)
    ↓
Tone & Seal Extraction (temple-core.js)
    ↓
Message Query (kinData.js)
    ↓
Image Path Resolution
    ↓
UI Rendering (HTML/React)
    ↓
User Display
```

---

## 🚀 部署與運行指南

### 本地運行

#### 方法 1: 直接打開（推薦簡單使用）
```bash
# 在瀏覽器中打開
open /path/to/260/index.html

# 或使用 Python 簡單伺服器
cd /Users/hiper/Desktop/vibe-coding/260
python3 -m http.server 8000
# 訪問 http://localhost:8000
```

#### 方法 2: React 開發環境
```bash
# 安裝依賴
npm install

# 開發伺服器
npm start

# 生產構建
npm run build
```

### 文件依賴清單

**主應用依賴**:
```
index.html
├── kin-calculator.js (計算)
├── kinData.js (訊息庫)
├── core/temple-core.js (常數)
├── images/01.png ~ 20.png (圖騰)
└── Font Awesome 6.4.0 (CDN)

red-room/index.html
├── red-brain.js (邏輯)
├── kinData.js (共用)
├── core/temple-core.js (共用)
└── images/ (共用)
```

### 部署檢查清單

- [ ] 所有 HTML 檔案無誤
- [ ] JavaScript 檔案正確加載
- [ ] 圖騰圖片路徑正確
- [ ] 字體 CDN 可訪問
- [ ] CORS 政策不衝突
- [ ] 移動設備顯示正常
- [ ] 瀏覽器相容性測試

---

## ⚠️ 已知限制與未來規劃

### 當前限制

1. **年份支援範圍** (重要)
   - 限制: 2014-2035 年
   - 原因: 年份常數表有限
   - 影響: 超出範圍日期無法計算
   - 擴展方案: 計算並添加更多年份常數

2. **多語言支持** (待定)
   - 限制: 僅繁體中文
   - 原因: UI 和訊息庫均為中文
   - 影響: 國際用戶體驗差
   - 擴展方案: i18n 框架集成

3. **在線部署** (待定)
   - 限制: 需要本地伺服器
   - 原因: 檔案操作和 CORS
   - 影響: 用戶無法直接訪問
   - 擴展方案: 部署到 Vercel/GitHub Pages

4. **房間功能** (清晰化中)
   - 限制: 白/藍/黃屋用途未定義
   - 原因: 可能為實驗版本
   - 影響: 功能不清楚
   - 建議: 決定各房間的最終用途

5. **資料完整性** (需驗證)
   - 限制: 260 個 KIN 訊息是否全部完整
   - 原因: kinData.js 檔案大，未完整審查
   - 影響: 可能缺少某些 KIN 訊息
   - 驗證方案: 遍歷所有 KIN 確保無遺漏

### 建議的未來擴展功能

**優先級高**:
- [ ] 擴展年份支援 (2000-2050)
- [ ] 搭建線上應用 (Vercel/Netlify)
- [ ] 實現使用者帳戶系統
- [ ] 記錄查詢歷史功能

**優先級中**:
- [ ] 多語言支持 (英文、西班牙文)
- [ ] 詳細的圖騰學習模式
- [ ] 引導冥想音頻集成
- [ ] 分享功能 (社交媒體)

**優先級低**:
- [ ] 行動應用版本 (React Native)
- [ ] 公開 API 服務
- [ ] 社區圖騰詮釋分享
- [ ] 商品化 (打印日曆等)

---

## 📞 核心模組聯絡點

### 快速導航

| 需求 | 相關檔案 | 主要函數 |
|------|---------|---------|
| 計算 KIN | kin-calculator.js | calculateKIN() |
| 查詢訊息 | kinData.js | kinData[num] |
| 圖騰資料 | core/temple-core.js | SEALS, TONES |
| UI 展示 | red-room/index.html | renderKIN() |
| 邏輯處理 | red-brain.js | getKinMessage() |

### 修改指南

| 操作 | 檔案 | 說明 |
|------|------|------|
| 添加年份 | kin-calculator.js | 更新 yearConstants |
| 修改訊息 | kinData.js | 編輯 kinData 物件 |
| 更改色系 | index.html | 修改 CSS 變數 |
| 新增圖騰 | core/temple-core.js | 擴展 sealNames 陣列 |
| 國際化 | 所有檔案 | 實施 i18n 方案 |

---

## 📊 統計摘要

### 代碼量統計

| 類型 | 檔案數 | 總行數 | 平均行數 |
|------|--------|--------|----------|
| HTML | 17 | ~8,000+ | ~470 |
| JavaScript | 7 | ~1,200+ | ~170 |
| React (JSX) | 2 | ~500+ | ~250 |
| CSS (內聯) | 多個 | ~3,000+ | - |
| 文檔 | 4 | ~1,500+ | ~375 |
| **總計** | **32+** | **~14,200+** | - |

### 資源統計

| 資源 | 數量 | 描述 |
|------|------|------|
| 圖騰圖片 | 20 | PNG 格式 |
| KIN 訊息 | 260 | 四層訊息 |
| 應用入口 | 5 | 主 + 4 房間 |
| 測試版本 | 10+ | 不同實驗版本 |
| 常數表項 | 22 | 年份 (2014-2035) |

---

**版本履歷**:
- v1.0 (2026-01-14): 完整規格文檔完成
- v0.9 (2026-01-13): 初版文檔
- 開發中: 多個房間應用

## 📝 版本與更新歷史

| 版本 | 日期 | 主要變化 |
|------|------|---------|
| 1.0 | 2026.01.13 | 初始完整規格文件 |
| - | - | - |

---

**文件完成日期**: 2026 年 1 月 13 日  
**規格版本**: v1.0  
**維護負責人**: [待補充]

---

## 附錄：快速參考

### KIN 計算快速檢查清單

- [ ] 輸入年份在 2014-2035 範圍內
- [ ] 輸入月份 1-12
- [ ] 輸入日期符合該月天數
- [ ] 若日期為 2/29，預期結果為 "Hunab Ku"
- [ ] 若為閏年且日期 ≥ 3/1，計算後 +1
- [ ] KIN 結果應在 1-260 範圍內
- [ ] 驗證圖騰名稱與訊息對應正確

### 訊息查詢快速檢查清單

- [ ] KIN 編號有效 (1-260)
- [ ] kinData 物件已加載
- [ ] 四層訊息都有內容
- [ ] 圖片檔案存在 (01.png ~ 20.png)
- [ ] 圖騰名稱與編號對應正確

---

**本規格文件為完整概覽。具體實現細節請參考各檔案內註解。**
