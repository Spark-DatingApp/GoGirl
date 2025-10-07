import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Plus, Sparkles } from 'lucide-react';
import { useHabits } from '../contexts/HabitContext';
import { preConfiguredHabits } from '../mock';

const AddHabitModal = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('preconfigured');
  const [customHabit, setCustomHabit] = useState({
    name: '',
    description: '',
    category: 'Health',
    color: '#F3E8FF'
  });

  const { addHabit } = useHabits();

  const categories = ['Health', 'Fitness', 'Learning', 'Wellness', 'Productivity', 'Social'];
  const colors = [
    '#F3E8FF', // Light purple
    '#FDF2F8', // Light pink
    '#F0FDF4', // Light green  
    '#E0F2FE', // Light blue
    '#FFFBEB', // Light yellow
    '#FEF3C7', // Light amber
    '#ECFDF5', // Light emerald
    '#EFF6FF', // Light indigo
  ];

  const handleAddPreconfigured = (habitData) => {
    addHabit(habitData);
    onOpenChange(false);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (customHabit.name.trim()) {
      addHabit(customHabit);
      setCustomHabit({
        name: '',
        description: '',
        category: 'Health',
        color: '#F3E8FF'
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Add New Habit
          </DialogTitle>
          <DialogDescription>
            Choose from popular habits or create your own custom habit to start tracking.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preconfigured">Popular Habits</TabsTrigger>
            <TabsTrigger value="custom">Create Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="preconfigured" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {preConfiguredHabits.map((habit, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => handleAddPreconfigured(habit)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-2"
                        style={{ backgroundColor: habit.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {habit.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {habit.description}
                        </p>
                        <Badge 
                          variant="outline" 
                          className="mt-2 text-xs"
                          style={{ 
                            backgroundColor: habit.color + '40',
                            borderColor: habit.color,
                            color: '#374151'
                          }}
                        >
                          {habit.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6 mt-6">
            <form onSubmit={handleAddCustom} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="habit-name">Habit Name *</Label>
                <Input
                  id="habit-name"
                  placeholder="e.g., Walk 10,000 steps"
                  value={customHabit.name}
                  onChange={(e) => setCustomHabit(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="habit-description">Description</Label>
                <Textarea
                  id="habit-description"
                  placeholder="Optional description of your habit"
                  value={customHabit.description}
                  onChange={(e) => setCustomHabit(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={customHabit.category === category ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        customHabit.category === category 
                          ? 'bg-purple-600 text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setCustomHabit(prev => ({ ...prev, category }))}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-lg cursor-pointer border-2 transition-all ${
                        customHabit.color === color 
                          ? 'border-gray-400 scale-110' 
                          : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setCustomHabit(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Habit
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitModal;