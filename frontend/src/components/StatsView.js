import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { TrendingUp, Target, Flame, BarChart3, Calendar, Trophy } from 'lucide-react';
import { useHabits } from '../contexts/HabitContext';
import { calculateStreak, getCompletionRate, getDateString } from '../mock';

const StatsView = () => {
  const { getActiveHabits } = useHabits();
  const activeHabits = getActiveHabits();

  const stats = useMemo(() => {
    if (activeHabits.length === 0) {
      return {
        totalHabits: 0,
        averageCompletion: 0,
        longestStreak: 0,
        bestHabit: null,
        weeklyStats: [],
        monthlyStats: []
      };
    }

    // Calculate overall stats
    let totalCompletion = 0;
    let longestStreak = 0;
    let bestHabit = null;
    let bestHabitRate = 0;

    activeHabits.forEach(habit => {
      const weeklyRate = getCompletionRate(habit.completions, 7);
      const streak = calculateStreak(habit.completions);
      
      totalCompletion += weeklyRate;
      
      if (streak > longestStreak) {
        longestStreak = streak;
      }
      
      if (weeklyRate > bestHabitRate) {
        bestHabitRate = weeklyRate;
        bestHabit = habit;
      }
    });

    const averageCompletion = Math.round(totalCompletion / activeHabits.length);

    // Calculate weekly stats (last 7 days)
    const weeklyStats = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      
      const completedHabits = activeHabits.filter(habit => 
        habit.completions[dateStr] === true
      ).length;
      
      weeklyStats.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: completedHabits,
        total: activeHabits.length,
        percentage: activeHabits.length > 0 ? Math.round((completedHabits / activeHabits.length) * 100) : 0
      });
    }

    // Calculate monthly stats (last 30 days)
    const monthlyStats = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      
      const completedHabits = activeHabits.filter(habit => 
        habit.completions[dateStr] === true
      ).length;
      
      monthlyStats.push({
        date: dateStr,
        completed: completedHabits,
        total: activeHabits.length,
        percentage: activeHabits.length > 0 ? Math.round((completedHabits / activeHabits.length) * 100) : 0
      });
    }

    return {
      totalHabits: activeHabits.length,
      averageCompletion,
      longestStreak,
      bestHabit,
      weeklyStats,
      monthlyStats
    };
  }, [activeHabits]);

  const getStreakColor = (streak) => {
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyze your habit tracking progress and patterns
          </p>
        </div>
      </div>

      {activeHabits.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Data Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start tracking habits to see your progress statistics here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Active Habits
                    </p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {stats.totalHabits}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      Weekly Average
                    </p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {stats.averageCompletion}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950/30 dark:to-amber-950/30 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      Longest Streak
                    </p>
                    <p className={`text-2xl font-bold ${getStreakColor(stats.longestStreak)}`}>
                      {stats.longestStreak} days
                    </p>
                  </div>
                  <Flame className={`w-8 h-8 ${getStreakColor(stats.longestStreak)}`} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      Best Habit
                    </p>
                    <p className="text-lg font-bold text-purple-700 dark:text-purple-300 truncate">
                      {stats.bestHabit ? stats.bestHabit.name.split(' ').slice(0, 2).join(' ') : 'None'}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.weeklyStats.map((day, index) => (
                  <div key={day.date} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <Progress 
                        value={day.percentage} 
                        className="h-4"
                      />
                    </div>
                    <div className="w-16 text-right">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          day.percentage === 100 
                            ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300' 
                            : day.percentage > 0 
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {day.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Habit Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Habit Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeHabits.map((habit) => {
                  const weeklyRate = getCompletionRate(habit.completions, 7);
                  const monthlyRate = getCompletionRate(habit.completions, 30);
                  const streak = calculateStreak(habit.completions);

                  return (
                    <div key={habit.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: habit.color }}
                          />
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {habit.name}
                          </h4>
                        </div>
                        <Badge 
                          variant="outline"
                          style={{ 
                            backgroundColor: habit.color + '40',
                            borderColor: habit.color,
                            color: '#374151'
                          }}
                        >
                          {habit.category}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-600 dark:text-gray-400">7-day rate</p>
                          <p className="font-bold text-lg text-blue-600">{weeklyRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 dark:text-gray-400">30-day rate</p>
                          <p className="font-bold text-lg text-green-600">{monthlyRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 dark:text-gray-400">Current streak</p>
                          <p className={`font-bold text-lg ${getStreakColor(streak)}`}>
                            {streak} days
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default StatsView;