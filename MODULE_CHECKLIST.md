# Module Function Checklist

## ⚠️ CRITICAL: When adding ANY function called from HTML

Whenever you add a function that is called from HTML inline handlers (onclick, onchange, etc.), you MUST:

### 1. Check the HTML for inline handlers
```bash
grep -n "onclick\|onchange\|oninput" pages/your-file.html
```

### 2. For EACH function found, verify it's exposed to window
```bash
grep "window.functionName" pages/your-file.html
```

### 3. If NOT found, add it to the window exposure section
```javascript
// At the bottom of the <script type="module"> section
window.functionName = functionName;
```

## Common Functions That Need Exposure

- `applyFilters()` - Used by filter dropdowns
- `clearFilters()` - Used by clear button
- `toggleSelectAll()` - Used by select all checkbox
- `deleteSelected()` - Used by bulk delete button
- Any function called with `onclick="..."`
- Any function called with `onchange="..."`
- Any function called with `oninput="..."`

## Why This Matters

ES6 modules create a **module scope**. Functions inside `<script type="module">` are NOT global by default. Inline HTML event handlers run in the **global scope** and cannot see module-scoped functions unless explicitly exposed.

## The Rule

**If HTML calls it → window must expose it**
