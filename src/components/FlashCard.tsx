'use client';

import React, { useState } from 'react';
import { Sliders, RotateCw, Database, MapPin, CheckCircle2, XCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

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
  },
  {
    id: 'matrix_mult',
    title: '행렬곱 (Matrix Multiplication)',
    subtitle: '행과 열의 상호작용을 통한 새로운 차원 결합',
    mathNotation: '\\mathbf{C} = \\mathbf{A} \\mathbf{B} \\in \\mathbb{R}^{2 \\times 2}',
    gradient: 'from-blue-500/10 via-indigo-500/10 to-violet-500/5',
    borderGlow: 'group-hover:border-blue-500/40 border-slate-800',
    definition: '두 행렬의 곱셈은 왼쪽 행렬의 행 벡터와 오른쪽 행렬의 열 벡터 간의 내적(Dot Product)을 통해 새로운 행렬을 구성하는 연산입니다. 이는 연쇄적인 선형 변환이나 시스템의 연속 동작을 하나의 결합된 변환으로 표현하는 핵심 도구입니다.',
    urbanTitle: '인접 행렬 거듭제곱을 통한 도로망 연결성 분석',
    urbanCase: '도시 도로망에서 교차점들의 연결 여부를 나타낸 인접 행렬(A)을 거듭제곱(A², A³...)하면, 각 원소 c_ij는 교차점 i에서 j로 가는 특정 홉(hop) 수 내의 가능한 경로의 수가 됩니다. 이를 통해 대중교통 네트워크의 도달 가능성과 허브 지역의 연결성 강도를 분석할 수 있습니다.'
  },
  {
    id: 'eigen',
    title: '고유값/고유벡터 (Eigenvalues/vectors)',
    subtitle: '변환 속에서도 방향을 유지하는 선형대수의 축',
    mathNotation: '\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}',
    gradient: 'from-fuchsia-500/10 via-pink-500/10 to-rose-500/5',
    borderGlow: 'group-hover:border-fuchsia-500/40 border-slate-800',
    definition: '선형 변환 A를 가했을 때, 방향은 변하지 않고 오직 크기(배율)만 변하는 비영벡터(non-zero vector) v를 고유벡터(Eigenvector), 그 변하는 배율 λ를 고유값(Eigenvalue)이라고 합니다. 선형 공간의 본질적인 변화 축을 제공합니다.',
    urbanTitle: 'PCA 차원 축소 및 유동인구 이동 안정 상태 분석',
    urbanCase: '도시 내 미세먼지, 교통량 등 환경 지표들의 상관관계 행렬(Covariance)에서 최대 분산 방향을 찾기 위해 고유값 분해를 수행합니다. 또한, 행정구역 간 유동인구 전이 행렬의 정상 상태(Steady-state)를 나타내는 고유벡터(λ=1) 분석을 통해 장기적인 인구 분포의 평형 상태를 예측합니다.'
  },
  {
    id: 'pca',
    title: '주성분분석 (PCA)',
    subtitle: '최대 분산 축을 찾는 차원 축소 기법',
    mathNotation: '\\mathbf{y} = \\mathbf{W}^T \\mathbf{x}',
    gradient: 'from-cyan-500/10 via-blue-500/10 to-indigo-500/5',
    borderGlow: 'group-hover:border-cyan-500/40 border-slate-800',
    definition: '주성분 분석(PCA)은 데이터의 차원을 축소하면서 정보(분산)를 최대한 보존하는 선형 기하학적 기법입니다. 데이터 공분산 행렬의 고유벡터들을 구하고, 고유값이 큰 주성분 축(PC1, PC2 등)으로 데이터를 정사영하여 차원을 요약합니다.',
    urbanTitle: '도시 환경 지표의 차원 축소 및 다중공선성 해소',
    urbanCase: '지역별 녹지율, 소음, 대기오염, 범죄율 등 수십 개의 도시 변수 간 상관관계를 분석할 때 다중공선성이 발생합니다. PCA를 통해 이 변수들을 분산이 극대화되는 2~3개의 핵심 주성분 변수로 압축하여 도시 기후 변화 영향도를 모형화합니다.'
  },
  {
    id: 'markov',
    title: '마르코프 체인 (Markov Chain)',
    subtitle: '전이행렬 기반의 도시 공간 미래 상태 예측',
    mathNotation: '\\mathbf{v}_{t+1} = \\mathbf{P} \\mathbf{v}_t',
    gradient: 'from-emerald-500/10 via-green-500/10 to-teal-500/5',
    borderGlow: 'group-hover:border-emerald-500/40 border-slate-800',
    definition: '마르코프 체인은 과거 상태와 무관하게 현재 상태에 의해서만 미래 상태가 결정되는 확률 과정입니다. 각 공간 간의 이동 빈도를 확률화한 전이행렬 P를 상태 벡터에 계속 연산하면 시간이 흐름에 따라 정상 상태(Steady-state)에 수렴하게 됩니다.',
    urbanTitle: '생활인구 이동 흐름 및 토지 이용 전이 시뮬레이션',
    urbanCase: '시간대별 주거지, 상업지, 공업지 간 생활인구 전이 확률 P를 도출하여 최종적으로 수렴되는 지역별 유동인구 평형 분포를 도출합니다. 또는 미개발 녹지가 상업지나 주거지로 용도 변경되는 확률을 모델링하여 미래 도시 팽창을 예측합니다.'
  }
];

interface FlashCardProps {
  onQuizSubmit?: () => void;
}

