import{t as P}from"./toast-Cbd37M37.js";/* empty css               */import{c as F,s as v}from"./api-C1P2uT89.js";import{l as g}from"./logger-CXzo1yMG.js";let B=[],b=[],f=null,h=new Set,m=1,S=20,A=[];function U(e,i,a){var s;if(!e)return"No answer";if(i==="matching")try{const o=typeof e=="string"?JSON.parse(e):e;if(console.log("🔍 Matching answer debug:",{answerObj:o,answerType:Array.isArray(o)?"array":typeof o,questionPairs:a==null?void 0:a.pairs,questionLeftColumn:a==null?void 0:a.leftColumn,questionRightColumn:a==null?void 0:a.rightColumn}),Array.isArray(o)&&o.length>0&&((s=o[0])!=null&&s.left))return o.map(r=>`${r.left} → ${r.right}`).join(", ");if(Array.isArray(o)&&(a!=null&&a.pairs))return o.map((r,l)=>{var n;return`${((n=a.pairs[l])==null?void 0:n.left)||`Item ${l+1}`} → ${r}`}).join(", ");if(Array.isArray(o)&&(a!=null&&a.leftColumn))return o.map((r,l)=>`${a.leftColumn[l]||`Item ${l+1}`} → ${r}`).join(", ");if(typeof o=="object"&&!Array.isArray(o)){const r=Object.entries(o);if(a!=null&&a.pairs||a!=null&&a.leftColumn){const l=a.pairs||a.leftColumn;return r.map(([u,n])=>{var t;return`${((t=l[parseInt(u)])==null?void 0:t.left)||l[parseInt(u)]||`Item ${parseInt(u)+1}`} → ${n}`}).join(", ")}return r.map(([l,u])=>`${l} → ${u}`).join(", ")}return console.warn("Could not format matching answer - falling back to JSON:",o),JSON.stringify(o)}catch(o){return console.error("Error formatting matching answer:",o,e),String(e)}if(i==="ordering")try{const o=typeof e=="string"?JSON.parse(e):e;if(Array.isArray(o))return o.map((r,l)=>`${l+1}. ${r}`).join(", ")}catch{}return String(e)}function T(e,i,a){if(e==null||i===null||i===void 0)return!1;const s=o=>typeof o=="string"&&o.length===1&&/^[A-Z]$/i.test(o)?o.toUpperCase().charCodeAt(0)-65:null;if(typeof e=="number"||typeof i=="number"){let o=typeof e=="number"?e:parseInt(e),r=typeof i=="number"?i:parseInt(i);if(isNaN(o)){const l=s(e);l!==null&&(o=l)}if(isNaN(r)){const l=s(i);l!==null&&(r=l)}if(!isNaN(o)&&!isNaN(r))return o===r}if(a==="matching"||a==="ordering")try{const o=typeof e=="object"?JSON.stringify(e):e,r=typeof i=="object"?JSON.stringify(i):i;return o===r}catch{return!1}return typeof e=="string"&&typeof i=="string"?e.toLowerCase().trim()===i.toLowerCase().trim():String(e).toLowerCase().trim()===String(i).toLowerCase().trim()}let L={};document.addEventListener("DOMContentLoaded",()=>{j(),k()});async function j(){try{if(!localStorage.getItem("token"))return;A=(await F.getAll()).classes||[],L={},A.forEach(s=>{L[s._id]=s.name});const a=document.getElementById("classFilter");A.forEach(s=>{const o=document.createElement("option");o.value=s._id,o.textContent=s.name,a.appendChild(o)}),g.debug(`Loaded ${A.length} classes`)}catch(e){g.error("Error loading classes:",e)}}async function k(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}B=(await v.getAll({limit:1e3})).sessions||[],g.debug(`Loaded ${B.length} sessions`),M()}catch(e){g.error("Error loading sessions:",e),alert("Failed to load session history")}}function I(e){const i=document.getElementById("historyContainer"),a=document.getElementById("emptyState"),s=document.getElementById("paginationControls");if(e.length===0){i.style.display="none",a.style.display="block",s.style.display="none";return}const o=e.length,r=S==="all"?1:Math.ceil(o/S);m>r&&(m=Math.max(1,r));let l,u,n;S==="all"?(l=e,u=1,n=o):(u=(m-1)*S+1,n=Math.min(m*S,o),l=e.slice(u-1,n)),i.style.display="grid",a.style.display="none",s.style.display=o>10?"flex":"none",i.innerHTML=l.map(c=>{const t=new Date(c.createdAt).toLocaleDateString(),d=new Date(c.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),p=c.participantCount||0,y=c.totalQuestions||0,w=c.responseCount||0,E=h.has(c.id),$=L[c.classId]||"No Class";return`
                    <div class="session-card ${c.status}">
                        <div class="session-card-header">
                            <input type="checkbox" class="session-checkbox"
                                   data-session-id="${c.id}"
                                   ${E?"checked":""}
                                   onclick="event.stopPropagation(); toggleSessionSelection('${c.id}')"
                                   style="margin-top: 4px;">
                            <div class="session-card-content" onclick="viewSession('${c.id}')">
                                <div class="session-header">
                                    <div>
                                        <div class="session-title">${c.title||"Untitled Session"}</div>
                                        <div class="session-code">Code: ${c.sessionCode}</div>
                                        ${c.classId?`<div class="class-badge">📚 ${$}</div>`:""}
                                    </div>
                                    <span class="status-badge status-${c.status}">${c.status}</span>
                                </div>

                                <div class="session-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">${p}</div>
                                        <div class="stat-label">Students</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${y}</div>
                                        <div class="stat-label">Questions</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${w}</div>
                                        <div class="stat-label">Responses</div>
                                    </div>
                                </div>

                                <div class="session-date">📅 ${t} at ${d}</div>

                                <div class="session-actions" onclick="event.stopPropagation()">
                                    <button class="btn btn-view" onclick="viewSession('${c.id}')">
                                        View Details
                                    </button>
                                    <button class="btn btn-export" onclick="exportSession('${c.id}')">
                                        Export CSV
                                    </button>
                                    <button class="btn btn-delete" onclick="deleteSession('${c.id}')">
                                        Delete
                                    </button>
                                    ${c.status==="active"?`
                                        <button class="btn" style="background: #F59E0B; color: white;" onclick="endSession('${c.id}')">
                                            End Session
                                        </button>
                                    `:""}
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join(""),document.getElementById("showingStart").textContent=u,document.getElementById("showingEnd").textContent=n,document.getElementById("totalSessions").textContent=o,document.getElementById("currentPageNum").textContent=m,document.getElementById("totalPagesNum").textContent=r,document.getElementById("firstPageBtn").disabled=m===1,document.getElementById("prevPageBtn").disabled=m===1,document.getElementById("nextPageBtn").disabled=m===r,document.getElementById("lastPageBtn").disabled=m===r}function M(){const e=document.getElementById("searchInput").value.toLowerCase(),i=document.getElementById("statusFilter").value,a=document.getElementById("classFilter").value;b=B.filter(s=>{const o=s.title.toLowerCase().includes(e)||s.sessionCode.toLowerCase().includes(e),r=i==="all"||s.status===i,l=s.classId||s.class||s.class_id||s.classID;return o&&r&&(a==="all"||l===a)}),g.debug(`Filter: classId="${a}", found ${b.length} sessions`),m=1,I(b)}function O(){const e=document.getElementById("pageSizeSelect");S=e.value==="all"?"all":parseInt(e.value),m=1,I(b)}function R(){const e=S==="all"?1:Math.ceil(b.length/S);m<e&&(m++,I(b),window.scrollTo({top:0,behavior:"smooth"}))}function Q(){m>1&&(m--,I(b),window.scrollTo({top:0,behavior:"smooth"}))}function H(){m!==1&&(m=1,I(b),window.scrollTo({top:0,behavior:"smooth"}))}function _(){const e=S==="all"?1:Math.ceil(b.length/S);m!==e&&(m=e,I(b),window.scrollTo({top:0,behavior:"smooth"}))}async function z(e){var i;try{g.debug("Loading session:",e);const a=localStorage.getItem("token"),s=await v.getById(e);g.debug("Session data:",s),f=s.session,g.debug("Questions:",f.questions),g.debug("Responses:",f.responses),f.responses&&f.responses.length>0&&g.debug("First response structure:",f.responses[0]),x(f),document.getElementById("sessionModal").classList.add("active");const o=(i=f.questions)==null?void 0:i.every(l=>l.awardParticipationPoints===!0),r=document.getElementById("enableParticipationBtn");o?(r.innerHTML='<span style="margin-right: 6px;">✅</span> Participation Points Enabled',r.style.background="#10B981",r.style.color="white",r.disabled=!1):(r.innerHTML='<span style="margin-right: 6px;">🎯</span> Award Participation Points (All Questions)',r.style.background="",r.style.color="",r.disabled=!1)}catch(a){g.error("Error loading session:",a),alert(`Failed to load session details: ${a.message}`)}}function x(e){document.getElementById("modalTitle").textContent=e.title;const i=e.questions||[],a=e.responses||[],s=e.participants||[];function o(n){return{multiple_choice:"Multiple Choice",mcq:"Multiple Choice",true_false:"True/False",boolean:"True/False",tf:"True/False",short_answer:"Short Answer",matching:"Matching",ordering:"Put in Order",fill_blank:"Fill in the Blank"}[n]||n}const r={};s.forEach(n=>{r[n.participantId]={name:n.name,totalPoints:0,questionsAnswered:0,responses:[]}}),a.forEach(n=>{if(r[n.participantId]){let c=0;if(n.points!==void 0)c=n.points,console.log("✓ Using backend-provided points:",n.points),g.debug("✓ Using backend-provided points:",n.points);else if(n.score!==void 0)c=n.score,console.log("✓ Using backend-provided score:",n.score),g.debug("✓ Using backend-provided score:",n.score);else{const t=i.find(p=>p.questionId===n.questionId);console.log("📊 POLL DEBUG - Calculating points for response:",{participantId:n.participantId,questionId:n.questionId,studentAnswer:n.answer,responseCorrectAnswer:n.correctAnswer,questionCorrectAnswer:t==null?void 0:t.correctAnswer,questionType:(t==null?void 0:t.questionType)||(t==null?void 0:t.type),questionPoints:t==null?void 0:t.points,awardParticipationPoints:t==null?void 0:t.awardParticipationPoints,hasAnswer:n.answer!==null&&n.answer!==void 0}),g.debug("📊 Calculating points for response:",{participantId:n.participantId,questionId:n.questionId,studentAnswer:n.answer,responseCorrectAnswer:n.correctAnswer,questionCorrectAnswer:t==null?void 0:t.correctAnswer,questionType:(t==null?void 0:t.questionType)||(t==null?void 0:t.type),questionPoints:t==null?void 0:t.points,awardParticipationPoints:t==null?void 0:t.awardParticipationPoints});const d=T(n.answer,n.correctAnswer||(t==null?void 0:t.correctAnswer),(t==null?void 0:t.questionType)||(t==null?void 0:t.type));d?(c=(t==null?void 0:t.points)||10,console.log("✅ Correct answer - points:",c)):t!=null&&t.awardParticipationPoints&&n.answer!==null&&n.answer!==void 0?(c=(t==null?void 0:t.points)||10,console.log("✅ AWARDED PARTICIPATION POINTS:",c),g.debug("✅ Awarded participation points for poll question")):(c=0,console.log("❌ No points awarded - isCorrect:",d,"awardParticipation:",t==null?void 0:t.awardParticipationPoints,"hasAnswer:",n.answer!==null&&n.answer!==void 0)),console.log(`💰 FINAL Earned points: ${c} (correct: ${d}, participation: ${t==null?void 0:t.awardParticipationPoints})`),g.debug(`💰 Earned points: ${c} (correct: ${d}, participation: ${t==null?void 0:t.awardParticipationPoints})`)}r[n.participantId].totalPoints+=c,r[n.participantId].questionsAnswered++,r[n.participantId].responses.push(n)}});const l=Object.values(r).sort((n,c)=>c.totalPoints-n.totalPoints);let u=`
                <div style="margin-bottom: 2rem;">
                    <h3>Session Information</h3>
                    <p><strong>Code:</strong> ${e.sessionCode}</p>
                    <p><strong>Status:</strong> ${e.status}</p>
                    <p><strong>Participants:</strong> ${s.length}</p>
                    <p><strong>Questions Asked:</strong> ${i.length}</p>
                    <p><strong>Total Responses:</strong> ${a.length}</p>
                </div>

                <div class="summary-section">
                    <h3>Student Performance Summary</h3>
                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Student</th>
                                <th>Total Points</th>
                                <th>Questions Answered</th>
                                <th>Participation</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${l.map((n,c)=>{const t=i.length>0?Math.round(n.questionsAnswered/i.length*100):0;return`
                                    <tr>
                                        <td><strong>#${c+1}</strong></td>
                                        <td>${n.name}</td>
                                        <td><strong>${n.totalPoints}</strong></td>
                                        <td>${n.questionsAnswered} / ${i.length}</td>
                                        <td>
                                            <div class="participation-bar">
                                                <div style="flex: 1; background: #e5e7eb; border-radius: 4px; height: 8px;">
                                                    <div class="participation-bar-fill" style="width: ${t}%;"></div>
                                                </div>
                                                <span style="font-size: 0.875rem; min-width: 40px;">${t}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                `}).join("")}
                            ${l.length===0?'<tr><td colspan="5">No student data available</td></tr>':""}
                        </tbody>
                    </table>
                </div>

                <h3>Questions & Responses</h3>
            `;i.forEach((n,c)=>{const t=a.filter(p=>p.questionId===n.questionId),d=n.awardParticipationPoints===!0;u+=`
                    <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                            <h4 style="margin: 0;">Question ${c+1}: ${n.questionText}</h4>
                            <button
                                onclick="toggleQuestionParticipationPoints('${n.questionId}', ${d})"
                                class="btn ${d?"btn-success":"btn-secondary"}"
                                style="font-size: 0.75rem; padding: 0.25rem 0.5rem; ${d?"background: #10B981; color: white;":""}"
                                title="${d?"Click to disable participation points":"Click to enable participation points"}"
                            >
                                ${d?"✅ Participation Points":"⚪ No Participation Points"}
                            </button>
                        </div>
                        <p><strong>Type:</strong> ${o(n.questionType)} | <strong>Points:</strong> ${n.points}</p>

                        <table class="responses-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Answer</th>
                                    <th>Points</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${t.map(p=>{const y=s.find(C=>C.participantId===p.participantId);let w=0;if(p.points!==void 0)w=p.points,g.debug("✓ Using backend-provided points:",p.points);else if(p.score!==void 0)w=p.score,g.debug("✓ Using backend-provided score:",p.score);else{g.debug("📊 Calculating points (question details):",{participantId:p.participantId,studentAnswer:p.answer,responseCorrectAnswer:p.correctAnswer,questionCorrectAnswer:n.correctAnswer,questionType:n.questionType,questionPoints:n.points,awardParticipationPoints:n.awardParticipationPoints});const C=T(p.answer,p.correctAnswer||n.correctAnswer,n.questionType);C||n.awardParticipationPoints&&p.answer!==null&&p.answer!==void 0?w=n.points||10:w=0,g.debug(`💰 Earned points: ${w} (correct: ${C}, participation: ${n.awardParticipationPoints})`)}const E=w>0,$=p.submittedAt||p.timestamp||p.answeredAt||p.createdAt,D=$?new Date($).toLocaleTimeString():"N/A";return`
                                        <tr>
                                            <td>${(y==null?void 0:y.name)||p.participantId}</td>
                                            <td>${U(p.answer,n.questionType,n)}</td>
                                            <td class="${E?"correct":"incorrect"}">
                                                ${w} / ${n.points}
                                            </td>
                                            <td>${D}</td>
                                        </tr>
                                    `}).join("")}
                                ${t.length===0?'<tr><td colspan="4">No responses</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                `}),document.getElementById("modalBody").innerHTML=u}function V(){document.getElementById("sessionModal").classList.remove("active")}async function J(e){try{const i=localStorage.getItem("token"),s=(await v.getById(e)).session,o={};(s.participants||[]).forEach(t=>{o[t.participantId]={name:t.name,totalPoints:0,questionsAnswered:0}}),(s.responses||[]).forEach(t=>{if(o[t.participantId]){const d=(s.questions||[]).find(y=>y.questionId===t.questionId);let p=0;t.points!==void 0?p=t.points:t.score!==void 0?p=t.score:p=T(t.answer,t.correctAnswer||(d==null?void 0:d.correctAnswer),(d==null?void 0:d.questionType)||(d==null?void 0:d.type))?(d==null?void 0:d.points)||10:0,o[t.participantId].totalPoints+=p,o[t.participantId].questionsAnswered++}});const r=Object.values(o).sort((t,d)=>d.totalPoints-t.totalPoints);let l=`STUDENT PERFORMANCE SUMMARY
`;l+=`Rank,Student Name,Total Points,Questions Answered,Participation %
`,r.forEach((t,d)=>{const p=(s.questions||[]).length>0?Math.round(t.questionsAnswered/(s.questions||[]).length*100):0;l+=`${d+1},"${t.name}",${t.totalPoints},${t.questionsAnswered},${p}%
`}),l+=`

DETAILED RESPONSES
`,l+=`Student,Question,Answer,Points,Correct Answer,Timestamp
`,(s.responses||[]).forEach(t=>{const d=(s.questions||[]).find($=>$.questionId===t.questionId),p=(s.participants||[]).find($=>$.participantId===t.participantId);let y=0;t.points!==void 0?y=t.points:t.score!==void 0?y=t.score:y=T(t.answer,t.correctAnswer||(d==null?void 0:d.correctAnswer),(d==null?void 0:d.questionType)||(d==null?void 0:d.type))?(d==null?void 0:d.points)||10:0;const w=t.submittedAt||t.timestamp||t.answeredAt||t.createdAt,E=w?new Date(w).toLocaleString():"N/A";l+=`"${(p==null?void 0:p.name)||t.participantId}",`,l+=`"${(d==null?void 0:d.questionText)||"Unknown"}",`,l+=`"${t.answer}",`,l+=`${y},`,l+=`"${(d==null?void 0:d.correctAnswer)||"N/A"}",`,l+=`"${E}"
`});const u=new Blob([l],{type:"text/csv"}),n=window.URL.createObjectURL(u),c=document.createElement("a");c.href=n,c.download=`${s.sessionCode}_${s.title}_responses.csv`,c.click(),window.URL.revokeObjectURL(n),P.success("Session exported successfully!")}catch(i){g.error("Error exporting session:",i),g.error("Error details:",{message:i.message,stack:i.stack,sessionId:e}),P.error(`Failed to export session: ${i.message}`)}}async function G(e){var a;if(!window.confirm("Are you sure you want to delete this session? This cannot be undone."))return;const i=(a=document.querySelector(`[data-session-id="${e}"]`))==null?void 0:a.closest(".session-card");i&&(i.style.opacity="0.5",i.style.pointerEvents="none");try{g.debug("=== DELETE SESSION DEBUG ==="),g.debug("Session ID:",e),await v.delete(e),g.debug("DELETE SUCCESS"),g.debug("=== END DEBUG ==="),await k(),alert("Session deleted successfully")}catch(s){g.error("Error deleting session:",s),g.error("Error type:",s.constructor.name),g.error("Error stack:",s.stack),i&&(i.style.opacity="1",i.style.pointerEvents="auto");const o=s.message||String(s);alert(`Failed to delete session

Error: ${o}

Check browser console (F12) for full details.`)}}function K(e){h.has(e)?h.delete(e):h.add(e),N()}function W(){const e=Array.from(document.querySelectorAll(".session-checkbox"));h.size===e.length&&e.length>0?h.clear():e.forEach(i=>{h.add(i.dataset.sessionId)}),I(b),N()}function N(){const e=h.size;document.getElementById("selectedCount").textContent=e,document.getElementById("deleteSelectedBtn").disabled=e===0;const i=document.querySelectorAll(".session-checkbox"),a=e>0&&e===i.length;document.getElementById("selectAllText").textContent=a?"Deselect All":"Select All"}async function Y(){const e=h.size;if(e===0||!window.confirm(`Are you sure you want to delete ${e} session(s)? This cannot be undone.`))return;const i=Array.from(h);localStorage.getItem("token");let a=0,s=0;const o=[],r=document.getElementById("deleteSelectedBtn"),l=r.innerHTML;r.disabled=!0;for(let n=0;n<i.length;n++){const c=i[n];r.innerHTML=`Deleting ${n+1}/${i.length}...`,g.debug(`
=== BULK DELETE ${n+1}/${i.length} ===`),g.debug("Session ID:",c);try{await v.delete(c),g.debug("✅ Delete successful"),a++,h.delete(c)}catch(t){g.error("❌ Delete failed:",t.message),s++,o.push(`${c.substring(0,8)}: ${t.message}`)}}r.innerHTML=l;let u=`Successfully deleted ${a} session(s).`;s>0&&(u+=`

Failed to delete ${s} session(s):
${o.join(`
`)}`),await k(),h.clear(),N(),alert(u)}async function Z(e){if(window.confirm("Are you sure you want to end this session?"))try{await v.end(e),await k(),alert("Session ended successfully")}catch(i){g.error("Error ending session:",i),alert(`Failed to end session: ${i.message}`)}}async function X(){var r;if(!f){P.error("No session loaded");return}const e=((r=f.questions)==null?void 0:r.length)||0;if(e===0){P.error("This session has no questions");return}if(f.questions.every(l=>l.awardParticipationPoints===!0)){P.info("Participation points are already enabled for all questions");return}const a=`This will enable participation points for all ${e} questions in this session.

Students who answered (regardless of correctness) will receive points.

Continue?`;if(!window.confirm(a))return;const s=document.getElementById("enableParticipationBtn"),o=s.innerHTML;s.innerHTML='<span style="margin-right: 6px;">⏳</span> Updating...',s.disabled=!0;try{await v.updateAllParticipationPoints(f._id,!0),f.questions.forEach(l=>{l.awardParticipationPoints=!0}),P.success(`Participation points enabled for ${e} questions!`),x(f),s.innerHTML='<span style="margin-right: 6px;">✅</span> Participation Points Enabled',s.classList.remove("btn-secondary"),s.classList.add("btn-success"),s.style.background="#10B981",s.style.color="white"}catch(l){g.error("Error enabling participation points:",l),P.error(`Failed to update: ${l.message}`),s.innerHTML=o,s.disabled=!1}}async function q(e,i){if(!f){P.error("No session loaded");return}const a=!i;try{await v.updateQuestionParticipationPoints(f._id,e,a);const s=f.questions.find(o=>o.questionId===e);s&&(s.awardParticipationPoints=a),P.success(`Participation points ${a?"enabled":"disabled"} for this question`),x(f)}catch(s){g.error("Error toggling participation points:",s),P.error(`Failed to update: ${s.message}`)}}window.toggleSelectAll=W;window.deleteSelected=Y;window.filterSessions=M;window.changePageSize=O;window.goToFirstPage=H;window.previousPage=Q;window.nextPage=R;window.goToLastPage=_;window.closeModal=V;window.toggleSessionSelection=K;window.viewSession=z;window.endSession=Z;window.exportSession=J;window.deleteSession=G;window.enableParticipationPointsForAll=X;window.toggleQuestionParticipationPoints=q;
