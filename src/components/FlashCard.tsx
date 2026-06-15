'use client';

import React, { useState } from 'react';
import { Sliders, RotateCw, Database, MapPin } from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  mathNotation: string;
  gradient: string;
  borderGlow: string;
  definition: string;
  urbanCase: string;
  urbanTitle: string;
}

const CARDS: CardData[] = [
  {
    id: 'scalar',
    title: '스칼라 (Scalar)',
    subtitle: '크기만 가지고 있는 단일 값',
    mathNotation: 'c \\in \\mathbb{R}',
    gradient: 'from-amber-500/10 via-orange-500/10 to-yellow-500/5',
    borderGlow: 'group-hover:border-amber-500/40 border-slate-800',
    definition: '선형대수학에서 스칼라는 벡터 공간의 원소인 벡터와 대비되는 개념으로, 방향이 없고 오직 "크기(magnitude)"만 가지는 실수 또는 복소수 단일 값입니다. 벡터의 길이를 늘리거나 줄이는 배율(Scale) 역할을 수행합니다.',
    urbanTitle: '도시 온도 및 대기 오염도 수치',
    urbanCase: '도시 센서 네트워크에서 수집된 특정 지점의 현재 온도(25.4°C), 미세먼지 농도(35㎍/m³), 또는 토지 공시지가(원/㎡) 등 공간적 방향성 없이 수치 자체로 존재하는 정량적 지표입니다.'
  },
  {
    id: 'vector',
    title: '벡터 (Vector)',
    subtitle: '크기와 방향을 가진 다차원 값',
    mathNotation: '\\mathbf{v} = [x, y]^T \\in \\mathbb{R}^2',
    gradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/5',
    borderGlow: 'group-hover:border-emerald-500/40 border-slate-800',
    definition: '방향과 크기를 동시에 가지는 물리량 혹은 여러 숫자의 순서쌍입니다. 기하학적으로는 원점에서 특정 점으로 향하는 화살표로 표현되며, 대수학적으로는 열이나 행으로 배열된 수의 리스트(1차원 배열)입니다.',
    urbanTitle: '출퇴근 이동 흐름 (O-D 벡터)',
    urbanCase: '특정 통계구역 A(출발지)에서 구역 B(목적지)로 이동하는 통행 인구 수와 방향, 또는 기상 관측망에서의 바람의 풍향과 풍속(m/s)을 2차원 또는 3차원 공간 벡터 형태로 모델링하여 분석합니다.'
  },
  {
    id: 'matrix',
    title: '행렬 (Matrix)',
    subtitle: '공간을 변형하는 2차원 숫자 격자',
    mathNotation: '\\mathbf{A} \\in \\mathbb{R}^{2 \\times 2}',
    gradient: 'from-violet-500/10 via-indigo-500/10 to-purple-500/5',
    borderGlow: 'group-hover:border-violet-500/40 border-slate-800',
    definition: '가로(행)와 세로(열)로 배치된 수의 2차원 격자입니다. 선형대수학적 관점에서 행렬은 고정된 숫자의 표가 아니라, 하나의 벡터 공간을 다른 벡터 공간으로 매핑(회전, 확대/축소, 전단 등)하는 "선형 변환(Linear Transformation)" 함수 자체를 나타냅니다.',
    urbanTitle: '도시 공간 가중치 및 인접성 행렬',
    urbanCase: '도시 도로망 네트워크에서 도로 교차점 간의 연결 관계(Adjacency)나, 공간 분석법(Spatial Autocorrelation)에서 행정구역 간 상호 영향력을 정의하는 공간 가중치 행렬(W) 등으로 사용되어 물리적 관계를 수학화합니다.'
  }
];

