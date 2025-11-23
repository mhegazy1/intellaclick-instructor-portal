/**
 * Question Preview Utility
 * Shared preview functionality for questions across the application
 */

/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy of the array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generate preview HTML for a question
 * @param {Object} questionData - Question data object
 * @param {string} questionData.text - Question text
 * @param {string} questionData.type - Question type (mcq, poll, tf, matching, ordering, fillblank)
 * @param {Array} questionData.options - Question options (for MCQ, poll, etc.)
 * @param {Object} questionData.matching - Matching data {items, matches}
 * @param {Array} questionData.ordering - Ordering items
 * @param {number} questionData.timeLimit - Time limit in seconds
 * @param {number} questionData.points - Points for question
 * @returns {string} HTML string for preview
 */
export function generateQuestionPreview(questionData) {
    const { text, type, options, matching, ordering, timeLimit, points } = questionData;

    let previewHTML = '';

    // Question text (skip for fillblank as it's shown with blanks replaced)
    if (type !== 'fillblank') {
        previewHTML += `<div class="preview-question">${text || 'No question text'}</div>`;
    }

    // Generate type-specific content
    switch (type) {
        case 'mcq':
        case 'poll':
            previewHTML += generateMultipleChoicePreview(options, type === 'poll');
            break;
        case 'tf':
            previewHTML += generateTrueFalsePreview();
            break;
        case 'fillblank':
            previewHTML += generateFillBlankPreview(text);
            break;
        case 'matching':
            previewHTML += generateMatchingPreview(matching);
            break;
        case 'ordering':
            previewHTML += generateOrderingPreview(ordering);
            break;
        default:
            previewHTML += '<div class="alert alert-info">Preview not available for this question type</div>';
    }

    // Add metadata footer
    previewHTML += generateMetadataFooter(timeLimit, points, type);

    return previewHTML;
}

function generateMultipleChoicePreview(options, isPoll = false) {
    if (!options || options.length === 0) {
        return '<div class="alert alert-info">No options added yet</div>';
    }

    let html = '<div class="preview-options">';
    options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const text = opt.trim() || `Option ${letter}`;
        html += `
            <div class="preview-option">
                <input type="radio" name="preview-answer" value="${idx}">
                <div class="preview-option-text"><strong>${letter}.</strong> ${text}</div>
            </div>
        `;
    });
    html += '</div>';

    if (isPoll) {
        html += '<div class="alert alert-info" style="margin-top: 1rem;"><i class="fas fa-info-circle"></i> This is a poll question - no correct answer</div>';
    }

    return html;
}

function generateTrueFalsePreview() {
    return `
        <div class="preview-options">
            <div class="preview-option">
                <input type="radio" name="preview-answer" value="true">
                <div class="preview-option-text"><strong>True</strong></div>
            </div>
            <div class="preview-option">
                <input type="radio" name="preview-answer" value="false">
                <div class="preview-option-text"><strong>False</strong></div>
            </div>
        </div>
    `;
}

function generateFillBlankPreview(questionText) {
    // Replace [blank] tags with input fields
    const previewText = questionText.replace(/\[blank\]/gi, '<input type="text" class="preview-blank-input" placeholder="___">');

    return `
        <div class="preview-fill-blank">${previewText}</div>
    `;
}

function generateMatchingPreview(matching) {
    if (!matching || !matching.items || !matching.matches) {
        return '<div class="alert alert-info">Add items and matches to preview</div>';
    }

    const { items, matches } = matching;

    if (items.length === 0 || matches.length === 0) {
        return '<div class="alert alert-info">Add items and matches to preview</div>';
    }

    // Keep items in order (left column)
    let itemsHTML = '<div class="preview-matching-column"><h4>Items to Match</h4>';
    items.forEach((item, idx) => {
        const text = item.trim() || `Item ${idx + 1}`;
        itemsHTML += `<div class="preview-matching-item"><strong>${idx + 1}.</strong> ${text}</div>`;
    });
    itemsHTML += '</div>';

    // Shuffle matches (right column) to simulate live question behavior
    const shuffledMatches = shuffleArray(matches);
    let matchesHTML = '<div class="preview-matching-column"><h4>Match Options</h4>';
    shuffledMatches.forEach((match, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const text = match.trim() || `Match ${letter}`;
        matchesHTML += `<div class="preview-matching-item"><strong>${letter}.</strong> ${text}</div>`;
    });
    matchesHTML += '</div>';

    return `
        <div class="alert alert-info"><i class="fas fa-info-circle"></i> Match each item on the left with the correct option on the right (matches randomized)</div>
        <div class="preview-matching-grid">
            ${itemsHTML}
            ${matchesHTML}
        </div>
    `;
}

