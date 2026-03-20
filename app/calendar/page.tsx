"use client";
// app/calendar/page.tsx
import React, { useState } from 'react';
import PlantSelector from '@/app/components/PlantSelector';
import CalendarGrid from '@/app/components/CalendarGrid';
import { PLANT_DATA } from '@/app/data/unifiedCalendarData';
import { PlantInfo } from '@/app/data/unifiedCalendarData';

export default function CalendarPage() {
  const [selectedPlant, setSelectedPlant] = useState<PlantInfo | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">ปฏิทินการดูแลพืช</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            เลือกพืชที่คุณสนใจเพื่อดูกิจกรรมการดูแลรายเดือน 
            พร้อมคำแนะนำการใช้ปุ๋ยที่เหมาะสมในแต่ละช่วงเวลา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PlantSelector
              plants={PLANT_DATA}
              selectedPlant={selectedPlant}
              onPlantSelect={setSelectedPlant}
            />
          </div>
          
          <div className="lg:col-span-2">
            {selectedPlant ? (
              <CalendarGrid
                selectedPlant={selectedPlant}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={handleMonthChange}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  กรุณาเลือกพืชที่ต้องการดูปฏิทิน
                </h3>
                <p className="text-gray-600">
                  เลือกพืชจากรายการทางด้านซ้ายเพื่อดูกิจกรรมการดูแลรายเดือน
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            คำแนะนำการใช้ปฏิทิน
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🌱</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">เลือกพืช</h3>
              <p className="text-sm text-gray-600">
                เลือกพืชที่คุณปลูกหรือสนใจจากรายการ
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">ดูปฏิทิน</h3>
              <p className="text-sm text-gray-600">
                ดูกิจกรรมที่ต้องทำในแต่ละเดือน
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🧪</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">ใช้ปุ๋ย</h3>
              <p className="text-sm text-gray-600">
                ใช้ปุ๋ยตามช่วงเวลาที่แนะนำ
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📈</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">เพิ่มผลผลิต</h3>
              <p className="text-sm text-gray-600">
                เพิ่มผลผลิตและคุณภาพสินค้า
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
