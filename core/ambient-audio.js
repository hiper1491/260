// core/ambient-audio.js
// ===== 神廟環境音效系統 v1 =====
//
// 功能：
//   - 多種環境音選項（流水、頌缽、森林、靜音）
//   - 自動播放（淡入）、可切換、可靜音
//   - 記憶用戶偏好（localStorage）
//
// 使用方式：
//   <script src="../core/ambient-audio.js"></script>
//   AMBIENT_AUDIO.init({ container: document.body });
//   AMBIENT_AUDIO.play('water');
//   AMBIENT_AUDIO.fadeIn();
//   AMBIENT_AUDIO.fadeOut();
//   AMBIENT_AUDIO.toggle();

(() => {
  'use strict';

  // 免費音效來源（Pixabay License - 免費商用）
  const AUDIO_SOURCES = {
    water: {
      name: '流水輕聲',
      icon: '🌊',
      // Gentle stream sound from Pixabay
      url: 'https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3'
    },
    bowl: {
      name: '頌缽泛音',
      icon: '🎵',
      // Singing bowl meditation sound
      url: 'https://cdn.pixabay.com/audio/2022/10/30/audio_f6f41e0695.mp3'
    },
    forest: {
      name: '森林寧靜',
      icon: '🌲',
      // Forest ambience
      url: 'https://cdn.pixabay.com/audio/2022/03/09/audio_c610906aef.mp3'
    },
    mute: {
      name: '靜音',
      icon: '🔇',
      url: null
    }
  };

  const STORAGE_KEY = 'temple_ambient_audio';
  const FADE_DURATION = 2000; // ms
  const DEFAULT_VOLUME = 0.3;

  let audioEl = null;
  let currentSource = 'water';
  let isMuted = false;
  let isPlaying = false;
  let fadeInterval = null;
  let controllerEl = null;

  /**
   * 初始化音效系統
   */
  function init(options = {}) {
    const { container = document.body, autoPlay = false } = options;

    // 讀取用戶偏好
    loadPreference();

    // 建立 audio 元素
    audioEl = document.createElement('audio');
    audioEl.loop = true;
    audioEl.volume = 0;
    audioEl.preload = 'auto';
    document.body.appendChild(audioEl);

    // 建立控制器 UI
    createController(container);

    // 自動播放（需要用戶互動後才能播放）
    if (autoPlay && currentSource !== 'mute') {
      // 等待用戶第一次互動
      const startOnInteraction = () => {
        play(currentSource);
        fadeIn();
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('touchstart', startOnInteraction);
      };
      document.addEventListener('click', startOnInteraction, { once: true });
      document.addEventListener('touchstart', startOnInteraction, { once: true });
    }
  }

  /**
   * 建立控制器 UI
   */
  function createController(container) {
    // 主按鈕
    controllerEl = document.createElement('div');
    controllerEl.className = 'ambient-audio-controller';
    controllerEl.innerHTML = `
      <div class="audio-toggle" title="環境音效">
        <span class="audio-icon">${AUDIO_SOURCES[currentSource].icon}</span>
      </div>
      <div class="audio-menu">
        ${Object.entries(AUDIO_SOURCES).map(([key, val]) => `
          <div class="audio-option ${key === currentSource ? 'active' : ''}" data-source="${key}">
            <span class="option-icon">${val.icon}</span>
            <span class="option-name">${val.name}</span>
          </div>
        `).join('')}
      </div>
    `;

    // 樣式
    const style = document.createElement('style');
    style.textContent = `
      .ambient-audio-controller {
        position: fixed;
        top: 30px;
        right: 30px;
        z-index: 9000;
        font-family: 'Noto Serif TC', serif;
      }

      .audio-toggle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.85);
        border: 1.5px solid rgba(212, 175, 55, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .audio-toggle:hover {
        background: rgba(255, 250, 240, 1);
        border-color: rgba(212, 175, 55, 0.7);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.25);
        transform: scale(1.05);
      }

      .audio-icon {
        font-size: 22px;
        line-height: 1;
      }

      .audio-menu {
        position: absolute;
        top: 60px;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        border: 1.5px solid rgba(212, 175, 55, 0.3);
        border-radius: 16px;
        padding: 8px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        min-width: 150px;
      }

      .ambient-audio-controller.open .audio-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .audio-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: rgba(80, 70, 55, 0.85);
      }

      .audio-option:hover {
        background: rgba(212, 175, 55, 0.1);
      }

      .audio-option.active {
        background: rgba(212, 175, 55, 0.2);
        color: rgba(60, 50, 35, 1);
      }

      .option-icon {
        font-size: 18px;
      }

      .option-name {
        font-size: 14px;
        letter-spacing: 1px;
      }

      @media (max-width: 768px) {
        .ambient-audio-controller {
          top: 20px;
          right: 20px;
        }

        .audio-toggle {
          width: 44px;
          height: 44px;
        }

        .audio-icon {
          font-size: 20px;
        }
      }
    `;

    document.head.appendChild(style);
    container.appendChild(controllerEl);

    // 事件綁定
    const toggle = controllerEl.querySelector('.audio-toggle');
    const menu = controllerEl.querySelector('.audio-menu');
    const options = controllerEl.querySelectorAll('.audio-option');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      controllerEl.classList.toggle('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const source = opt.dataset.source;
        selectSource(source);
        controllerEl.classList.remove('open');
      });
    });

    // 點擊外部關閉
    document.addEventListener('click', () => {
      controllerEl.classList.remove('open');
    });
  }

  /**
   * 選擇音源
   */
  function selectSource(source) {
    if (!AUDIO_SOURCES[source]) return;

    currentSource = source;
    savePreference();

    // 更新 UI
    const icon = controllerEl.querySelector('.audio-icon');
    icon.textContent = AUDIO_SOURCES[source].icon;

    const options = controllerEl.querySelectorAll('.audio-option');
    options.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.source === source);
    });

    // 切換音效
    if (source === 'mute') {
      fadeOut(() => {
        audioEl.pause();
        isPlaying = false;
      });
    } else {
      fadeOut(() => {
        play(source);
        fadeIn();
      });
    }
  }

  /**
   * 播放指定音源
   */
  function play(source) {
    if (!AUDIO_SOURCES[source] || !AUDIO_SOURCES[source].url) return;

    audioEl.src = AUDIO_SOURCES[source].url;
    audioEl.play().catch(err => {
      console.log('Audio play blocked:', err);
    });
    isPlaying = true;
  }

  /**
   * 淡入
   */
  function fadeIn(callback) {
    if (fadeInterval) clearInterval(fadeInterval);

    const step = DEFAULT_VOLUME / (FADE_DURATION / 50);
    audioEl.volume = 0;

    fadeInterval = setInterval(() => {
      if (audioEl.volume < DEFAULT_VOLUME - step) {
        audioEl.volume += step;
      } else {
        audioEl.volume = DEFAULT_VOLUME;
        clearInterval(fadeInterval);
        fadeInterval = null;
        if (callback) callback();
      }
    }, 50);
  }

  /**
   * 淡出
   */
  function fadeOut(callback) {
    if (fadeInterval) clearInterval(fadeInterval);

    const step = audioEl.volume / (FADE_DURATION / 50);

    fadeInterval = setInterval(() => {
      if (audioEl.volume > step) {
        audioEl.volume -= step;
      } else {
        audioEl.volume = 0;
        clearInterval(fadeInterval);
        fadeInterval = null;
        if (callback) callback();
      }
    }, 50);
  }

  /**
   * 切換靜音
   */
  function toggle() {
    if (currentSource === 'mute') {
      selectSource('water');
    } else {
      selectSource('mute');
    }
  }

  /**
   * 儲存偏好
   */
  function savePreference() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        source: currentSource
      }));
    } catch (e) {}
  }

  /**
   * 讀取偏好
   */
  function loadPreference() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.source && AUDIO_SOURCES[data.source]) {
          currentSource = data.source;
        }
      }
    } catch (e) {}
  }

  /**
   * 取得目前狀態
   */
  function getState() {
    return {
      source: currentSource,
      isPlaying,
      isMuted: currentSource === 'mute'
    };
  }

  // 導出
  window.AMBIENT_AUDIO = Object.freeze({
    init,
    play,
    fadeIn,
    fadeOut,
    toggle,
    selectSource,
    getState,
    SOURCES: AUDIO_SOURCES
  });
})();
