'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Holiday data - edit this to update holidays
// 2025: Only Christmas closed
// 2026: Thanksgiving and Christmas closed
const holidays2025 = [
  { date: '2025-01-01', name: "New Year's Day", closed: false },
  { date: '2025-01-20', name: 'Martin Luther King Jr. Day', closed: false },
  { date: '2025-02-17', name: "Presidents' Day", closed: false },
  { date: '2025-05-26', name: 'Memorial Day', closed: false },
  { date: '2025-07-04', name: 'Independence Day', closed: false },
  { date: '2025-09-01', name: 'Labor Day', closed: false },
  { date: '2025-10-13', name: 'Columbus Day', closed: false },
  { date: '2025-11-11', name: 'Veterans Day', closed: false },
  { date: '2025-11-27', name: 'Thanksgiving Day', closed: false },
  { date: '2025-12-25', name: 'Christmas Day', closed: true },
];

const holidays2026 = [
  { date: '2026-01-01', name: "New Year's Day", closed: false },
  { date: '2026-01-19', name: 'Martin Luther King Jr. Day', closed: false },
  { date: '2026-02-16', name: "Presidents' Day", closed: false },
  { date: '2026-05-25', name: 'Memorial Day', closed: false },
  { date: '2026-07-04', name: 'Independence Day', closed: false },
  { date: '2026-09-07', name: 'Labor Day', closed: false },
  { date: '2026-10-12', name: 'Columbus Day', closed: false },
  { date: '2026-11-11', name: 'Veterans Day', closed: false },
  { date: '2026-11-26', name: 'Thanksgiving Day', closed: true },
  { date: '2026-12-25', name: 'Christmas Day', closed: true },
];

// Combined holidays for both years
const allHolidays = [...holidays2025, ...holidays2026];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isHoliday = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allHolidays.find(h => h.date === dateStr);
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days = [];

  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-12 md:h-16" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const holiday = isHoliday(currentYear, currentMonth, day);
    const todayClass = isToday(currentYear, currentMonth, day);

    days.push(
      <motion.div
        key={day}
        className={`h-12 md:h-16 flex flex-col items-center justify-center rounded-lg relative cursor-default
          ${holiday?.closed ? 'bg-red-500/20 border border-red-500' : ''}
          ${holiday && !holiday.closed ? 'bg-yellow-500/20 border border-yellow-500' : ''}
          ${todayClass ? 'ring-2 ring-phoenix-gold' : ''}
          ${!holiday ? 'hover:bg-white/5' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        title={holiday?.name || ''}
      >
        <span className={`text-sm md:text-base font-medium ${holiday?.closed ? 'text-red-400' : holiday ? 'text-yellow-400' : 'text-desert-tan'}`}>
          {day}
        </span>
        {holiday && (
          <span className="text-[8px] md:text-[10px] text-center px-1 truncate max-w-full">
            {holiday.closed ? 'CLOSED' : 'Open'}
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-patriot-darkNavy via-patriot-navy to-patriot-blue">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-desert-tan hover:text-phoenix-gold transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-phoenix-gradient bg-clip-text text-transparent mb-4">
            Schedule & Holidays
          </h1>
          <p className="text-desert-sand text-lg max-w-2xl mx-auto">
            View our service schedule and holiday closures. Plan ahead for uninterrupted service.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/20 border border-red-500 rounded" />
            <span className="text-desert-tan text-sm">Office Closed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500 rounded" />
            <span className="text-desert-tan text-sm">Holiday - Office Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 ring-2 ring-phoenix-gold rounded" />
            <span className="text-desert-tan text-sm">Today</span>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto bg-patriot-darkNavy/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 text-desert-tan hover:text-phoenix-gold hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-desert-tan">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 text-desert-tan hover:text-phoenix-gold hover:bg-white/10 rounded-lg transition-colors rotate-180"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-phoenix-coral font-semibold text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days}
          </div>
        </motion.div>

        {/* Holiday List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <h3 className="text-2xl font-bold text-desert-tan mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-phoenix-coral" />
            {currentYear} Holiday Schedule
          </h3>
          <div className="grid gap-3">
            {(currentYear === 2025 ? holidays2025 : currentYear === 2026 ? holidays2026 : holidays2025).map((holiday, index) => {
              const date = new Date(holiday.date + 'T00:00:00');
              return (
                <motion.div
                  key={holiday.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    holiday.closed
                      ? 'bg-red-500/10 border-red-500/50'
                      : 'bg-yellow-500/10 border-yellow-500/50'
                  }`}
                >
                  <div>
                    <p className="text-desert-tan font-semibold">{holiday.name}</p>
                    <p className="text-desert-sand text-sm">
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    holiday.closed
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {holiday.closed ? 'CLOSED' : 'OPEN'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto mt-8 text-center"
        >
          <p className="text-desert-sand">
            Questions about your pickup schedule? Call us at{' '}
            <a href="tel:480-851-2000" className="text-phoenix-gold hover:underline font-semibold">
              480-851-2000
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
