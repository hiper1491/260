// render-core.js
// ✅ 通用卡牌模板：Tone(上) + Glyph(中) + KIN(下)
// ✅ tone 1~13 位置不飄：用固定 tone 區域高度 + 置中

(() => {
  function renderToneMarksHTML(toneId) {
    // Maya tones: 1~13 -> bars (5) + dots (1~4)
    const bars = Math.floor(toneId / 5);
    const dots = toneId % 5;

    let html = `<div class="tone-marks">`;

    // bars (each as a horizontal bar)
    for (let i = 0; i < bars; i++) {
      html += `<div class="tone-bar"></div>`;
    }

    // dots row
    if (dots > 0) {
      html += `<div class="tone-dot-row">`;
      for (let i = 0; i < dots; i++) html += `<div class="tone-dot"></div>`;
      html += `</div>`;
    }

    html += `</div>`;
    return html;
  }

  function renderKinOverlayHTML({ kin, sealId, toneId, imageBasePath = "../images" }) {
    const seal = window.TEMPLE_CORE.getSeal(sealId);
    const toneName = window.TEMPLE_CORE.getToneName(toneId);
    const imgSrc = window.TEMPLE_CORE.sealIdToImagePath(sealId, imageBasePath);

    return `
      <div class="kin-overlay-card" role="dialog" aria-label="KIN 卡牌">
        <div class="tone-area">
          ${renderToneMarksHTML(toneId)}
          <div class="tone-text">
            <span class="tone-num">Tone ${toneId}</span>
            <span class="tone-name">${toneName}</span>
          </div>
        </div>

        <div class="glyph-area">
          <img class="glyph-img" src="${imgSrc}" alt="${seal.name}">
          <div class="glyph-name">${seal.name}</div>
        </div>

        <div class="kin-area">
          <div class="kin-label">KIN</div>
          <div class="kin-num">${kin}</div>
        </div>

        <button class="overlay-close" type="button" aria-label="關閉">×</button>
      </div>
    `;
  }

  window.RENDER_CORE = {
    renderKinOverlayHTML
  };
})();
