# Habit Tracker App - API Contracts & Integration Plan

## Overview
A comprehensive habit tracker with regular habits management and 75 Hard challenge functionality. Frontend uses lavender/purple color scheme with mobile-friendly Notion-style UI.

## Frontend Features Implemented (Mock Data)
1. **Daily Habit Tracking** - Checkboxes, progress indicators, streaks
2. **Habit Management** - Add/edit/delete custom habits + pre-configured options
3. **Calendar View** - Visual habit completion calendar with color coding
4. **Statistics View** - Progress charts, completion rates, streak analytics
5. **75 Hard Challenge** - Dedicated panel with 6 daily tasks and progress tracking
6. **Theme Support** - Light/dark mode toggle
7. **Responsive Design** - Mobile-friendly navigation

## Mock Data Currently Used
Located in `/app/frontend/src/mock.js`:
- `mockHabits` - Sample habits with completion history
- `preConfiguredHabits` - Template habits users can quickly add
- `75Hard data` - Stored in localStorage with daily tasks

## API Endpoints Needed

### Habits Management
```
GET /api/habits
- Returns user's active habits with completion data

POST /api/habits
- Creates new habit
- Body: { name, description, category, color, icon }

PUT /api/habits/:id
- Updates habit details
- Body: { name?, description?, category?, color?, isActive? }

DELETE /api/habits/:id
- Soft deletes habit (sets isActive: false)

POST /api/habits/:id/toggle
- Toggles completion for specific date
- Body: { date: "YYYY-MM-DD" }

GET /api/habits/stats
- Returns completion statistics, streaks, rates
```

### 75 Hard Challenge
```
GET /api/75hard
- Returns user's current 75 hard challenge state

POST /api/75hard/start
- Starts new 75 hard challenge
- Resets progress to day 1

PUT /api/75hard/daily
- Updates daily task completion
- Body: { tasks: { workout1: boolean, workout2: boolean, diet: boolean, water: boolean, reading: boolean, photo: boolean } }

POST /api/75hard/complete-day
- Advances to next day (if all tasks complete)

POST /api/75hard/upload-photo
- Uploads progress photo for current day
- Body: FormData with image file
- Returns: { photoUrl: string }

GET /api/75hard/photos
- Returns all progress photos for user's challenge
- Response: { [day]: photoUrl }

DELETE /api/75hard/reset
- Resets challenge completely
```

## Database Models

### Habit Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  description: String,
  category: String,
  color: String,
  icon: String,
  isActive: Boolean,
  createdAt: Date,
  completions: {
    "2025-01-15": Boolean,
    "2025-01-14": Boolean,
    // ... date strings as keys
  }
}
```

### SeventyFiveHard Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  isActive: Boolean,
  startDate: Date,
  currentDay: Number,
  dailyTasks: {
    workout1: Boolean,
    workout2: Boolean,
    diet: Boolean,
    water: Boolean,
    reading: Boolean,
    photo: Boolean
  },
  progressPhotos: {
    "1": String, // URL to photo for day 1
    "2": String, // URL to photo for day 2
    // ... up to day 75
  },
  completedDays: [Number], // array of completed day numbers
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Plan

### Replace Mock Data
1. **HabitContext** (`/app/frontend/src/contexts/HabitContext.js`)
   - Replace localStorage with API calls
   - Add error handling and loading states
   - Implement optimistic updates for better UX

2. **75 Hard Panel** (`/app/frontend/src/components/SeventyFiveHardPanel.js`)
   - Replace localStorage with API persistence
   - Add sync with backend state

### API Integration Points
1. **Dashboard** - Real-time habit completion data
2. **Calendar View** - Historical completion data from database  
3. **Statistics** - Server-calculated analytics and streaks
4. **Add/Edit Habits** - CRUD operations with backend validation
5. **75 Hard Challenge** - Persistent progress tracking

## Authentication & User Management
- User accounts to separate habit data
- JWT-based authentication
- User profile with preferences (theme, timezone)

## Technical Considerations
- **Timezone Handling** - Store dates in user's timezone
- **Offline Support** - Local storage fallback with sync
- **Performance** - Pagination for large habit histories
- **Data Migration** - Import/export functionality
- **Notifications** - Daily reminder system (future enhancement)

## Current Status
✅ Frontend fully functional with mock data
✅ All UI components implemented with lavender theme
✅ 75 Hard challenge panel with motivational images
✅ Responsive design and dark mode support
⏳ Backend implementation needed
⏳ API integration required
⏳ User authentication system needed