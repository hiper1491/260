import React, { useState, useEffect } from 'react';

/**
 * 13月亮曆封面組件
 * 根據官方講義數據計算並顯示當日 Kin 印記
 */

// ==================== 數據常數 ====================

// 月份常數對照表
const MONTH_CONSTANTS = {
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
const YEAR_CONSTANTS = {
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
  2030: 182,
  2031: 27,
  2032: 132,
  2033: 237,
  2034: 82,
  2035: 187
};

// 圖騰名稱對照表（1-20 循環）
const SEAL_NAMES = [
  "紅龍", "白風", "藍夜", "黃種子", "紅蛇",
  "白世界橋", "藍手", "黃星星", "紅月", "白狗",
  "藍猴", "黃人", "紅天行者", "白巫師", "藍鷹",
  "黃戰士", "紅地球", "白鏡", "藍風暴", "黃太陽"
];

// 調性名稱對照表（1-13 循環）
const TONE_NAMES = [
  "磁性的", "月亮的", "電力的", "自我存在的", "超頻的",
  "韻律的", "共振的", "銀河星系的", "太陽的", "行星的",
  "光譜的", "水晶的", "宇宙的"
];

// ==================== 計算函數 ====================

/**
 * 判斷是否為閏年
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 計算 Kin 數字和對應的圖騰、調性
 * @param {number} year - 年份
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期
 * @returns {Object} - { kin, seal, tone, isHunabKu, displayText, sealImagePath }
 */
function calculateKin(year, month, day) {
  // 特殊處理：2月29日顯示 Hunab Ku
  if (month === 2 && day === 29) {
    return {
      kin: null,
      seal: null,
      tone: null,
      isHunabKu: true,
      displayText: "Hunab Ku",
      sealImagePath: "./images/hunab-ku-1.png"
    };
  }

  // 檢查年份常數是否存在
  if (!YEAR_CONSTANTS[year]) {
    console.warn(`年份 ${year} 的常數尚未定義，請更新 YEAR_CONSTANTS`);
    return {
      kin: null,
      seal: null,
      tone: null,
      isHunabKu: false,
      displayText: "年份數據未定義",
      sealImagePath: null
    };
  }

  // 基本計算：Kin = 年份常數 + 月份常數 + 日期
  let kin = YEAR_CONSTANTS[year] + MONTH_CONSTANTS[month] + day;

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
  const seal = SEAL_NAMES[sealIndex];

  // 計算調性（1-13 循環）
  const toneIndex = ((kin - 1) % 13);
  const tone = TONE_NAMES[toneIndex];
  
  // 圖騰編號：1-20（對應圖片檔名）
  const sealNumber = sealIndex + 1;

  return {
    kin: kin,
    seal: seal,
    tone: tone,
    sealNumber: sealNumber,
    isHunabKu: false,
    displayText: `${tone}${seal}`,
    sealImagePath: `./images/${String(sealNumber).padStart(2, '0')}.png`
  };
}

// ==================== React 組件 ====================

const Cover = () => {
  const [kinData, setKinData] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    // 獲取當前日期
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScript 月份從 0 開始
    const day = now.getDate();

    setCurrentDate({
      year,
      month,
      day,
      formatted: `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
    });

    // 計算 Kin
    const result = calculateKin(year, month, day);
    setKinData(result);

    // 控制台輸出計算過程（開發用）
    console.log('=== Kin 計算 ===');
    console.log(`日期: ${year}/${month}/${day}`);
    if (!result.isHunabKu) {
      console.log(`年份常數: ${YEAR_CONSTANTS[year]}`);
      console.log(`月份常數: ${MONTH_CONSTANTS[month]}`);
      console.log(`日期: ${day}`);
      console.log(`KIN: ${result.kin}`);
      console.log(`完整名稱: ${result.displayText}`);
    } else {
      console.log('今日為 2/29，顯示 Hunab Ku');
    }
  }, []);

  if (!kinData || !currentDate) {
    return (
      <div className="cover-loading">
        <p>計算中...</p>
      </div>
    );
  }

  return (
    <div className="cover-container">
      {/* 背景裝飾 */}
      <div className="cover-background"></div>

      {/* 主要內容 */}
      <div className="cover-content">
        {/* Hunab Ku 圖騰 */}
        <div className="hunab-ku-section">
          <img 
            src="./images/hunab-ku-1.png" 
            alt="Hunab Ku" 
            className="hunab-ku-icon"
          />
        </div>

        {/* 標題 */}
        <header className="cover-header">
          <h1 className="cover-title">13月亮曆的小共時</h1>
          <p className="cover-subtitle">DREAMSPELL SYNCHRONICITY</p>
        </header>

        {/* 今日能量卡片 */}
        <section className="daily-kin-card">
          <div className="kin-label">今日能量</div>
          
          {kinData.isHunabKu ? (
            // Hunab Ku 特殊顯示
            <div className="kin-hunab-ku">
              <img 
                src={kinData.sealImagePath} 
                alt="Hunab Ku" 
                className="kin-seal-image"
              />
              <h2 className="kin-name">{kinData.displayText}</h2>
            </div>
          ) : (
            // 一般 Kin 顯示
            <>
              <div className="kin-seal-container">
                <img 
                  src={kinData.sealImagePath} 
                  alt={`KIN ${kinData.kin} ${kinData.seal}`}
                  className="kin-seal-image"
                  onError={(e) => {
                    console.warn(`圖片載入失敗: ${kinData.sealImagePath}`);
                    e.target.src = './images/hunab-ku-1.png'; // 備用圖片
                  }}
                />
              </div>
              <h2 className="kin-name">{kinData.displayText}</h2>
              <p className="kin-number">KIN {kinData.kin}</p>
            </>
          )}
          
          <p className="kin-date">{currentDate.formatted}</p>
        </section>

        {/* 進入按鈕 */}
        <div className="cover-action">
          <a href="./index.html" className="enter-button">
            進入神廟
          </a>
        </div>

        {/* Footer */}
        <footer className="cover-footer">
          <p>設計 | <span className="kin-badge">KIN 74 太陽的白巫師</span> HIPER</p>
          <div className="social-links">
            <a href="https://www.facebook.com/hiper.wu" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/hiper.wu" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;600;700;900&display=swap');

        .cover-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #E8E4DF;
          font-family: 'Noto Serif TC', serif;
          position: relative;
          overflow: hidden;
        }

        .cover-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }

        .cover-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          padding: 60px 32px;
          max-width: 600px;
          width: 100%;
        }

        .hunab-ku-section {
          width: 140px;
          height: 140px;
        }

        .hunab-ku-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
        }

        .cover-header {
          text-align: center;
        }

        .cover-title {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #2d2a26;
          margin-bottom: 16px;
          line-height: 1.3;
          text-shadow:
            1px 1px 1px rgba(255, 255, 255, 0.4),
            -1px -1px 1px rgba(0, 0, 0, 0.15);
        }

        .cover-subtitle {
          font-size: 16px;
          font-weight: 600;
          color: #6a655c;
          letter-spacing: 0.3em;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
        }

        .daily-kin-card {
          background: #D5D0C8;
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          border: 3px solid #c5c0b8;
          box-shadow:
            inset 0 2px 4px rgba(255, 255, 255, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.08),
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .kin-label {
          font-size: 13px;
          font-weight: 600;
          color: #6a655c;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .kin-seal-container {
          width: 120px;
          height: 120px;
        }

        .kin-seal-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }

        .kin-hunab-ku {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .kin-name {
          font-size: 32px;
          font-weight: 900;
          color: #2d2a26;
          letter-spacing: 0.08em;
          text-align: center;
          text-shadow:
            1px 1px 1px rgba(255, 255, 255, 0.3),
            -1px -1px 1px rgba(0, 0, 0, 0.12);
        }

        .kin-number {
          font-size: 18px;
          font-weight: 700;
          color: #5a5650;
          letter-spacing: 0.1em;
        }

        .kin-date {
          font-size: 14px;
          font-weight: 500;
          color: #7a756c;
          letter-spacing: 0.05em;
        }

        .cover-action {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .enter-button {
          display: inline-block;
          padding: 18px 48px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #f5f0eb;
          background: linear-gradient(135deg, #A84840 0%, #8a3a34 100%);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.2);
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        }

        .enter-button:hover {
          background: linear-gradient(135deg, #8a3a34 0%, #6a2a24 100%);
          transform: translateY(-2px);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.2),
            0 6px 18px rgba(0, 0, 0, 0.3);
        }

        .cover-footer {
          text-align: center;
          font-size: 13px;
          color: #7a756c;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kin-badge {
          font-weight: 700;
          color: #5a5650;
        }

        .social-links {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .social-links a {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #c8c0b5;
          border-radius: 50%;
          color: #5a5650;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .social-links a:hover {
          background: #a89040;
          color: #f8f6f2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
        }

        .cover-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-size: 18px;
          color: #6a655c;
        }

        /* 響應式設計 */
        @media (max-width: 600px) {
          .cover-content {
            padding: 40px 24px;
            gap: 32px;
          }

          .cover-title {
            font-size: 36px;
          }

          .cover-subtitle {
            font-size: 14px;
          }

          .hunab-ku-section {
            width: 110px;
            height: 110px;
          }

          .daily-kin-card {
            padding: 32px 24px;
          }

          .kin-name {
            font-size: 26px;
          }

          .enter-button {
            padding: 16px 40px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cover;
