// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧠 神廟大腦 (Temple Brain Core)
// 13 月亮曆 KIN 能量計算系統 - 統一核心
// 版本：1.0 | 2026-01-13
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TEMPLE_BRAIN = (() => {
  
  // ═══════════════════════════════════════
  // 📊 核心資料表
  // ═══════════════════════════════════════
  
  const YEAR_CONSTANTS = {
    2014: 62, 2015: 167, 2016: 12, 2017: 118, 2018: 223,
    2019: 68, 2020: 174, 2021: 19, 2022: 124, 2023: 229,
    2024: 72, 2025: 177, 2026: 22, 2027: 127, 2028: 233,
    2029: 78, 2030: 183, 2031: 28, 2032: 134, 2033: 239,
    2034: 84, 2035: 187
  };
  
  const MONTH_CONSTANTS = [0, 31, 59, 90, 120, 151, 181, 212, 243, 13, 44, 74];
  
  const SOLAR_SEALS = [
    { id: 1, name: "紅龍", color: "red", element: "火" },
    { id: 2, name: "白風", color: "white", element: "風" },
    { id: 3, name: "藍夜", color: "blue", element: "水" },
    { id: 4, name: "黃種子", color: "yellow", element: "土" },
    { id: 5, name: "紅蛇", color: "red", element: "火" },
    { id: 6, name: "白世界橋", color: "white", element: "風" },
    { id: 7, name: "藍手", color: "blue", element: "水" },
    { id: 8, name: "黃星星", color: "yellow", element: "土" },
    { id: 9, name: "紅月", color: "red", element: "火" },
    { id: 10, name: "白狗", color: "white", element: "風" },
    { id: 11, name: "藍猴", color: "blue", element: "水" },
    { id: 12, name: "黃人", color: "yellow", element: "土" },
    { id: 13, name: "紅天行者", color: "red", element: "火" },
    { id: 14, name: "白巫師", color: "white", element: "風" },
    { id: 15, name: "藍鷹", color: "blue", element: "水" },
    { id: 16, name: "黃戰士", color: "yellow", element: "土" },
    { id: 17, name: "紅地球", color: "red", element: "火" },
    { id: 18, name: "白鏡", color: "white", element: "風" },
    { id: 19, name: "藍風暴", color: "blue", element: "水" },
    { id: 20, name: "黃太陽", color: "yellow", element: "土" }
  ];
  
  const GALACTIC_TONES = [
    { id: 1, name: "磁性", action: "吸引", power: "統一目的" },
    { id: 2, name: "月亮", action: "挑戰", power: "極化" },
    { id: 3, name: "電力", action: "服務", power: "啟動" },
    { id: 4, name: "自我存在", action: "定義", power: "形式" },
    { id: 5, name: "超頻", action: "授權", power: "光芒" },
    { id: 6, name: "韻律", action: "平衡", power: "組織" },
    { id: 7, name: "共振", action: "調頻", power: "管道" },
    { id: 8, name: "銀河", action: "調和", power: "整合" },
    { id: 9, name: "太陽", action: "脈衝", power: "意圖" },
    { id: 10, name: "行星", action: "顯化", power: "完美" },
    { id: 11, name: "光譜", action: "解放", power: "溶解" },
    { id: 12, name: "水晶", action: "合作", power: "奉獻" },
    { id: 13, name: "宇宙", action: "超越", power: "臨在" }
  ];
  
  // ═══════════════════════════════════════
  // 🧮 核心計算函數
  // ═══════════════════════════════════════
  
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  function calculateKIN(year, month, day) {
    if (month === 2 && day === 29) return "Hunab Ku";
    if (!YEAR_CONSTANTS[year]) return null;
    
    const yearConst = YEAR_CONSTANTS[year];
    const monthConst = MONTH_CONSTANTS[month - 1];
    
    let kin = yearConst + monthConst + day;
    if (isLeapYear(year) && month >= 3) kin += 1;
    
    while (kin > 260) kin -= 260;
    return kin === 0 ? 260 : kin;
  }
  
  // ═══════════════════════════════════════
  // 🎨 圖騰與調性解析
  // ═══════════════════════════════════════
  
  function getSeal(kin) {
    if (kin === "Hunab Ku") return { id: 0, name: "Hunab Ku", color: "cosmic" };
    const idx = (kin - 1) % 20;
    return SOLAR_SEALS[idx];
  }
  
  function getTone(kin) {
    if (kin === "Hunab Ku") return { id: 0, name: "Hunab Ku" };
    const idx = (kin - 1) % 13;
    return GALACTIC_TONES[idx];
  }
  
  function getFullName(kin) {
    if (kin === "Hunab Ku") return "Hunab Ku";
    const tone = getTone(kin);
    const seal = getSeal(kin);
    return `${tone.name}的${seal.name}`;
  }
  
  function getColor(kin) {
    if (kin === "Hunab Ku") return "cosmic";
    return getSeal(kin).color;
  }
  
  // ═══════════════════════════════════════
  // 🖼️ 圖片路徑系統
  // ═══════════════════════════════════════
  
  function getSealImagePath(kin, basePath = "../images") {
    if (kin === "Hunab Ku") return `${basePath}/hunab-ku.png`;
    const seal = getSeal(kin);
    const id = String(seal.id).padStart(2, '0');
    return `${basePath}/${id}.png`;
  }
  
  // ═══════════════════════════════════════
  // 🔣 調性符號生成（點與槓）
  // ═══════════════════════════════════════
  
  function getToneSymbol(kin) {
    if (kin === "Hunab Ku") return '<div class="tone-symbol cosmic">∞</div>';
    
    const tone = getTone(kin).id;
    const dots = tone > 0 && tone <= 13 ? (tone > 4 ? 1 : tone) : 0;
    const bars = tone > 4 ? Math.floor((tone - 1) / 5) : 0;
    
    let html = '<div class="tone-symbol">';
    for (let i = 0; i < dots; i++) html += '<span class="dot">●</span>';
    for (let i = 0; i < bars; i++) html += '<span class="bar">━</span>';
    html += '</div>';
    return html;
  }
  
  // ═══════════════════════════════════════
  // 🌊 波符系統
  // ═══════════════════════════════════════
  
  function getWavespell(kin) {
    if (kin === "Hunab Ku") return { start: 0, end: 0, seal: "Hunab Ku" };
    
    const start = Math.floor((kin - 1) / 13) * 13 + 1;
    const end = start + 12;
    const seal = getSeal(start);
    
    return { start, end, seal: seal.name, color: seal.color };
  }
  
  function getPositionInWavespell(kin) {
    if (kin === "Hunab Ku") return { position: 0, role: "宇宙中心" };
    
    const pos = ((kin - 1) % 13) + 1;
    const tone = getTone(kin);
    return { position: pos, role: `${tone.name} - ${tone.action}` };
  }
  
  // ═══════════════════════════════════════
  // 🎲 隨機抽取系統
  // ═══════════════════════════════════════
  
  function drawRandomKIN() {
    return Math.floor(Math.random() * 260) + 1;
  }
  
  // ═══════════════════════════════════════
  // 🔮 合盤計算系統
  // ═══════════════════════════════════════
  
  function calculateSynthesis(...kinsArray) {
    let sum = kinsArray.reduce((acc, k) => acc + (k === "Hunab Ku" ? 0 : k), 0);
    while (sum > 260) sum -= 260;
    return sum === 0 ? 260 : sum;
  }
  
  // ═══════════════════════════════════════
  // 🎴 卡片生成系統
  // ═══════════════════════════════════════
  
  function generateCardHTML(kin, options = {}) {
    const {
      showSymbol = true,
      showImage = true,
      showName = true,
      size = "standard",
      imagePath = "../images"
    } = options;
    
    const seal = getSeal(kin);
    const tone = getTone(kin);
    const fullName = getFullName(kin);
    const color = getColor(kin);
    const imgPath = getSealImagePath(kin, imagePath);
    
    let html = `<div class="kin-card ${size} ${color}">`;
    
    if (showSymbol) {
      html += `<div class="tone-zone">${getToneSymbol(kin)}</div>`;
    }
    
    if (showImage) {
      html += `<div class="seal-zone">
        <img src="${imgPath}" alt="${seal.name}" class="seal-image">
      </div>`;
    }
    
    if (showName) {
      html += `<div class="name-zone">
        <div class="kin-number">KIN ${kin}</div>
        <div class="kin-name">${fullName}</div>
      </div>`;
    }
    
    html += '</div>';
    return html;
  }
  
  // ═══════════════════════════════════════
  // 📤 公開 API
  // ═══════════════════════════════════════
  
  return {
    calculateKIN,
    isLeapYear,
    getSeal,
    getTone,
    getFullName,
    getColor,
    getSealImagePath,
    getToneSymbol,
    getWavespell,
    getPositionInWavespell,
    drawRandomKIN,
    calculateSynthesis,
    generateCardHTML,
    data: {
      SOLAR_SEALS,
      GALACTIC_TONES,
      YEAR_CONSTANTS,
      MONTH_CONSTANTS
    }
  };
  
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TEMPLE_BRAIN;
}