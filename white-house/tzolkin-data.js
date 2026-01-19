// 卓爾金曆核心數據
const TZOLKIN_DATA = {
  // 20 個圖騰
  seals: [
    { id: 1, name: "紅龍", color: "red", tribe: "fire" },
    { id: 2, name: "白風", color: "white", tribe: "fire" },
    { id: 3, name: "藍夜", color: "blue", tribe: "fire" },
    { id: 4, name: "黃種子", color: "yellow", tribe: "fire" },
    { id: 5, name: "紅蛇", color: "red", tribe: "blood" },
    { id: 6, name: "白世界橋", color: "white", tribe: "blood" },
    { id: 7, name: "藍手", color: "blue", tribe: "blood" },
    { id: 8, name: "黃星星", color: "yellow", tribe: "blood" },
    { id: 9, name: "紅月", color: "red", tribe: "blood" },
    { id: 10, name: "白狗", color: "white", tribe: "truth" },
    { id: 11, name: "藍猴", color: "blue", tribe: "truth" },
    { id: 12, name: "黃人", color: "yellow", tribe: "truth" },
    { id: 13, name: "紅天行者", color: "red", tribe: "truth" },
    { id: 14, name: "白巫師", color: "white", tribe: "truth" },
    { id: 15, name: "藍鷹", color: "blue", tribe: "sky" },
    { id: 16, name: "黃戰士", color: "yellow", tribe: "sky" },
    { id: 17, name: "紅地球", color: "red", tribe: "sky" },
    { id: 18, name: "白鏡", color: "white", tribe: "sky" },
    { id: 19, name: "藍風暴", color: "blue", tribe: "sky" },
    { id: 20, name: "黃太陽", color: "yellow", tribe: "fire" }
  ],

  // 13 個調性
  tones: [
    { id: 1, name: "磁性", joint: "右腳踝" },
    { id: 2, name: "月亮", joint: "右膝蓋" },
    { id: 3, name: "電力", joint: "右髖關節" },
    { id: 4, name: "自我存在", joint: "右手腕" },
    { id: 5, name: "超頻", joint: "右手肘" },
    { id: 6, name: "韻律", joint: "右肩膀" },
    { id: 7, name: "共振", joint: "頸部/脊柱" },
    { id: 8, name: "銀河", joint: "左肩膀" },
    { id: 9, name: "太陽", joint: "左手肘" },
    { id: 10, name: "行星", joint: "左手腕" },
    { id: 11, name: "光譜", joint: "左髖關節" },
    { id: 12, name: "水晶", joint: "左膝蓋" },
    { id: 13, name: "宇宙", joint: "左腳踝" }
  ],

  // GAP 日（52天）
  gapDays: [1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77, 85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 165, 168, 173, 176, 184, 189, 192, 197, 203, 210, 211, 218, 222, 239, 241, 260],

  // 20 個波符
  wavespells: [
    "紅龍波", "白巫師波", "藍手波", "黃太陽波", "紅天行者波",
    "白世界橋波", "藍風暴波", "黃人波", "紅蛇波", "白鏡波",
    "藍猴波", "黃種子波", "紅地球波", "白狗波", "藍夜波",
    "黃戰士波", "紅月波", "白風波", "藍鷹波", "黃星星波"
  ],

  // 手指腳趾對應
  fingerToe: {
    fire: ["右手拇指", "右手食指", "右手中指", "右手無名指", "右手小指"],
    blood: ["右腳大拇趾", "右腳第二趾", "右腳中趾", "右腳第四趾", "右腳小趾"],
    truth: ["左手拇指", "左手食指", "左手中指", "左手無名指", "左手小指"],
    sky: ["左腳大拇趾", "左腳第二趾", "左腳中趾", "左腳第四趾", "左腳小趾"]
  }
};

// 計算函數
function getKinInfo(kin) {
  const sealIndex = (kin - 1) % 20;
  const toneIndex = (kin - 1) % 13;
  const wavespellIndex = Math.floor((kin - 1) / 13);
  const isGap = TZOLKIN_DATA.gapDays.includes(kin);

  const seal = TZOLKIN_DATA.seals[sealIndex];
  const tone = TZOLKIN_DATA.tones[toneIndex];
  const wavespell = TZOLKIN_DATA.wavespells[wavespellIndex];

  // 手指腳趾
  const tribeSeals = TZOLKIN_DATA.seals.filter(s => s.tribe === seal.tribe);
  const sealIndexInTribe = tribeSeals.findIndex(s => s.id === seal.id);
  const fingerToe = TZOLKIN_DATA.fingerToe[seal.tribe][sealIndexInTribe];

  return {
    kin,
    seal,
    tone,
    wavespell,
    isGap,
    fullName: `${tone.name}的${seal.name}`,
    joint: tone.joint,
    fingerToe
  };
}

// 繪製調性符號
function renderToneSymbol(toneId) {
  const bars = Math.floor(toneId / 5);
  const dots = toneId % 5;
  
  let html = '<div class="tone-marks">';
  
  // 點在上
  if (dots > 0) {
    html += '<div class="tone-dots">';
    for (let i = 0; i < dots; i++) {
      html += '<div class="tone-dot"></div>';
    }
    html += '</div>';
  }
  
  // 槓在下
  if (bars > 0) {
    html += '<div class="tone-bars">';
    for (let i = 0; i < bars; i++) {
      html += '<div class="tone-bar"></div>';
    }
    html += '</div>';
  }
  
  html += '</div>';
  return html;
}
