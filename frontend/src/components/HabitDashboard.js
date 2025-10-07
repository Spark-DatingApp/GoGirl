import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Plus, Calendar, TrendingUp, Target, Flame } from 'lucide-react';
import { useHabits } from '../contexts/HabitContext';
import { calculateStreak, getCompletionRate, getTodayString } from '../mock';
import AddHabitModal from './AddHabitModal';

const HabitDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { 
    getActiveHabits, 
    toggleHabitCompletion, 
    getHabitCompletion, 
    getTodayCompletionRate 
  } = useHabits();

  const activeHabits = getActiveHabits();
  const todayCompletionRate = getTodayCompletionRate();

  const handleToggleHabit = (habitId) => {
    toggleHabitCompletion(habitId);
  };

  const getStreakColor = (streak) => {
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Today's Habits
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Progress
            </h3>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              {todayCompletionRate}% Complete
            </Badge>
          </div>
          <Progress 
            value={todayCompletionRate} 
            className="h-3 bg-purple-100 dark:bg-purple-900"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {activeHabits.filter(habit => getHabitCompletion(habit.id)).length} of {activeHabits.length} habits completed
          </p>
        </CardContent>
      </Card>

      {/* Habit List */}
      <div className="space-y-4">
        {activeHabits.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <Target className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No habits yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start building better habits by adding your first one!
              </p>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Habit
              </Button>
            </CardContent>
          </Card>
        ) : (
          activeHabits.map((habit) => {
            const isCompleted = getHabitCompletion(habit.id);
            const streak = calculateStreak(habit.completions);
            const weeklyRate = getCompletionRate(habit.completions, 7);

            return (
              <Card 
                key={habit.id} 
                className={`transition-all duration-200 hover:shadow-lg ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-800' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 pt-1">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        className="w-5 h-5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold text-lg ${
                          isCompleted 
                            ? 'text-green-700 dark:text-green-400 line-through' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {habit.name}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            backgroundColor: habit.color,
                            borderColor: habit.color,
                            color: '#374151'
                          }}
                        >
                          {habit.category}
                        </Badge>
                      </div>
                      
                      {habit.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {habit.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Flame className={`w-4 h-4 ${getStreakColor(streak)}`} />
                          <span className={`font-medium ${getStreakColor(streak)}`}>
                            {streak} day streak
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {weeklyRate}% this week
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
};

export default HabitDashboard;