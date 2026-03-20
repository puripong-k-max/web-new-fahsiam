"use client";
// app/components/CalendarGrid.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MonthlyActivity, PlantInfo, PlantActivity } from '@/app/data/unifiedCalendarData';

interface CalendarGridProps {
  selectedPlant: PlantInfo | null;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
}

export default function CalendarGrid({ 
  selectedPlant, 
  selectedMonth, 
  selectedYear,
  onMonthChange 
}: CalendarGridProps) {
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newMonth = selectedMonth;
    let newYear = selectedYear;
    
    if (direction === 'prev') {
      newMonth--;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
    } else {
      newMonth++;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
    }
    
    onMonthChange(newMonth, newYear);
  };

  const getMonthlyActivities = () => {
    if (!selectedPlant) return [];
    
    const monthActivities = selectedPlant.monthlyActivities.find(
      activity => activity.month === selectedMonth + 1
    );
    
    return monthActivities?.activities || [];
  };

  const getActivityColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      cyan: 'bg-cyan-500',
      gray: 'bg-gray-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const renderCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(new Date(selectedYear, selectedMonth));
    const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-gray-200"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const monthlyActivities = getMonthlyActivities();
      const hasActivities = monthlyActivities.length > 0 && day === 1; // Show activities only on first day of month
      
      days.push(
        <div 
          key={day} 
          className={`h-20 border border-gray-200 p-2 overflow-hidden ${
            hasActivities ? 'bg-green-50' : 'bg-white'
          }`}
        >
          <div className="text-sm font-medium text-gray-700 mb-1">{day}</div>
          {hasActivities && (
            <div className="space-y-1">
              {monthlyActivities.slice(0, 2).map((activity: any, index: number) => (
                <div 
                  key={index}
                  className={`text-xs p-1 rounded text-white ${getActivityColor(activity.color)}`}
                >
                  <span className="mr-1">{activity.icon}</span>
                  {activity.activity}
                </div>
              ))}
              {monthlyActivities.length > 2 && (
                <div className="text-xs text-gray-500">+{monthlyActivities.length - 2} กิจกรรม</div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {monthNames[selectedMonth]} {selectedYear}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0 mb-2">
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day, index) => (
          <div key={index} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">
        {renderCalendarDays()}
      </div>

      {selectedPlant && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">กิจกรรมเดือน {monthNames[selectedMonth]}</h3>
          <div className="space-y-2">
            {getMonthlyActivities().map((activity: PlantActivity, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${getActivityColor(activity.color)}`}></span>
                <span className="text-sm text-gray-700">
                  {activity.icon} {activity.activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
