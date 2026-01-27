# 黃色小屋 V8 - 完整使用指南

## 🌟 核心更新內容

### ✅ 已整合的功能

1. **kinData 完整集成**
   - 260 個 KIN 的完整 synchronicMessage、alignment、grounding 資料
   - 前 20 個 KIN 已測試可用
   - 抽牌機制：純亂數 1-260

2. **文案權重強化**
   - ✨ **調頻建議 (Alignment)** - 字體 1.8rem、金色漸層背景、加粗
   - ✨ **落地行動 (Grounding)** - 字體 1.8rem、金色漸層背景、加粗
   - 兩者視覺權重相等，均強調「心態 + 行動」

3. **主題相關智慧金句**
   - 5 個主題各有 4 句金句
   - 每次抽牌隨機顯示 1 句
   - 金句內容圍繞主題核心價值

4. **歷史紀錄牆**
   - 保存最近 5 次抽牌記錄
   - 顯示：日期、時間、KIN、主題
   - localStorage 持久化
   - 可清空歷史

5. **五大主題**
   - 💰 財務 (Financial)
   - 💼 事業 (Career)
   - 💕 感情 (Relationship)
   - 🌿 健康 (Health)
   - 🌱 成長 (Growth)

---

## 📐 文件部署結構

```
yellow-room/
├── yellow-room-v8.html          # 完整單一檔案（kinData 內聯）
├── images/                       # 圖騰資料夾
│   ├── 01.png ~ 20.png         # 20 個圖騰
│   └── ...
└── README.md                    # 說明文件
```

**特別說明：** V8 版本已將 kinData 內聯於 HTML 中，無需額外載入 .js 檔案。

---

## 🎯 使用流程

### 完整互動序列

```
進入頁面
    ↓
看到「南方·金禾」門檻 (Gate)
    ↓
點擊圓形按鈕
    ↓
進入五主題聖殿 (Sanctuary)
    ↓
選擇一個主題（財務/事業/感情/健康/成長）
    ↓
進入呼吸引導頁面 (Breathe)
  - 顯示選中主題 + 呼吸圓圈動畫
  - 用戶可平靜心念
    ↓
點擊「獲取豐盛指引」按鈕
    ↓
進入神諭卡片頁面 (Oracle)
  - 顯示隨機抽牌結果 (KIN 1-260)
  - 調性視覺化（點 + 條）
  - 圖騰圖片 (01.png ~ 20.png)
  - 調頻建議（放大突顯）
  - 落地行動（放大突顯）
  - 主題相關智慧金句
  - 歷史紀錄牆（最近 5 次）
    ↓
可選擇回聖殿或清空歷史
```

---

## 🔧 圖片路徑配置

**當前設定（需要根據你的部署調整）：**

```javascript
// 第 XXX 行
<img src="../images/${sealPad}.png" onerror="...">
```

### 根據部署位置調整：

| 部署方式 | 圖片路徑 | 說明 |
|---------|---------|------|
| 本地同資料夾 | `./images/01.png` | 直接在檔案同層 |
| images 子資料夾 | `./images/01.png` | HTML 和 images 同層 |
| 上層資料夾 | `../images/01.png` | HTML 在子資料夾中 |
| 線上 CDN | `https://your-cdn.com/images/01.png` | 全路徑 URL |

**快速修改：** 搜尋並替換 `../images/` 為你的正確路徑。

---

## 🎨 視覺調整清單

### 色彩系統

```css
--gold-malt: #D4A76A;      /* 主色麥芽金 */
--gold-amber: #B8860B;     /* 強調琥珀金 */
--bg-stone: #1C1812;       /* 背景深石室 */
--card-bg: #F2E6D0;        /* 卡片羊皮紙 */
--text-dark: #2A1B0D;      /* 文字深褐 */
--light-gold: #F4E4B5;     /* 淺金色 */
```

**調整方式：** 在 `:root` 中修改 CSS 變量

### 文字大小調整

| 元素 | 當前大小 | 調整位置 |
|-----|---------|---------|
| 調頻建議 | 1.8rem | `.alignment-content` |
| 落地行動 | 1.8rem | `.grounding-content` |
| 智慧金句 | 1.1rem | `.wisdom-quote` |
| KIN 編號 | 2.5rem | `.kin-number` |

