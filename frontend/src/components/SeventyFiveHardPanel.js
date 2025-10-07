import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Trophy, Target, Calendar, BookOpen, Dumbbell, Droplets, Salad, Camera, Images, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import ProgressPhotoGallery from './ProgressPhotoGallery';

const SeventyFiveHardPanel = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [dailyTasks, setDailyTasks] = useState({
    workout1: false,
    workout2: false,
    diet: false,
    water: false,
    reading: false,
    photo: false
  });

  const [challengeStarted, setChallengeStarted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [progressPhotos, setProgressPhotos] = useState({});

  useEffect(() => {
    const saved75Hard = localStorage.getItem('75hard');
    if (saved75Hard) {
      const data = JSON.parse(saved75Hard);
      setChallengeStarted(data.started || false);
      setStartDate(data.startDate || null);
      setCurrentDay(data.currentDay || 1);
      setDailyTasks(data.dailyTasks || dailyTasks);
      setProgressPhotos(data.progressPhotos || {});
    }
  }, []);

  useEffect(() => {
    const data = {
      started: challengeStarted,
      startDate,
      currentDay,
      dailyTasks,
      progressPhotos
    };
    localStorage.setItem('75hard', JSON.stringify(data));
  }, [challengeStarted, startDate, currentDay, dailyTasks, progressPhotos]);

  const startChallenge = () => {
    setChallengeStarted(true);
    setStartDate(new Date().toISOString());
    setCurrentDay(1);
    setDailyTasks({
      workout1: false,
      workout2: false,
      diet: false,
      water: false,
      reading: false,
      photo: false
    });
    // Add some mock progress photos for demonstration
    const mockPhotos = {};
    for (let i = 1; i <= Math.min(15, 75); i++) {
      mockPhotos[i] = `https://images.unsplash.com/photo-${1500000000000 + i * 13}?w=400&h=600&fit=crop&crop=face&auto=format`;
    }
    setProgressPhotos(mockPhotos);
  };

  const resetChallenge = () => {
    setChallengeStarted(false);
    setStartDate(null);
    setCurrentDay(1);
    setDailyTasks({
      workout1: false,
      workout2: false,
      diet: false,
      water: false,
      reading: false,
      photo: false
    });
    setProgressPhotos({});
  };

  const toggleTask = (task) => {
    setDailyTasks(prev => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  const completedTasks = Object.values(dailyTasks).filter(Boolean).length;
  const totalTasks = Object.keys(dailyTasks).length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const tasks = [
    { id: 'workout1', label: '45min Workout #1', icon: Dumbbell, description: 'One must be outdoors' },
    { id: 'workout2', label: '45min Workout #2', icon: Dumbbell, description: 'Any type of training' },
    { id: 'diet', label: 'Follow Diet', icon: Salad, description: 'No cheat meals or alcohol' },
    { id: 'water', label: '1 Gallon Water', icon: Droplets, description: '3.7 liters of water' },
    { id: 'reading', label: '10 Pages Reading', icon: BookOpen, description: 'Non-fiction/self-help book' },
    { id: 'photo', label: 'Progress Photo', icon: Camera, description: 'Daily progress picture' }
  ];

  const motivationalImages = [
    'https://images.unsplash.com/photo-1625662171040-8d196a082232?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxkZXRlcm1pbmF0aW9ufGVufDB8fHx8MTc1OTgxMTg0OXww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1673505411900-f6b228603625?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxkZXRlcm1pbmF0aW9ufGVufDB8fHx8MTc1OTgxMTg0OXww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1688114361871-1610cb1d51ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxtb3RpdmF0aW9uJTIwZml0bmVzc3xlbnwwfHx8fDE3NTk4MTE4NDN8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1515191107209-c28698631303?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxkZXRlcm1pbmF0aW9ufGVufDB8fHx8MTc1OTgxMTg0OXww&ixlib=rb-4.1.0&q=85'
  ];

  if (!challengeStarted) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-800 overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${motivationalImages[0]})` }}
          />
          <CardContent className="relative p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                75 HARD Challenge
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Transform your life with 75 days of discipline, mental toughness, and unwavering commitment to your goals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 max-w-lg mx-auto">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Target className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="font-semibold text-gray-900 dark:text-white">75 Days</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Of Discipline</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="font-semibold text-gray-900 dark:text-white">6 Tasks</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Daily Goals</div>
              </div>
            </div>

            <Button 
              onClick={startChallenge}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 text-lg"
            >
              Start 75 HARD Challenge
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-6 h-6 text-purple-600" />
            75 HARD Challenge
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            Day {currentDay}/75
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {currentDay}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Days Completed
            </div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold text-pink-600 mb-1">
              {75 - currentDay}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Days Remaining
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Challenge Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round((currentDay / 75) * 100)}%
            </span>
          </div>
          <Progress 
            value={(currentDay / 75) * 100} 
            className="h-3 bg-purple-100 dark:bg-purple-900"
          />
        </div>

        {/* Daily Tasks */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Today's Tasks ({completedTasks}/{totalTasks})
          </h3>
          
          <div className="space-y-3">
            {tasks.map((task) => {
              const Icon = task.icon;
              const isCompleted = dailyTasks[task.id];
              
              return (
                <div 
                  key={task.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all ${
                    isCompleted 
                      ? 'bg-green-50 border border-green-200 dark:bg-green-950/30 dark:border-green-800' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  
                  <Icon className={`w-5 h-5 flex-shrink-0 ${
                    isCompleted ? 'text-green-600' : 'text-purple-600'
                  }`} />
                  
                  <div className="flex-1">
                    <div className={`font-medium ${
                      isCompleted 
                        ? 'text-green-700 dark:text-green-400 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {task.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Progress */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Today's Progress
            </span>
            <Badge variant={progressPercentage === 100 ? "default" : "outline"} 
                   className={progressPercentage === 100 ? "bg-green-600 text-white" : ""}>
              {progressPercentage}%
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Motivational Image */}
        <div className="relative h-32 rounded-lg overflow-hidden">
          <img 
            src={motivationalImages[currentDay % 4]} 
            alt="Motivation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <p className="text-white font-semibold p-4 text-sm">
              "The 75 HARD program is not about fitness. It's about building mental toughness."
            </p>
          </div>
        </div>

        {/* Progress Photos Section */}
        {currentDay > 1 && (
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Images className="w-5 h-5 text-purple-600" />
                Progress Journey ({Object.keys(progressPhotos).length} photos)
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPhotoGallery(true)}
                disabled={Object.keys(progressPhotos).length === 0}
                className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300"
              >
                <Images className="w-4 h-4 mr-2" />
                View Gallery
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Object.keys(progressPhotos).length === 0 
                ? "Start taking daily photos to track your transformation!" 
                : "See your amazing transformation progress through daily photos."}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={completedTasks < totalTasks}
            onClick={() => {
              // Add mock photo for the completed day
              if (dailyTasks.photo) {
                setProgressPhotos(prev => ({
                  ...prev,
                  [currentDay]: `https://images.unsplash.com/photo-${1500000000000 + currentDay}?w=400&h=600&fit=crop&crop=face`
                }));
              }
              
              // Move to next day and reset all tasks
              setCurrentDay(prev => Math.min(prev + 1, 75));
              setDailyTasks({
                workout1: false,
                workout2: false,
                diet: false,
                water: false,
                reading: false,
                photo: false
              });
            }}
          >
            Complete Day {currentDay}
          </Button>
          <Button 
            variant="outline" 
            onClick={resetChallenge}
            className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300"
          >
            Reset
          </Button>
        </div>

        {/* Progress Photo Gallery Modal */}
        <ProgressPhotoGallery 
          open={showPhotoGallery}
          onOpenChange={setShowPhotoGallery}
          photos={progressPhotos}
          currentDay={currentDay}
          startDate={startDate}
        />
      </CardContent>
    </Card>
  );
};

export default SeventyFiveHardPanel;