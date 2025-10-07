// Mock data for habit tracker
export const mockHabits = [
  {
    id: '1',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    category: 'Health',
    color: '#E0F2FE', // Light blue
    icon: 'Droplets',
    isActive: true,
    createdAt: '2024-01-01',
    completions: {
      '2025-01-15': true,
      '2025-01-14': true,
      '2025-01-13': false,
      '2025-01-12': true,
      '2025-01-11': true,
      '2025-01-10': true,
      '2025-01-09': false,
      '2025-01-08': true,
      '2025-01-07': true,
      '2025-01-06': true,
      '2025-01-05': true,
      '2025-01-04': false,
      '2025-01-03': true,
      '2025-01-02': true,
      '2025-01-01': true,
    }
  },
  {
    id: '2',
    name: 'Exercise for 30 minutes',
    description: 'Any form of physical activity',
    category: 'Fitness',
    color: '#F0FDF4', // Light green
    icon: 'Dumbbell',
    isActive: true,
    createdAt: '2024-01-01',
    completions: {
      '2025-01-15': false,
      '2025-01-14': true,
      '2025-01-13': true,
      '2025-01-12': false,
      '2025-01-11': true,
      '2025-01-10': true,
      '2025-01-09': true,
      '2025-01-08': false,
      '2025-01-07': true,
      '2025-01-06': true,
      '2025-01-05': false,
      '2025-01-04': true,
      '2025-01-03': true,
      '2025-01-02': false,
      '2025-01-01': true,
    }
  },
  {
    id: '3',
    name: 'Read for 20 minutes',
    description: 'Read books, articles, or any educational content',
    category: 'Learning',
    color: '#FDF2F8', // Light pink
    icon: 'BookOpen',
    isActive: true,
    createdAt: '2024-01-01',
    completions: {
      '2025-01-15': true,
      '2025-01-14': false,
      '2025-01-13': true,
      '2025-01-12': true,
      '2025-01-11': false,
      '2025-01-10': true,
      '2025-01-09': true,
      '2025-01-08': true,
      '2025-01-07': false,
      '2025-01-06': true,
      '2025-01-05': true,
      '2025-01-04': true,
      '2025-01-03': false,
      '2025-01-02': true,
      '2025-01-01': true,
    }
  },
  {
    id: '4',
    name: 'Meditate',
    description: 'Practice mindfulness for 10 minutes',
    category: 'Wellness',
    color: '#F3E8FF', // Light purple
    icon: 'Brain',
    isActive: true,
    createdAt: '2024-01-01',
    completions: {
      '2025-01-15': true,
      '2025-01-14': true,
      '2025-01-13': true,
      '2025-01-12': true,
      '2025-01-11': true,
      '2025-01-10': false,
      '2025-01-09': true,
      '2025-01-08': true,
      '2025-01-07': true,
      '2025-01-06': true,
      '2025-01-05': true,
      '2025-01-04': true,
      '2025-01-03': true,
      '2025-01-02': true,
      '2025-01-01': false,
    }
  },
  {
    id: '5',
    name: 'Take vitamins',
    description: 'Daily vitamin supplements',
    category: 'Health',
    color: '#FFFBEB', // Light yellow
    icon: 'Pill',
    isActive: true,
    createdAt: '2024-01-01',
    completions: {
      '2025-01-15': true,
      '2025-01-14': true,
      '2025-01-13': false,
      '2025-01-12': true,
      '2025-01-11': true,
      '2025-01-10': true,
      '2025-01-09': true,
      '2025-01-08': true,
      '2025-01-07': false,
      '2025-01-06': true,
      '2025-01-05': true,
      '2025-01-04': true,
      '2025-01-03': true,
      '2025-01-02': true,
      '2025-01-01': true,
    }
  }
];

export const preConfiguredHabits = [
  { name: 'Drink 8 glasses of water', description: 'Stay hydrated throughout the day', category: 'Health', color: '#F3E8FF', icon: 'Droplets' },
  { name: 'Exercise for 30 minutes', description: 'Any form of physical activity', category: 'Fitness', color: '#FDF2F8', icon: 'Dumbbell' },
  { name: 'Read for 20 minutes', description: 'Read books, articles, or any educational content', category: 'Learning', color: '#F0FDF4', icon: 'BookOpen' },
  { name: 'Meditate', description: 'Practice mindfulness for 10 minutes', category: 'Wellness', color: '#E0F2FE', icon: 'Brain' },
  { name: 'Take vitamins', description: 'Daily vitamin supplements', category: 'Health', color: '#FFFBEB', icon: 'Pill' },
  { name: 'Write in journal', description: 'Reflect on your day', category: 'Wellness', color: '#FEF3C7', icon: 'PenTool' },
  { name: 'Practice gratitude', description: 'Think of 3 things you are grateful for', category: 'Wellness', color: '#ECFDF5', icon: 'Heart' },
  { name: 'Learn something new', description: 'Spend time learning a new skill', category: 'Learning', color: '#EFF6FF', icon: 'Lightbulb' },
  { name: 'Clean workspace', description: 'Organize your work area', category: 'Productivity', color: '#F8FAFC', icon: 'Sparkles' },
  { name: 'Call family/friends', description: 'Connect with loved ones', category: 'Social', color: '#FDF4FF', icon: 'Phone' },
];

// Utility functions for mock data
export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getDateString = (date) => {
  return date.toISOString().split('T')[0];
};

export const calculateStreak = (completions) => {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);
  
  while (true) {
    const dateStr = getDateString(currentDate);
    if (completions[dateStr] === true) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

export const getCompletionRate = (completions, days = 7) => {
  const today = new Date();
  let completed = 0;
  let total = days;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = getDateString(date);
    
    if (completions[dateStr] === true) {
      completed++;
    }
  }
  
  return Math.round((completed / total) * 100);
};