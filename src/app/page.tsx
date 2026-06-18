'use client';

import React, { useState, useEffect } from 'react';
import MobileContainer from '@/components/MobileContainer';
import FlashCard from '@/components/FlashCard';
import { GraduationCap, Network, Map, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [showFaq, setShowFaq] = useState<boolean>(false);
  const [comprehension, setComprehension] = useState<number>(0);
  const [dbSource, setDbSource] = useState<string>('로컬캐시');
  const [attemptsCount, setAttemptsCount] = useState<number>(0);

  const refreshStats = async () => {
    let attempts = [];
    let isSupabase = true;

    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('concept_name, is_correct')
        .order('created_at', { ascending: false });

      if (error) throw error;
      attempts = data || [];
    } catch (err) {
      console.warn('Failed to fetch from Supabase, loading from LocalStorage:', err);
      isSupabase = false;
      try {
        attempts = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
      } catch (localErr) {
        console.error('Failed to parse quiz_attempts from LocalStorage:', localErr);
      }
    }

    interface QuizAttempt {
      concept_name: string;
      is_correct: boolean;
    }

    const solvedConcepts = new Set<string>();
    attempts.forEach((attempt: QuizAttempt) => {
      if (attempt.is_correct) {
        solvedConcepts.add(attempt.concept_name);
      }
    });

    const totalConcepts = 7;
    const scorePercentage = Math.round((solvedConcepts.size / totalConcepts) * 100);

    setComprehension(scorePercentage);
    setDbSource(isSupabase ? '수파베이스' : '로컬캐시');
    setAttemptsCount(attempts.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshStats();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-full pb-8">
        
        {/* Top Branding Section */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-900/60 bg-slate-950/45 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-900/25">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-indigo-400 tracking-wider uppercase">Urban Big Data Lab</p>
              <h1 className="text-sm font-black text-slate-100 tracking-tight">선형대수학 모바일 교실</h1>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
            Supabase Live
          </span>
        </header>

        {/* Dashboard / Progress Summary */}
        <section className="px-4 mt-4">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            {/* Background absolute glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-violet-600/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                오늘의 학습 대시보드
              </span>
              <span className="text-[10px] text-slate-500">2026.06</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950/60 border border-slate-900 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-500">개념 이해도</p>
                <p className="text-lg font-black text-indigo-400 mt-0.5">{comprehension}%</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-500">탐구 도구</p>
                <p className="text-lg font-black text-violet-400 mt-0.5">5개</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-500">연동 데이터</p>
                <p className="text-lg font-black text-emerald-400 mt-0.5">{dbSource}</p>
              </div>
            </div>

            <div className="mt-3 bg-slate-950/30 rounded-lg p-2 flex items-center justify-between text-[10px] border border-slate-900">
              <span className="text-slate-400 font-medium">실시간 데이터 연동 (퀴즈 제출: {attemptsCount}회)</span>
              <span className="text-emerald-400 font-bold">● Live</span>
            </div>
          </div>
        </section>

        {/* Dynamic Concept Cards Header */}
        <section className="px-5 mt-5 mb-2">
          <h2 className="text-sm font-extrabold text-slate-200 tracking-tight flex items-center gap-1.5">
            <Network className="w-4 h-4 text-violet-400" />
            선형대수학 핵심 개념 탐구
          </h2>
          <p className="text-[10.5px] text-slate-400 mt-0.5">
            각 카드를 선택하고 조작 도구를 드래그하여 기하학적 변화를 탐구해보세요.
          </p>
        </section>

        {/* Flashcard Component */}
        <section className="flex-1 flex flex-col justify-center">
          <FlashCard onQuizSubmit={refreshStats} />
        </section>

        {/* Why Linear Algebra in Urban Big Data section */}
        <section className="px-4 mt-6">
          <div className="border border-slate-800 bg-slate-950/60 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="w-full px-4 py-3.5 flex justify-between items-center text-left bg-slate-900/40 text-slate-200 hover:text-white transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Map className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-bold">도시 공간 분석에서 선형대수학의 중요성</span>
              </div>
              {showFaq ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showFaq && (
              <div className="p-4 border-t border-slate-900 bg-slate-950/80 space-y-3.5 text-xs text-slate-350 leading-relaxed">
                <div>
                  <h4 className="font-bold text-indigo-300 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block" />
                    공간 네트워크의 행렬 대수
                  </h4>
                  <p className="text-[11px] text-slate-400 pl-2.5">
                    도시 도로 네트워크는 노드(교차로)와 링크(도로)의 집합인 그래프로 표현됩니다. 
                    이 그래프의 연결 관계를 나타내는 <strong>인접 행렬(Adjacency Matrix)</strong>에 거듭제곱 등 선형대수학 연산을 적용하여 특정 지점 간의 최단 경로, 연결성 및 영향도를 순식간에 계산할 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                    공간 자기상관 분석 (Spatial Weight)
                  </h4>
                  <p className="text-[11px] text-slate-400 pl-2.5">
                    도시 공간 정보 데이터(공시지가, 인구밀도 등)의 지리적 상호 의존성을 분석하기 위해 
                    <strong>공간 가중치 행렬(W)</strong>을 선언합니다. 이 행렬과 관측치 벡터를 행렬 곱 연산하여 공간 시차(Spatial Lag)를 형성하고 Moran&apos;s I 통계량을 도출하여 핫스팟 지역을 시각화합니다.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-violet-300 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full inline-block" />
                    다차원 차원 축소와 패턴 발견
                  </h4>
                  <p className="text-[11px] text-slate-400 pl-2.5">
                    유동 인구, 카드 매출, 토지 이용 등 수백 개의 도시 지표 변수를 차원 축소하여 소수의 
                    주요 요인으로 요약하는 <strong>주성분 분석(PCA)</strong>은 공분산 행렬의 고유벡터(Eigenvector)와 고유값(Eigenvalue) 분석을 통해 수행됩니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
        
      </div>
    </MobileContainer>
  );
}
