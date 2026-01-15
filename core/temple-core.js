// temple-core.js
// ✅ 白屋/藍屋/黃屋通用：13調性 + 20圖騰 + 圖檔路徑規則（01～20.png）

(() => {
  const GALACTIC_TONES = [
    "磁性","月亮","電力","自我存在","超頻",
    "韻律","共振","銀河","太陽","行星",
    "光譜","水晶","宇宙"
  ];

  const SOLAR_SEALS = [
    { id: 1,  name: "紅龍",   color: "red"    },
    { id: 2,  name: "白風",   color: "white"  },
    { id: 3,  name: "藍夜",   color: "blue"   },
    { id: 4,  name: "黃種子", color: "yellow" },
    { id: 5,  name: "紅蛇",   color: "red"    },
    { id: 6,  name: "白世界橋", color: "white" },
    { id: 7,  name: "藍手",   color: "blue"   },
    { id: 8,  name: "黃星星", color: "yellow" },
    { id: 9,  name: "紅月",   color: "red"    },
    { id:10,  name: "白狗",   color: "white"  },
    { id:11,  name: "藍猴",   color: "blue"   },
    { id:12,  name: "黃人",   color: "yellow" },
    { id:13,  name: "紅天行者", color: "red"   },
    { id:14,  name: "白巫師", color: "white"  },
    { id:15,  name: "藍鷹",   color: "blue"   },
    { id:16,  name: "黃戰士", color: "yellow" },
    { id:17,  name: "紅地球", color: "red"    },
    { id:18,  name: "白鏡",   color: "white"  },
    { id:19,  name: "藍風暴", color: "blue"   },
    { id:20,  name: "黃太陽", color: "yellow" }
  ];

  // ✅ 你已確認：01～20 對應 1～20 圖騰
  function sealIdToImagePath(sealId, basePath = "../images") {
    const n = String(sealId).padStart(2, "0");
    return `${basePath}/${n}.png`;
  }

  function getSeal(sealId) {
    return SOLAR_SEALS[sealId - 1];
  }

  function getToneName(toneId) {
    return GALACTIC_TONES[toneId - 1];
  }

  window.TEMPLE_CORE = {
    GALACTIC_TONES,
    SOLAR_SEALS,
    sealIdToImagePath,
    getSeal,
    getToneName
  };
})();
