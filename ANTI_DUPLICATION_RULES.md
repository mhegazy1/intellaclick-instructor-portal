# Anti-Duplication Rules - MANDATORY FOR ALL CODE CHANGES

## 🚨 CRITICAL: Read This Before Writing Any Code

**Code duplication is the #1 cause of recurring bugs in this project.**

This document establishes **MANDATORY RULES** that must be followed by all developers (including AI assistants) when writing code.

---

## Rule 1: NEVER Duplicate Logic - Use Shared Utilities

### ❌ FORBIDDEN Pattern:
```javascript
// File 1: display.html
if (correctAnswer !== undefined && correctAnswer !== null) {
    // do something
}

// File 2: session-history.html
if (correctAnswer !== undefined && correctAnswer !== null) {
    // do something
}

// File 3: analytics.html
if (correctAnswer !== undefined && correctAnswer !== null) {
    // do something
}
```

### ✅ REQUIRED Pattern:
```javascript
// utils/answerValidation.js (SINGLE SOURCE OF TRUTH)
export function hasValidAnswer(value) {
    return value !== undefined && value !== null;
}

// All files import and use it
import { hasValidAnswer } from './utils/answerValidation.js';
if (hasValidAnswer(correctAnswer)) {
    // do something
}
```

---

## Rule 2: Shared Utilities Library (SINGLE SOURCE OF TRUTH)

All files MUST use these shared utilities:

### Answer Validation (`utils/answerValidation.js`)
**Use for**: Answer comparison, points calculation, answer validation

| Function | Purpose | Use Instead Of |
|----------|---------|----------------|
| `hasValidAnswer(value)` | Check if answer is not null/undefined | `value !== undefined && value !== null` |
| `hasAnswerData(question, type)` | Check if question has answer data | Manual checks for correctAnswer/pairs/correctOrder |
| `compareAnswers(student, correct, type)` | Compare answers (all types) | String comparison, manual letter-to-number conversion |
| `calculatePoints(response, question)` | Calculate points earned | Inline points calculation |
| `normalizeAnswer(answer, type)` | Normalize answer format | Manual format conversion |

### Question Preview (`utils/questionPreview.js`)
**Use for**: Generating question previews

| Function | Purpose |
|----------|---------|
| `generateQuestionPreview(questionData)` | Generate preview HTML |
| `getPreviewStyles()` | Get preview CSS |

### Toast Messages (`utils/toast.js`)
**Use for**: User notifications

| Function | Purpose |
|----------|---------|
| `toast.success(message)` | Success message |
| `toast.error(message)` | Error message |
| `toast.warning(message)` | Warning message |
| `toast.info(message)` | Info message |

### API Calls (`utils/api.js`)
**Use for**: All backend communication

### Logger (`utils/logger.js`)
**Use for**: All console logging

### Clipboard (`utils/clipboard.js`)
**Use for**: Copy to clipboard

---

## Rule 3: Before Adding Any Logic, Ask These Questions

1. **Does this logic exist somewhere else?**
   ```bash
   # Search for similar code
   grep -r "pattern" *.html
   ```

2. **Should this be a shared utility?**
   - If the logic appears in 2+ places → YES
   - If the logic might be reused later → YES
   - If the logic is complex (>5 lines) → PROBABLY YES

3. **Can I use an existing utility?**
   - Check `utils/` folder first
   - Check this document's table

---

## Rule 4: When Fixing Bugs, Fix ALL Occurrences

### MANDATORY Bug Fix Checklist:

- [ ] Search for ALL instances of the broken pattern:
  ```bash
  grep -r "broken_pattern" frontend/instructor-portal/*.html
  ```

- [ ] List every location found (document them)

- [ ] If 2+ locations exist:
  - [ ] Create shared utility function FIRST
  - [ ] Update ALL locations to use it
  - [ ] Verify fix works in ALL code paths

- [ ] If only 1 location:
  - [ ] Fix it
  - [ ] Add comment explaining WHY (prevents future bugs)

### Example:

**Bad Fix** (fixes 1 location, bug returns):
```javascript
// Fixed in display.html only
if (hasValidAnswer(correctAnswer)) { ... }
```

**Good Fix** (fixes all locations):
```javascript
// Created utils/answerValidation.js
// Updated display.html, session-history.html, analytics.html
// Verified all code paths work
```

---

## Rule 5: Code Review Checklist for AI Assistants

Before committing ANY code, AI assistants MUST verify:

- [ ] No duplicate logic across files
- [ ] All shared utilities are imported and used correctly
- [ ] Function exposure to `window` object (if called from HTML onclick)
- [ ] All similar patterns use the same utility function
- [ ] No inline answer comparison (use `compareAnswers()`)
- [ ] No inline points calculation (use `calculatePoints()`)
- [ ] No manual `correctAnswer !== undefined && correctAnswer !== null` checks (use `hasValidAnswer()`)

---

## Rule 6: Mandatory File Structure

```
frontend/instructor-portal/
├── utils/                          # SHARED UTILITIES (SINGLE SOURCE OF TRUTH)
│   ├── answerValidation.js         # Answer comparison, validation, points
│   ├── questionPreview.js          # Question preview generation
│   ├── api.js                      # Backend API calls
│   ├── toast.js                    # User notifications
│   ├── logger.js                   # Logging
│   └── clipboard.js                # Clipboard operations
│
├── *.html                          # HTML pages
│   └── Import utilities, DON'T duplicate logic
│
└── ANTI_DUPLICATION_RULES.md      # THIS FILE - READ BEFORE CODING
```

---

## Rule 7: When Creating New Features

1. **Plan the utility structure FIRST**
   - What logic will be shared?
   - Create utility functions before implementing feature

2. **Implement in utils/ folder**
   - Add to existing utility file OR
   - Create new utility file if needed

3. **Import and use in HTML files**
   - Never inline complex logic
   - Always import from utils/

4. **Document the utility**
   - Add JSDoc comments
   - Update this file's table

---

## Rule 8: Prevention - Automated Checks

### Pre-Commit Check (FUTURE):
```bash
# Check for duplicate answer comparison
if grep -r "\.correctAnswer !== undefined && \.correctAnswer !== null" *.html; then
    echo "❌ FORBIDDEN: Use hasValidAnswer() from utils/answerValidation.js"
    exit 1
fi

# Check for duplicate string comparison
if grep -r "String(.*answer.*).toLowerCase()" *.html | wc -l > 1; then
    echo "❌ FORBIDDEN: Use compareAnswers() from utils/answerValidation.js"
    exit 1
fi
```

---

## Rule 9: Exception Handling

**The ONLY acceptable reason to duplicate code:**
- **NONE**

If you think you have a valid reason, you're wrong. Create a utility function.

---

## Rule 10: Consequences of Violation

Breaking these rules causes:

1. **User trust lost** - "We fixed this weeks ago, why is it broken again?"
2. **Wasted developer time** - Same bug fixed 3+ times
3. **Unreliable product** - Critical features randomly broken
4. **Technical debt** - Future refactoring becomes impossible

**Bottom Line**: These rules are not suggestions. They are MANDATORY.

---

## Quick Reference Card

**Before writing ANY code:**

1. ✅ Check if utility exists in `utils/`
2. ✅ Search for similar code: `grep -r "pattern" *.html`
3. ✅ Use shared utilities (see table above)
4. ✅ Create utility if logic is shared (2+ uses)
5. ✅ Fix ALL occurrences when fixing bugs
6. ❌ NEVER duplicate logic across files
7. ❌ NEVER inline answer comparison
8. ❌ NEVER skip utility imports

---

## Examples of Proper Utility Usage

### Example 1: Checking if Answer Exists
```javascript
// ❌ BAD - Duplicated logic
if (question.correctAnswer !== undefined && question.correctAnswer !== null) { ... }

// ✅ GOOD - Use utility
import { hasValidAnswer } from './utils/answerValidation.js';
if (hasValidAnswer(question.correctAnswer)) { ... }
```

### Example 2: Checking if Question Has Answer Data
```javascript
// ❌ BAD - Duplicated, complex logic
const hasAnswerData = (currentQuestion.correctAnswer !== undefined && currentQuestion.correctAnswer !== null) ||
                      (questionType === 'matching' && currentQuestion.pairs) ||
                      (questionType === 'ordering' && currentQuestion.correctOrder);

// ✅ GOOD - Use utility
import { hasAnswerData } from './utils/answerValidation.js';
const hasAnswer = hasAnswerData(currentQuestion, questionType);
```

### Example 3: Comparing Answers
```javascript
// ❌ BAD - Inline comparison, doesn't handle all cases
const isCorrect = String(studentAnswer).toLowerCase() === String(correctAnswer).toLowerCase();

// ✅ GOOD - Use utility
import { compareAnswers } from './utils/answerValidation.js';
const isCorrect = compareAnswers(studentAnswer, correctAnswer, questionType);
```

### Example 4: Calculating Points
```javascript
// ❌ BAD - Inline calculation
const earnedPoints = (response.answer === question.correctAnswer) ? question.points : 0;

// ✅ GOOD - Use utility
import { calculatePoints } from './utils/answerValidation.js';
const earnedPoints = calculatePoints(response, question);
```

---

## Commit Message Template

When refactoring to use utilities:

```
Refactor: Eliminate code duplication in [feature]

- Extract [logic] to utils/[file].js
- Update [file1], [file2], [file3] to use shared utility
- Remove duplicate code from [locations]

Prevents: Bug regression from duplicate code
See: ANTI_DUPLICATION_RULES.md
```

---

## Version History

- **v1.0** (2025-11-23) - Initial rules established
  - Created answerValidation.js utility
  - Documented all shared utilities
  - Established mandatory rules

---

**Remember: One function, one location, fix once, works everywhere.**
