/**
 * Quiz Creator - Cloud API Implementation
 * Replaces Electron IPC with cloud REST API calls
 */

import { quizzes, questions } from './utils/api.js';
import { showToast } from './utils/toast.js';

let quizQuestions = [];
let categories = [];
let draggedItem = null;

// Initialize
window.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    setupEventListeners();
    checkForReturnedQuestions();
});

/**
 * Load categories from API
 * TODO: Add categories endpoint to backend
 */
async function loadCategories() {
    try {
        // TODO: Implement categories API endpoint
        // For now, use empty array or mock data
        categories = [];
        const select = document.getElementById('quiz-category');

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

/**
 * Check for questions returned from question editor or question bank
 * Uses localStorage for cross-page communication
 */
function checkForReturnedQuestions() {
    // Check if we're returning from question editor or question bank
    const returnData = localStorage.getItem('quizCreatorReturn');

    if (returnData) {
        try {
            const data = JSON.parse(returnData);

            if (data.questions && Array.isArray(data.questions)) {
                addQuestionsToQuiz(data.questions);
                showToast('Questions added successfully', 'success');
            }

            // Clear the return data
            localStorage.removeItem('quizCreatorReturn');
        } catch (error) {
            console.error('Error processing returned questions:', error);
        }
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // No IPC listeners needed in cloud version
    // Communication happens via localStorage and page navigation
    console.log('Quiz creator initialized with cloud API');
}

/**
 * Add questions to quiz
 */
function addQuestionsToQuiz(newQuestions) {
    newQuestions.forEach(q => {
        // Check if question already exists
        if (!quizQuestions.find(existing => existing.id === q.id || existing._id === q._id)) {
            quizQuestions.push(q);
        }
    });
    renderQuestions();

    // Ensure form fields remain editable after adding questions
    setTimeout(() => {
        document.getElementById('quiz-title').removeAttribute('disabled');
        document.getElementById('quiz-description').removeAttribute('disabled');
        document.getElementById('quiz-category').removeAttribute('disabled');
    }, 100);
}

/**
 * Render questions list
 */
function renderQuestions() {
    // Preserve form values before re-rendering
    const titleValue = document.getElementById('quiz-title').value;
    const descriptionValue = document.getElementById('quiz-description').value;
    const categoryValue = document.getElementById('quiz-category').value;

    const listDiv = document.getElementById('question-list');
    document.getElementById('question-count').textContent = quizQuestions.length;

    if (quizQuestions.length === 0) {
        listDiv.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No questions added yet</p>
                <p>Add questions from the question bank or create new ones</p>
            </div>
        `;
        return;
    }

    listDiv.innerHTML = quizQuestions.map((q, index) => `
        <div class="question-item" draggable="true" data-index="${index}">
            <div class="question-content">
                <div class="question-text">${index + 1}. ${q.text || q.question || 'Untitled Question'}</div>
                <div class="question-meta">
                    Type: ${q.type || 'N/A'} | Category: ${getCategoryName(q.categoryId) || 'Uncategorized'}
                </div>
            </div>
            <div class="question-actions">
                <button class="btn btn-small btn-secondary" onclick="window.quizCreator.moveQuestion(${index}, -1)"
                        ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="btn btn-small btn-secondary" onclick="window.quizCreator.moveQuestion(${index}, 1)"
                        ${index === quizQuestions.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="window.quizCreator.removeQuestion(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Setup drag and drop
    setupDragAndDrop();

    // Restore form values after rendering
    document.getElementById('quiz-title').value = titleValue;
    document.getElementById('quiz-description').value = descriptionValue;
    document.getElementById('quiz-category').value = categoryValue;
}

/**
 * Setup drag and drop functionality
 */
function setupDragAndDrop() {
    const items = document.querySelectorAll('.question-item');

    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    const afterElement = getDragAfterElement(e.currentTarget.parentNode, e.clientY);
    if (afterElement == null) {
        e.currentTarget.classList.add('drag-over');
    }

    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedItem !== this) {
        const draggedIndex = parseInt(draggedItem.dataset.index);
        const targetIndex = parseInt(this.dataset.index);

        const draggedQuestion = quizQuestions[draggedIndex];
        quizQuestions.splice(draggedIndex, 1);
        quizQuestions.splice(targetIndex, 0, draggedQuestion);

        renderQuestions();
    }

    return false;
}

function handleDragEnd(e) {
    const items = document.querySelectorAll('.question-item');
    items.forEach(item => {
        item.classList.remove('dragging');
        item.classList.remove('drag-over');
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.question-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : null;
}

/**
 * Move question up or down
 */
function moveQuestion(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < quizQuestions.length) {
        const temp = quizQuestions[index];
        quizQuestions[index] = quizQuestions[newIndex];
        quizQuestions[newIndex] = temp;
        renderQuestions();
    }
}

/**
 * Remove question from quiz
 */
function removeQuestion(index) {
    if (confirm('Remove this question from the quiz?')) {
        quizQuestions.splice(index, 1);
        renderQuestions();
    }
}

/**
 * Open question bank for selecting questions
 * Navigate to saved-questions.html with return context
 */
async function addFromQuestionBank() {
    try {
        // Store current quiz state
        const currentState = {
            title: document.getElementById('quiz-title').value,
            description: document.getElementById('quiz-description').value,
            categoryId: document.getElementById('quiz-category').value,
            questions: quizQuestions
        };

        localStorage.setItem('quizCreatorState', JSON.stringify(currentState));
        localStorage.setItem('quizCreatorMode', 'selecting');

        // Navigate to question bank
        window.location.href = 'saved-questions.html?mode=select&returnTo=quiz-creator';
    } catch (error) {
        console.error('Failed to open question bank:', error);
        showToast('Failed to open question bank', 'error');
    }
}

/**
 * Create new question
 * Navigate to question-editor-enhanced.html with return context
 */
async function createNewQuestion() {
    try {
        // Store current quiz state
        const currentState = {
            title: document.getElementById('quiz-title').value,
            description: document.getElementById('quiz-description').value,
            categoryId: document.getElementById('quiz-category').value,
            questions: quizQuestions
        };

        localStorage.setItem('quizCreatorState', JSON.stringify(currentState));

        // Navigate to question editor
        window.location.href = 'question-editor-enhanced.html?returnTo=quiz-creator';
    } catch (error) {
        console.error('Failed to open question creator:', error);
        showToast('Failed to open question creator', 'error');
    }
}

/**
 * Save quiz using cloud API
 */
async function saveQuiz() {
    const title = document.getElementById('quiz-title').value.trim();
    const description = document.getElementById('quiz-description').value.trim();
    const categoryId = document.getElementById('quiz-category').value;

    if (!title) {
        showToast('Please enter a quiz title', 'error');
        return;
    }

    if (quizQuestions.length === 0) {
        showToast('Please add at least one question to the quiz', 'error');
        return;
    }

    const quizData = {
        title,
        description,
        categoryId: categoryId || undefined,
        questions: quizQuestions.map(q => q.id || q._id),
        type: 'standard',
        settings: {
            shuffleQuestions: false,
            shuffleAnswers: false,
            showCorrectAnswers: true
        }
    };

    try {
        const result = await quizzes.create(quizData);
        showToast('Quiz saved successfully!', 'success');

        // Clear any stored state
        localStorage.removeItem('quizCreatorState');
        localStorage.removeItem('quizCreatorMode');

        // Navigate back to quizzes page
        setTimeout(() => {
            window.location.href = 'quizzes.html';
        }, 1000);
    } catch (error) {
        console.error('Failed to save quiz:', error);
        showToast('Failed to save quiz: ' + error.message, 'error');
    }
}

/**
 * Cancel quiz creation
 */
function cancelQuiz() {
    if (quizQuestions.length > 0) {
        if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            // Clear any stored state
            localStorage.removeItem('quizCreatorState');
            localStorage.removeItem('quizCreatorMode');

            // Navigate back to quizzes page
            window.location.href = 'quizzes.html';
        }
    } else {
        // Clear any stored state
        localStorage.removeItem('quizCreatorState');
        localStorage.removeItem('quizCreatorMode');

        // Navigate back to quizzes page
        window.location.href = 'quizzes.html';
    }
}

/**
 * Navigate to home
 */
function goHome() {
    if (quizQuestions.length > 0) {
        if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
            window.location.href = 'classes.html';
        }
    } else {
        window.location.href = 'classes.html';
    }
}

// Restore quiz state if returning from question editor/bank
window.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('quizCreatorState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            document.getElementById('quiz-title').value = state.title || '';
            document.getElementById('quiz-description').value = state.description || '';
            document.getElementById('quiz-category').value = state.categoryId || '';

            if (state.questions && state.questions.length > 0) {
                quizQuestions = state.questions;
                renderQuestions();
            }
        } catch (error) {
            console.error('Error restoring quiz state:', error);
        }
    }
});

// Export functions for global access
window.quizCreator = {
    moveQuestion,
    removeQuestion,
    addFromQuestionBank,
    createNewQuestion,
    saveQuiz,
    cancelQuiz,
    goHome
};
