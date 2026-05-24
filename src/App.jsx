import { useState, useEffect } from 'react';
import { locales } from './locales';
// 引入我們剛剛下載的頂級動畫魔法
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [viewState, setViewState] = useState('envelope');
  const [lang, setLang] = useState('zh');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  /* ==================== 彩蛋核心狀態 ==================== */
  const [isPatronusActive, setIsPatronusActive] = useState(false);
  const [keyHistory, setKeyHistory] = useState([]);

  // 1. 3D 城堡滑鼠監聽
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (viewState === 'castle' && !isPatronusActive) {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewState, isPatronusActive]);

  // 2. 核心彩蛋：鍵盤監聽咒 (監聽 sana 密碼)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewState !== 'castle') return; // 只有進入城堡主頁後才能觸發彩蛋
      
      const key = e.key.toLowerCase();
      // 記錄按鍵歷史，只保留最後 4 個字
      setKeyHistory((prev) => {
        const updated = [...prev, key].slice(-4);
        // 檢查是不是拼出了 s -> a -> n -> a
        if (updated.join('') === 'sana') {
          setIsPatronusActive(true);
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState]);

  const t = locales[lang];

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden font-serif relative">
      
      {/* 全域三語切換鈕（彩蛋啟動時暫時隱藏，保持極致沉浸感） */}
      {!isPatronusActive && (
        <div className="absolute top-6 right-6 z-50 flex space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800">
          {['zh', 'ja', 'ko'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 text-xs tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                lang === l ? 'bg-[#621021] text-[#fcf7ed] border border-[#c5a059]' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {l === 'zh' ? '繁中' : l === 'ja' ? '日本語' : '한국어'}
            </button>
          ))}
        </div>
      )}

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
          
          {/* 3D 仿真的動態城堡背景層 */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-200 ease-out pointer-events-none scale-105"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              backgroundImage: 'radial-gradient(circle at 50% 80%, #1a1026 0%, #050307 70%)'
            }}
          >
            <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent">
              <div className="absolute bottom-[25vh] left-[45%] w-2 h-3 bg-amber-400/60 rounded-full blur-[1px] animate-pulse-slow"></div>
              <div className="absolute bottom-[28vh] left-[47%] w-1.5 h-2.5 bg-amber-300/40 rounded-full blur-[1px] animate-pulse"></div>
              <div className="absolute bottom-[22vh] left-[52%] w-2 h-2 bg-amber-400/50 rounded-full blur-[2px] animate-pulse-slow"></div>
            </div>
          </div>

          {/* 導航列：劫盜地圖羊皮紙緞帶 */}
          <nav className="w-full max-w-4xl px-6 py-4 mt-20 z-10 relative">
            <div className="bg-[#f2e6d0]/90 backdrop-blur-sm border-2 border-[#c5a059] shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-md py-3 px-4 md:px-8 flex flex-wrap justify-center gap-4 md:gap-8 text-[#2c1d11] font-semibold text-xs md:text-sm tracking-widest">
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navWand}</button>
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navPlatform}</button>
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navHall}</button>
              <button className="hover:text-[#8a1c1c] transition-colors border-b border-transparent hover:border-[#8a1c1c] pb-1 cursor-pointer">{t.navPensieve}</button>
            </div>
          </nav>

          {/* 主頁核心浪漫文案區 */}
          <main className="z-10 text-center max-w-2xl px-6 my-auto space-y-6 animate-float">
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-[#f2e6d0] drop-shadow-[0_4px_12px_rgba(197,160,89,0.4)]">
              {t.castleWelcome}
            </h2>
            <p className="text-sm md:text-lg text-neutral-300 font-sans leading-relaxed tracking-wider max-w-xl mx-auto drop-shadow-md">
              {t.castleSub}
            </p>
            {/* 彩蛋微弱提示（給懂哈利波特梗的人） */}
            <div className="text-[11px] text-neutral-600 font-sans tracking-widest pt-4">
              提示：在鍵盤悄悄吟唱她的名字，召喚內心的守護神...
            </div>
          </main>

          <footer className="z-10 pb-6 text-[10px] tracking-widest text-neutral-500 uppercase font-sans">
            Mischief Managed • © 2026 TWICE-SANA MAGIC EDITIONS
          </footer>
        </div>
      )}

      {/* ==================== 🌠 殿堂級隱藏彩蛋：呼呼，護法！ ==================== */}
      <AnimatePresence>
        {isPatronusActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center text-center p-6"
          >
            {/* 1. 松鼠護法的純 CSS 唯美銀藍光粒子動態 */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-10">
              {/* 光暈光斑擴散 */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"
              />
              {/* 純代碼勾勒的星光松鼠意象（用幾何圖形組合成超現實的守護神） */}
              <motion.div
                initial={{ x: -300, y: 50, opacity: 0, scale: 0.5 }}
                animate={{ x: [miniWidth(), 0, 300], y: [50, -20, 50], opacity: [0, 1, 1, 0], scale: [0.6, 1, 0.6] }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="text-6xl text-cyan-200 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] filter brightness-125"
              >
                🐿️ ✨
              </motion.div>
            </div>

            {/* 2. 浪漫到落淚的深情文案 */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="max-w-xl space-y-6"
            >
              <h3 className="text-xl md:text-2xl text-cyan-200 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                Expecto Patronum! (呼呼，護法)
              </h3>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed tracking-widest font-sans">
                「世界有時喧囂，命運偶爾困頓。<br />
                但只要在心底最深處，回想起妳那毫無保留的燦爛笑容，<br />
                所有黑暗與攝魂怪都將煙消雲散。」
              </p>
              <p className="text-xs md:text-sm text-cyan-300/70 italic tracking-widest font-serif">
                "無論世界多黑暗，妳的笑容就是我們最強大的護法咒。"
              </p>
            </motion.div>

            {/* 3. 解除彩蛋按鈕 */}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={() => {
                setIsPatronusActive(false);
                setKeyHistory([]); // 清空密碼歷史
              }}
              className="absolute bottom-10 px-4 py-1.5 border border-cyan-500/30 text-cyan-400 text-xs tracking-widest rounded hover:bg-cyan-950/40 transition-all cursor-pointer"
            >
              Mischief Managed (頑作終了)
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// 輔助函式：用來計算松鼠跑動的初始寬度
function miniWidth() {
  return typeof window !== 'undefined' ? -window.innerWidth / 2 - 100 : -500;
}

export default App;