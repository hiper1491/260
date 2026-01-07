import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { KIN_DATA } from './kinData';

// ========== KIN 訊息資料庫 ==========
/**
 * 取得 KIN 訊息
 * @param {number} kinNumber - KIN 編號（1-260）
 * @returns {Object} 包含 synchronicMessage, highFrequency, lowFrequency, alignment
 */
const getKinMessage = (kinNumber) => {
  // 確保 kinNumber 為有效數字
  const kinNum = Number(kinNumber);
  
  // 邊界檢查：確保在 1-260 範圍內
  if (isNaN(kinNum) || kinNum < 1 || kinNum > 260) {
    return {
      synchronicMessage: "能量讀取中...",
      highFrequency: "能量讀取中...",
      lowFrequency: "能量讀取中...",
      alignment: "能量讀取中..."
    };
  }
  
  // 從 KIN_DATA 物件中獲取對應的資料
  const message = KIN_DATA[kinNum];
  
  // 如果資料存在，直接返回
  if (message) {
    return message;
  }
  
  // 資料缺失時的預設文字（Fallback）
  return {
    synchronicMessage: "能量讀取中...",
    highFrequency: "能量讀取中...",
    lowFrequency: "能量讀取中...",
    alignment: "能量讀取中..."
  };
};

// ========== KIN 計算引擎數據庫 ==========

// 調性名稱資料庫（1-13）
const TONE_NAMES = [
  { id: 1, name: '磁性' },
  { id: 2, name: '月亮' },
  { id: 3, name: '電力' },
  { id: 4, name: '自我存在' },
  { id: 5, name: '超頻' },
  { id: 6, name: '韻律' },
  { id: 7, name: '共鳴' },
  { id: 8, name: '銀河' },
  { id: 9, name: '太陽' },
  { id: 10, name: '行星' },
  { id: 11, name: '光譜' },
  { id: 12, name: '水晶' },
  { id: 13, name: '宇宙' },
];

// 圖騰名稱資料庫（1-20，線性序列）
const GLYPH_NAMES = [
  { id: 1, name: '紅龍', imagePath: '../images/01.png', color: 'red' },
  { id: 2, name: '白風', imagePath: '../images/02.png', color: 'white' },
  { id: 3, name: '藍夜', imagePath: '../images/03.png', color: 'blue' },
  { id: 4, name: '黃種子', imagePath: '../images/04.png', color: 'yellow' },
  { id: 5, name: '紅蛇', imagePath: '../images/05.png', color: 'red' },
  { id: 6, name: '白世界橋', imagePath: '../images/06.png', color: 'white' },
  { id: 7, name: '藍手', imagePath: '../images/07.png', color: 'blue' },
  { id: 8, name: '黃星星', imagePath: '../images/08.png', color: 'yellow' },
  { id: 9, name: '紅月', imagePath: '../images/09.png', color: 'red' },
  { id: 10, name: '白狗', imagePath: '../images/10.png', color: 'white' },
  { id: 11, name: '藍猴', imagePath: '../images/11.png', color: 'blue' },
  { id: 12, name: '黃人', imagePath: '../images/12.png', color: 'yellow' },
  { id: 13, name: '紅天行者', imagePath: '../images/13.png', color: 'red' },
  { id: 14, name: '白巫師', imagePath: '../images/14.png', color: 'white' },
  { id: 15, name: '藍鷹', imagePath: '../images/15.png', color: 'blue' },
  { id: 16, name: '黃戰士', imagePath: '../images/16.png', color: 'yellow' },
  { id: 17, name: '紅地球', imagePath: '../images/17.png', color: 'red' },
  { id: 18, name: '白鏡', imagePath: '../images/18.png', color: 'white' },
  { id: 19, name: '藍風暴', imagePath: '../images/19.png', color: 'blue' },
  { id: 20, name: '黃太陽', imagePath: '../images/20.png', color: 'yellow' },
];

// ========== KIN 計算引擎 ==========
/**
 * 根據 KIN 數字（1-260）計算對應的調性與圖騰
 * @param {number} kinNumber - KIN 編號（1-260）
 * @returns {Object} { kinNumber, toneId, toneName, glyphId, glyphName, glyphData, fullName, messages }
 */
const getKinData = (kinNumber) => {
  // 調性計算 (Tone)：((kinNumber - 1) % 13) + 1
  const toneId = ((kinNumber - 1) % 13) + 1;
  const toneName = TONE_NAMES[toneId - 1].name;
  
  // 圖騰計算 (Glyph)：((kinNumber - 1) % 20) + 1
  const glyphId = ((kinNumber - 1) % 20) + 1;
  const glyphData = GLYPH_NAMES[glyphId - 1];
  
  // 取得 KIN 訊息
  const messages = getKinMessage(kinNumber);
  
  return {
    kinNumber,
    toneId,
    toneName,
    glyphId,
    glyphName: glyphData.name,
    glyphData,
    fullName: `${toneName}的${glyphData.name}`,
    messages,
  };
};

