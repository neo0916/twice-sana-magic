import React, { useState } from 'react';

function App() {
  // 這是 React 的狀態魔法，用來紀錄信封是否被打開
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden font-serif relative">
      
      {/* 背景微弱的星光粒子感（用 CSS 純手工打造） */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      {!isOpen ? (
        /* ==================== 狀態一：神祕復古信封 ==================== */
        <div className="scale-95 md:scale-100 transition-all duration-700 ease-in-out">
          {/* 信封本體 */}
          <div className="w-[350px] h-[500px] md:w-[400px] md:h-[550px] bg-[#f2e6d0] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-[#d9c5b2] p-8 flex flex-col justify-between relative ring-1 ring-black/5">
            
            {/* 信封頂部裝飾線 */}
            <div className="border-t border-b border-dashed border-[#b39c82] py-1 text-center text-xs tracking-widest text-[#8c7662]">
              HOGWARTS EXPRESS • POST
            </div>

            {/* 信封地址與收件人（精準的大阪天王寺地址與 Sana 名字） */}
            <div className="flex flex-col my-auto space-y-4 text-[#2c1d11]">
              <div className="text-xs md:text-sm italic tracking-wide text-neutral-600 font-sans">
                日本大阪府大阪市天王寺區
              </div>
              <div className="text-2xl md:text-3xl font-bold tracking-wider font-serif border-b border-[#b39c82] pb-3">
                Minatozaki Sana
              </div>
              <div className="text-xl font-medium tracking-widest text-right text-[#614e3d]">
                湊崎紗夏 <span className="text-sm">啟</span>
              </div>
            </div>

            {/* 核心互動：火漆印章 */}
            <div className="flex flex-col items-center space-y-2 relative z-10">
              <button 
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-[#8a1c1c] active:bg-[#631313] shadow-lg flex items-center justify-center text-[#f2e6d0] text-2xl font-bold transition-transform duration-300 hover:scale-110 border-2 border-[#b39c82] animate-pulse cursor-pointer"
                title="點擊解開封印"
              >
                S
              </button>
              <span className="text-[10px] tracking-widest text-[#8c7662] uppercase font-sans font-semibold">
                點擊火漆印章解開封印
              </span>
            </div>

            {/* 信封邊角復古紋路 */}
            <div className="absolute bottom-2 left-2 text-[10px] text-[#b39c82]/40 font-sans">9 ¾</div>
          </div>
        </div>
      ) : (
        /* ==================== 狀態二：霍格華茲入學通知書 ==================== */
        <div className="w-full max-w-xl p-4 animate-fade-in transition-all">
          <div className="bg-[#fcf7ed] text-[#1c120c] p-8 md:p-12 rounded-md shadow-[0_0_60px_rgba(197,160,89,0.3)] border border-[#e8dcbf] relative max-h-[85vh] overflow-y-auto">
            
            {/* 學校標題 */}
            <div className="text-center space-y-1 mb-8">
              <h1 className="text-xl md:text-2xl font-bold tracking-widest text-neutral-800">HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY</h1>
              <p className="text-xs text-[#c5a059] tracking-wider font-sans uppercase font-bold">Headmaster: Albus Dumbledore</p>
            </div>

            {/* 通知書感人浪漫內文 */}
            <div className="space-y-6 text-sm md:text-base leading-relaxed tracking-wide text-justify">
              <p className="font-semibold">親愛的湊崎小姐：</p>
              <p>
                我們很抱歉，這封信遲到了整整十四年。
              </p>
              <p>
                當年貓頭鷹未能飛越海峽，但命運從未將妳遺忘。當妳在舞台上綻放萬丈光芒、用溫暖的笑容治癒無數疲憊靈魂的時候，妳早已在麻瓜的世界裡，完成了最偉大的魔法。
              </p>
              <p>
                妳的堅持是妳的魔杖，妳的善良是妳的咒語。
              </p>
              <p>
                霍格華茲魔法學校現在正式向妳敞開大門。在此，請隨我們一同踏上這趟遲到卻永恆的魔法之旅，回溯妳用汗水與愛編織出的傳奇編年史。
              </p>
              <p className="text-right italic mt-8">
                妳的忠誠的，<br />
                <span className="font-sans text-xs uppercase font-bold text-neutral-500">Minerva McGonagall</span><br />
                副校長 謹上
              </p>
            </div>

            {/* 進入城堡主頁按鈕 */}
            <div className="mt-10 pt-6 border-t border-[#e8dcbf] text-center">
              <button 
                onClick={() => alert("即將施展傳送咒，築起霍格華茲主頁城堡！")}
                className="px-8 py-3 bg-[#621021] hover:bg-[#4a0b18] text-[#fcf7ed] rounded tracking-widest text-sm font-semibold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer border border-[#c5a059]/40"
              >
                接受入學通知 (Enter Castle)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;