export default function FlashCard() {
  const [activeCard, setActiveCard] = useState<string>('scalar');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // 1. Scalar Interactive State
  const [scalarK, setScalarK] = useState<number>(1.2);

  // 2. Vector Interactive State
  const [vecX, setVecX] = useState<number>(3);
  const [vecY, setVecY] = useState<number>(2);

  // 3. Matrix Interactive State
  const [matrixPreset, setMatrixPreset] = useState<'identity' | 'scale' | 'shear' | 'rotate'>('identity');

  const getMatrixValues = () => {
    switch (matrixPreset) {
      case 'scale':
        return { a: 1.5, b: 0, c: 0, d: 1.5 };
      case 'shear':
        return { a: 1, b: 1, c: 0, d: 1 };
      case 'rotate':
        return { a: 0.7, b: -0.7, c: 0.7, d: 0.7 }; // Approx 45 deg
      case 'identity':
      default:
        return { a: 1, b: 0, c: 0, d: 1 };
    }
  };

  const handleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentMatrix = getMatrixValues();

  return (
    <div className="w-full flex flex-col h-full">
      {/* Category selector navigation */}
      <div className="flex bg-slate-950/60 p-1 rounded-xl gap-1 mb-6 border border-slate-800/80 mx-4">
        {CARDS.map(card => (
          <button
            key={card.id}
            onClick={() => setActiveCard(card.id)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
              activeCard === card.id
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {card.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Main Flashcard Viewport */}
      <div className="flex-1 px-4 flex flex-col justify-center items-center">
        {CARDS.map((card) => {
          if (card.id !== activeCard) return null;
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="w-full max-w-[340px] h-[440px] perspective-1000 group cursor-pointer"
              onClick={() => handleFlip(card.id)}
            >
              {/* Card Container */}
              <div
                className={`w-full h-full duration-700 transform-style-3d relative rounded-3xl border transition-all ${
                  card.borderGlow
                } ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ==================== FRONT FACE ==================== */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br ${card.gradient} bg-slate-950 p-6 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Card Glow Border Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-full border border-indigo-800/30">
                        {card.id === 'scalar' ? '0-Dimension' : card.id === 'vector' ? '1-Dimension' : '2-Dimension'}
                      </span>
                      <h3 className="text-xl font-bold text-slate-100 mt-1">{card.title}</h3>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip(card.id);
                      }}
                      className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="개념 보기"
                    >
                      <RotateCw className="w-4 h-4 animate-spin-slow" />
                    </button>
                  </div>

                  {/* Dynamic Math Notation */}
                  <div className="my-2 text-center py-2 bg-slate-900/60 rounded-xl border border-slate-800/50 backdrop-blur-sm z-10">
                    <span className="text-sm font-mono text-indigo-300">
                      {card.id === 'scalar' && `c = ${scalarK.toFixed(1)} ∈ ℝ`}
                      {card.id === 'vector' && `v = [ ${vecX.toFixed(0)}, ${vecY.toFixed(0)} ]ᵀ`}
                      {card.id === 'matrix' && `A = [ [${currentMatrix.a}, ${currentMatrix.b}], [${currentMatrix.c}, ${currentMatrix.d}] ]`}
                    </span>
                  </div>

                  {/* Visualizer Area */}
                  <div className="flex-1 flex flex-col justify-center items-center relative min-h-[140px] z-10">
                    {/* SCALAR VISUALIZER */}
                    {card.id === 'scalar' && (
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="relative flex items-center justify-center w-32 h-32">
                          {/* Inner glowing pulse circle */}
                          <div 
                            style={{ transform: `scale(${scalarK})` }}
                            className="absolute w-12 h-12 bg-amber-500/20 rounded-full blur-md transition-all duration-300"
                          />
                          <div 
                            style={{ transform: `scale(${scalarK})` }}
                            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border border-amber-300 shadow-lg shadow-amber-950/50 flex items-center justify-center transition-all duration-300"
                          >
                            <span className="text-xs font-black text-slate-950">c</span>
                          </div>
                        </div>
                        {/* Interactive Controls */}
                        <div 
                          className="w-full px-4 mt-2"
                          onClick={(e) => e.stopPropagation()} // Prevent card flip on sliding
                        >
                          <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                            <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <input
                              type="range"
                              min="0.5"
                              max="2.0"
                              step="0.1"
                              value={scalarK}
                              onChange={(e) => setScalarK(parseFloat(e.target.value))}
                              className="w-full accent-amber-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-amber-400 w-8 text-right font-bold">{scalarK.toFixed(1)}x</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* VECTOR VISUALIZER */}
                    {card.id === 'vector' && (
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="relative w-36 h-36 border border-slate-800/80 rounded-xl bg-slate-950/80 flex items-center justify-center overflow-hidden">
                          {/* Coordinate axes */}
                          <div className="absolute inset-0 flex items-center"><div className="w-full h-[1px] bg-slate-800" /></div>
                          <div className="absolute inset-0 flex justify-center"><div className="w-[1px] h-full bg-slate-800" /></div>
                          {/* Grid Ticks */}
                          <div className="absolute text-[8px] text-slate-600 top-1 right-2">y</div>
                          <div className="absolute text-[8px] text-slate-600 bottom-2 right-4">x</div>
                          
                          {/* Animated SVG Vector line */}
                          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                            <defs>
                              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" className="fill-emerald-400" />
                              </marker>
                            </defs>
                            {/* Line from center (50,50) to end point */}
                            {/* We map slider values (-4 to 4) to coordinate bounds (10 to 90) */}
                            {(() => {
                              const endX = 50 + (vecX * 8);
                              const endY = 50 - (vecY * 8); // In SVG, Y decreases upwards
                              return (
                                <>
                                  <line
                                    x1="50"
                                    y1="50"
                                    x2={endX}
                                    y2={endY}
                                    stroke="url(#emerald-grad)"
                                    strokeWidth="2.5"
                                    markerEnd="url(#arrow)"
                                    className="transition-all duration-300"
                                  />
                                  <circle cx={endX} cy={endY} r="3" className="fill-emerald-300 animate-ping" />
                                  <circle cx={endX} cy={endY} r="2" className="fill-emerald-400" />
                                </>
                              );
                            })()}
                            <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </svg>
                        </div>

                        {/* Interactive Vector Controls */}
                        <div 
                          className="w-full px-2 mt-2 space-y-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 items-center">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold w-4">X</span>
                            <input
                              type="range"
                              min="-4"
                              max="4"
                              step="1"
                              value={vecX}
                              onChange={(e) => setVecX(parseInt(e.target.value))}
                              className="w-full accent-emerald-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-emerald-400 w-4 text-right">{vecX}</span>
                          </div>
                          <div className="flex gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 items-center">
                            <span className="text-[10px] font-mono text-cyan-400 font-bold w-4">Y</span>
                            <input
                              type="range"
                              min="-4"
                              max="4"
                              step="1"
                              value={vecY}
                              onChange={(e) => setVecY(parseInt(e.target.value))}
                              className="w-full accent-cyan-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-cyan-400 w-4 text-right">{vecY}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MATRIX VISUALIZER */}
                    {card.id === 'matrix' && (
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="relative w-36 h-36 border border-slate-800/80 rounded-xl bg-slate-950/80 flex items-center justify-center overflow-hidden">
                          {/* Axes */}
                          <div className="absolute inset-0 flex items-center"><div className="w-full h-[1px] bg-slate-800" /></div>
                          <div className="absolute inset-0 flex justify-center"><div className="w-[1px] h-full bg-slate-800" /></div>
                          
                          {/* Transformed Vector Representation SVG */}
                          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                            {/* Dotted grid of unit square */}
                            <rect x="30" y="30" width="20" height="20" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2" />
                            
                            {/* Transformed shape based on currentMatrix values */}
                            {(() => {
                              // Standard coordinates for unit grid: 
                              // Original Points: O(0,0), P1(1,0), P2(1,1), P3(0,1)
                              // In SVG coords (Origin at 50, 50, scale factor 20):
                              // x_svg = 50 + (x * 20)
                              // y_svg = 50 - (y * 20)
                              
                              const transformPoint = (x: number, y: number) => {
                                const tx = currentMatrix.a * x + currentMatrix.b * y;
                                const ty = currentMatrix.c * x + currentMatrix.d * y;
                                return { x: 50 + (tx * 20), y: 50 - (ty * 20) };
                              };

                              const p0 = transformPoint(0, 0);
                              const p1 = transformPoint(1, 0);
                              const p2 = transformPoint(1, 1);
                              const p3 = transformPoint(0, 1);

                              const pointsStr = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;

                              return (
                                <>
                                  {/* Transformed polygon grid */}
                                  <polygon
                                    points={pointsStr}
                                    fill="url(#violet-grad)"
                                    fillOpacity="0.2"
                                    stroke="#8b5cf6"
                                    strokeWidth="2"
                                    className="transition-all duration-500"
                                  />
                                  {/* Original vectors directions */}
                                  <line x1="50" y1="50" x2={p1.x} y2={p1.y} stroke="#ec4899" strokeWidth="2" className="transition-all duration-500" />
                                  <line x1="50" y1="50" x2={p3.x} y2={p3.y} stroke="#3b82f6" strokeWidth="2" className="transition-all duration-500" />
                                </>
                              );
                            })()}
                            
                            <linearGradient id="violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                          </svg>
                        </div>

                        {/* Interactive Matrix Presets */}
                        <div 
                          className="w-full px-1 mt-2.5 grid grid-cols-2 gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {(['identity', 'scale', 'shear', 'rotate'] as const).map((preset) => (
                            <button
                              key={preset}
                              onClick={() => setMatrixPreset(preset)}
                              className={`py-1 text-[10px] font-semibold rounded-lg border uppercase transition-all duration-200 ${
                                matrixPreset === preset
                                  ? 'bg-violet-600 border-violet-500 text-white shadow-sm'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                              }`}
                            >
                              {preset === 'identity' && '항등 (Id)'}
                              {preset === 'scale' && '확대 (Scale)'}
                              {preset === 'shear' && '전단 (Shear)'}
                              {preset === 'rotate' && '회전 (Rotate)'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Action Hint */}
                  <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900 pt-3 z-10">
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3 text-indigo-500/80" />
                      {card.subtitle}
                    </span>
                    <span className="flex items-center gap-1 font-bold animate-pulse text-indigo-400/80">
                      뒤집어 개념 확인 🔄
                    </span>
                  </div>
                </div>

                {/* ==================== BACK FACE ==================== */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between overflow-y-auto"
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/30">
                        Concept Details
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlip(card.id);
                        }}
                        className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                        title="카드로 돌아가기"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mt-2">{card.title} 정의</h3>
                    <p className="text-xs text-slate-350 leading-relaxed mt-2.5 bg-slate-900/50 p-3 rounded-xl border border-slate-850">
                      {card.definition}
                    </p>
                  </div>

                  {/* Space Spacer */}
                  <div className="my-3 border-t border-slate-900" />

                  {/* Urban Big Data Application Case */}
                  <div>
                    <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      도시 빅데이터 연구 활용 사례
                    </h4>
                    <div className="bg-indigo-950/10 border border-indigo-900/30 p-3 rounded-xl">
                      <h5 className="text-[11px] font-bold text-indigo-300 mb-1">{card.urbanTitle}</h5>
                      <p className="text-[10.5px] text-slate-400 leading-relaxed">
                        {card.urbanCase}
                      </p>
                    </div>
                  </div>

                  {/* Tap to return helper */}
                  <div className="text-center text-[10px] text-slate-500 pt-3 border-t border-slate-900 mt-3">
                    화면 아무 곳이나 누르면 앞으로 돌아갑니다
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