export default function FlashCard({ onQuizSubmit }: FlashCardProps = {}) {
  const [activeCard, setActiveCard] = useState<string>('scalar');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // 1. Scalar Interactive State
  const [scalarK, setScalarK] = useState<number>(1.2);

  // 2. Vector Interactive State
  const [vecX, setVecX] = useState<number>(3);
  const [vecY, setVecY] = useState<number>(2);

  // 3. Matrix Interactive State
  const [matrixPreset, setMatrixPreset] = useState<'identity' | 'scale' | 'shear' | 'rotate'>('identity');

  // 4. Matrix Multiplication Interactive State
  const [matrixMultA12, setMatrixMultA12] = useState<number>(3);
  const [matrixMultB11, setMatrixMultB11] = useState<number>(1);
  const [selectedCell, setSelectedCell] = useState<'c11' | 'c12' | 'c21' | 'c22'>('c11');

  // 5. Eigenvalues/Eigenvectors Interactive State
  const [eigenK, setEigenK] = useState<number>(0.5);

  // 6. PCA Interactive State
  const [pcaAngle, setPcaAngle] = useState<number>(0);

  // 7. Markov Chain Interactive State
  const [markovP, setMarkovP] = useState<number>(0.5);
  const [markovPop, setMarkovPop] = useState<[number, number, number]>([33.3, 33.3, 33.3]);
  const [markovStep, setMarkovStep] = useState<number>(0);

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
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-950/60 p-1 rounded-xl gap-1 mb-6 border border-slate-800/80 mx-4">
        {CARDS.map(card => (
          <button
            key={card.id}
            onClick={() => setActiveCard(card.id)}
            className={`flex-1 shrink-0 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
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
            <div key={card.id} className="w-full flex flex-col items-center">
              <div
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
                        {card.id === 'scalar'
                          ? '0-Dimension'
                          : card.id === 'vector'
                          ? '1-Dimension'
                          : card.id === 'matrix'
                          ? '2-Dimension'
                          : card.id === 'matrix_mult'
                          ? 'Matrix Ops'
                          : card.id === 'eigen'
                          ? 'Spectral'
                          : card.id === 'pca'
                          ? 'Dim Reduction'
                          : 'Markov Chain'}
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
                      {card.id === 'matrix_mult' && `C = A × B ∈ ℝ²ˣ²`}
                      {card.id === 'eigen' && `A v = λ v`}
                      {card.id === 'pca' && `PC₁ = w₁x₁ + w₂x₂`}
                      {card.id === 'markov' && `v(t+1) = P v(t)`}
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

                    {/* MATRIX MULTIPLICATION VISUALIZER */}
                    {card.id === 'matrix_mult' && (
                      <div className="flex flex-col items-center justify-center w-full px-1">
                        {/* Matrix Formula Visual */}
                        <div className="flex items-center gap-1 text-[11px] mb-3 select-none">
                          {/* Matrix A */}
                          <div className="relative border-l-2 border-r-2 border-slate-400 px-1 py-1 flex flex-col justify-center bg-slate-900/60 rounded-sm">
                            <div className="flex gap-2">
                              <span className={`w-6 text-center font-mono transition-colors ${['c11', 'c12'].includes(selectedCell) ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>2</span>
                              <span className={`w-6 text-center font-mono transition-colors ${['c11', 'c12'].includes(selectedCell) ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>{matrixMultA12}</span>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <span className={`w-6 text-center font-mono transition-colors ${['c21', 'c22'].includes(selectedCell) ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>1</span>
                              <span className={`w-6 text-center font-mono transition-colors ${['c21', 'c22'].includes(selectedCell) ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>-2</span>
                            </div>
                          </div>

                          <span className="text-slate-400 font-bold mx-0.5">×</span>

                          {/* Matrix B */}
                          <div className="relative border-l-2 border-r-2 border-slate-400 px-1 py-1 flex flex-col justify-center bg-slate-900/60 rounded-sm">
                            <div className="flex gap-2">
                              <span className={`w-6 text-center font-mono transition-colors ${['c11', 'c21'].includes(selectedCell) ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>{matrixMultB11}</span>
                              <span className={`w-6 text-center font-mono transition-colors ${['c12', 'c22'].includes(selectedCell) ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>2</span>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <span className={`w-6 text-center font-mono transition-colors ${['c11', 'c21'].includes(selectedCell) ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>3</span>
                              <span className={`w-6 text-center font-mono transition-colors ${['c12', 'c22'].includes(selectedCell) ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>4</span>
                            </div>
                          </div>

                          <span className="text-slate-400 font-bold mx-0.5">=</span>

                          {/* Matrix C */}
                          <div className="relative border-l-2 border-r-2 border-slate-400 px-1 py-1 flex flex-col justify-center bg-slate-900/60 rounded-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedCell('c11'); }}
                                className={`w-6 h-4 flex items-center justify-center font-mono text-[10px] rounded transition-all ${selectedCell === 'c11' ? 'bg-violet-600 border border-violet-400 text-white font-bold animate-pulse' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200'}`}
                              >
                                {(2 * matrixMultB11 + matrixMultA12 * 3)}
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedCell('c12'); }}
                                className={`w-6 h-4 flex items-center justify-center font-mono text-[10px] rounded transition-all ${selectedCell === 'c12' ? 'bg-violet-600 border border-violet-400 text-white font-bold animate-pulse' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200'}`}
                              >
                                {(4 + 4 * matrixMultA12)}
                              </button>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedCell('c21'); }}
                                className={`w-6 h-4 flex items-center justify-center font-mono text-[10px] rounded transition-all ${selectedCell === 'c21' ? 'bg-violet-600 border border-violet-400 text-white font-bold animate-pulse' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200'}`}
                              >
                                {(matrixMultB11 - 6)}
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedCell('c22'); }}
                                className={`w-6 h-4 flex items-center justify-center font-mono text-[10px] rounded transition-all ${selectedCell === 'c22' ? 'bg-violet-600 border border-violet-400 text-white font-bold animate-pulse' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200'}`}
                              >
                                -6
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Cell Select Grid & Calculation Display */}
                        <div className="w-full bg-slate-900/80 p-2 border border-slate-800 rounded-xl text-[11px] mb-2.5">
                          <div className="flex justify-between items-center mb-1 border-b border-slate-800 pb-1">
                            <span className="text-[9.5px] text-slate-500 font-bold">계산 원소 선택:</span>
                            <div className="flex gap-0.5">
                              {(['c11', 'c12', 'c21', 'c22'] as const).map((cell) => (
                                <button
                                  key={cell}
                                  onClick={(e) => { e.stopPropagation(); setSelectedCell(cell); }}
                                  className={`px-1 py-0.5 text-[8.5px] rounded font-mono font-bold uppercase ${selectedCell === cell ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                >
                                  {cell}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Mathematical Dot Product Detail */}
                          <div className="space-y-0.5 text-slate-300 font-mono text-[9.5px] leading-relaxed">
                            {selectedCell === 'c11' && (
                              <>
                                <div className="text-amber-400">행 A₁: [2, {matrixMultA12}] · 열 B₁: [{matrixMultB11}, 3]ᵀ</div>
                                <div className="text-slate-400">c₁₁ = (2 × {matrixMultB11}) + ({matrixMultA12} × 3)</div>
                                <div className="text-violet-400 font-bold">c₁₁ = {2 * matrixMultB11} + {matrixMultA12 * 3} = {2 * matrixMultB11 + matrixMultA12 * 3}</div>
                              </>
                            )}
                            {selectedCell === 'c12' && (
                              <>
                                <div className="text-amber-400">행 A₁: [2, {matrixMultA12}] · 열 B₂: [2, 4]ᵀ</div>
                                <div className="text-slate-400">c₁₂ = (2 × 2) + ({matrixMultA12} × 4)</div>
                                <div className="text-violet-400 font-bold">c₁₂ = 4 + {matrixMultA12 * 4} = {4 + matrixMultA12 * 4}</div>
                              </>
                            )}
                            {selectedCell === 'c21' && (
                              <>
                                <div className="text-amber-400">행 A₂: [1, -2] · 열 B₁: [{matrixMultB11}, 3]ᵀ</div>
                                <div className="text-slate-400">c₂₁ = (1 × {matrixMultB11}) + (-2 × 3)</div>
                                <div className="text-violet-400 font-bold">c₂₁ = {matrixMultB11} - 6 = {matrixMultB11 - 6}</div>
                              </>
                            )}
                            {selectedCell === 'c22' && (
                              <>
                                <div className="text-amber-400">행 A₂: [1, -2] · 열 B₂: [2, 4]ᵀ</div>
                                <div className="text-slate-400">c₂₂ = (1 × 2) + (-2 × 4)</div>
                                <div className="text-violet-400 font-bold">c₂₂ = 2 - 8 = -6</div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Interactive Sliders for elements */}
                        <div 
                          className="w-full space-y-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex gap-2 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 items-center">
                            <span className="text-[9.5px] font-mono text-amber-400 font-bold w-12 shrink-0">변수 a₁₂</span>
                            <input
                              type="range"
                              min="-3"
                              max="5"
                              step="1"
                              value={matrixMultA12}
                              onChange={(e) => setMatrixMultA12(parseInt(e.target.value))}
                              className="w-full accent-amber-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-amber-400 w-4 text-right">{matrixMultA12}</span>
                          </div>
                          <div className="flex gap-2 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 items-center">
                            <span className="text-[9.5px] font-mono text-emerald-400 font-bold w-12 shrink-0">변수 b₁₁</span>
                            <input
                              type="range"
                              min="-3"
                              max="5"
                              step="1"
                              value={matrixMultB11}
                              onChange={(e) => setMatrixMultB11(parseInt(e.target.value))}
                              className="w-full accent-emerald-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-emerald-400 w-4 text-right">{matrixMultB11}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* EIGENVALUES / EIGENVECTORS VISUALIZER */}
                    {card.id === 'eigen' && (
                      <div className="flex flex-col items-center justify-center w-full px-1">
                        {/* 2D Grid Plot SVG */}
                        <div className="relative w-36 h-36 border border-slate-800/80 rounded-xl bg-slate-950/80 flex items-center justify-center overflow-hidden">
                          {/* Coordinate axes */}
                          <div className="absolute inset-0 flex items-center"><div className="w-full h-[1px] bg-slate-800" /></div>
                          <div className="absolute inset-0 flex justify-center"><div className="w-[1px] h-full bg-slate-800" /></div>
                          
                          {/* Span line for Eigenvector y = x */}
                          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                            {/* Dotted eigenspace span line */}
                            <line x1="8" y1="92" x2="92" y2="8" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3" strokeOpacity="0.4" />
                            
                            <defs>
                              <marker id="eigen-arrow-v" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" className="fill-emerald-400" />
                              </marker>
                              <marker id="eigen-arrow-av" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" className="fill-amber-400" />
                              </marker>
                              <marker id="eigen-arrow-x" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" className="fill-blue-400" />
                              </marker>
                              <marker id="eigen-arrow-ax" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" className="fill-fuchsia-400" />
                              </marker>
                            </defs>

                            {(() => {
                              // Scaling factor mapping: x_svg = 50 + x * 14, y_svg = 50 - y * 14
                              const scale = 14;
                              const toSVG = (cx: number, cy: number) => ({
                                x: 50 + cx * scale,
                                y: 50 - cy * scale
                              });

                              // Eigenvector v = [1.5, 1.5]
                              const endV = toSVG(1.5, 1.5);
                              
                              // Transformed Eigenvector Av = (1.5 + k) * [1.5, 1.5]
                              const lambda = 1.5 + eigenK;
                              const endAV = toSVG(1.5 * lambda, 1.5 * lambda);

                              // Normal vector x = [2.0, 0.5]
                              const endX = toSVG(2.0, 0.5);

                              // Transformed normal vector Ax = [3.0 + 0.5k, 2.0k + 0.75]
                              const endAX = toSVG(3.0 + 0.5 * eigenK, 2.0 * eigenK + 0.75);

                              return (
                                <>
                                  {/* Transformed Non-Eigenvector Ax (Fuchsia) */}
                                  <line x1="50" y1="50" x2={endAX.x} y2={endAX.y} stroke="#e879f9" strokeWidth="2" markerEnd="url(#eigen-arrow-ax)" className="transition-all duration-300" />
                                  
                                  {/* Non-Eigenvector x (Blue) */}
                                  <line x1="50" y1="50" x2={endX.x} y2={endX.y} stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="1.5" markerEnd="url(#eigen-arrow-x)" />

                                  {/* Transformed Eigenvector Av (Amber) */}
                                  <line x1="50" y1="50" x2={endAV.x} y2={endAV.y} stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#eigen-arrow-av)" className="transition-all duration-300" />
                                  
                                  {/* Eigenvector v (Emerald) */}
                                  <line x1="50" y1="50" x2={endV.x} y2={endV.y} stroke="#34d399" strokeWidth="1.5" strokeDasharray="1.5" markerEnd="url(#eigen-arrow-v)" />

                                  {/* Labels */}
                                  <text x={endV.x - 3} y={endV.y + 12} fill="#34d399" fontSize="7" fontWeight="bold">v</text>
                                  <text x={endAV.x + 3} y={endAV.y - 4} fill="#fbbf24" fontSize="7" fontWeight="bold">Av</text>
                                  <text x={endX.x + 3} y={endX.y + 7} fill="#60a5fa" fontSize="7" fontWeight="bold">x</text>
                                  <text x={endAX.x + 4} y={endAX.y - 2} fill="#e879f9" fontSize="7" fontWeight="bold">Ax</text>
                                </>
                              );
                            })()}
                          </svg>
                        </div>

                        {/* Formula Av = lambda v mapping */}
                        <div className="w-full bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-[10px] mt-1.5 mb-1.5">
                          <div className="text-center font-bold text-[9px] text-slate-500 mb-1 border-b border-slate-800 pb-0.5 uppercase tracking-wider">
                            고유벡터 성질: Av = λv
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 text-center text-slate-300 font-mono text-[8.5px]">
                            {/* Eigenvector mapping */}
                            <div className="border-r border-slate-800 pr-1">
                              <span className="text-emerald-400 font-bold">고유벡터 v</span>
                              <div className="mt-0.5 flex items-center justify-center gap-0.5 text-slate-400">
                                <span>Av =</span>
                                <span className="text-amber-400 font-bold">{(1.5 + eigenK).toFixed(1)}</span>
                                <span>v</span>
                              </div>
                              <div className="text-[7.5px] text-slate-500">(방향 유지, 길이 변형)</div>
                            </div>
                            
                            {/* General vector mapping */}
                            <div className="pl-1">
                              <span className="text-blue-400 font-bold">일반벡터 x</span>
                              <div className="mt-0.5 flex items-center justify-center gap-0.5 text-slate-400">
                                <span>Ax ≠</span>
                                <span className="text-fuchsia-400">λ</span>
                                <span>x</span>
                              </div>
                              <div className="text-[7.5px] text-slate-500">(방향 및 길이 모두 변형)</div>
                            </div>
                          </div>
                        </div>

                        {/* Matrix Slider for Parameter k */}
                        <div 
                          className="w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex gap-2 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 items-center">
                            <span className="text-[9.5px] font-mono text-slate-400 font-bold shrink-0">행렬 원소 k:</span>
                            <input
                              type="range"
                              min="-1.0"
                              max="1.0"
                              step="0.1"
                              value={eigenK}
                              onChange={(e) => setEigenK(parseFloat(e.target.value))}
                              className="w-full accent-fuchsia-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-fuchsia-400 w-8 text-right font-bold">{eigenK.toFixed(1)}</span>
                          </div>
                          
                          <div className="text-center font-mono text-[8.5px] text-slate-500 mt-0.5">
                            A = [ [1.5, {eigenK.toFixed(1)}], [{eigenK.toFixed(1)}, 1.5] ]
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PCA VISUALIZER */}
                    {card.id === 'pca' && (
                      <div className="flex flex-col items-center justify-center w-full px-1">
                        {/* 2D Coordinate Scatter Plot */}
                        <div className="relative w-36 h-36 border border-slate-800/80 rounded-xl bg-slate-950/80 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 flex items-center"><div className="w-full h-[1px] bg-slate-850" /></div>
                          <div className="absolute inset-0 flex justify-center"><div className="w-[1px] h-full bg-slate-850" /></div>
                          
                          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                            {(() => {
                              // Zero-centered correlated points
                              // Income (x) vs Population (y)
                              const dataPoints = [
                                { x: -2.0, y: -1.0 },
                                { x: -1.5, y: -1.2 },
                                { x: -1.0, y: -0.5 },
                                { x: -0.5, y: -0.1 },
                                { x: 0.0, y: 0.2 },
                                { x: 0.5, y: 0.1 },
                                { x: 1.0, y: 0.7 },
                                { x: 1.5, y: 0.9 },
                                { x: 2.0, y: 1.3 },
                                { x: 0.2, y: -0.3 },
                                { x: -0.8, y: 0.3 },
                                { x: 1.2, y: 0.3 }
                              ];
                              
                              const scale = 14;
                              const rad = (pcaAngle * Math.PI) / 180;
                              const ux = Math.cos(rad);
                              const uy = Math.sin(rad);

                              return (
                                <>
                                  {/* PC1 Projection Line */}
                                  <line 
                                    x1={50 - 45 * ux} 
                                    y1={50 + 45 * uy} 
                                    x2={50 + 45 * ux} 
                                    y2={50 - 45 * uy} 
                                    stroke="#06b6d4" 
                                    strokeWidth="1.5" 
                                    strokeDasharray="2"
                                  />
                                  
                                  {/* Projections & Original points */}
                                  {dataPoints.map((pt, idx) => {
                                    const sx = 50 + pt.x * scale;
                                    const sy = 50 - pt.y * scale;
                                    
                                    const d = pt.x * ux + pt.y * uy;
                                    const px = 50 + (d * ux) * scale;
                                    const py = 50 - (d * uy) * scale;
                                    
                                    return (
                                      <g key={idx}>
                                        {/* Projection dotted line */}
                                        <line 
                                          x1={sx} 
                                          y1={sy} 
                                          x2={px} 
                                          y2={py} 
                                          stroke="#334155" 
                                          strokeWidth="0.8" 
                                          strokeDasharray="1" 
                                        />
                                        {/* Projected point on PC1 (cyan glowing) */}
                                        <circle cx={px} cy={py} r="2" className="fill-cyan-400 animate-pulse" />
                                        {/* Original point (blue) */}
                                        <circle cx={sx} cy={sy} r="2.5" className="fill-blue-500/80 stroke stroke-slate-950" strokeWidth="0.5" />
                                      </g>
                                    );
                                  })}
                                  <text x="75" y="16" fill="#06b6d4" fontSize="6" fontWeight="bold">PC1</text>
                                </>
                              );
                            })()}
                          </svg>
                        </div>

                        {/* Variance Gauge & Angle Info */}
                        {(() => {
                          const dataPoints = [
                            { x: -2.0, y: -1.0 }, { x: -1.5, y: -1.2 }, { x: -1.0, y: -0.5 },
                            { x: -0.5, y: -0.1 }, { x: 0.0, y: 0.2 }, { x: 0.5, y: 0.1 },
                            { x: 1.0, y: 0.7 }, { x: 1.5, y: 0.9 }, { x: 2.0, y: 1.3 },
                            { x: 0.2, y: -0.3 }, { x: -0.8, y: 0.3 }, { x: 1.2, y: 0.3 }
                          ];
                          const rad = (pcaAngle * Math.PI) / 180;
                          const ux = Math.cos(rad);
                          const uy = Math.sin(rad);
                          let sumSq = 0;
                          dataPoints.forEach(pt => {
                            const d = pt.x * ux + pt.y * uy;
                            sumSq += d * d;
                          });
                          const variance = sumSq / dataPoints.length;
                          
                          const maxPossibleVar = 2.5;
                          const progress = Math.min((variance / maxPossibleVar) * 100, 100);

                          return (
                            <div className="w-full mt-1.5">
                              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-[10px] mb-2">
                                <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold mb-1 border-b border-slate-800 pb-0.5">
                                  <span>PC1 회전 각도: {pcaAngle}°</span>
                                  <span className="text-cyan-400 font-bold">사영 분산: {variance.toFixed(3)}</span>
                                </div>
                                
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="text-[8.5px] text-slate-500 shrink-0 font-bold">정보량(분산)</span>
                                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850 relative">
                                    <div 
                                      style={{ width: `${progress}%` }} 
                                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                                    />
                                    <div className="absolute left-[85%] top-0 bottom-0 w-[2px] bg-emerald-500/60" title="최대 분산 지점" />
                                  </div>
                                  <span className="text-[9px] font-mono text-cyan-400 font-bold w-7 text-right">{Math.round(progress)}%</span>
                                </div>
                                <div className="text-[7.5px] text-slate-500 text-center mt-0.5">
                                  💡 약 30° 각도 부근에서 분산 수치(정보 보존량)가 최대화됩니다.
                                </div>
                              </div>

                              <div 
                                className="w-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex gap-2 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 items-center">
                                  <span className="text-[9.5px] font-mono text-slate-400 font-bold shrink-0">축 각도 θ:</span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="180"
                                    step="5"
                                    value={pcaAngle}
                                    onChange={(e) => setPcaAngle(parseInt(e.target.value))}
                                    className="w-full accent-cyan-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                                  />
                                  <span className="text-xs font-mono text-cyan-400 w-8 text-right font-bold">{pcaAngle}°</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* MARKOV CHAIN VISUALIZER */}
                    {card.id === 'markov' && (
                      <div className="flex flex-col items-center justify-center w-full px-1">
                        {/* Network Graph A, B, C */}
                        <div className="relative w-36 h-36 border border-slate-800/80 rounded-xl bg-slate-950/80 flex items-center justify-center overflow-hidden">
                          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                            <defs>
                              <marker id="markov-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                                <path d="M 0 2 L 8 5 L 0 8 z" className="fill-slate-600" />
                              </marker>
                            </defs>
                            
                            {(() => {
                              const nodeA = { x: 50, y: 24 };
                              const nodeB = { x: 24, y: 72 };
                              const nodeC = { x: 76, y: 72 };

                              const pAB = 0.2 + 0.3 * markovP;
                              const pCB = 0.1;

                              const pBA = 0.3;
                              const pCA = 0.1;

                              const pAC = 0.2;
                              const pBC = 0.2;

                              const getRadius = (percentage: number) => {
                                return 5 + (percentage / 100) * 11;
                              };

                              const rA = getRadius(markovPop[0]);
                              const rB = getRadius(markovPop[1]);
                              const rC = getRadius(markovPop[2]);

                              return (
                                <>
                                  {/* Directed Paths (Flow arrows) */}
                                  <path d="M 50 24 Q 32 44 24 72" fill="none" stroke="#475569" strokeWidth={0.5 + pBA * 4} markerEnd="url(#markov-arrow)" />
                                  <path d="M 24 72 Q 42 52 50 24" fill="none" stroke="#475569" strokeWidth={0.5 + pAB * 4} markerEnd="url(#markov-arrow)" />
                                  <path d="M 24 72 Q 50 82 76 72" fill="none" stroke="#475569" strokeWidth={0.5 + pCB * 4} markerEnd="url(#markov-arrow)" />
                                  <path d="M 76 72 Q 50 62 24 72" fill="none" stroke="#475569" strokeWidth={0.5 + pBC * 4} markerEnd="url(#markov-arrow)" />
                                  <path d="M 76 72 Q 58 44 50 24" fill="none" stroke="#475569" strokeWidth={0.5 + pAC * 4} markerEnd="url(#markov-arrow)" />
                                  <path d="M 50 24 Q 68 52 76 72" fill="none" stroke="#475569" strokeWidth={0.5 + pCA * 4} markerEnd="url(#markov-arrow)" />

                                  {/* Nodes */}
                                  <circle cx={nodeA.x} cy={nodeA.y} r={rA} className="fill-indigo-600/30 stroke stroke-indigo-500 transition-all duration-500" strokeWidth="1.5" />
                                  <text x={nodeA.x} y={nodeA.y + 1.5} fill="#e2e8f0" fontSize="4.5" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">상업 A</text>
                                  
                                  <circle cx={nodeB.x} cy={nodeB.y} r={rB} className="fill-emerald-600/30 stroke stroke-emerald-500 transition-all duration-500" strokeWidth="1.5" />
                                  <text x={nodeB.x} y={nodeB.y + 1.5} fill="#e2e8f0" fontSize="4.5" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">주거 B</text>
                                  
                                  <circle cx={nodeC.x} cy={nodeC.y} r={rC} className="fill-amber-600/30 stroke stroke-amber-500 transition-all duration-500" strokeWidth="1.5" />
                                  <text x={nodeC.x} y={nodeC.y + 1.5} fill="#e2e8f0" fontSize="4.5" fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">공업 C</text>
                                </>
                              );
                            })()}
                          </svg>
                        </div>

                        {/* Markov Simulation Panel */}
                        <div className="w-full mt-1.5 bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-[9.5px] mb-2 select-none">
                          <div className="flex justify-between items-center text-[8.5px] text-slate-500 font-bold mb-1 border-b border-slate-800 pb-0.5">
                            <span>시뮬레이션 시간: Step {markovStep}</span>
                            <span className="text-emerald-400 font-bold">인구 비율 합: 100%</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1 text-center font-mono text-[8px] py-1">
                            <div className="bg-indigo-950/20 border border-indigo-900/20 rounded py-0.5">
                              <p className="text-[7px] text-indigo-400">상업 A</p>
                              <p className="text-[10px] font-bold text-slate-100">{markovPop[0].toFixed(1)}%</p>
                            </div>
                            <div className="bg-emerald-950/20 border border-emerald-900/20 rounded py-0.5">
                              <p className="text-[7px] text-emerald-400">주거 B</p>
                              <p className="text-[10px] font-bold text-slate-100">{markovPop[1].toFixed(1)}%</p>
                            </div>
                            <div className="bg-amber-950/20 border border-amber-900/20 rounded py-0.5">
                              <p className="text-[7px] text-amber-400">공업 C</p>
                              <p className="text-[10px] font-bold text-slate-100">{markovPop[2].toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          {/* Controller Buttons */}
                          <div className="grid grid-cols-2 gap-1.5 mt-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                const pAB = 0.2 + 0.3 * markovP;
                                const pBB = 0.7 - 0.3 * markovP;
                                const pCB = 0.1;
                                
                                const newA = 0.6 * markovPop[0] + pAB * markovPop[1] + 0.2 * markovPop[2];
                                const newB = 0.3 * markovPop[0] + pBB * markovPop[1] + 0.2 * markovPop[2];
                                const newC = 0.1 * markovPop[0] + pCB * markovPop[1] + 0.6 * markovPop[2];
                                
                                setMarkovPop([newA, newB, newC]);
                                setMarkovStep(prev => prev + 1);
                              }}
                              className="py-1 text-[8.5px] font-bold rounded-lg border border-slate-800 bg-slate-950 text-indigo-400 hover:text-indigo-300 hover:bg-slate-900 cursor-pointer"
                            >
                              ⏳ 1단계 진행 (Step)
                            </button>
                            
                            <button
                              onClick={() => {
                                const pAB = 0.2 + 0.3 * markovP;
                                const pBB = 0.7 - 0.3 * markovP;
                                const pCB = 0.1;
                                
                                let current = [...markovPop];
                                for (let i = 0; i < 30; i++) {
                                  const newA = 0.6 * current[0] + pAB * current[1] + 0.2 * current[2];
                                  const newB = 0.3 * current[0] + pBB * current[1] + 0.2 * current[2];
                                  const newC = 0.1 * current[0] + pCB * current[1] + 0.6 * current[2];
                                  current = [newA, newB, newC];
                                }
                                setMarkovPop([current[0], current[1], current[2]]);
                                setMarkovStep(prev => prev + 30);
                              }}
                              className="py-1 text-[8.5px] font-bold rounded-lg border border-emerald-900/30 bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 cursor-pointer"
                            >
                              ⚡ 안정 수렴 (Steady)
                            </button>
                          </div>
                        </div>

                        {/* Transition probability slider */}
                        <div 
                          className="w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex gap-2 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800 items-center">
                            <span className="text-[8.5px] font-mono text-slate-400 font-bold shrink-0">주거지 유출 p:</span>
                            <input
                              type="range"
                              min="0.0"
                              max="1.0"
                              step="0.1"
                              value={markovP}
                              onChange={(e) => {
                                setMarkovP(parseFloat(e.target.value));
                                setMarkovPop([33.3, 33.3, 33.3]);
                                setMarkovStep(0);
                              }}
                              className="w-full accent-emerald-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                            />
                            <span className="text-xs font-mono text-emerald-400 w-8 text-right font-bold">{markovP.toFixed(1)}</span>
                          </div>
                          
                          <div className="text-center font-mono text-[7.5px] text-slate-500 mt-0.5">
                            P(주거→상업) = {(0.2 + 0.3 * markovP).toFixed(2)} | P(주거→주거) = {(0.7 - 0.3 * markovP).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

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
            <QuizSection key={card.id} conceptId={card.id} onSubmitted={onQuizSubmit} />
          </div>
        );
      })}
    </div>
  </div>
);
}

// ==================== 퀴즈 시스템 데이터 및 컴포넌트 ====================

interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Record<string, QuizQuestion> = {
  scalar: {
    question: "선형대수학에서 스칼라(Scalar)의 설명으로 가장 올바르지 않은 것은 무엇인가요?",
    options: [
      "오직 크기만 가지며 방향은 없다.",
      "벡터에 곱해져서 길이를 배율 조정(Scaling)할 수 있다.",
      "대표적인 예시로 도시 센서의 온도, 기압 수치가 있다.",
      "2차원 평면에서의 특정 이동 경로의 방향을 나타낸다."
    ],
    answerIndex: 3,
    explanation: "스칼라는 방향 없이 크기만 가지는 단일 수치입니다. 특정 이동 경로의 방향을 갖는 물리량은 벡터(Vector)입니다."
  },
  vector: {
    question: "2차원 벡터 v = [3, 4]ᵀ의 길이는 얼마인가요?",
    options: ["5", "7", "12", "25"],
    answerIndex: 0,
    explanation: "벡터의 길이(L2 Norm)는 각 성분의 제곱합의 제곱근입니다. 즉, √(3² + 4²) = √(9 + 16) = √25 = 5입니다."
  },
  matrix: {
    question: "선형 변환으로서의 행렬 A = [[0, -1], [1, 0]]가 벡터에 가해질 때 기하학적으로 어떻게 변형되나요?",
    options: [
      "원점을 기준으로 반시계 방향으로 90도 회전한다.",
      "x축 방향으로 2배 확대된다.",
      "y축을 기준으로 대칭 이동한다.",
      "원점을 기준으로 시계 방향으로 90도 회전한다."
    ],
    answerIndex: 0,
    explanation: "이 행렬에 기저 벡터 [1, 0]ᵀ을 곱하면 [0, 1]ᵀ이 되고, [0, 1]ᵀ을 곱하면 [-1, 0]ᵀ이 됩니다. 이는 원점 기준 반시계 방향 90도 회전 변환을 의미합니다."
  },
  matrix_mult: {
    question: "행렬 A = [[2, 1], [0, 3]]와 B = [[1, 2], [3, 4]]의 곱 C = AB의 1행 1열 원소 c_11의 값은 무엇인가요?",
    options: ["2", "5", "8", "10"],
    answerIndex: 1,
    explanation: "c_11은 A의 1행 [2, 1]과 B의 1열 [1, 3]ᵀ의 내적입니다. 따라서 (2 × 1) + (1 × 3) = 2 + 3 = 5가 됩니다."
  },
  eigen: {
    question: "식 Av = λv가 성립할 때, 고유벡터 v와 고유값 λ의 기하학적 성질로 옳은 것은 무엇인가요?",
    options: [
      "변환 후에도 벡터의 방향이 동일 선상(y=x)에 유지되며 길이는 λ배가 된다.",
      "변환을 거치면 무조건 벡터의 길이가 0이 된다.",
      "변환 후 항상 x축과 평행하게 회전한다.",
      "변환 행렬 A의 모든 원소의 합과 크기가 항상 같다."
    ],
    answerIndex: 0,
    explanation: "고유벡터는 선형 변환 A를 가해도 방향은 변하지 않고(동일 선상에 유지), 오직 크기만 고유값 λ배만큼 스케일링되는 특별한 벡터입니다."
  },
  pca: {
    question: "주성분 분석(PCA)에서 데이터의 공분산 행렬을 고유값 분해했을 때, 가장 큰 고유값에 대응하는 고유벡터의 기하학적 의미는 무엇인가요?",
    options: [
      "데이터의 분산(정보량)이 최소가 되는 축 방향이다.",
      "데이터의 분산(정보량)이 최대가 되는 제1주성분(PC1) 축 방향이다.",
      "모든 데이터 포인트를 원점으로 수렴시키는 이동 경로이다.",
      "데이터 간의 거리를 모두 동일하게 만드는 선형 차원이다."
    ],
    answerIndex: 1,
    explanation: "공분산 행렬의 가장 큰 고유값에 해당하는 고유벡터는 데이터의 분산(흩어짐 정도)이 가장 큰 방향을 나타내는 제1주성분(PC1) 축입니다. 이 축에 데이터를 사영해야 원래 정보의 손실이 가장 적습니다."
  },
  markov: {
    question: "마르코프 전이 행렬 P와 상태 벡터 v에 대해, 충분한 단계(Step) 진행 후 정상 상태(Steady State)에 도달해 Pv = v가 성립할 때, 상태 v는 선형대수학적으로 어떤 의미를 갖나요?",
    options: [
      "전이 행렬 P의 고유값 λ = 1에 대응하는 고유벡터이다.",
      "전이 행렬 P의 고유값 λ = 0에 대응하는 고유벡터이다.",
      "전이 행렬 P의 모든 성분의 대각합(Trace)이다.",
      "전이 행렬 P의 모든 열의 공분산 벡터이다."
    ],
    answerIndex: 0,
    explanation: "안정 상태 식 Pv = v는 Pv = 1v 로 해석할 수 있으므로, 고유값 λ = 1에 해당하는 전이 행렬 P의 고유벡터를 구하는 문제와 정확히 동일합니다."
  }
};

const submitQuizAttempt = async (conceptId: string, isCorrect: boolean) => {
  const score = isCorrect ? 100 : 0;
  
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([
        { concept_name: conceptId, score, is_correct: isCorrect }
      ]);
      
    if (error) {
      throw error;
    }
    
    console.log('Quiz attempt successfully saved to Supabase:', data);
    return { success: true, source: 'supabase' };
  } catch (err) {
    console.warn('Supabase insert failed, falling back to LocalStorage:', err);
    
    try {
      const localAttempts = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
      const newAttempt = {
        id: Math.random().toString(36).substring(2, 9),
        concept_name: conceptId,
        score,
        is_correct: isCorrect,
        created_at: new Date().toISOString()
      };
      localAttempts.push(newAttempt);
      localStorage.setItem('quiz_attempts', JSON.stringify(localAttempts));
      return { success: true, source: 'local' };
    } catch (localErr) {
      console.error('LocalStorage write failed:', localErr);
      return { success: false, error: localErr };
    }
  }
};

interface QuizSectionProps {
  conceptId: string;
  onSubmitted?: () => void;
}

function QuizSection({ conceptId, onSubmitted }: QuizSectionProps) {
  const questionData = QUIZ_QUESTIONS[conceptId];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dbSource, setDbSource] = useState<string>('');

  
  if (!questionData) return null;
  
  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
  };
  
  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedOption === null || submitted || loading) return;
    
    setLoading(true);
    const correct = selectedOption === questionData.answerIndex;
    setIsCorrect(correct);
    
    const res = await submitQuizAttempt(conceptId, correct);
    if (res.success) {
      setDbSource(res.source === 'supabase' ? 'Supabase DB' : '로컬 캐시');
    }
    
    setSubmitted(true);
    setLoading(false);
    
    if (onSubmitted) {
      onSubmitted();
    }
  };
  
  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
  };
  
  return (
    <div 
      className="w-full max-w-[340px] bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 shadow-xl mt-6 relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
      
      <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 mb-3">
        <HelpCircle className="w-4 h-4 text-indigo-400" />
        <h4 className="text-xs font-bold text-slate-200">5분 개념 체크 퀴즈</h4>
        {submitted && (
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto ${
            isCorrect 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {isCorrect ? 'Correct' : 'Incorrect'}
          </span>
        )}
      </div>
      
      <p className="text-xs text-slate-300 font-semibold leading-relaxed mb-3">
        {questionData.question}
      </p>
      
      <div className="space-y-2 mb-3">
        {questionData.options.map((opt, idx) => {
          let optStyle = "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200";
          
          if (selectedOption === idx) {
            optStyle = "bg-indigo-600/15 border-indigo-500/50 text-indigo-300 font-semibold";
          }
          
          if (submitted) {
            if (idx === questionData.answerIndex) {
              optStyle = "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold";
            } else if (selectedOption === idx) {
              optStyle = "bg-rose-500/15 border-rose-500/50 text-rose-300 font-semibold";
            } else {
              optStyle = "bg-slate-900/20 border-slate-900 text-slate-500 cursor-not-allowed";
            }
          }
          
          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-3 py-2 text-[11px] rounded-xl border transition-all duration-205 flex items-start gap-2 ${optStyle}`}
            >
              <span className="font-mono text-slate-500">{idx + 1}.</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      
      {submitted ? (
        <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-3 text-[10.5px] leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            {isCorrect ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
              {isCorrect ? '정답입니다! 훌륭해요.' : '오답입니다. 개념을 다시 확인해 보세요.'}
            </span>
          </div>
          <p className="text-slate-400 mt-1 pl-5">
            {questionData.explanation}
          </p>
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-900 text-[9px] text-slate-500">
            <span>동기화: {dbSource}</span>
            {!isCorrect && (
              <button 
                onClick={handleRetry}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
              >
                <RefreshCw className="w-3 h-3" />
                다시 풀기
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || loading}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
            selectedOption === null || loading
              ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/40'
          }`}
        >
          {loading ? '제출 중...' : '정답 제출하기'}
        </button>
      )}
    </div>
  );
}
