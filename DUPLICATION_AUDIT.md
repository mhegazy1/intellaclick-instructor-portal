# Code Duplication Audit & Refactoring Tracker

**Date Created:** 2025-11-23
**Status:** 🟡 In Progress
**Goal:** Eliminate ALL code duplication to prevent recurring bugs

---

## 📋 Executive Summary

| Metric | Count |
|--------|-------|
| **Duplicate Patterns Found** | 4 |
| **Files Affected** | 3+ |
| **Shared Utilities Created** | 2 ✅ |
| **Files Refactored** | 0 (Pending) |
| **Files Remaining** | 3+ |

---

## 🔍 Duplicate Patterns Identified

### 1. ✅ Question Preview Generation (COMPLETED)
**Pattern:** Generating HTML previews for questions

**Status:** ✅ **FIXED** - Shared utility created

**Solution:**
- Created `utils/questionPreview.js`
- All 3 locations now use shared utility:
  - create-session.html
  - session.html
  - quiz-creator-full.html

**Impact:** Preview bugs can only occur once, fix applies everywhere

---

### 2. 🟡 Answer Validation (UTILITY CREATED, NEEDS REFACTORING)
**Pattern:** Checking if `correctAnswer !== undefined && correctAnswer !== null`

**Locations Found:** 8+ instances across 3 files
- `display.html` (lines 607, 616, 727, 809, 814, 860)
- `pages/display.html` (duplicate of display.html)
- `session-history.html` (has compareAnswers function but needs update)

**Status:** 🟡 **Utility created**, needs refactoring

**Solution Created:**
- ✅ Created `utils/answerValidation.js` with `hasValidAnswer()` function
- ⏳ Needs: Refactor all HTML files to import and use it

**Example Refactoring:**
```javascript
// ❌ OLD (8+ locations)
if (correctAnswer !== undefined && correctAnswer !== null) { ... }

// ✅ NEW (1 location - utils/answerValidation.js)
import { hasValidAnswer } from './utils/answerValidation.js';
if (hasValidAnswer(correctAnswer)) { ... }
```

---

### 3. 🟡 Answer Comparison Logic (UTILITY CREATED, NEEDS REFACTORING)
**Pattern:** Comparing student answers to correct answers

**Locations Found:**
- `session-history.html` (has local `compareAnswers()` function)
- `display.html` (inline comparison logic)
- Potentially in `analytics.html` (needs verification)

**Current State:**
- `session-history.html` has its own `compareAnswers()` function (lines 198-246)
- This logic handles:
  - Letter-to-number conversion (A=0, B=1, etc.)
  - String comparison
  - Object/array comparison for matching/ordering

**Status:** 🟡 **Utility created**, needs refactoring

**Solution Created:**
- ✅ Created `utils/answerValidation.js` with `compareAnswers()` function
- ✅ Includes all edge cases (numeric, letter, string, object, array)
- ⏳ Needs: Extract from session-history.html, refactor all files to use shared version

**Impact:** Fixes the "0 points for correct answer" bug permanently across all files

---

### 4. 🟡 Points Calculation (UTILITY CREATED, NEEDS REFACTORING)
**Pattern:** Calculating points earned for a response

**Locations Found:**
- `session-history.html` (inline calculation in 4+ places)
- Potentially in `analytics.html`

**Status:** 🟡 **Utility created**, needs refactoring

**Solution Created:**
- ✅ Created `utils/answerValidation.js` with `calculatePoints()` function
- ⏳ Needs: Refactor all calculation locations to use it

---

## 📝 Refactoring Plan

### Phase 1: Update display.html (HIGHEST PRIORITY)
**Why:** Most critical file, used during live sessions

**Tasks:**
- [ ] Import `utils/answerValidation.js`
- [ ] Replace all `correctAnswer !== undefined && correctAnswer !== null` with `hasValidAnswer()`
- [ ] Replace all `hasAnswerData` inline logic with utility function
- [ ] Test all question types (MCQ, TF, Matching, Ordering, Fill-blank)
- [ ] Verify correct answer highlighting works for option A (index 0)