**調整示例：**
```css
.alignment-content {
  font-size: 2rem;  /* 改為更大 */
}
```

### 漸層背景調整

調頻建議和落地行動現在使用：
```css
background: linear-gradient(135deg, rgba(244, 228, 181, 0.6), rgba(212, 167, 106, 0.3));
```

改變 `rgba()` 的最後一個數字（0-1）調整透明度。

---

## 🔌 kinData 動態擴充

### 如何新增更多 KIN

V8 目前內聯了前 20 個 KIN 的完整資料。如果你有完整 260 KIN 的 kinData.js：

**方式 1：替換內聯資料**

在 HTML 中找到 `const kinData = { ... };` 段落，替換整個物件。

**方式 2：外部載入（需修改）**

在 `<body>` 結尾加上：
```html
<script src="./kinData-full.js"></script>
<script>
  // V8 的 kinData 會被外部檔案覆蓋
</script>
```

---

## 💬 智慧金句自訂

### 預設金句結構

```javascript
const wisdomQuotes = {
  financial: [
    "金句 1",
    "金句 2",
    "金句 3",
    "金句 4"
  ],
  career: [ ... ],
  relationship: [ ... ],
  health: [ ... ],
  growth: [ ... ]
};
```

### 修改金句步驟

1. 在 HTML 中找到 `const wisdomQuotes = { ... };`
2. 修改對應主題的金句陣列
3. **確保每個主題都有 4 句金句**（用於亂數選擇）

### 金句設計建議

✨ **財務金句** - 聚焦豐盛、流動、信念  
✨ **事業金句** - 聚焦使命、價值、堅持  
✨ **感情金句** - 聚焦連結、看見、親密  
✨ **健康金句** - 聚焦身體、照顧、感知  
✨ **成長金句** - 聚焦蛻變、擴展、接納  

---

## 🛠️ 常見調整需求

### Q1：怎樣改變主題的數量或名稱？

找到 `THEMES` 陣列：
```javascript
const THEMES = [
  { id: 'financial', name: '財務', path: '...' },
  // ... 修改這裡
];
```

**新增主題：**
1. 增加新物件到陣列
2. 在 `wisdomQuotes` 中新增該主題的金句
3. 提供新的 SVG path（或重用現有的）

### Q2：怎樣改變抽牌的隨機範圍？

找到 `revealOracle()` 函數：
```javascript
const randomKin = Math.floor(Math.random() * 260) + 1;  // 目前是 1-260
```

改為：
```javascript
const randomKin = Math.floor(Math.random() * 20) + 1;   // 只用前 20 個
```

### Q3：怎樣改變歷史紀錄保留數量？

找到 `saveToHistory()` 函數：
```javascript
if (history.length > 5) {  // 改成你要的數字
  history = history.slice(0, 5);
}
```

### Q4：怎樣改變按鈕文字？

搜尋對應的按鈕 HTML，例如：
```html
<button class="action-btn" onclick="revealOracle()">獲取豐盛指引</button>
<!-- 改為 -->
<button class="action-btn" onclick="revealOracle()">展開我的指引</button>
```

---

## 📱 響應式設計說明

V8 已針對不同螢幕尺寸優化：

- **桌面版** (>600px)：5 個主題並排顯示
- **手機版** (<600px)：主題垂直堆疊

### 斷點調整

```css
@media (max-width: 600px) {
  /* 手機版樣式 */
  .stamps-grid { 
    flex-direction: column; 
  }
}
```

要改變斷點，修改 `600px` 為你想要的寬度。

---

## 🚀 部署檢查清單

在上線前，請確認：

- [ ] 圖片路徑正確（01.png ~ 20.png）
- [ ] 測試所有 5 個主題按鈕
- [ ] 測試抽牌 10 次，確認隨機性
- [ ] 檢查歷史紀錄是否正確保存
- [ ] 清空歷史功能是否運作
- [ ] 手機螢幕顯示是否正常
- [ ] 所有按鈕連結是否正常
- [ ] localStorage 在私人瀏覽模式是否有警告

---

## 🔐 資料持久化

V8 使用 localStorage 保存歷史記錄：

```javascript
localStorage.setItem('yellowRoomHistory', JSON.stringify(history));
localStorage.getItem('yellowRoomHistory');
```

