"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import type { Plant } from "../../data/datafame";

export default function PlantDetailClient({ plant }: { plant: Plant }) {
  const router = useRouter();

  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    new Array(plant.howToGrow?.length || 0).fill(false)
  );
  
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleCheck = (index: number) => {
    const newChecked = [...checkedSteps];
    if (!newChecked[index]) {
      if (index === 0 || newChecked[index - 1]) {
        newChecked[index] = true;
        setCheckedSteps(newChecked);
        if (index < plant.howToGrow.length - 1) {
          setActiveStep(index + 1);
        } else {
          setActiveStep(index);
        }
      }
    } else {
      if (index === newChecked.length - 1 || !newChecked[index + 1]) {
        newChecked[index] = false;
        setCheckedSteps(newChecked);
        setActiveStep(index);
      }
    }
  };

  const progress = useMemo(() => {
    if (checkedSteps.length === 0) return 0;
    const completed = checkedSteps.filter(Boolean).length;
    return Math.round((completed / checkedSteps.length) * 100);
  }, [checkedSteps]);

  const currentPhase = plant.phaseGuides?.[activeStep];

  const getFertilizerLink = (name: string) => {
    if (name.includes("12-3-5")) return "/products/organic-chemical-12-3-5-growth";
    if (name.includes("3-6-15")) return "/products/organic-chemical-3-6-15-bloom";
    if (name.includes("0-0-30")) return "/products/chemical-fertilizer-0-0-30-sweetness";
    if (name.includes("OM 25%")) return "/products/organic-powder-om-25-soil-booster";
    if (name.includes("OM 20%")) return "/products/organic-pellet-om-20-slow-release";
    if (name.includes("6-3-3")) return "/products/organic-chemical-6-3-3-all-purpose";
    return "/products"; 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 font-sans text-slate-800">
      
      <div className="max-w-5xl mx-auto mb-4">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-gray-300 px-3 py-1 border-2 border-gray-400 hover:bg-gray-400"
        >
          <span className="text-lg leading-none">←</span> Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto mb-4 p-2 bg-yellow-100 border-4 border-yellow-400">
        <p className="text-xs font-bold text-yellow-900">⚠️ WIP - UNDER CONSTRUCTION - Data still being added</p>
        <p className="text-xs text-yellow-800 mt-1">Last updated: checking...</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2">
        
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="bg-white border-2 border-gray-400 p-2">
            <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden border-2 border-gray-300">
              <Image src={plant.image} alt={plant.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" priority />
            </div>
            <div className="p-1 mb-3">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{plant.name}</h1>
              <p className="text-xs text-gray-600 leading-relaxed border-l-2 border-gray-400 pl-2">{plant.desc}</p>
            </div>

            <div className="flex flex-col gap-2 pb-1">
              <div className="bg-yellow-50 border-2 border-yellow-600 p-2 flex items-start gap-2">
                <div className="text-2xl mt-0.5">☀️</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-0.5">Sunlight</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{plant.sunlight}</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-600 p-2 flex items-start gap-2">
                <div className="text-2xl mt-0.5">💧</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-0.5">Watering</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{plant.watering}</p>
                </div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-600 p-2 mt-1">
                <div className="flex items-start gap-2 mb-2">
                  <div className="text-xl">💎</div>
                  <h3 className="font-bold text-gray-800 text-sm">Fertilizers [WIP]</h3>
                </div>
                <ul className="text-xs text-gray-700 space-y-1 ml-1 font-normal">
                  {plant.fertilizer.map((fert, idx) => (
                    <li key={idx} className="border-l-2 border-purple-400 pl-1 py-0.5">
                      <Link 
                        href={getFertilizerLink(fert)} 
                        className="text-purple-700 underline"
                      >
                        {fert}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-2">
          <div className="bg-white border-2 border-gray-400 p-3 flex-1">
            <div className="mb-3 pb-2 border-b-2 border-gray-300">
              <h2 className="text-lg font-bold text-gray-800">Growing Guide - {plant.name}</h2>
              <p className="text-xs text-gray-500 italic">[ TODO: Add detailed instructions ]</p>
            </div>

            <div className="flex flex-col gap-1 mb-3">
              {plant.howToGrow.map((step, idx) => {
                const isChecked = checkedSteps[idx];
                const isActive = activeStep === idx;
                const isLocked = idx > 0 && !checkedSteps[idx - 1] && !isChecked;

                return (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (!isLocked) {
                        handleCheck(idx);
                        setActiveStep(idx);
                      }
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? "border-sky-700 bg-sky-50 shadow-md scale-[1.01]" 
                        : isLocked 
                          ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed" 
                          : "bg-white border-slate-100 hover:border-blue-200 cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isLocked}
                      onChange={() => handleCheck(idx)}
                      onClick={(e) => e.stopPropagation()} 
                      className={`w-5 h-5 rounded border-sky-300 text-sky-700 focus:ring-sky-700 transition-all ${
                        isLocked ? "cursor-not-allowed bg-slate-100" : "cursor-pointer"
                      }`}
                    />

                    <div className="flex flex-col">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isLocked ? "text-slate-400" : "text-sky-700/70"}`}>
                        Step {idx + 1} {isLocked && "🔒 Locked"}
                      </span>
                      <span className={`font-bold text-sm md:text-base ${isActive ? "text-sky-700" : isLocked ? "text-slate-400" : "text-slate-700"}`}>
                        {step}
                      </span>
                    </div>

                    {isActive && (
                      <div className="ml-auto flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></span>
                        <span className="text-[10px] text-sky-600 font-black">ACTIVE</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mb-8 bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
              <div className="flex justify-between text-xs font-black text-sky-700 mb-2 uppercase tracking-widest">
                <span>ความคืบหน้า</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-sky-100">
                <div 
                  className="bg-gradient-to-r from-sky-400 to-sky-700 h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className={`transition-all duration-500 ${currentPhase ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {currentPhase && (
                <div className="bg-sky-50 border border-sky-200 rounded-[1.5rem] p-6 border-l-[6px] border-l-sky-700">
                  <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    💡 วิธีการ: {currentPhase.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                      <p className="text-xs font-black text-sky-600 mb-2 uppercase tracking-widest">สิ่งที่ต้องปฏิบัติ</p>
                      <ul className="space-y-2">
                        {currentPhase.actions.map((act, i) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-2 font-medium">
                            <span className="text-sky-500">✓</span> {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {currentPhase.fertilizers && currentPhase.fertilizers.length > 0 && (
                      <div className="bg-sky-700 p-4 rounded-xl text-white shadow-lg shadow-sky-900/20">
                        <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-widest text-sky-100">สูตรปุ๋ยแนะนำ</p>
                        <p className="text-sm font-black">{currentPhase.fertilizers.join(" / ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}