// 260/core/kin-card-core.js
// ✅ 大腦：統一卡牌版型 + tone marks 置中 + tone=5(只有槓)不下墜 + 字級/圖騰尺寸
// ✅ 使用方式：
//   const card = KIN_CARD_CORE.mount({ hostEl, imageBasePath, solarSeals, galacticTones });
//   card.showFromKin(kin);
//   card.hide();

(() => {
  const STYLE_ID = "kin-card-core-style-v1";

  function toneOfKin(kin){ return ((kin - 1) % 13) + 1; }
  function sealOfKin(kin){ return ((kin - 1) % 20) + 1; }
  function pad2(n){ return String(n).padStart(2,'0'); }

  function injectStyleOnce(){
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
/* ===== KIN Card Core (Fixed Template) ===== */
.kin-card-layer{
  position:absolute; inset:0;
  display:flex; align-items:center; justify-content:center;
  z-index:60;
  pointer-events:none;
  opacity:0;
  transition: opacity .22s ease;
}
.kin-card-layer.show{ opacity:1; pointer-events:auto; }

.kin-card-backdrop{
  position:absolute; inset:0;
  background: radial-gradient(circle, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.10) 100%);
  backdrop-filter: blur(2px);
}

/* ✅ 版型固定（以後藍屋/黃屋共用） */
.kin-card{
  --glyph: clamp(140px, 28vw, 180px);
  width: min(560px, calc(100% - 34px));
  display:flex; flex-direction:column; align-items:center;
  gap: 10px;
  position:relative;
  padding: 12px 0 0;
  transform: translateY(2px) scale(0.99);
  transition: transform .22s ease;
}
.kin-card-layer.show .kin-card{ transform: translateY(0) scale(1); }

/* ✅ 調性區：固定高度、正中間，不偏右、不飄 */
.tone-area{
  height:72px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10px;
  flex:0 0 72px;
}

/* ✅ tone=5（dots=0）時：把 dots 那排隱藏，槓保持置中（不下墜） */
.tone-area.no-dots .tone-dots{ display:none; }

/* 紅屋語言：點在上，槓在下 */
.tone-dots{
  height:28px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:14px;
}
.tone-bars{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10px;
}
.tone-dot{ width:22px; height:22px; background:#000; border-radius:50%; }
.tone-bar{ width:190px; height:16px; background:#000; border-radius:8px; }

/* ✅ 圖騰：不加額外框，只顯示圖本身 */
.glyph-img{
  width: var(--glyph);
  height: var(--glyph);
  object-fit: contain;
  filter: drop-shadow(0 10px 22px rgba(0,0,0,0.20));
  margin-top: 2px;
}

/* ✅ 文字大小固定在 core（不用每次改） */
.kin-id{
  font-family:'Cinzel', serif;
  font-size:clamp(2.8rem, 4.8vh, 3.8rem);
  font-weight:900;
  line-height:1;
  margin-top:6px;
  text-align:center;
  color:#0E0E0E;
  user-select:none;
}
.kin-name{
  font-family:'Noto Serif TC', serif;
  font-size:clamp(1.8rem, 3.5vh, 2.6rem);
  font-weight:900;
  letter-spacing:clamp(3px, .9vw, 7px);
  margin-top:4px;
  text-align:center;
  color:#111;
}

.card-close{
  position:absolute;
  top: -6px;
  right: 6px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.80);
  color: rgba(80,80,80,0.75);
  cursor:pointer;
  box-shadow: 0 10px 22px rgba(0,0,0,0.10);
}

@media (max-width:520px){
  .tone-area{ height:48px; flex-basis:48px; gap:6px; }
  .tone-dots{ height:18px; gap:10px; }
  .tone-bars{ gap:6px; }
  .tone-dot{ width:14px; height:14px; }
  .tone-bar{ width:120px; height:10px; border-radius:6px; }
  .kin-id{ font-size:clamp(1.9rem, 3.6vh, 2.3rem); margin-top:4px; }
  .kin-name{ font-size:clamp(1.25rem, 2.8vh, 1.75rem); letter-spacing:clamp(2px, .7vw, 4px); }
  .glyph-img{ width: clamp(120px, 40vw, 150px); height: clamp(120px, 40vw, 150px); }
  .card-close{ width:36px; height:36px; }
}
    `;
    document.head.appendChild(style);
  }

  function mount({ hostEl, imageBasePath, solarSeals, galacticTones }){
    if (!hostEl) throw new Error("KIN_CARD_CORE.mount: hostEl is required");
    if (!imageBasePath) imageBasePath = "../images";

    injectStyleOnce();

    // 建立 DOM（如果已存在就重用）
    let layer = hostEl.querySelector(".kin-card-layer");
    if (!layer){
      layer = document.createElement("div");
      layer.className = "kin-card-layer";
      layer.setAttribute("aria-hidden","true");
      layer.innerHTML = `
        <div class="kin-card-backdrop"></div>
        <div class="kin-card" role="dialog" aria-label="KIN卡牌">
          <button class="card-close" type="button" aria-label="關閉">×</button>

          <div class="tone-area">
            <div class="tone-dots"></div>
            <div class="tone-bars"></div>
          </div>

          <img class="glyph-img" src="" alt="">
          <div class="kin-id"></div>
          <div class="kin-name"></div>
        </div>
      `;
      hostEl.appendChild(layer);
    }

    const backdrop = layer.querySelector(".kin-card-backdrop");
    const closeBtn = layer.querySelector(".card-close");
    const toneArea = layer.querySelector(".tone-area");
    const toneDots = layer.querySelector(".tone-dots");
    const toneBars = layer.querySelector(".tone-bars");
    const glyphImg = layer.querySelector(".glyph-img");
    const kinIdEl = layer.querySelector(".kin-id");
    const kinNameEl = layer.querySelector(".kin-name");

    function renderToneMarks(toneId){
      const bars = Math.floor(toneId / 5);
      const dots = toneId % 5;

      // ✅ tone=5（dots=0）修正：切 class 讓 dots 排不佔位
      toneArea.classList.toggle("no-dots", dots === 0);

      toneDots.innerHTML = "";
      toneBars.innerHTML = "";

      for(let i=0;i<dots;i++){
        const d = document.createElement("div");
        d.className = "tone-dot";
        toneDots.appendChild(d);
      }
      for(let i=0;i<bars;i++){
        const b = document.createElement("div");
        b.className = "tone-bar";
        toneBars.appendChild(b);
      }
    }

    function showFromKin(kin){
      const toneId = toneOfKin(kin);
      const sealId = sealOfKin(kin);
      const sealName = solarSeals?.[sealId-1]?.name || "";

      renderToneMarks(toneId);

      glyphImg.src = `${imageBasePath}/${pad2(sealId)}.png`;
      glyphImg.alt = sealName;

      kinIdEl.textContent = `KIN ${kin}`;
      kinNameEl.textContent = `${galacticTones?.[toneId-1] || ""}的${sealName}`;

      layer.classList.add("show");
      layer.setAttribute("aria-hidden","false");
    }

    function hide(){
      layer.classList.remove("show");
      layer.setAttribute("aria-hidden","true");
    }

    closeBtn.addEventListener("click", hide);
    backdrop.addEventListener("click", hide);

    return { showFromKin, hide, toneOfKin, sealOfKin };
  }

  window.KIN_CARD_CORE = { mount };
})();
