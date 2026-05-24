import React, { useState, useEffect } from 'react';
import { locales } from './locales';

function App() {
  // viewState 紀錄目前的畫面狀態: 'envelope' (信封), 'letter' (通知書), 'castle' (城堡主頁)
  const [viewState, setViewState] = useState('envelope');
  // lang 紀錄目前選擇的語言: 'zh' (繁中), 'ja' (日文), 'ko' (韓文)
  const [lang, setLang] = useState('zh');
  
  // 3D 透視效果的滑鼠座標狀態
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 監聽滑鼠移動，計算透視位移
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (viewState === 'castle') {
        const x = (e.clientX / window.innerWidth - 0.5) * 15; // 控制晃動幅度
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewState]);

  // 便捷獲取當前語言字典的函式
  const t = locales[lang];

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden font-serif relative">
      
      {/* ==================== 頂部全域功能：速速前·翻譯咒（三語切換鈕） ==================== */}
      <div className="absolute top-6 right-6 z-50 flex space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800">
        {['zh', 'ja', 'ko'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 text-xs tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
              lang === l 
                ? 'bg-[#621021] text-[#fcf7ed] border border-[#c5a059]' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {l === 'zh' ? '繁中' : l === 'ja' ? '日本語' : '한국어'}
          </button>
        ))}
      </div>

      {/* 背景微弱的星光粒子感 */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      {/* ==================== 狀態一：神祕復古信封 ==================== */}
      {viewState === 'envelope' && (
        <div className="scale-95 md:scale-100 transition-all duration-700 ease-in-out">
          <div className="w-[350px] h-[500px] md:w-[400px] md:h-[550px] bg-[#f2e6d0] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-[#d9c5b2] p-8 flex flex-col justify-between relative">
            <div className="border-t border-b border-dashed border-[#b39c82] py-1 text-center text-xs tracking-widest text-[#8c7662]">
              HOGWARTS EXPRESS • POST
            </div>
            <div className="flex flex-col my-auto space-y-4 text-[#2c1d11]">
              <div className="text-xs md:text-sm italic tracking-wide text-neutral-600 font-sans">
                {t.envelopeAddress}
              </div>
              <div className="text-xl md:text-2xl font-bold tracking-wider font-serif border-b border-[#b39c82] pb-3 leading-relaxed">
                {t.envelopeTo}
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 relative z-10">
              <button 
                onClick={() => setViewState('letter')}
                className="w-16 h-16 rounded-full bg-[#8a1c1c] active:bg-[#631313] shadow-lg flex items-center justify-center text-[#f2e6d0] text-2xl font-bold transition-transform duration-300 hover:scale-110 border-2 border-[#b39c82] animate-pulse cursor-pointer"
              >
                S
              </button>
              <span className="text-[10px] tracking-widest text-[#8c7662] uppercase font-sans font-semibold">
                {t.stampHint}
              </span>
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] text-[#b39c82]/40 font-sans">9 ¾</div>
          </div>
        </div>
      )}

      {/* ==================== 狀態二：霍格華茲入學通知書 ==================== */}
      {viewState === 'letter' && (
        <div className="w-full max-w-xl p-4 transition-all duration-1000">
          <div className="bg-[#fcf7ed] text-[#1c120c] p-8 md:p-12 rounded-md shadow-[0_0_60px_rgba(197,160,89,0.25)] border border-[#e8dcbf] relative max-h-[85vh] overflow-y-auto">
            <div className="text-center space-y-1 mb-8">
              <h1 className="text-lg md:text-xl font-bold tracking-widest text-neutral-800">{t.letterTitle}</h1>
              <p className="text-[10px] text-[#c5a059] tracking-wider font-sans uppercase font-bold">{t.letterHead}</p>
            </div>
            <div className="space-y-5 text-sm md:text-base leading-relaxed tracking-wide text-justify whitespace-pre-line">
              <p className="font-bold">{t.letterSalutation}</p>
              <p>{t.letterP1}</p>
              <p>{t.letterP2}</p>
              <p>{t.letterP3}</p>
              <p>{t.letterP4}</p>
              <p className="text-right italic mt-8 text-neutral-700">
                {t.letterSign}
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-[#e8dcbf] text-center">
              <button 
                onClick={() => setViewState('castle')}
                className="px-8 py-3 bg-[#621021] hover:bg-[#4a0b18] text-[#fcf7ed] rounded tracking-widest text-sm font-semibold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer border border-[#c5a059]/40"
              >
                {t.enterBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 狀態三：正式進入【遠眺霍格華茲城堡主頁】 ==================== */}
      {viewState === 'castle' && (
        <div className="w-full h-screen relative flex flex-col justify-between items-center text-[#fcf7ed]">
          
          {/* 3D 仿真的動態城堡背景層（使用 CSS 漸層與星空，加上滑鼠動態位移） */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-200 ease-out pointer-events-none scale-105"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              backgroundImage: 'radial-gradient(circle at 50% 80%, #1a1026 0%, #050307 70%)'
            }}
          >
            {/* 遠處的手工剪影城堡山脈與呼吸微光 */}
            <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent">
              {/* 模擬城堡塔樓的金色呼吸窗光 */}
              <div className="absolute bottom-[25vh] left-[45%] w-2 h-3 bg-amber-400/60 rounded-full blur-[1px] animate-pulse-slow"></div>
              <div className="absolute bottom-[28vh] left-[47%] w-1.5 h-2.5 bg-amber-300/40 rounded-full blur-[1px] animate-pulse"></div>
              <div className="absolute bottom-[22vh] left-[52%] w-2 h-2 bg-amber-400/50 rounded-full blur-[2px] animate-pulse-slow"></div>
            </div>
          </div>

          {/* ==================== 導航列：劫盜地圖羊皮紙緞帶 ==================== */}
          <nav className="w-full max-w-4xl px-6 py-4 mt-20 z-10 relative">
            <div className="bg-[#f2e6d0]/90 backdrop-blur-sm border-2 border-[#c5a059] shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-md py-3 px-4 md:px-8 flex flex-wrap justify-center gap-4 md:gap-8 text-[#2c1d11] font-semibold text-xs md:text-sm tracking-widest">
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navWand}</button>
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navPlatform}</button>
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navHall}</button>
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navPensieve}</button>
            </div>
          </nav>

          {/* ==================== 主頁核心浪漫文案區 ==================== */}
          <main className="z-10 text-center max-w-2xl px-6 my-auto space-y-6 animate-float">
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-[#f2e6d0] drop-shadow-[0_4px_12px_rgba(197,160,89,0.4)]">
              {t.castleWelcome}
            </h2>
            <p className="text-sm md:text-lg text-neutral-300 font-sans leading-relaxed tracking-wider max-w-xl mx-auto drop-shadow-md">
              {t.castleSub}
            </p>
          </main>

          {/* 頁尾註腳 */}
          <footer className="z-10 pb-6 text-[10px] tracking-widest text-neutral-500 uppercase font-sans">
            Mischief Managed • © 2026 TWICE-SANA MAGIC EDITIONS
          </footer>

        </div>
      )}

    </div>
  );
}

export default App;