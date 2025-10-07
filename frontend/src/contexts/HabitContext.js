import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockHabits, getTodayString, getDateString } from '../mock';

const HabitContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load habits from localStorage or use mock data
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      setHabits(mockHabits);
    }
    setLoading(false);
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, loading]);

  const addHabit = (habitData) => {
    const newHabit = {
      ...habitData,
      id: Date.now().toString(),
      isActive: true,
      createdAt: new Date().toISOString(),
      completions: {}
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (habitId, updates) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId ? { ...habit, ...updates } : habit
      )
    );
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const toggleHabitCompletion = (habitId, date = getTodayString()) => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id === habitId) {
          const newCompletions = { ...habit.completions };
          newCompletions[date] = !newCompletions[date];
          return { ...habit, completions: newCompletions };
        }
        return habit;
      })
    );
  };

  const getHabitCompletion = (habitId, date = getTodayString()) => {
    const habit = habits.find(h => h.id === habitId);
    return habit?.completions[date] || false;
  };

  const getActiveHabits = () => {
    return habits.filter(habit => habit.isActive);
  };

  const getTodayCompletionRate = () => {
    const activeHabits = getActiveHabits();
    if (activeHabits.length === 0) return 0;
    
    const completed = activeHabits.filter(habit => 
      getHabitCompletion(habit.id)
    ).length;
    
    return Math.round((completed / activeHabits.length) * 100);
  };

  const value = {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitCompletion,
    getActiveHabits,
    getTodayCompletionRate
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};