**Files:**
- `display.html`
- `pages/display.html` (if still used)

---

### Phase 2: Update session-history.html
**Why:** Contains duplicate `compareAnswers()` logic that should use shared utility

**Tasks:**
- [ ] Import `utils/answerValidation.js`
- [ ] Remove local `compareAnswers()` function
- [ ] Replace all calls to local function with utility import
- [ ] Replace `hasValidAnswer` checks with utility
- [ ] Replace inline points calculation with `calculatePoints()`
- [ ] Test points calculation in both UI and CSV export

**File:**
- `session-history.html`

---

### Phase 3: Audit and Update analytics.html
**Why:** Likely contains similar logic for statistics

**Tasks:**
- [ ] Search for answer comparison logic
- [ ] Search for points calculation logic
- [ ] Import `utils/answerValidation.js` if needed
- [ ] Refactor to use shared utilities
- [ ] Test analytics displays correct data

**File:**
- `analytics.html`

---

### Phase 4: Search for Other Duplicates
**Tasks:**
- [ ] Search all HTML files for answer comparison patterns
- [ ] Search for inline points calculation
- [ ] Refactor any additional locations found

---

## 🎯 Success Criteria

A file is considered "refactored" when:

1. ✅ No inline `correctAnswer !== undefined && correctAnswer !== null` checks
2. ✅ All answer comparisons use `compareAnswers()` from utility
3. ✅ All points calculations use `calculatePoints()` from utility
4. ✅ All complex logic imported from `utils/` folder
5. ✅ File has been tested with all question types
6. ✅ No regressions in existing functionality

---

## 🚨 Testing Requirements

After refactoring each file, test:

### For display.html:
- [ ] MCQ with answer A (index 0) highlights correctly
- [ ] MCQ with answers B, C, D highlight correctly
- [ ] True/False questions highlight correctly
- [ ] Matching questions show correct pairs
- [ ] Ordering questions show correct order
- [ ] Fill-blank shows correct answer
- [ ] "Show Correct Answer" checkbox works

### For session-history.html:
- [ ] Points display correctly in UI (not 0/10 for correct answers)
- [ ] Points display correctly in CSV export
- [ ] All question types calculate points correctly
- [ ] Letter answers (A, B, C) compare correctly to numeric (0, 1, 2)

### For analytics.html:
- [ ] Statistics show correct data
- [ ] Points totals are accurate
- [ ] No calculation errors

---

## 📊 Progress Tracking

| File | Audit | Refactor | Test | Status |
|------|-------|----------|------|--------|
| utils/answerValidation.js | ✅ | ✅ | ⏳ | Created |
| utils/questionPreview.js | ✅ | ✅ | ✅ | Complete |
| display.html | ✅ | ⏳ | ⏳ | Pending |
| pages/display.html | ✅ | ⏳ | ⏳ | Pending |
| session-history.html | ✅ | ⏳ | ⏳ | Pending |
| analytics.html | ⏳ | ⏳ | ⏳ | Pending |

---

## 🎓 Lessons Learned

1. **Prevention > Cure**: Creating shared utilities from the start prevents duplication
2. **Search First**: Always search for existing patterns before writing new code
3. **Fix All**: When fixing a bug, search for ALL occurrences and fix them together
4. **Document**: Keep this audit updated as refactoring progresses

---

## 📚 Related Documents

- `ANTI_DUPLICATION_RULES.md` - Mandatory rules for all code changes
- `CODE_DUPLICATION_PROBLEM.md` - Root cause analysis of the problem
- `SESSION_HISTORY_ISSUES.md` - Points calculation bug documentation
- `CLAUDE.md` - AI assistant rules (includes anti-duplication enforcement)

---

## 🔄 Next Steps

1. **Immediate**: Refactor `display.html` (highest priority)
2. **Short-term**: Refactor `session-history.html`
3. **Medium-term**: Audit and refactor `analytics.html`
4. **Long-term**: Implement automated checks (pre-commit hooks)

---

**Last Updated:** 2025-11-23
**Next Review:** After Phase 1 completion
