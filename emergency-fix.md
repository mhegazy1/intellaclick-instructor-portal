# CRITICAL: Instructor ID Data Corruption

## Problem
All classes in the database have `instructorId` stored as "[object Object]" instead of the actual user ID. This prevents instructors from:
- Deleting their classes
- Viewing class details
- Managing rosters

## Root Cause
The backend is incorrectly storing the entire user object when creating classes, which gets stringified to "[object Object]".

## Temporary Frontend Workaround
While we wait for the backend fix, you can manually update the database:

```javascript
// MongoDB command to fix all classes for your user
db.classes.updateMany(
  { instructorId: "[object Object]" },
  { $set: { instructorId: "68acbd4cf1da2cb91f63b8f0" } }
)
```

## Backend Fix Required
The issue is in the class creation endpoint where it's doing something like:
```javascript
instructorId: req.user  // WRONG - saves as "[object Object]"
```

Instead of:
```javascript
instructorId: req.user._id || req.user.id || req.user.userId  // CORRECT
```

## Verification
After running the database fix, the ownership check should show:
- Instructor ID: 68acbd4cf1da2cb91f63b8f0
- Is Owner: YES ✓

Then the delete button will work!