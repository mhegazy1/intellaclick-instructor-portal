import{t as x}from"./toast-93yYkT8V.js";/* empty css               */import{c as D,s as P}from"./api-Cc5qfUA_.js";import{l as p}from"./logger-gSLuc3Ra.js";let k=[],y=[],S=null,h=new Set,u=1,w=20,E=[];function M(t,o,i){var l;if(!t)return"No answer";if(o==="matching")try{const a=typeof t=="string"?JSON.parse(t):t;if(console.log("🔍 Matching answer debug:",{answerObj:a,answerType:Array.isArray(a)?"array":typeof a,questionPairs:i==null?void 0:i.pairs,questionLeftColumn:i==null?void 0:i.leftColumn,questionRightColumn:i==null?void 0:i.rightColumn}),Array.isArray(a)&&a.length>0&&((l=a[0])!=null&&l.left))return a.map(d=>`${d.left} → ${d.right}`).join(", ");if(Array.isArray(a)&&(i!=null&&i.pairs))return a.map((d,c)=>{var n;return`${((n=i.pairs[c])==null?void 0:n.left)||`Item ${c+1}`} → ${d}`}).join(", ");if(Array.isArray(a)&&(i!=null&&i.leftColumn))return a.map((d,c)=>`${i.leftColumn[c]||`Item ${c+1}`} → ${d}`).join(", ");if(typeof a=="object"&&!Array.isArray(a)){const d=Object.entries(a);if(i!=null&&i.pairs||i!=null&&i.leftColumn){const c=i.pairs||i.leftColumn;return d.map(([g,n])=>{var e;return`${((e=c[parseInt(g)])==null?void 0:e.left)||c[parseInt(g)]||`Item ${parseInt(g)+1}`} → ${n}`}).join(", ")}return d.map(([c,g])=>`${c} → ${g}`).join(", ")}return console.warn("Could not format matching answer - falling back to JSON:",a),JSON.stringify(a)}catch(a){return console.error("Error formatting matching answer:",a,t),String(t)}if(o==="ordering")try{const a=typeof t=="string"?JSON.parse(t):t;if(Array.isArray(a))return a.map((d,c)=>`${c+1}. ${d}`).join(", ")}catch{}return String(t)}function A(t,o,i){if(t==null||o===null||o===void 0)return!1;const l=a=>typeof a=="string"&&a.length===1&&/^[A-Z]$/i.test(a)?a.toUpperCase().charCodeAt(0)-65:null;if(typeof t=="number"||typeof o=="number"){let a=typeof t=="number"?t:parseInt(t),d=typeof o=="number"?o:parseInt(o);if(isNaN(a)){const c=l(t);c!==null&&(a=c)}if(isNaN(d)){const c=l(o);c!==null&&(d=c)}if(!isNaN(a)&&!isNaN(d))return a===d}if(i==="matching"||i==="ordering")try{const a=typeof t=="object"?JSON.stringify(t):t,d=typeof o=="object"?JSON.stringify(o):o;return a===d}catch{return!1}return typeof t=="string"&&typeof o=="string"?t.toLowerCase().trim()===o.toLowerCase().trim():String(t).toLowerCase().trim()===String(o).toLowerCase().trim()}let B={};document.addEventListener("DOMContentLoaded",()=>{F(),T()});async function F(){try{if(!localStorage.getItem("token"))return;E=(await D.getAll()).classes||[],B={},E.forEach(l=>{B[l._id]=l.name});const i=document.getElementById("classFilter");E.forEach(l=>{const a=document.createElement("option");a.value=l._id,a.textContent=l.name,i.appendChild(a)}),p.debug(`Loaded ${E.length} classes`)}catch(t){p.error("Error loading classes:",t)}}async function T(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}k=(await P.getAll({limit:1e3})).sessions||[],p.debug(`Loaded ${k.length} sessions`),N()}catch(t){p.error("Error loading sessions:",t),alert("Failed to load session history")}}function $(t){const o=document.getElementById("historyContainer"),i=document.getElementById("emptyState"),l=document.getElementById("paginationControls");if(t.length===0){o.style.display="none",i.style.display="block",l.style.display="none";return}const a=t.length,d=w==="all"?1:Math.ceil(a/w);u>d&&(u=Math.max(1,d));let c,g,n;w==="all"?(c=t,g=1,n=a):(g=(u-1)*w+1,n=Math.min(u*w,a),c=t.slice(g-1,n)),o.style.display="grid",i.style.display="none",l.style.display=a>10?"flex":"none",o.innerHTML=c.map(r=>{const e=new Date(r.createdAt).toLocaleDateString(),s=new Date(r.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),m=r.participantCount||0,f=r.totalQuestions||0,v=r.responseCount||0,I=h.has(r.id),b=B[r.classId]||"No Class";return`
                    <div class="session-card ${r.status}">
                        <div class="session-card-header">
                            <input type="checkbox" class="session-checkbox"
                                   data-session-id="${r.id}"
                                   ${I?"checked":""}
                                   onclick="event.stopPropagation(); toggleSessionSelection('${r.id}')"
                                   style="margin-top: 4px;">
                            <div class="session-card-content" onclick="viewSession('${r.id}')">
                                <div class="session-header">
                                    <div>
                                        <div class="session-title">${r.title||"Untitled Session"}</div>
                                        <div class="session-code">Code: ${r.sessionCode}</div>
                                        ${r.classId?`<div class="class-badge">📚 ${b}</div>`:""}
                                    </div>
                                    <span class="status-badge status-${r.status}">${r.status}</span>
                                </div>

                                <div class="session-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">${m}</div>
                                        <div class="stat-label">Students</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${f}</div>
                                        <div class="stat-label">Questions</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${v}</div>
                                        <div class="stat-label">Responses</div>
                                    </div>
                                </div>

                                <div class="session-date">📅 ${e} at ${s}</div>

                                <div class="session-actions" onclick="event.stopPropagation()">
                                    <button class="btn btn-view" onclick="viewSession('${r.id}')">
                                        View Details
                                    </button>
                                    <button class="btn btn-export" onclick="exportSession('${r.id}')">
                                        Export CSV
                                    </button>
                                    <button class="btn btn-delete" onclick="deleteSession('${r.id}')">
                                        Delete
                                    </button>
                                    ${r.status==="active"?`
                                        <button class="btn" style="background: #F59E0B; color: white;" onclick="endSession('${r.id}')">
                                            End Session
                                        </button>
                                    `:""}
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join(""),document.getElementById("showingStart").textContent=g,document.getElementById("showingEnd").textContent=n,document.getElementById("totalSessions").textContent=a,document.getElementById("currentPageNum").textContent=u,document.getElementById("totalPagesNum").textContent=d,document.getElementById("firstPageBtn").disabled=u===1,document.getElementById("prevPageBtn").disabled=u===1,document.getElementById("nextPageBtn").disabled=u===d,document.getElementById("lastPageBtn").disabled=u===d}function N(){const t=document.getElementById("searchInput").value.toLowerCase(),o=document.getElementById("statusFilter").value,i=document.getElementById("classFilter").value;y=k.filter(l=>{const a=l.title.toLowerCase().includes(t)||l.sessionCode.toLowerCase().includes(t),d=o==="all"||l.status===o,c=l.classId||l.class||l.class_id||l.classID;return a&&d&&(i==="all"||c===i)}),p.debug(`Filter: classId="${i}", found ${y.length} sessions`),u=1,$(y)}function U(){const t=document.getElementById("pageSizeSelect");w=t.value==="all"?"all":parseInt(t.value),u=1,$(y)}function O(){const t=w==="all"?1:Math.ceil(y.length/w);u<t&&(u++,$(y),window.scrollTo({top:0,behavior:"smooth"}))}function j(){u>1&&(u--,$(y),window.scrollTo({top:0,behavior:"smooth"}))}function R(){u!==1&&(u=1,$(y),window.scrollTo({top:0,behavior:"smooth"}))}function Q(){const t=w==="all"?1:Math.ceil(y.length/w);u!==t&&(u=t,$(y),window.scrollTo({top:0,behavior:"smooth"}))}async function _(t){try{p.debug("Loading session:",t);const o=localStorage.getItem("token"),i=await P.getById(t);p.debug("Session data:",i),S=i.session,p.debug("Questions:",S.questions),p.debug("Responses:",S.responses),S.responses&&S.responses.length>0&&p.debug("First response structure:",S.responses[0]),z(S),document.getElementById("sessionModal").classList.add("active")}catch(o){p.error("Error loading session:",o),alert(`Failed to load session details: ${o.message}`)}}function z(t){document.getElementById("modalTitle").textContent=t.title;const o=t.questions||[],i=t.responses||[],l=t.participants||[];function a(n){return{multiple_choice:"Multiple Choice",mcq:"Multiple Choice",true_false:"True/False",boolean:"True/False",tf:"True/False",short_answer:"Short Answer",matching:"Matching",ordering:"Put in Order",fill_blank:"Fill in the Blank"}[n]||n}const d={};l.forEach(n=>{d[n.participantId]={name:n.name,totalPoints:0,questionsAnswered:0,responses:[]}}),i.forEach(n=>{if(d[n.participantId]){let r=0;if(n.points!==void 0)r=n.points,console.log("✓ Using backend-provided points:",n.points),p.debug("✓ Using backend-provided points:",n.points);else if(n.score!==void 0)r=n.score,console.log("✓ Using backend-provided score:",n.score),p.debug("✓ Using backend-provided score:",n.score);else{const e=o.find(m=>m.questionId===n.questionId);console.log("📊 POLL DEBUG - Calculating points for response:",{participantId:n.participantId,questionId:n.questionId,studentAnswer:n.answer,responseCorrectAnswer:n.correctAnswer,questionCorrectAnswer:e==null?void 0:e.correctAnswer,questionType:(e==null?void 0:e.questionType)||(e==null?void 0:e.type),questionPoints:e==null?void 0:e.points,awardParticipationPoints:e==null?void 0:e.awardParticipationPoints,hasAnswer:n.answer!==null&&n.answer!==void 0}),p.debug("📊 Calculating points for response:",{participantId:n.participantId,questionId:n.questionId,studentAnswer:n.answer,responseCorrectAnswer:n.correctAnswer,questionCorrectAnswer:e==null?void 0:e.correctAnswer,questionType:(e==null?void 0:e.questionType)||(e==null?void 0:e.type),questionPoints:e==null?void 0:e.points,awardParticipationPoints:e==null?void 0:e.awardParticipationPoints});const s=A(n.answer,n.correctAnswer||(e==null?void 0:e.correctAnswer),(e==null?void 0:e.questionType)||(e==null?void 0:e.type));s?(r=(e==null?void 0:e.points)||10,console.log("✅ Correct answer - points:",r)):e!=null&&e.awardParticipationPoints&&n.answer!==null&&n.answer!==void 0?(r=(e==null?void 0:e.points)||10,console.log("✅ AWARDED PARTICIPATION POINTS:",r),p.debug("✅ Awarded participation points for poll question")):(r=0,console.log("❌ No points awarded - isCorrect:",s,"awardParticipation:",e==null?void 0:e.awardParticipationPoints,"hasAnswer:",n.answer!==null&&n.answer!==void 0)),console.log(`💰 FINAL Earned points: ${r} (correct: ${s}, participation: ${e==null?void 0:e.awardParticipationPoints})`),p.debug(`💰 Earned points: ${r} (correct: ${s}, participation: ${e==null?void 0:e.awardParticipationPoints})`)}d[n.participantId].totalPoints+=r,d[n.participantId].questionsAnswered++,d[n.participantId].responses.push(n)}});const c=Object.values(d).sort((n,r)=>r.totalPoints-n.totalPoints);let g=`
                <div style="margin-bottom: 2rem;">
                    <h3>Session Information</h3>
                    <p><strong>Code:</strong> ${t.sessionCode}</p>
                    <p><strong>Status:</strong> ${t.status}</p>
                    <p><strong>Participants:</strong> ${l.length}</p>
                    <p><strong>Questions Asked:</strong> ${o.length}</p>
                    <p><strong>Total Responses:</strong> ${i.length}</p>
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
                            ${c.map((n,r)=>{const e=o.length>0?Math.round(n.questionsAnswered/o.length*100):0;return`
                                    <tr>
                                        <td><strong>#${r+1}</strong></td>
                                        <td>${n.name}</td>
                                        <td><strong>${n.totalPoints}</strong></td>
                                        <td>${n.questionsAnswered} / ${o.length}</td>
                                        <td>
                                            <div class="participation-bar">
                                                <div style="flex: 1; background: #e5e7eb; border-radius: 4px; height: 8px;">
                                                    <div class="participation-bar-fill" style="width: ${e}%;"></div>
                                                </div>
                                                <span style="font-size: 0.875rem; min-width: 40px;">${e}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                `}).join("")}
                            ${c.length===0?'<tr><td colspan="5">No student data available</td></tr>':""}
                        </tbody>
                    </table>
                </div>

                <h3>Questions & Responses</h3>
            `;o.forEach((n,r)=>{const e=i.filter(s=>s.questionId===n.questionId);g+=`
                    <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h4>Question ${r+1}: ${n.questionText}</h4>
                        <p><strong>Type:</strong> ${a(n.questionType)} | <strong>Points:</strong> ${n.points}</p>

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
                                ${e.map(s=>{const m=l.find(C=>C.participantId===s.participantId);let f=0;if(s.points!==void 0)f=s.points,p.debug("✓ Using backend-provided points:",s.points);else if(s.score!==void 0)f=s.score,p.debug("✓ Using backend-provided score:",s.score);else{p.debug("📊 Calculating points (question details):",{participantId:s.participantId,studentAnswer:s.answer,responseCorrectAnswer:s.correctAnswer,questionCorrectAnswer:n.correctAnswer,questionType:n.questionType,questionPoints:n.points,awardParticipationPoints:n.awardParticipationPoints});const C=A(s.answer,s.correctAnswer||n.correctAnswer,n.questionType);C||n.awardParticipationPoints&&s.answer!==null&&s.answer!==void 0?f=n.points||10:f=0,p.debug(`💰 Earned points: ${f} (correct: ${C}, participation: ${n.awardParticipationPoints})`)}const v=f>0,I=s.submittedAt||s.timestamp||s.answeredAt||s.createdAt,b=I?new Date(I).toLocaleTimeString():"N/A";return`
                                        <tr>
                                            <td>${(m==null?void 0:m.name)||s.participantId}</td>
                                            <td>${M(s.answer,n.questionType,n)}</td>
                                            <td class="${v?"correct":"incorrect"}">
                                                ${f} / ${n.points}
                                            </td>
                                            <td>${b}</td>
                                        </tr>
                                    `}).join("")}
                                ${e.length===0?'<tr><td colspan="4">No responses</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                `}),document.getElementById("modalBody").innerHTML=g}function V(){document.getElementById("sessionModal").classList.remove("active")}async function J(t){try{const o=localStorage.getItem("token"),l=(await P.getById(t)).session,a={};(l.participants||[]).forEach(e=>{a[e.participantId]={name:e.name,totalPoints:0,questionsAnswered:0}}),(l.responses||[]).forEach(e=>{if(a[e.participantId]){const s=(l.questions||[]).find(f=>f.questionId===e.questionId);let m=0;e.points!==void 0?m=e.points:e.score!==void 0?m=e.score:m=A(e.answer,e.correctAnswer||(s==null?void 0:s.correctAnswer),(s==null?void 0:s.questionType)||(s==null?void 0:s.type))?(s==null?void 0:s.points)||10:0,a[e.participantId].totalPoints+=m,a[e.participantId].questionsAnswered++}});const d=Object.values(a).sort((e,s)=>s.totalPoints-e.totalPoints);let c=`STUDENT PERFORMANCE SUMMARY
`;c+=`Rank,Student Name,Total Points,Questions Answered,Participation %
`,d.forEach((e,s)=>{const m=(l.questions||[]).length>0?Math.round(e.questionsAnswered/(l.questions||[]).length*100):0;c+=`${s+1},"${e.name}",${e.totalPoints},${e.questionsAnswered},${m}%
`}),c+=`

DETAILED RESPONSES
`,c+=`Student,Question,Answer,Points,Correct Answer,Timestamp
`,(l.responses||[]).forEach(e=>{const s=(l.questions||[]).find(b=>b.questionId===e.questionId),m=(l.participants||[]).find(b=>b.participantId===e.participantId);let f=0;e.points!==void 0?f=e.points:e.score!==void 0?f=e.score:f=A(e.answer,e.correctAnswer||(s==null?void 0:s.correctAnswer),(s==null?void 0:s.questionType)||(s==null?void 0:s.type))?(s==null?void 0:s.points)||10:0;const v=e.submittedAt||e.timestamp||e.answeredAt||e.createdAt,I=v?new Date(v).toLocaleString():"N/A";c+=`"${(m==null?void 0:m.name)||e.participantId}",`,c+=`"${(s==null?void 0:s.questionText)||"Unknown"}",`,c+=`"${e.answer}",`,c+=`${f},`,c+=`"${(s==null?void 0:s.correctAnswer)||"N/A"}",`,c+=`"${I}"
`});const g=new Blob([c],{type:"text/csv"}),n=window.URL.createObjectURL(g),r=document.createElement("a");r.href=n,r.download=`${l.sessionCode}_${l.title}_responses.csv`,r.click(),window.URL.revokeObjectURL(n),x.success("Session exported successfully!")}catch(o){p.error("Error exporting session:",o),p.error("Error details:",{message:o.message,stack:o.stack,sessionId:t}),x.error(`Failed to export session: ${o.message}`)}}async function H(t){var i;if(!window.confirm("Are you sure you want to delete this session? This cannot be undone."))return;const o=(i=document.querySelector(`[data-session-id="${t}"]`))==null?void 0:i.closest(".session-card");o&&(o.style.opacity="0.5",o.style.pointerEvents="none");try{p.debug("=== DELETE SESSION DEBUG ==="),p.debug("Session ID:",t),await P.delete(t),p.debug("DELETE SUCCESS"),p.debug("=== END DEBUG ==="),await T(),alert("Session deleted successfully")}catch(l){p.error("Error deleting session:",l),p.error("Error type:",l.constructor.name),p.error("Error stack:",l.stack),o&&(o.style.opacity="1",o.style.pointerEvents="auto");const a=l.message||String(l);alert(`Failed to delete session

Error: ${a}

Check browser console (F12) for full details.`)}}function G(t){h.has(t)?h.delete(t):h.add(t),L()}function K(){const t=Array.from(document.querySelectorAll(".session-checkbox"));h.size===t.length&&t.length>0?h.clear():t.forEach(o=>{h.add(o.dataset.sessionId)}),$(y),L()}function L(){const t=h.size;document.getElementById("selectedCount").textContent=t,document.getElementById("deleteSelectedBtn").disabled=t===0;const o=document.querySelectorAll(".session-checkbox"),i=t>0&&t===o.length;document.getElementById("selectAllText").textContent=i?"Deselect All":"Select All"}async function W(){const t=h.size;if(t===0||!window.confirm(`Are you sure you want to delete ${t} session(s)? This cannot be undone.`))return;const o=Array.from(h);localStorage.getItem("token");let i=0,l=0;const a=[],d=document.getElementById("deleteSelectedBtn"),c=d.innerHTML;d.disabled=!0;for(let n=0;n<o.length;n++){const r=o[n];d.innerHTML=`Deleting ${n+1}/${o.length}...`,p.debug(`
=== BULK DELETE ${n+1}/${o.length} ===`),p.debug("Session ID:",r);try{await P.delete(r),p.debug("✅ Delete successful"),i++,h.delete(r)}catch(e){p.error("❌ Delete failed:",e.message),l++,a.push(`${r.substring(0,8)}: ${e.message}`)}}d.innerHTML=c;let g=`Successfully deleted ${i} session(s).`;l>0&&(g+=`

Failed to delete ${l} session(s):
${a.join(`
`)}`),await T(),h.clear(),L(),alert(g)}async function Y(t){if(window.confirm("Are you sure you want to end this session?"))try{await P.end(t),await T(),alert("Session ended successfully")}catch(o){p.error("Error ending session:",o),alert(`Failed to end session: ${o.message}`)}}window.toggleSelectAll=K;window.deleteSelected=W;window.filterSessions=N;window.changePageSize=U;window.goToFirstPage=R;window.previousPage=j;window.nextPage=O;window.goToLastPage=Q;window.closeModal=V;window.toggleSessionSelection=G;window.viewSession=_;window.endSession=Y;window.exportSession=J;window.deleteSession=H;
