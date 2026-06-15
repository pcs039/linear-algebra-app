'use client';

import React, { useEffect, useState } from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    // Dynamically update status bar clock
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-6 overflow-hidden relative font-sans selection:bg-indigo-500 selection:text-white">
      {/* Ambient glowing radial blobs in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Smartphone frame container */}
      <div className="w-full h-screen md:h-[840px] md:w-[390px] md:rounded-[48px] bg-slate-900 border-0 md:border-[10px] md:border-slate-800/95 shadow-2xl flex flex-col relative overflow-hidden md:ring-2 md:ring-slate-700/30">
        
        {/* Dynamic Island / Notch Mockup */}
        <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6.5 bg-black rounded-full z-50 items-center justify-between px-3.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-indigo-500/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
        </div>

        {/* Status Bar */}
        <div className="w-full h-11 px-6 pt-3 flex justify-between items-center text-xs text-slate-400 font-semibold z-40 select-none bg-slate-950/20 backdrop-blur-md">
          <span>{time}</span>
          <div className="flex items-center space-x-1.5">
            {/* Cellular Network icon */}
            <svg className="w-3 h-3 fill-slate-400" viewBox="0 0 24 24">
              <path d="M2 22h20V2z" />
            </svg>
            {/* Wifi Icon */}
            <svg className="w-3.5 h-3.5 fill-slate-400" viewBox="0 0 24 24">
              <path d="M12 21l-12-14.3c0 0 4.8-5.7 12-5.7s12 5.7 12 5.7l-12 14.3z" />
            </svg>
            {/* Battery Icon */}
            <div className="w-5 h-2.5 border border-slate-400/80 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-slate-400 rounded-[1px]" />
              <div className="w-0.5 h-1 bg-slate-400 rounded-r-xs ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content body space */}
        <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative">
          {children}
        </div>

        {/* Bottom Home Indicator Line */}
        <div className="w-full pb-2 pt-1 flex justify-center bg-slate-950/20 backdrop-blur-md z-40 select-none">
          <div className="w-32 h-1 bg-slate-700/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}
