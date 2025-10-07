import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar,
  TrendingUp,
  Award,
  Camera
} from 'lucide-react';

const ProgressPhotoGallery = ({ open, onOpenChange, photos, currentDay, startDate }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(500); // milliseconds

  const photoKeys = Object.keys(photos).map(Number).sort((a, b) => a - b);
  const hasPhotos = photoKeys.length > 0;

  useEffect(() => {
    if (isPlaying && hasPhotos) {
      const interval = setInterval(() => {
        setSelectedDay(prev => {
          const currentIndex = photoKeys.indexOf(prev);
          const nextIndex = (currentIndex + 1) % photoKeys.length;
          return photoKeys[nextIndex];
        });
      }, playSpeed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, playSpeed, photoKeys]);

  useEffect(() => {
    if (hasPhotos && !photoKeys.includes(selectedDay)) {
      setSelectedDay(photoKeys[0]);
    }
  }, [photos, selectedDay, photoKeys, hasPhotos]);

  const nextPhoto = () => {
    const currentIndex = photoKeys.indexOf(selectedDay);
    const nextIndex = (currentIndex + 1) % photoKeys.length;
    setSelectedDay(photoKeys[nextIndex]);
  };

  const prevPhoto = () => {
    const currentIndex = photoKeys.indexOf(selectedDay);
    const prevIndex = currentIndex === 0 ? photoKeys.length - 1 : currentIndex - 1;
    setSelectedDay(photoKeys[prevIndex]);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const getDateFromDay = (day) => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const targetDate = new Date(start);
    targetDate.setDate(start.getDate() + day - 1);
    return targetDate;
  };

  const formatDate = (day) => {
    const date = getDateFromDay(day);
    if (!date) return `Day ${day}`;
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!hasPhotos) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-600" />
              Progress Photo Gallery
            </DialogTitle>
            <DialogDescription>
              Your transformation journey through daily progress photos.
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center py-12">
            <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Progress Photos Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Complete your daily photo task to start building your transformation gallery!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            GO GIRL - 75 HARD Journey
          </DialogTitle>
          <DialogDescription>
            Your incredible transformation through {photoKeys.length} days of dedication.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {photoKeys.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Photos Taken
              </div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {selectedDay}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Current Day
              </div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((photoKeys.length / 75) * 100)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Complete
              </div>
            </div>
          </div>

          {/* Main Photo Display */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] max-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={photos[selectedDay]}
                    alt={`Progress Day ${selectedDay}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Overlay */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevPhoto}
                      className="bg-black/20 hover:bg-black/40 text-white rounded-full"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextPhoto}
                      className="bg-black/20 hover:bg-black/40 text-white rounded-full"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Day Info Overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-black/60 text-white border-none">
                        Day {selectedDay} of 75
                      </Badge>
                      <Badge variant="outline" className="bg-white/90 dark:bg-black/60 border-none">
                        {formatDate(selectedDay)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPhoto}
              disabled={photoKeys.length <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayback}
              disabled={photoKeys.length <= 1}
              className={isPlaying ? "bg-purple-50 border-purple-300 text-purple-700" : ""}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1" />
                  Play
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDay(photoKeys[0])}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              First
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextPhoto}
              disabled={photoKeys.length <= 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Speed Controls */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
              {[
                { label: "0.5x", value: 1000 },
                { label: "1x", value: 500 },
                { label: "2x", value: 250 },
                { label: "4x", value: 125 }
              ].map(({ label, value }) => (
                <Button
                  key={value}
                  variant={playSpeed === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlaySpeed(value)}
                  className={`text-xs ${
                    playSpeed === value 
                      ? "bg-purple-600 text-white" 
                      : "hover:bg-purple-50 dark:hover:bg-purple-950/30"
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}

          {/* Photo Timeline */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Photo Timeline
            </h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {photoKeys.map((day) => (
                <div
                  key={day}
                  className={`flex-shrink-0 cursor-pointer transition-all ${
                    day === selectedDay 
                      ? 'ring-2 ring-purple-500 scale-110' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className="relative">
                    <img
                      src={photos[day]}
                      alt={`Day ${day}`}
                      className="w-12 h-16 object-cover rounded border-2 border-gray-200 dark:border-gray-700"
                    />
                    <Badge 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs px-1 py-0 bg-purple-600 text-white"
                    >
                      {day}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
            <TrendingUp className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              "Every photo tells the story of your dedication and growth. Keep pushing forward!"
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressPhotoGallery;