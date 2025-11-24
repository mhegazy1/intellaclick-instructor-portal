# Feature TODO List - Small UX Improvements

**Date Created:** 2025-11-23
**Priority:** Medium (Quality of Life improvements)
**Status:** 📋 Planned

---

## 📝 Small UX Improvements

### 1. ⌨️ Keyboard Shortcuts
**Description:** Add keyboard shortcuts to speed up question creation workflow

**Proposed Shortcuts:**
- `Ctrl+Enter` / `Cmd+Enter` - Save/Add current question
- `Ctrl+P` / `Cmd+P` - Preview current question
- `Escape` - Cancel edit / Close modal
- `Ctrl+D` / `Cmd+D` - Duplicate selected question
- `Ctrl+Shift+Up/Down` - Reorder questions in queue

**Affected Files:**
- `create-session.html`
- `session.html`
- `quiz-creator-full.html`

**Implementation Notes:**
- Add global keydown event listener
- Check if user is typing in input field (don't trigger if typing)
- Show keyboard shortcuts in UI (tooltip or help section)
- Make shortcuts configurable or at least documented

**Priority:** ⭐⭐⭐ High (big productivity boost)

---

### 2. 📋 Duplicate Question Button
**Description:** Add "Duplicate" button to copy an existing question and create a similar one

**Use Case:**
- Instructor creates MCQ question with 4 options
- Wants to create similar question with different text but same structure
- Click "Duplicate" → Pre-fills form with same type and options
- Change text and correct answer → Save as new question

**Affected Files:**
- `create-session.html` - Quick poll questions list
- `session.html` - Active session queue
- `quiz-creator-full.html` - Quiz editor

**Implementation Notes:**
- Add "Duplicate" button next to "Edit" and "Delete"
- Copy question object
- Pre-fill form with copied data
- Change button text to "Add Duplicated Question"
- Clear any IDs to prevent conflicts

**Priority:** ⭐⭐⭐ High (very useful for creating similar questions)

---

### 3. 🔄 Question Reordering (Drag-and-Drop)
**Description:** Allow drag-and-drop to reorder questions in the queue

**Use Case:**
- Instructor adds 5 questions to queue
- Realizes question 3 should be question 1
- Drag question 3 to top of list
- Order updates instantly

**Affected Files:**
- `create-session.html` - Quick poll questions list
- `session.html` - Active session queue
- `quiz-creator-full.html` - Quiz questions list

**Implementation Options:**

**Option A: HTML5 Drag-and-Drop API**
```html
<div draggable="true" ondragstart="handleDragStart(event, index)">
```

**Option B: Library (SortableJS)**
- More polished UX
- Better mobile support
- External dependency

**Implementation Notes:**
- Add drag handle icon (⋮⋮ or ≡)
- Show visual feedback during drag
- Update array order when dropped
- Persist new order
- Consider accessibility (keyboard reordering)

**Priority:** ⭐⭐ Medium (nice to have, but can reorder by editing)

---

### 4. 🗑️ Bulk Delete Questions
**Description:** Select multiple questions and delete them all at once

**Use Case:**
- Instructor creates 10 test questions
- Wants to delete 5 of them
- Select checkboxes for 5 questions
- Click "Delete Selected (5)" → Confirms → All deleted

**Affected Files:**
- `create-session.html` - Quick poll questions list
- `session.html` - Active session queue
- `quiz-creator-full.html` - Quiz questions list

**Implementation Notes:**
- Add checkbox to each question item
- Add "Select All" / "Deselect All" checkbox in header
- Show "Delete Selected (N)" button when 1+ selected
- Confirmation dialog shows count and list of questions
- Delete all at once with single operation

**Additional Features:**
- "Duplicate Selected" - bulk duplicate
- "Export Selected" - export selected questions to JSON
- "Move Selected" - move to another session/quiz

**Priority:** ⭐⭐ Medium (useful for cleanup, but single delete works)

---

### 5. ↕️ Move Question Up/Down Buttons
**Description:** Simple up/down arrow buttons to reorder questions (alternative to drag-and-drop)

**Use Case:**
- Simpler than drag-and-drop
- Works better on mobile
- Click up arrow → Question moves up one position
- Click down arrow → Question moves down one position

**Affected Files:**
- `create-session.html`
- `session.html`
- `quiz-creator-full.html`

**Implementation Notes:**
- Add ↑ and ↓ buttons next to each question
- Disable ↑ on first question
- Disable ↓ on last question
- Swap positions in array
- Re-render list

**Priority:** ⭐⭐⭐ High (simpler than drag-drop, very useful)

---

## 📊 Implementation Priority Ranking

| Feature | Priority | Effort | Impact | Recommended Order |
|---------|----------|--------|--------|-------------------|
| Keyboard Shortcuts | ⭐⭐⭐ High | Medium | High | 1st or 2nd |
| Duplicate Question | ⭐⭐⭐ High | Low | High | 1st or 2nd |
| Move Up/Down Buttons | ⭐⭐⭐ High | Low | Medium | 3rd |
| Bulk Delete | ⭐⭐ Medium | Medium | Medium | 4th |
| Drag-and-Drop | ⭐⭐ Medium | High | Medium | 5th (or skip) |

---

## 🎯 Recommended Implementation Order

### Phase 1: Quick Wins (High Impact, Low Effort)
1. **Duplicate Question Button** - Easy to implement, very useful
2. **Move Up/Down Buttons** - Simple reordering without complexity
3. **Keyboard Shortcuts (Basic)** - Start with Ctrl+Enter, Escape, Ctrl+P

### Phase 2: Enhanced Features
4. **Bulk Delete** - Checkbox system for multiple selection
5. **Keyboard Shortcuts (Advanced)** - Add Ctrl+D, arrow key navigation

### Phase 3: Advanced (Optional)
6. **Drag-and-Drop** - Only if user feedback requests it

---

## 🔧 Implementation Notes

### Consistency Across Files
**CRITICAL:** Any feature implemented must work the SAME way in all 3 locations:
- `create-session.html` - Quick poll creation
- `session.html` - Active session management
- `quiz-creator-full.html` - Quiz editor

**Use Anti-Duplication Rules:**
- Create shared utility for reordering logic
- Create shared utility for bulk selection
- Reuse same HTML structure and CSS
- Test in ALL 3 locations before considering complete

### Accessibility Considerations
- All features must be keyboard accessible
- Screen reader friendly
- Focus management for modals/dialogs
- ARIA labels where needed

---

## 📋 Checklist Template (For Each Feature)

When implementing a feature, verify:

- [ ] Implemented in `create-session.html`
- [ ] Implemented in `session.html`
- [ ] Implemented in `quiz-creator-full.html`
- [ ] Shared utilities created (if applicable)
- [ ] Keyboard accessible
- [ ] Mobile friendly
- [ ] Tested with all question types
- [ ] User feedback collected
- [ ] Documentation updated
- [ ] Git commit with clear message

---

## 🎨 UI/UX Design Notes

### Button Placement
- Keep existing layout clean
- Don't clutter question cards
- Consider dropdown menu for actions
- Use icon buttons to save space

### Visual Feedback
- Show loading state for operations
- Success/error toasts for actions
- Highlight selected items clearly
- Animate reordering smoothly

### Mobile Considerations
- Touch-friendly button sizes
- Swipe gestures for reorder/delete?
- Responsive layout for small screens

---

## 📝 Future Enhancements (Beyond Small Improvements)

These are larger features that could be added later:

- **Question Templates** - Save frequently used question structures
- **Question Bank** - Browse and import from question library
- **AI Question Generation** - Generate questions from text
- **Collaborative Editing** - Multiple instructors edit same quiz
- **Version History** - Undo/redo for questions
- **Question Analytics** - Which questions are most difficult?
- **Export to PDF** - Print quiz as PDF for paper tests

---

## 🐛 Known Issues to Address

While implementing features, watch for:

1. Array index issues when reordering (FIRST, MIDDLE, LAST rule)
2. State management when editing vs adding
3. Unsaved changes warnings
4. Memory leaks from event listeners

---

## 📚 Related Documents

- `ANTI_DUPLICATION_RULES.md` - Must follow when implementing
- `CODE_DUPLICATION_PROBLEM.md` - Why we avoid duplication
- `CLAUDE.md` - AI assistant rules for implementation

---

**Last Updated:** 2025-11-23
**Next Review:** After Phase 1 completion
