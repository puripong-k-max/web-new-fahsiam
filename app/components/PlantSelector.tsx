// app/components/PlantSelector.tsx
import React from 'react';
import { PlantInfo, PlantCategory } from '@/app/data/unifiedCalendarData';

interface PlantSelectorProps {
  plants: PlantInfo[];
  selectedPlant: PlantInfo | null;
  onPlantSelect: (plant: PlantInfo | null) => void;
}

export default function PlantSelector({ plants, selectedPlant, onPlantSelect }: PlantSelectorProps) {
  const categories: PlantCategory[] = [
    "ไม้ผลเมืองร้อน",
    "ไม้ผลเมืองหนาว", 
    "พืชเศรษฐกิจ",
    "พืชผัก",
    "พืชอื่นๆ"
  ];

  const groupPlantsByCategory = () => {
    const grouped: Record<PlantCategory, PlantInfo[]> = {
      "ไม้ผลเมืองร้อน": [],
      "ไม้ผลเมืองหนาว": [],
      "พืชเศรษฐกิจ": [],
      "พืชผัก": [],
      "พืชอื่นๆ": []
    };

    plants.forEach(plant => {
      grouped[plant.category].push(plant);
    });

    return grouped;
  };

  const groupedPlants = groupPlantsByCategory();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">เลือกพืชที่ต้องการดูปฏิทิน</h2>
      
      <div className="space-y-4">
        {categories.map(category => {
          const categoryPlants = groupedPlants[category];
          if (categoryPlants.length === 0) return null;

          return (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryPlants.map(plant => (
                  <button
                    key={plant.id}
                    onClick={() => onPlantSelect(plant)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedPlant?.id === plant.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{plant.name}</div>
                        <div className="text-sm text-gray-500">{plant.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedPlant && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">พืชที่เลือก: {selectedPlant.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedPlant.description}</p>
            </div>
            <button
              onClick={() => onPlantSelect(null)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
