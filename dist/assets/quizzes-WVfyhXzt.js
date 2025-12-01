import{t as o}from"./toast-Cbd37M37.js";/* empty css               */import{q as r}from"./api-C1P2uT89.js";import{l as s}from"./logger-CXzo1yMG.js";let n=new Set,a=[];s.debug("🔵 Quizzes Page Loaded - Version 1.0.0-modular");document.addEventListener("DOMContentLoaded",()=>{s.debug("🔵 DOMContentLoaded - initializing page"),z(),l()});function z(){localStorage.getItem("token")||(window.location.href="login.html")}async function l(){try{if(!localStorage.getItem("token"))throw new Error("Not authenticated. Please log in.");s.debug("Loading quizzes from cloud API..."),a=(await r.getAll()).quizzes||[],s.debug(`✅ Loaded ${a.length} quizzes from cloud`),d(a)}catch(e){s.error("Error loading quizzes:",e),o.error(`Failed to load quizzes: ${e.message}`),f("Network error. Please try again.")}}function d(e){const t=document.getElementById("quizzesContainer");if(e.length===0){t.innerHTML=`
                    <div class="empty-state">
                        <h3>No Quizzes Yet</h3>
                        <p>Create your first quiz to get started</p>
                        <br>
                        <a href="saved-questions.html" class="btn btn-primary">Create Quiz</a>
                    </div>
                `;return}t.innerHTML=`
                <div class="quiz-grid">
                    ${e.map(i=>{const u=n.has(i._id);return`
                        <div class="quiz-card">
                            <div class="quiz-card-header">
                                <input type="checkbox" class="quiz-checkbox"
                                       data-quiz-id="${i._id}"
                                       ${u?"checked":""}
                                       onclick="toggleQuizSelection('${i._id}')">
                                <div class="quiz-card-content">
                                    <div class="quiz-title">${c(i.title)}</div>
                                    <div class="quiz-description">${c(i.description||"No description")}</div>
                                </div>
                            </div>
                            <div class="quiz-meta">
                                <div class="quiz-meta-item">
                                    <span>📝</span>
                                    <span>${i.questionCount||0} questions</span>
                                </div>
                                <div class="quiz-meta-item">
                                    <span>⭐</span>
                                    <span>${i.totalPoints||0} points</span>
                                </div>
                            </div>
                            <div class="quiz-actions">
                                <a href="quiz-creator-full.html?id=${i._id}" class="btn btn-secondary btn-small">Edit</a>
                                <button class="btn btn-secondary btn-small" onclick="duplicateQuiz('${i._id}')">Duplicate</button>
                                <button class="btn btn-danger btn-small" onclick="deleteQuiz('${i._id}', '${c(i.title)}')">Delete</button>
                            </div>
                        </div>
                    `}).join("")}
                </div>
            `,b()}async function m(e){if(confirm("Create a copy of this quiz?"))try{const t=await r.duplicate(e);t.success?(o.success("Quiz duplicated successfully!"),l()):o.error(t.message||"Failed to duplicate quiz")}catch(t){s.error("Error duplicating quiz:",t),o.error(`Failed to duplicate quiz: ${t.message}`)}}async function g(e,t){if(confirm(`Are you sure you want to delete "${t}"? This action cannot be undone.`))try{const i=await r.delete(e);i.success?(o.success("Quiz deleted successfully!"),l()):o.error(i.message||"Failed to delete quiz")}catch(i){s.error("Error deleting quiz:",i),o.error(`Failed to delete quiz: ${i.message}`)}}function f(e){const t=document.getElementById("quizzesContainer");t.innerHTML=`
                <div class="empty-state">
                    <h3>Error</h3>
                    <p>${e}</p>
                    <br>
                    <button class="btn btn-primary" onclick="loadQuizzes()">Retry</button>
                </div>
            `}function c(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function p(e){n.has(e)?n.delete(e):n.add(e),d(a)}function h(){const e=a;n.size===e.length&&e.length>0?n.clear():e.forEach(t=>{n.add(t._id)}),d(a)}function b(){const e=n.size;document.getElementById("selectedCount").textContent=e,document.getElementById("deleteSelectedBtn").disabled=e===0;const t=a,i=e>0&&e===t.length;document.getElementById("selectAllText").textContent=i?"Deselect All":"Select All"}async function y(){const e=n.size;if(e!==0&&confirm(`Are you sure you want to delete ${e} quiz${e>1?"zes":""}? This action cannot be undone.`))try{const t=Array.from(n).map(i=>r.delete(i));await Promise.all(t),o.success(`Successfully deleted ${e} quiz${e>1?"zes":""}!`),n.clear(),l()}catch(t){s.error("Error deleting quizzes:",t),o.error("Some quizzes could not be deleted. Please try again."),l()}}window.toggleQuizSelection=p;window.toggleSelectAll=h;window.deleteSelected=y;window.duplicateQuiz=m;window.deleteQuiz=g;window.loadQuizzes=l;
