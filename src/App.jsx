import React, { useState, useEffect } from 'react';
import { ShieldAlert, Flame, Car, Info, Map as MapIcon, ChevronRight, AlertCircle, Search, Radio, Bell } from 'lucide-react';

const App = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 時計の更新
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // データ定義：国旗、地域、事件・不審火情報
  const yardData = [
    {
      id: 1,
      pref: "千葉県",
      area: "四街道・佐倉",
      coords: { x: 72, y: 70 },
      flags: ["🇦🇫"],
      mainNationality: "アフガニスタン系",
      description: "国内最大級の集積地。山林を切り開いた巨大ヤードが密集。近年、夜間の不審火が連続発生しており、消防・警察が重点パトロールを実施中。",
      incidents: [
        { type: "fire", date: "2024/02", detail: "深夜2時、ヤード内積載物から出火。隣接民家に延焼寸前。" },
        { type: "crime", date: "2024/01", detail: "盗難ハイエース3台の解体現場を現行犯摘発。" }
      ],
      alertLevel: "Critical"
    },
    {
      id: 2,
      pref: "茨城県",
      area: "坂東・常総",
      coords: { x: 65, y: 52 },
      flags: ["🇵🇰"],
      mainNationality: "パキスタン系",
      description: "古くからの輸出ハブ。深夜の騒音トラブルに加え、無許可での特定二輪車（バイク）解体が問題化。行政による立ち入り調査が頻発。",
      incidents: [
        { type: "noise", date: "2024/03", detail: "深夜の金属切断音による近隣住民との激しい口論が発生。" },
        { type: "fire", date: "2023/12", detail: "廃タイヤの山から出火。消火に5時間を要した。" }
      ],
      alertLevel: "High"
    },
    {
      id: 3,
      pref: "千葉県",
      area: "野田・柏",
      coords: { x: 58, y: 62 },
      flags: ["🇻🇳"],
      mainNationality: "ベトナム系",
      description: "金属スクラップ・雑品の集積が急増。盗難された太陽光パネルや銅線の「ロンダリング拠点」としての疑いがあり、警戒が強まっている。",
      incidents: [
        { type: "crime", date: "2024/02", detail: "盗難被害品の銅線約2トンを保管していたとして関係者を聴取。" }
      ],
      alertLevel: "High"
    },
    {
      id: 4,
      pref: "群馬県",
      area: "太田・大泉",
      coords: { x: 38, y: 35 },
      flags: ["🇧🇷"],
      mainNationality: "ブラジル系",
      description: "住宅街至近にヤードが点在。景観悪化と不法投棄の懸念から自治会による反対運動が活発化しているエリア。",
      incidents: [
        { type: "fire", date: "2023/10", detail: "バーベキューの火がヤード内の廃油に引火、小規模火災。" }
      ],
      alertLevel: "Medium"
    },
    {
      id: 5,
      pref: "埼玉県",
      area: "八潮・三郷",
      coords: { x: 56, y: 74 },
      flags: ["🇹🇷"],
      mainNationality: "トルコ系",
      description: "外環道周辺。土地が狭く、過密状態で部品を積み上げているため、崩落や火災時の消防活動困難が危惧される。",
      incidents: [
        { type: "crime", date: "2024/03", detail: "ヤード内での不法就労の疑いで入管と警察が合同捜索。" }
      ],
      alertLevel: "High"
    }
  ];

  const getAlertColor = (level) => {
    switch (level) {
      case "Critical": return "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.7)]";
      case "High": return "bg-orange-600";
      default: return "bg-yellow-500";
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case "fire": return <Flame className="text-red-500" size={14} />;
      case "crime": return <ShieldAlert className="text-blue-400" size={14} />;
      default: return <AlertCircle className="text-gray-400" size={14} />;
    }
  };

  // 全事件の統合リスト（ティッカー用）
  const allIncidents = yardData.flatMap(y => y.incidents.map(i => ({...i, area: y.area})));

  return (
    <div className="flex flex-col h-screen bg-[#020817] text-slate-100 font-sans overflow-hidden">
      {/* ニュース番組風ヘッダー */}
      <header className="bg-gradient-to-r from-red-900 via-blue-900 to-black p-4 shadow-2xl flex justify-between items-center border-b-2 border-yellow-500 z-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Radio className="text-red-500 animate-pulse" size={32} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
              YARD ALERT <span className="bg-red-600 text-white px-3 py-0.5 text-sm not-italic rounded-sm">緊急実況</span>
            </h1>
            <p className="text-[10px] font-bold opacity-80 tracking-[0.3em] text-blue-300">関東圏内特定拠点 集中監視システム稼働中</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right border-l border-white/20 pl-6">
            <div className="text-[10px] opacity-60">SYSTEM STATUS</div>
            <div className="text-xs font-bold text-emerald-400">● NORMAL / ACTIVE</div>
          </div>
          <div className="bg-black/60 px-4 py-1.5 rounded-sm border border-white/10 text-right min-w-[180px]">
            <div className="text-[10px] opacity-70">LIVE TIME</div>
            <div className="text-xl font-mono font-bold leading-none text-yellow-400 tracking-wider">
              {currentTime.toLocaleTimeString('ja-JP', { hour12: false })}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 背景グリッドエフェクト */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* 左側：サイドニュースフィード */}
        <div className="w-80 bg-slate-900/80 backdrop-blur-md p-4 overflow-y-auto border-r border-white/10 z-20">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-red-500/50">
            <Bell size={18} className="text-red-500 animate-bounce" />
            <h2 className="text-sm font-black text-red-100">重点警戒ニュース</h2>
          </div>
          <div className="space-y-4">
            {allIncidents.sort((a, b) => b.date.localeCompare(a.date)).map((incident, idx) => (
              <div key={idx} className="group cursor-pointer border-b border-white/5 pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold bg-white/10 px-1.5 rounded text-blue-300">{incident.area}</span>
                  <span className="text-[9px] font-mono opacity-50">{incident.date}</span>
                </div>
                <div className="flex gap-2 p-2 rounded bg-red-900/10 group-hover:bg-red-900/20 transition-all border-l-2 border-red-500">
                  <div className="shrink-0 mt-0.5">{getIncidentIcon(incident.type)}</div>
                  <p className="text-[11px] leading-snug font-bold">{incident.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 中央：メインマップ */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-[1.3/1] bg-blue-950/20 rounded-3xl overflow-hidden shadow-inner border border-white/5">
            {/* SVG Map */}
            <svg viewBox="0 0 500 400" className="w-full h-full p-4">
              <g className="fill-[#111827] stroke-blue-500/30 stroke-[1.5]">
                {/* 各県形状の再現パス */}
                <path d="M140,40 L220,60 L225,140 L160,180 L140,160 L120,130 L110,90 Z" /> {/* 群馬 */}
                <path d="M220,60 L320,40 L330,120 L320,165 L260,195 L225,140 Z" /> {/* 栃木 */}
                <path d="M320,40 L370,80 L360,180 L400,230 L340,235 L300,210 L320,165 Z" /> {/* 茨城 */}
                <path d="M160,180 L225,140 L260,195 L280,215 L285,260 L210,240 L160,180 Z" /> {/* 埼玉 */}
                <path d="M210,240 L285,260 L290,285 L250,300 L210,270 Z" /> {/* 東京 */}
                <path d="M280,215 L300,210 L340,235 L400,230 L360,320 L310,360 L290,285 L280,215 Z" /> {/* 千葉 */}
                <path d="M160,280 L210,270 L250,300 L230,350 L180,330 Z" /> {/* 神奈川 */}
              </g>

              {/* 県名ラベル */}
              <g className="fill-blue-500/20 font-black text-[14px] italic tracking-widest pointer-events-none">
                <text x="155" y="110">GUNMA</text>
                <text x="255" y="95">TOCHIGI</text>
                <text x="330" y="145">IBARAKI</text>
                <text x="205" y="210">SAITAMA</text>
                <text x="320" y="295">CHIBA</text>
              </g>
            </svg>

            {/* 地点プロット：国旗 + 不審情報アイコン */}
            {yardData.map(yard => (
              <div 
                key={yard.id}
                style={{ left: `${yard.coords.x}%`, top: `${yard.coords.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="relative">
                  {/* アラートエフェクト */}
                  <div className={`absolute -inset-6 rounded-full animate-ping opacity-20 ${getAlertColor(yard.alertLevel)}`}></div>
                  
                  {/* メインボタン：国旗 */}
                  <button
                    onClick={() => setSelectedArea(yard)}
                    className={`relative bg-white p-1 rounded-sm shadow-2xl transition-all duration-300 hover:scale-110 ${
                      selectedArea?.id === yard.id ? 'ring-4 ring-yellow-400 scale-125 z-40' : 'ring-2 ring-blue-500'
                    }`}
                  >
                    <span className="text-3xl leading-none">{yard.flags[0]}</span>
                  </button>

                  {/* 地図上に直接不審情報をプロット */}
                  <div className="absolute -top-8 -right-8 flex flex-col gap-1">
                    {yard.incidents.map((inc, i) => (
                      <div key={i} className="bg-black/80 backdrop-blur-sm border border-white/20 p-1 rounded-full shadow-lg animate-bounce" style={{ animationDelay: `${i * 0.5}s` }}>
                        {getIncidentIcon(inc.type)}
                      </div>
                    ))}
                  </div>

                  {/* エリア名タグ */}
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-blue-900 border border-blue-400 px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                    <span className="text-[10px] font-black italic">{yard.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 地図凡例 */}
          <div className="absolute bottom-10 left-10 bg-slate-900/90 border-l-4 border-red-500 p-4 rounded shadow-2xl z-20">
            <h3 className="text-xs font-black text-red-500 mb-2 italic">SECURITY MONITOR LEGEND</h3>
            <div className="space-y-2 text-[10px] font-bold">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-600 animate-pulse rounded-full shadow-[0_0_8px_red]"></div> 重点監視：不審火・摘発・盗難多発</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-600 rounded-full"></div> 警戒区域：近隣住民苦情・行政指導</div>
              <div className="flex items-center gap-2"><div className="bg-black border border-white/20 p-0.5 rounded-full"><Flame size={10} className="text-red-500"/></div> 過去1年以内のヤード内火災</div>
              <div className="flex items-center gap-2"><div className="bg-black border border-white/20 p-0.5 rounded-full"><ShieldAlert size={10} className="text-blue-400"/></div> 警察による家宅捜索・摘発</div>
            </div>
          </div>
        </div>

        {/* 右側：詳細パネル */}
        {selectedArea && (
          <div className="w-[420px] bg-slate-950 border-l-2 border-yellow-500 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-1 bg-yellow-500 text-black text-[10px] font-black text-center tracking-[0.5em] uppercase">
              Area Security Profile Data
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <button onClick={() => setSelectedArea(null)} className="mb-6 flex items-center gap-2 text-xs font-bold text-red-500 hover:text-white transition-colors bg-red-500/10 px-3 py-1 rounded border border-red-500/20">
                <ChevronRight className="rotate-180" size={16} /> Close Profile
              </button>

              <div className="flex items-end gap-5 mb-8">
                <div className="text-7xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  {selectedArea.flags[0]}
                </div>
                <div>
                  <div className={`text-[10px] font-black px-3 py-0.5 rounded inline-block mb-2 ${getAlertColor(selectedArea.alertLevel)}`}>
                    LEVEL: {selectedArea.alertLevel}
                  </div>
                  <h3 className="text-4xl font-black italic tracking-tighter text-white">{selectedArea.area}</h3>
                  <p className="text-sm text-blue-400 font-black tracking-widest">{selectedArea.pref} / {selectedArea.mainNationality}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded border border-white/10 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5"><Car size={64} /></div>
                <h4 className="text-[11px] font-bold text-slate-400 mb-2 border-b border-white/10 pb-1 flex items-center gap-2">
                   <Info size={14} /> 拠点実態・傾向
                </h4>
                <p className="text-sm leading-relaxed font-medium">{selectedArea.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-red-500 mb-3 flex items-center gap-2 italic">
                  <Bell size={16} className="animate-pulse" /> RECENT INCIDENTS LOG
                </h4>
                {selectedArea.incidents.map((inc, i) => (
                  <div key={i} className="bg-black/60 p-4 rounded border-l-4 border-red-600 relative group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {getIncidentIcon(inc.type)}
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                          {inc.type === 'fire' ? 'ヤード不審火' : inc.type === 'crime' ? '警察摘発' : '治安トラブル'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50">{inc.date}</span>
                    </div>
                    <p className="text-xs font-bold leading-relaxed text-slate-200">{inc.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-black text-[9px] text-center opacity-60 border-t border-white/10 italic">
              ALERT: 盗難車・盗難金属の売買は犯罪です。不審なヤードを見かけた場合は最寄りの警察署へ。
            </div>
          </div>
        )}
      </div>

      {/* ニュースティッカー（テロップ） */}
      <div className="bg-red-700 h-10 flex items-center overflow-hidden border-t border-yellow-400/50 z-[60]">
        <div className="bg-black h-full px-6 flex items-center font-black italic text-sm text-yellow-400 shrink-0 skew-x-[-20deg] -ml-4 z-10 border-r-4 border-yellow-500">
           <span className="skew-x-[20deg]">FLASH NEWS</span>
        </div>
        <div className="flex whitespace-nowrap animate-marquee">
          {allIncidents.map((inc, i) => (
            <span key={i} className="text-white font-bold text-sm mx-10 flex items-center gap-2">
              <span className="bg-white text-red-700 px-1.5 rounded text-[10px] font-black">ALERT</span>
              【{inc.area}】{inc.detail}
            </span>
          ))}
          {/* リピート分 */}
          {allIncidents.map((inc, i) => (
            <span key={`rep-${i}`} className="text-white font-bold text-sm mx-10 flex items-center gap-2">
              <span className="bg-white text-red-700 px-1.5 rounded text-[10px] font-black">ALERT</span>
              【{inc.area}】{inc.detail}
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default App;