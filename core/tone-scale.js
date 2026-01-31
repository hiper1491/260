// core/tone-scale.js
// ===== 神廟調性比例語法（Temple Tone–Glyph Grammar）v1 =====
//
// 定義：圖騰 × 調性元素之間的尺度與距離關係
// 與房間顏色、主題、內容無關，可被任何屋子或封面共用。
//
// 使用方式：
//   <script src="../core/tone-scale.js"></script>
//   呼叫 TONE_SCALE.apply(containerEl)
//   → 讀取該容器的 --glyph（圖騰寬度 W），推導並注入 6 個 CSS 變數
//
// 注入的 CSS 變數（掛在傳入的容器元素上，不寫 :root）：
//   --tone-dot-size    = 0.122 × W
//   --tone-bar-w       = 1.056 × W
//   --tone-bar-h       = 0.089 × W
//   --tone-gap-dotdot  = 0.078 × W   （點與點之間）
//   --tone-gap-barbar  = 0.056 × W   （線與線之間）
//   --tone-gap-rowrow  = 0.056 × W   （點排↔線排之間，僅複合型生效）
//
// 比例係數來源：red-room/index.html + core/kin-card-core.js 桌面值
//   W=180 時：dot=22, bar=190×16, gapDotDot=14, gapBarBar=10, gapRowRow=10
//
// 型態判定（由呼叫端自行處理渲染邏輯）：
//   dots = toneId % 5
//   bars = Math.floor(toneId / 5)
//   單點型：dots > 0 && bars === 0 → 只需 gapDotDot
//   單線型：dots === 0 && bars > 0 → 只需 gapBarBar（點排隱藏）
//   複合型：dots > 0 && bars > 0   → gapDotDot + gapBarBar + gapRowRow 同時生效

(() => {
  'use strict';

  // 比例係數（以 W 為 master scale）
  const K = Object.freeze({
    dotSize:    0.122,
    barWidth:   1.056,
    barHeight:  0.089,
    gapDotDot:  0.078,
    gapBarBar:  0.056,
    gapRowRow:  0.056,
  });

  /**
   * 從容器元素讀取 --glyph 的 computed value 作為 W
   * @param {HTMLElement} el - 定義了 --glyph 的容器
   * @returns {number} W（px）
   */
  function readW(el) {
    const raw = getComputedStyle(el).getPropertyValue('--glyph');
    const val = parseFloat(raw);
    return Number.isFinite(val) && val > 0 ? val : 0;
  }

  /**
   * 以 W 推導 6 個 CSS 變數，設定在指定容器上
   * @param {HTMLElement} containerEl - 掛變數的目標元素（例如 .kin-card 或卡片容器）
   * @param {number} [overrideW] - 可選：直接指定 W 值（不從 --glyph 讀取）
   */
  function apply(containerEl, overrideW) {
    if (!containerEl) return;

    const W = (typeof overrideW === 'number' && overrideW > 0)
      ? overrideW
      : readW(containerEl);

    if (W === 0) return;

    containerEl.style.setProperty('--tone-dot-size',   (K.dotSize   * W).toFixed(1) + 'px');
    containerEl.style.setProperty('--tone-bar-w',      (K.barWidth  * W).toFixed(1) + 'px');
    containerEl.style.setProperty('--tone-bar-h',      (K.barHeight * W).toFixed(1) + 'px');
    containerEl.style.setProperty('--tone-gap-dotdot', (K.gapDotDot * W).toFixed(1) + 'px');
    containerEl.style.setProperty('--tone-gap-barbar', (K.gapBarBar * W).toFixed(1) + 'px');
    containerEl.style.setProperty('--tone-gap-rowrow', (K.gapRowRow * W).toFixed(1) + 'px');
  }

  // 導出
  window.TONE_SCALE = Object.freeze({ K, readW, apply });
})();
