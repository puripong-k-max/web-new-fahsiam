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
          <div className="bg-white border border-gray-400 p-2">
            <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden border border-gray-300">
              <Image src={plant.image} alt={plant.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" priority />
            </div>
            <div className="p-1 mb-3">
              <h1 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h1>
              <p className="text-xs text-gray-600 leading-relaxed border-l border-gray-300 pl-2">{plant.desc}</p>
            </div>

            <div className="flex flex-col gap-2 pb-1 text-sm">
              <div className="border border-gray-300 p-2 bg-white">
                <h3 className="font-bold text-gray-800 text-sm mb-1">Sunlight</h3>
                <p className="text-xs text-gray-700">{plant.sunlight}</p>
              </div>

              <div className="border border-gray-300 p-2 bg-white">
                <h3 className="font-bold text-gray-800 text-sm mb-1">Watering</h3>
                <p className="text-xs text-gray-700">{plant.watering}</p>
              </div>

              <div className="border border-gray-300 p-2 bg-white">
                <h3 className="font-bold text-gray-800 text-sm mb-2">Fertilizers</h3>
                <ul className="text-xs text-gray-700 space-y-1 ml-1 font-normal">
                  {plant.fertilizer.map((fert, idx) => (
                    <li key={idx} className="border-l border-gray-300 pl-1 py-0.5">
                      <Link 
                        href={getFertilizerLink(fert)} 
                        className="text-blue-600 underline"
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
          <div className="bg-white border border-gray-400 p-3 flex-1">
            <div className="mb-3 pb-2 border-b border-gray-300">
              <h2 className="text-base font-bold text-gray-800">Growing Steps - {plant.name}</h2>
              <p className="text-xs text-gray-500">[ Fill in data as available ]</p>
            </div>

            <div className="flex flex-col gap-1 mb-3">
              {plant.howToGrow.map((step, idx) => {
                const isChecked = checkedSteps[idx];
                const isActive = activeStep === idx;

                return (
                  <div 
                    key={idx} 
                    onClick={() => {
                      handleCheck(idx);
                      setActiveStep(idx);
                    }}
                    className={`flex items-center gap-3 p-3 border-l-4 ${
                      isActive 
                        ? "border-l-blue-600 bg-gray-50 border border-gray-300" 
                        : "border-l-gray-300 bg-white border border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheck(idx)}
                      onClick={(e) => e.stopPropagation()} 
                      className="w-4 h-4 cursor-pointer"
                    />

                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">
                        Step {idx + 1}
                      </span>
                      <span className={`font-semibold text-sm ${isActive ? "text-blue-700" : "text-gray-700"}`}>
                        {step}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-6 p-3 border border-gray-300 bg-white">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 border border-gray-300">
                <div 
                  className="bg-blue-500 h-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {currentPhase && (
              <div className="p-4 border border-gray-300 bg-gray-50">
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  Phase: {currentPhase.title}
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 bg-white">
                    <p className="text-xs font-semibold text-gray-700 mb-2">ACTIONS</p>
                    <ul className="space-y-1">
                      {currentPhase.actions.map((act, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          • {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {currentPhase.fertilizers && currentPhase.fertilizers.length > 0 && (
                    <div className="p-3 border border-gray-300 bg-white">
                      <p className="text-xs font-semibold text-gray-700 mb-2">FERTILIZERS</p>
                      <p className="text-sm text-gray-700">{currentPhase.fertilizers.join(" / ")}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}