// ========== 視覺組件 ==========

// 迷你版調性視覺組件（用於歷史紀錄）
const MiniToneDisplay = ({ tone, color = 'red', isSelected = false }) => {
  // 計算點與橫條（標準馬雅計數法）
  const dots = tone % 5;
  const bars = Math.floor(tone / 5);
  
  // 根據顏色屬性設定對應的 Tailwind 類別
  const colorMap = {
    red: isSelected ? 'bg-white' : 'bg-[#A5413F]',
    white: isSelected ? 'bg-white' : 'bg-[#666666]',
    blue: isSelected ? 'bg-white' : 'bg-[#3D5A73]',
    yellow: isSelected ? 'bg-white' : 'bg-[#8C7326]',
  };
  
  const dotBarColor = colorMap[color] || colorMap.red;
  
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* 點 (Dots) - 在上方橫向排列 */}
      {dots > 0 && (
        <div className="flex gap-1">
          {[...Array(dots)].map((_, i) => (
            <div 
              key={`mini-dot-${i}`} 
              className={`w-1.5 h-1.5 rounded-full ${dotBarColor}`}
            />
          ))}
        </div>
      )}
      
      {/* 橫條 (Bars) - 在下方垂直堆疊 */}
      {bars > 0 && (
        <div className="flex flex-col gap-1">
          {[...Array(bars)].map((_, i) => (
            <div 
              key={`mini-bar-${i}`} 
              className={`w-10 h-1 rounded-full ${dotBarColor}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 調性視覺組件 - 馬雅數字系統
const ToneDisplay = ({ tone, isSpinning, color = 'red' }) => {
  // 計算點與橫條（標準馬雅計數法）
  const dots = tone % 5;
  const bars = Math.floor(tone / 5);
  
  // 根據顏色屬性設定對應的 Tailwind 類別
  const colorMap = {
    red: 'bg-[#A5413F]',
    white: 'bg-[#666666]',
    blue: 'bg-[#3D5A73]',
    yellow: 'bg-[#8C7326]',
  };
  
  const dotBarColor = colorMap[color] || colorMap.red;
  
  return (
    <div className={`flex flex-col items-center justify-center gap-6 transition-all duration-300 ${isSpinning ? 'blur-sm scale-95' : 'blur-0 scale-100'}`}>
      {/* 馬雅數字視覺區 - 只顯示點與橫條 */}
      <div className="flex flex-col items-center gap-4">
        {/* 點 (Dots) - 在上方橫向排列 */}
        {dots > 0 && (
          <div className="flex gap-3">
            {[...Array(dots)].map((_, i) => (
              <div 
                key={`dot-${i}`} 
                className={`w-4 h-4 rounded-full ${dotBarColor}`}
              />
            ))}
          </div>
        )}
        
        {/* 橫條 (Bars) - 在下方垂直堆疊 */}
        {bars > 0 && (
          <div className="flex flex-col gap-3">
            {[...Array(bars)].map((_, i) => (
              <div 
                key={`bar-${i}`} 
                className={`w-24 h-2.5 rounded-full ${dotBarColor}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 圖騰視覺組件
const GlyphDisplay = ({ glyph, isSpinning }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 transition-all duration-300 ${isSpinning ? 'blur-sm scale-95' : 'blur-0 scale-100'}`}>
      <div className="w-48 h-48 flex items-center justify-center">
        <img 
          src={glyph.imagePath} 
          alt={glyph.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-2xl font-semibold text-[#A5413F]">
        {glyph.name}
      </div>
    </div>
  );
};

// 主組件
const RedRoom = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentKinNumber, setCurrentKinNumber] = useState(1);
  const [currentKinData, setCurrentKinData] = useState(getKinData(1));
  const [history, setHistory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [reviewMode, setReviewMode] = useState(null);
  const intervalRef = useRef(null);

  // 雙軌瘋狂跳動邏輯
  const startSpinning = () => {
    if (isSpinning) {
      clearInterval(intervalRef.current);
      setIsSpinning(false);
      
      const newRecord = {
        id: Date.now(),
        kinNumber: currentKinNumber,
        timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [newRecord, ...prev].slice(0, 5));
      
      setReviewMode(null);
    } else {
      setIsSpinning(true);
      setReviewMode(null);
      intervalRef.current = setInterval(() => {
        const randomKin = Math.floor(Math.random() * 260) + 1;
        setCurrentKinNumber(randomKin);
        setCurrentKinData(getKinData(randomKin));
      }, 80);
    }
  };

  // 歷史紀錄回看功能
  const handleReviewRecord = (record) => {
    if (isSpinning) {
      clearInterval(intervalRef.current);
      setIsSpinning(false);
    }
    
    const freshKinData = getKinData(record.kinNumber);
    
    setCurrentKinNumber(record.kinNumber);
    setCurrentKinData(freshKinData);
    setReviewMode(record);
    
    setIsDrawerOpen(false);
  };

  // 清理定時器
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F2E8E8] relative overflow-hidden">
      {/* 手機版抽屜按鈕 */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#A5413F] text-white p-3 rounded-full shadow-lg hover:bg-[#8a3533] transition-colors"
      >
        {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 左側歷史紀錄牆 - 桌面版 */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white/50 backdrop-blur-sm border-r border-[#A5413F]/20 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#A5413F] mb-6">共時紀錄</h2>
        <div className="space-y-4">
          {history.map((record) => {
            const isSelected = reviewMode?.id === record.id;
            const kinData = getKinData(record.kinNumber);
            
            return (
              <div 
                key={record.id} 
                onClick={() => handleReviewRecord(record)}
                className={`rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#A5413F] text-white shadow-2xl scale-105 ring-2 ring-[#A5413F]/50' 
                    : 'bg-[#E6E1D6] hover:shadow-xl hover:scale-102 shadow-md'
                }`}
              >
                {/* 上層：圖騰與調性 */}
                <div className="flex items-center justify-between mb-3">
                  <img 
                    src={kinData.glyphData.imagePath} 
                    alt={kinData.glyphName}
                    className="w-14 h-14 object-contain"
                  />
                  {/* 迷你版馬雅調性符號 */}
                  <MiniToneDisplay 
                    tone={kinData.toneId} 
                    color={kinData.glyphData.color}
                    isSelected={isSelected}
                  />
                </div>
                
                {/* 中層：KIN 資訊 */}
                <div className={`text-center mb-3 pb-3 border-b ${isSelected ? 'border-white/30' : 'border-[#A5413F]/20'}`}>
                  <div className={`text-sm font-serif font-bold mb-1 tracking-wide ${isSelected ? 'text-white' : 'text-[#A5413F]/80'}`}>
                    KIN {record.kinNumber}
                  </div>
                  <div className={`text-xs font-serif italic ${isSelected ? 'text-white/90' : 'text-gray-700'}`}>
                    {kinData.fullName}
                  </div>
                </div>
                
                {/* 下層：共時訊息預覽 */}
                <div className={`text-xs italic line-clamp-2 ${isSelected ? 'text-white/95' : 'text-[#A5413F]'}`}>
                  "{kinData.messages.synchronicMessage}"
                </div>
                
                {/* 時間戳記 */}
                <div className={`text-xs mt-3 text-center ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                  {record.timestamp}
                </div>
              </div>
            );
          })}

          {history.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              尚無紀錄
            </div>
          )}
        </div>
      </div>

      {/* 手機版抽屜 */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen w-80 bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <h2 className="text-2xl font-bold text-[#A5413F] mb-6">共時紀錄</h2>
          <div className="space-y-4">
            {history.map((record) => {
              const isSelected = reviewMode?.id === record.id;
              const kinData = getKinData(record.kinNumber);
              
              return (
                <div 
                  key={record.id} 
                  onClick={() => handleReviewRecord(record)}
                  className={`rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#A5413F] text-white shadow-2xl scale-105 ring-2 ring-[#A5413F]/50' 
                      : 'bg-[#E6E1D6] hover:shadow-xl hover:scale-102 shadow-md'
                  }`}
                >
                  {/* 上層：圖騰與調性 */}
                  <div className="flex items-center justify-between mb-3">
                    <img 
                      src={kinData.glyphData.imagePath} 
                      alt={kinData.glyphName}
                      className="w-14 h-14 object-contain"
                    />
                    {/* 迷你版馬雅調性符號 */}
                    <MiniToneDisplay 
                      tone={kinData.toneId} 
                      color={kinData.glyphData.color}
                      isSelected={isSelected}
                    />
                  </div>
                  
                  {/* 中層：KIN 資訊 */}
                  <div className={`text-center mb-3 pb-3 border-b ${isSelected ? 'border-white/30' : 'border-[#A5413F]/20'}`}>
                    <div className={`text-sm font-serif font-bold mb-1 tracking-wide ${isSelected ? 'text-white' : 'text-[#A5413F]/80'}`}>
                      KIN {record.kinNumber}
                    </div>
                    <div className={`text-xs font-serif italic ${isSelected ? 'text-white/90' : 'text-gray-700'}`}>
                      {kinData.fullName}
                    </div>
                  </div>
                  
                  {/* 下層：共時訊息預覽 */}
                  <div className={`text-xs italic line-clamp-2 ${isSelected ? 'text-white/95' : 'text-[#A5413F]'}`}>
                    "{kinData.messages.synchronicMessage}"
                  </div>
                  
                  {/* 時間戳記 */}
                  <div className={`text-xs mt-3 text-center ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                    {record.timestamp}
                  </div>
                </div>
              );
            })}

            {history.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                尚無紀錄
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="lg:ml-64 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* 標題區 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-[#A5413F] mb-4">紅色房間</h1>
            <p className="text-xl text-[#A5413F]/70">Quick Sync · 快速共時</p>
          </div>

          {/* 數位神諭卡 - 固定高度 780px */}
          <div
            onClick={startSpinning}
            className="bg-[#E6E1D6] rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
            style={{ height: '780px', minHeight: '780px', maxHeight: '780px' }}
          >
            {/* 回看模式提示 */}
            {reviewMode && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-[#A5413F] text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm">
                  <span className="text-xs">📖</span>
                  <span>回看紀錄：{reviewMode.timestamp}</span>
                </div>
              </div>
            )}

            <div className="h-full flex flex-col items-center justify-center p-8">
              {/* 提示文字 */}
              <div className="mb-12 text-center">
                <p className="text-lg text-[#A5413F]/60">
                  {reviewMode 
                    ? '點擊以開始新的共時' 
                    : isSpinning 
                      ? '再次點擊以停止' 
                      : '點擊任意處開始共時'
                  }
                </p>
              </div>

              {/* 雙軌同步跳動區 */}
              <div className="flex items-center justify-center gap-16 flex-1">
                {/* 左軌：調性 */}
                <div className="flex-1 flex justify-center">
                  <ToneDisplay 
                    tone={currentKinData.toneId} 
                    isSpinning={isSpinning}
                    color={currentKinData.glyphData.color}
                  />
                </div>

                {/* 分隔線 */}
                <div className="w-px h-64 bg-[#A5413F]/20" />

                {/* 右軌：圖騰 */}
                <div className="flex-1 flex justify-center">
                  <GlyphDisplay glyph={currentKinData.glyphData} isSpinning={isSpinning} />
                </div>
              </div>

              {/* 底部狀態指示 */}
              <div className="mt-12">
                {isSpinning ? (
                  <div className="flex items-center gap-2 text-[#A5413F]">
                    <div className="w-2 h-2 bg-[#A5413F] rounded-full animate-pulse" />
                    <span className="text-sm">共時中...</span>
                  </div>
                ) : (
                  <div className="text-center space-y-6 px-8 max-w-2xl mx-auto">
                    {/* KIN 編號與名稱 */}
                    <div className="border-b border-[#A5413F]/20 pb-4">
                      <p className="text-3xl font-serif font-bold text-[#A5413F]/80 mb-2 tracking-wide">
                        KIN {currentKinNumber}
                      </p>
                      <p className="text-xl text-[#A5413F]/70 font-serif italic">
                        {currentKinData.fullName}
                      </p>
                    </div>
                    
                    {/* 解讀文字區 */}
                    <div className="space-y-5 text-left">
                      {/* 共時訊息 */}
                      <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                        <p className="text-2xl font-serif leading-relaxed text-[#A5413F] italic">
                          "{currentKinData.messages.synchronicMessage}"
                        </p>
                      </div>
                      
                      {/* 其他訊息 */}
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        {/* 正向能量 */}
                        <div className="bg-white/30 rounded-lg p-4">
                          <p className="font-semibold text-[#A5413F] mb-2">✦ 高頻狀態</p>
                          <p className="text-gray-700 leading-relaxed">
                            {currentKinData.messages.highFrequency}
                          </p>
                        </div>
                        
                        {/* 低頻狀態 */}
                        <div className="bg-white/30 rounded-lg p-4">
                          <p className="font-semibold text-[#A5413F] mb-2">✧ 低頻狀態</p>
                          <p className="text-gray-700 leading-relaxed">
                            {currentKinData.messages.lowFrequency}
                          </p>
                        </div>
                        
                        {/* 調頻建議 */}
                        <div className="bg-white/30 rounded-lg p-4">
                          <p className="font-semibold text-[#A5413F] mb-2">⟡ 調頻建議</p>
                          <p className="text-gray-700 leading-relaxed">
                            {currentKinData.messages.alignment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 操作說明 */}
          <div className="mt-6 text-center text-[#A5413F]/60 text-sm">
            <p>當前 KIN {currentKinNumber} · {currentKinData.toneName}的{currentKinData.glyphName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedRoom;