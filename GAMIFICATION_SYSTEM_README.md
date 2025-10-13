# Gamification System Documentation

## Overview

The IntellaClick Gamification System provides comprehensive tools for instructors to motivate students through points, levels, achievements, and leaderboards. The system is fully configurable and integrates seamlessly with the clicker session workflow.

## Components

### 1. Gamification Settings (`gamification-settings.html`)

**Purpose**: Configure all gamification features for your classes

**Features**:
- **Preset Configurations**: Three ready-to-use presets (Competitive, Collaborative, Minimal)
- **Scope Selection**: Apply settings instructor-wide or per-class
- **Settings Categories**:
  - **Visibility**: Control what students can see (leaderboard, points, achievements, etc.)
  - **Points System**: Configure base points, bonuses, and penalties
  - **Level System**: Set max level and XP requirements
  - **Achievements**: View built-in achievements
  - **Leaderboard**: Configure update frequency and anonymization
  - **Session Behavior**: Control point resets and streak carryover
  - **Privacy**: Data export and retention settings

**How to Use**:
1. Navigate to **Classes → Gamification** from the main classes page
2. Click **Settings** button in the dashboard
3. Choose a preset or customize individual settings
4. All changes auto-save after 1 second of inactivity

**API Integration**:
- `GET /api/gamification/settings/instructor/:id` - Load settings
- `POST /api/gamification/settings/instructor/:id` - Save settings

---

### 2. Gamification Dashboard (`gamification-dashboard.html`)

**Purpose**: Monitor student engagement and gamification metrics

**Features**:
- **Overview Statistics**:
  - Total active students
  - Total points earned across all students
  - Total achievements unlocked
  - Average participation rate

- **Live Leaderboard**:
  - Sort by points, level, or achievements
  - Click student to view detailed progress
  - Real-time updates every 30 seconds

- **Recent Achievements**: Timeline of recently unlocked achievements

- **Engagement Chart**: Visual representation of weekly/monthly engagement trends

- **Achievement Distribution**: See which achievements are most popular

- **Class Filtering**: View data for all classes or specific class

**How to Use**:
1. Navigate to **Classes → Gamification** from the main classes page
2. Use class selector dropdown to filter by class
3. Click leaderboard filter tabs to sort by different metrics
4. Click any student to view detailed progress

**API Integration**:
- `GET /api/gamification/leaderboard/instructor/:id` - Load leaderboard
- `GET /api/gamification/achievements/recent` - Load recent achievements
- `GET /api/gamification/player/:id` - Load individual student details

---

### 3. Student Progress View (`student-gamification.html`)

**Purpose**: View individual student's gamification progress (can also be used by students)

**Features**:
- **Hero Section**:
  - Student name and current level
  - Total points, achievements, and sessions
  - Visual level progress bar with XP tracking

- **Achievements Showcase**:
  - Grid display of all achievements
  - Filter by all/unlocked/locked
  - Hover for achievement details

- **Statistics**:
  - Participation rate
  - Accuracy percentage
  - Current streak and longest streak
  - Average response time

- **Leaderboard Rank**:
  - Student's current ranking
  - Nearby students for comparison

- **Activity Timeline**: Recent gamification activities and point earnings

**How to Use**:
1. From the dashboard, click any student in the leaderboard
2. View comprehensive progress details in modal
3. URL format: `/student-gamification.html?playerId=<playerId>`

**API Integration**:
- `GET /api/gamification/player/:id` - Load player data
- `GET /api/gamification/achievements/available` - Load all possible achievements
- `GET /api/gamification/leaderboard/class/:id` - Load class ranking

---

## Backend Integration

### Database Models

The gamification system uses the following models (already implemented in backend):

1. **GamificationSettings** (`models/GamificationSettings.js`)
   - Stores instructor/class-specific settings
   - Controls visibility, point values, level requirements

2. **Player** (`models/Player.js`)
   - Student's gamification profile
   - Tracks points, level, XP, achievements, streaks

3. **Achievement** (`models/Achievement.js`)
   - Predefined and custom achievements
   - Unlock conditions and rewards

### API Endpoints

All endpoints are under `/api/gamification/`:

#### Settings
- `GET /settings/instructor/:id` - Get instructor settings
- `POST /settings/instructor/:id` - Update instructor settings
- `GET /settings/class/:id` - Get class-specific settings

#### Player Data
- `GET /player/:id` - Get player profile and stats
- `POST /player/:id/points` - Award points to player
- `POST /player/:id/achievement` - Unlock achievement

#### Leaderboard
- `GET /leaderboard/instructor/:id` - Instructor-wide leaderboard
- `GET /leaderboard/class/:id` - Class-specific leaderboard

#### Achievements
- `GET /achievements/available` - List all possible achievements
- `GET /achievements/recent` - Recent achievements (instructor view)
- `GET /achievements/player/:id` - Player's achievements

---

## Integration with Sessions

### Automatic Point Awards

When a student responds to a question during a session, points are automatically calculated based on:

1. **Base Points**: Set in gamification settings by difficulty level
2. **Speed Bonus**: Faster responses earn more points (if enabled)
3. **Accuracy**: Correct answers get full points
4. **Streak Multiplier**: Consecutive correct answers increase points
5. **First Response Bonus**: First person to answer correctly

### Achievement Triggers

Achievements are automatically unlocked when conditions are met:

