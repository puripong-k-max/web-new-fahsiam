// app/components/PlantCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plant } from '@/app/data/datafame';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={plant.image}
          alt={plant.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{plant.name}</h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plant.desc}</p>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium mr-2">☀️:</span>
            <span>{plant.sunlight}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium mr-2">💧:</span>
            <span>{plant.watering}</span>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">ปุ๋ยที่แนะนำ:</p>
          <div className="flex flex-wrap gap-1">
            {plant.fertilizer.slice(0, 3).map((fert, index) => (
              <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {fert}
              </span>
            ))}
            {plant.fertilizer.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{plant.fertilizer.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <Link 
          href={`/plants/${plant.id}`}
          className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}
