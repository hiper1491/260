/**
 * 13月亮曆 Kin 計算器
 * 基於官方講義數據
 */

// 月份常數對照表
const monthConstants = {
  1: 0,    // 一月
  2: 31,   // 二月
  3: 59,   // 三月
  4: 90,   // 四月
  5: 120,  // 五月
  6: 151,  // 六月
  7: 181,  // 七月
  8: 212,  // 八月
  9: 243,  // 九月
  10: 13,  // 十月
  11: 44,  // 十一月
  12: 74   // 十二月
};

// 年份常數對照表
const yearConstants = {
  2014: 62,
  2015: 167,
  2016: 12,
  2017: 117,
  2018: 222,
  2019: 67,
  2020: 172,
  2021: 17,
  2022: 122,
  2023: 227,
  2024: 72,
  2025: 177,
  2026: 22,
  2027: 127,
  2028: 232,
  2029: 77,
  2030: 182
};

// 圖騰名稱對照表（1-20 循環）
const sealNames = [
  "紅龍", "白風", "藍夜", "黃種子", "紅蛇",
  "白世界橋", "藍手", "黃星星", "紅月", "白狗",
  "藍猴", "黃人", "紅天行者", "白巫師", "藍鷹",
  "黃戰士", "紅地球", "白鏡", "藍風暴", "黃太陽"
];

// 調性名稱對照表（1-13 循環）
const toneNames = [
  "磁性的", "月亮的", "電力的", "自我存在的", "超頻的",
  "韻律的", "共振的", "銀河星系的", "太陽的", "行星的",
  "光譜的", "水晶的", "宇宙的"
];

/**
 * 判斷是否為閏年
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 計算 Kin 數字
 * @param {number} year - 年份
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期
 * @returns {Object} - { kin, seal, tone, isHunabKu }
 */
function calculateKin(year, month, day) {
  // 特殊處理：2月29日顯示 Hunab Ku
  if (month === 2 && day === 29) {
    return {
      kin: null,
      seal: null,
      tone: null,
      isHunabKu: true,
      displayText: "Hunab Ku"
    };
  }

  // 檢查年份常數是否存在
  if (!yearConstants[year]) {
    throw new Error(`年份 ${year} 的常數尚未定義`);
  }

  // 基本計算：Kin = 年份常數 + 月份常數 + 日期
  let kin = yearConstants[year] + monthConstants[month] + day;

  // 閏年特殊規則：3月1日之後需要 +1
  if (isLeapYear(year) && (month > 2 || (month === 2 && day > 28))) {
    kin += 1;
  }

  // 將 Kin 限制在 1-260 範圍內
  while (kin > 260) {
    kin -= 260;
  }
  while (kin < 1) {
    kin += 260;
  }

  // 計算圖騰（1-20 循環）
  const sealIndex = ((kin - 1) % 20);
  const seal = sealNames[sealIndex];

  // 計算調性（1-13 循環）
  const toneIndex = ((kin - 1) % 13);
  const tone = toneNames[toneIndex];
  
  // 圖騰編號：1-20（對應圖片檔名）
  const sealNumber = sealIndex + 1;

  return {
    kin: kin,
    seal: seal,
    tone: tone,
    sealNumber: sealNumber,
    isHunabKu: false,
    displayText: `${tone}${seal}`
  };
}

// 測試今天的日期：2026/01/06
const testDate = {
  year: 2026,
  month: 1,
  day: 6
};

console.log("=== 測試計算 ===");
console.log(`日期: ${testDate.year}/${testDate.month}/${testDate.day}`);

const result = calculateKin(testDate.year, testDate.month, testDate.day);
console.log(`計算過程:`);
console.log(`  年份常數: ${yearConstants[testDate.year]}`);
console.log(`  月份常數: ${monthConstants[testDate.month]}`);
console.log(`  日期: ${testDate.day}`);
console.log(`  總和: ${yearConstants[testDate.year] + monthConstants[testDate.month] + testDate.day}`);
console.log(`結果:`);
console.log(`  KIN: ${result.kin}`);
console.log(`  圖騰編號: ${result.sealNumber}`);
console.log(`  圖騰: ${result.seal}`);
console.log(`  調性: ${result.tone}`);
console.log(`  完整名稱: ${result.displayText}`);
console.log(`  圖片檔名: ${String(result.sealNumber).padStart(2, '0')}.png`);

// 測試 2 月 29 日
console.log("\n=== 測試閏年 2/29 ===");
const leapDayResult = calculateKin(2024, 2, 29);
console.log(`結果: ${leapDayResult.displayText}`);
console.log(`是否為 Hunab Ku: ${leapDayResult.isHunabKu}`);

// 導出函數供前端使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateKin,
    isLeapYear,
    monthConstants,
    yearConstants,
    sealNames,
    toneNames
  };
}