function generateOrderingPreview(ordering) {
    if (!ordering || ordering.length === 0) {
        return '<div class="alert alert-info">Add items to put in order</div>';
    }

    // Shuffle items to simulate live question behavior
    const shuffledItems = shuffleArray(ordering);

    let html = '<div class="alert alert-info"><i class="fas fa-info-circle"></i> Put these items in the correct order (items randomized)</div>';
    html += '<div class="preview-ordering-items">';
    shuffledItems.forEach((item, idx) => {
        const text = item.trim() || `Item ${idx + 1}`;
        html += `
            <div class="preview-ordering-item">
                <i class="fas fa-grip-vertical preview-ordering-handle"></i>
                <div>${text}</div>
            </div>
        `;
    });
    html += '</div>';

    return html;
}

function generateMetadataFooter(timeLimit, points, type) {
    let html = '<div class="preview-metadata">';

    if (timeLimit) {
        html += `<div class="preview-meta-item"><i class="fas fa-clock"></i> <strong>Time:</strong> ${timeLimit}s</div>`;
    }

    if (points) {
        html += `<div class="preview-meta-item"><i class="fas fa-star"></i> <strong>Points:</strong> ${points}</div>`;
    }

    const typeNames = {
        'mcq': 'Multiple Choice',
        'poll': 'Poll Question',
        'tf': 'True/False',
        'fillblank': 'Fill in the Blank',
        'matching': 'Matching',
        'ordering': 'Put in Order'
    };

    if (type && typeNames[type]) {
        html += `<div class="preview-meta-item"><i class="fas fa-question-circle"></i> <strong>Type:</strong> ${typeNames[type]}</div>`;
    }

    html += '</div>';
    return html;
}

/**
 * Get preview CSS styles
 * @returns {string} CSS styles for preview modal
 */
export function getPreviewStyles() {
    return `
        /* Preview Modal */
        .preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        }

        .preview-modal.active {
            display: flex;
        }

        .preview-content {
            background: white;
            border-radius: 12px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .preview-header {
            padding: 1.5rem 2rem;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            border-radius: 12px 12px 0 0;
        }

        .preview-header h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #333;
            margin: 0;
        }

        .preview-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }

        .preview-close:hover {
            background: #e0e0e0;
            color: #333;
        }

        .preview-body {
            padding: 2rem;
        }

        .preview-question {
            font-size: 1.125rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            line-height: 1.6;
            color: #333;
        }

        .preview-options {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .preview-option {
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .preview-option:hover {
            border-color: #3498db;
            background: #f8f9fa;
        }

        .preview-option input[type="radio"],
        .preview-option input[type="checkbox"] {
            flex-shrink: 0;
        }

        .preview-option-text {
            flex: 1;
        }

        .preview-matching-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 1rem;
        }

        .preview-matching-column {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
        }

        .preview-matching-column h4 {
            font-size: 0.875rem;
            font-weight: 600;
            color: #666;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
        }

        .preview-matching-item {
            padding: 0.75rem;
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            margin-bottom: 0.5rem;
        }

        .preview-ordering-items {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .preview-ordering-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
        }

        .preview-ordering-handle {
            color: #999;
        }

        .preview-fill-blank {
            line-height: 2;
        }

        .preview-blank-input {
            display: inline-block;
            min-width: 100px;
            padding: 0.25rem 0.5rem;
            border: none;
            border-bottom: 2px solid #3498db;
            background: transparent;
            margin: 0 0.25rem;
        }

        .preview-metadata {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            font-size: 0.875rem;
            color: #666;
        }

        .preview-meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .preview-meta-item i {
            color: #3498db;
        }

        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .alert-info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }

        .alert i {
            flex-shrink: 0;
        }
    `;
}

/**
 * Default export
 */
export default {
    generateQuestionPreview,
    getPreviewStyles
};