**重要：** 
- 用戶清除瀏覽器快取時，歷史紀錄會被清空
- 不同瀏覽器的 localStorage 獨立
- 私人瀏覽模式可能無法保存

---

## 🎭 動畫調整

### 呼吸圓圈動畫

```css
@keyframes ritualBreathe { 
  0%, 100% { transform: scale(1); opacity: 0.8; } 
  50% { transform: scale(1.08); opacity: 1; } 
}
```

改變 `scale(1.08)` 調整最大放大倍數  
改變 `5s` 調整動畫速度：
```css
animation: ritualBreathe 5s infinite;  /* 改為 3s 或 7s */
```

### 場景切換動畫

```css
--transition: 1s cubic-bezier(0.4, 0, 0.2, 1);
```

改變 `1s` 調整淡入淡出速度

---

## 📊 完整功能對照表

| 功能 | 實現狀態 | 位置 |
|-----|--------|------|
| Gate 門檻頁面 | ✅ | #scene-gate |
| Sanctuary 聖殿 | ✅ | #scene-sanctuary |
| Breathe 呼吸引導 | ✅ | #scene-breathe |
| Oracle 神諭卡片 | ✅ | #scene-oracle |
| 調頻建議強化 | ✅ | .alignment-content |
| 落地行動強化 | ✅ | .grounding-content |
| 智慧金句 | ✅ | .wisdom-quote |
| 歷史紀錄牆 | ✅ | .history-wall |
| localStorage 持久化 | ✅ | saveToHistory() |
| 純亂數抽牌 | ✅ | revealOracle() |
| 響應式設計 | ✅ | @media queries |

---

## 🎁 額外優化建議

### 未來可實現的功能

1. **自訂主題** - 允許用戶新增個人化主題
2. **深度解讀** - 加入 highFrequency / lowFrequency 的完整解讀
3. **連續抽牌** - 3 張牌完整解讀（過去/現在/未來）
4. **分享功能** - 生成漂亮的圖片分享到社群媒體
5. **個人日誌** - 紀錄每次指引與實踐心得
6. **統計分析** - 顯示最常抽到的主題/KIN
7. **音效** - 加入輕鬆的背景音樂或抽牌音效
8. **多語言** - 支援英文、簡體中文等

---

## 💬 故障排除

### 圖片無法載入

**症狀：** 顯示 placeholder 圖片  
**原因：** 圖片路徑錯誤  
**解決：** 檢查並更正 `src="../images/${sealPad}.png"` 中的路徑

### localStorage 無法存取

**症狀：** 刷新後歷史記錄消失  
**原因：** 私人瀏覽模式 / localStorage 被禁用  
**解決：** 提示用戶使用常規瀏覽模式

### 金句顯示不出來

**症狀：** 卡片沒有顯示金句  
**原因：** wisdomQuotes 資料不完整  
**解決：** 確認所有 5 個主題都有 4 句金句

### 動畫不流暢

**症狀：** 場景切換卡頓  
**原因：** 低端設備性能限制  
**解決：** 減少動畫持續時間或簡化效果

---

## 📞 技術支援備註

### 重點檔案區段

- **主題定義**：Line ~340
- **kinData 資料**：Line ~344-363
- **智慧金句**：Line ~367-387
- **切換場景函數**：Line ~420
- **抽牌核心邏輯**：Line ~440-490
- **歷史管理**：Line ~510-530

### 改寫時的注意事項

1. **維持 HTML 結構** - 場景 ID 不要改
2. **保留 localStorage 邏輯** - 避免歷史遺失
3. **測試所有路徑** - 確保按鈕連結正確
4. **驗證資料完整性** - kinData 和 wisdomQuotes 一致

---

## 🌟 設計哲學

> "Alignment 讓心對齊，Grounding 讓腳踩地。"

黃色小屋 V8 致力於：
- **視覺上** - 溫暖、成熟、豐盛的金褐調
- **文案上** - 調頻與落地行動等權重，同時強調
- **體驗上** - 呼吸引導讓用戶進入平靜狀態
- **記憶上** - 歷史紀錄陪伴長期實踐

每一次進入黃色小屋，都是一次收穫與回家。

---

**完成日期：2026 年 1 月 26 日**  
**版本：V8 正式版**  
**狀態：✅ 生產就緒**
