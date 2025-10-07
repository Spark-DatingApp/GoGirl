import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useHabits } from '../contexts/HabitContext';
import { getDateString } from '../mock';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { getActiveHabits, getHabitCompletion } = useHabits();

  const activeHabits = getActiveHabits();

  const getDateCompletions = (date) => {
    const dateStr = getDateString(date);
    return activeHabits.filter(habit => getHabitCompletion(habit.id, dateStr));
  };

  const getDateCompletionRate = (date) => {
    if (activeHabits.length === 0) return 0;
    const completions = getDateCompletions(date);
    return Math.round((completions.length / activeHabits.length) * 100);
  };

  const selectedDateCompletions = getDateCompletions(selectedDate);
  const selectedDateRate = getDateCompletionRate(selectedDate);

  const modifiers = {
    completed: (date) => {
      const rate = getDateCompletionRate(date);
      return rate === 100;
    },
    partial: (date) => {
      const rate = getDateCompletionRate(date);
      return rate > 0 && rate < 100;
    },
  };

  const modifiersStyles = {
    completed: {
      backgroundColor: '#10B981',
      color: 'white',
      fontWeight: 'bold',
    },
    partial: {
      backgroundColor: '#F59E0B',
      color: 'white',
      fontWeight: 'bold',
    },
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Calendar View
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your habit completion across time
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-purple-600" />
                Habit Calendar
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth(-1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {currentMonth.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth(1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border-none"
            />
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">All habits completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Partially completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">No habits completed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Completion Rate */}
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {selectedDateRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completion Rate
              </div>
            </div>

            {/* Habit Status */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Habit Status ({selectedDateCompletions.length}/{activeHabits.length})
              </h4>
              
              {activeHabits.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  No habits to track
                </p>
              ) : (
                <div className="space-y-2">
                  {activeHabits.map((habit) => {
                    const isCompleted = getHabitCompletion(habit.id, getDateString(selectedDate));
                    return (
                      <div
                        key={habit.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: habit.color }}
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {habit.name}
                          </span>
                        </div>
                        <Badge 
                          variant={isCompleted ? "default" : "outline"}
                          className={isCompleted ? "bg-green-600 text-white" : ""}
                        >
                          {isCompleted ? "Done" : "Missed"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;