- **First Answer**: Answer any question
- **Perfect Score**: Get all questions correct in a session
- **Speed Demon**: Answer within 3 seconds multiple times
- **Consistent**: Maintain a streak for X sessions
- **Team Player**: Participate in X sessions
- **Knowledge Master**: Reach level 10

### Level Progression

Students gain XP (experience points) based on their performance:
- XP required for next level increases exponentially
- Visual progress bar shows current level progress
- Level-up notifications can be shown in session

---

## Configuration Guide

### Quick Start: Using Presets

1. **Competitive Mode** (Default)
   - Full visibility of leaderboard and rankings
   - High bonuses for speed and streaks
   - Best for: Classes where competition motivates students

2. **Collaborative Mode**
   - Hidden rankings to reduce competition
   - Focus on personal growth and achievements
   - Best for: Classes emphasizing learning over competition

3. **Minimal Mode**
   - Only basic points and feedback visible
   - Minimal gamification elements
   - Best for: Classes that want light gamification

### Custom Configuration

**Points System**:
```javascript
{
  basePointsByDifficulty: {
    easy: 5,
    medium: 10,
    hard: 15
  },
  speedBonus: {
    enabled: true,
    maxBonus: 5,
    timeThreshold: 5
  },
  streakMultiplier: {
    enabled: true,
    multiplier: 1.5,
    minStreak: 3
  }
}
```

**Visibility**:
```javascript
{
  showLeaderboard: true,
  showOwnRank: true,
  showPoints: true,
  showLevel: true,
  showAchievements: true,
  anonymizeRanks: false  // Hide names in leaderboard
}
```

**Level System**:
```javascript
{
  maxLevel: 50,
  xpCurve: 'exponential',  // or 'linear'
  baseXP: 100,
  xpMultiplier: 1.5
}
```

---

## Testing Checklist

### Settings Page
- [ ] Preset buttons apply correct settings
- [ ] All toggle switches work correctly
- [ ] Number inputs accept valid values only
- [ ] Auto-save triggers after changes
- [ ] Class selector shows all instructor's classes
- [ ] Settings persist after page reload

### Dashboard Page
- [ ] Statistics load correctly
- [ ] Leaderboard displays students
- [ ] Filter tabs change sorting
- [ ] Click student opens detail modal
- [ ] Recent achievements show correctly
- [ ] Class filter updates all data
- [ ] Auto-refresh works (30 seconds)

### Student Progress Page
- [ ] Hero section shows correct data
- [ ] Level progress bar displays correctly
- [ ] Achievements grid renders all achievements
- [ ] Filter buttons work (all/unlocked/locked)
- [ ] Statistics calculate correctly
- [ ] Leaderboard rank shows correct position
- [ ] Activity timeline displays recent events
- [ ] Nearby ranks show surrounding students

### Session Integration
- [ ] Points awarded correctly after responses
- [ ] Achievements unlock when conditions met
- [ ] XP increases and level-ups occur
- [ ] Streaks calculate correctly
- [ ] Speed bonuses apply appropriately
- [ ] Leaderboard updates in real-time

---

## Future Enhancements

### Planned Features
1. **Custom Achievements**: Allow instructors to create custom achievements
2. **Badges**: Visual badges for various accomplishments
3. **Team Gamification**: Points for groups/teams
4. **Rewards System**: Tie points to actual rewards (extra credit, etc.)
5. **Analytics**: Deeper insights into gamification effectiveness
6. **Export Reports**: Generate PDF reports of student progress
7. **Student Notifications**: Push notifications for achievements
8. **Customizable XP Curves**: More control over leveling system

### API Additions Needed
- `POST /api/gamification/achievements/custom` - Create custom achievement
- `GET /api/gamification/analytics` - Detailed analytics data
- `GET /api/gamification/export/student/:id` - Export student report
- `POST /api/gamification/badges` - Award custom badges

---

## Troubleshooting

### Students not earning points
1. Check that gamification is enabled in settings
2. Verify point values are set correctly
3. Ensure session is properly recording responses
4. Check browser console for API errors

### Leaderboard not updating
1. Verify real-time refresh is working (check network tab)
2. Check that students have participated in sessions
3. Ensure class filter is set correctly
4. Try manual refresh

### Achievements not unlocking
1. Check achievement conditions in settings
2. Verify student has met the requirements
3. Check server logs for unlock attempts
4. Ensure achievement system is enabled

### Settings not saving
1. Check browser console for errors
2. Verify authentication token is valid
3. Check network tab for API request status
4. Try logging out and back in

---

## File Structure

```
intellaclick-instructor-portal/
├── gamification-settings.html      # Settings configuration page
├── gamification-dashboard.html     # Dashboard and leaderboard
├── student-gamification.html       # Individual student progress
└── GAMIFICATION_SYSTEM_README.md   # This documentation
```

**Backend** (already implemented):
```
intellaclick-cloud-backend/
├── models/
│   ├── GamificationSettings.js
│   ├── Player.js
│   └── Achievement.js
├── routes/
│   └── gamification.js
└── server.js  # Routes registered
```

---

## Support

For issues or questions:
1. Check this documentation first
2. Review browser console for errors
3. Check backend logs for API errors
4. Verify all files are deployed correctly

---

**Version**: 1.0
**Last Updated**: January 2025
**Status**: ✅ Fully Implemented
