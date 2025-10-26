import{t as L}from"./toast-93yYkT8V.js";/* empty css               */import{c as M,s as E}from"./api-BBvzFwfC.js";import{l}from"./logger-gSLuc3Ra.js";let k=[],y=[],b=null,f=new Set,p=1,w=20,P=[];function T(t,n,u){if(t==null||n===null||n===void 0)return!1;const i=r=>typeof r=="string"&&r.length===1&&/^[A-Z]$/i.test(r)?r.toUpperCase().charCodeAt(0)-65:null;if(typeof t=="number"||typeof n=="number"){let r=typeof t=="number"?t:parseInt(t),d=typeof n=="number"?n:parseInt(n);if(isNaN(r)){const c=i(t);c!==null&&(r=c)}if(isNaN(d)){const c=i(n);c!==null&&(d=c)}if(!isNaN(r)&&!isNaN(d))return r===d}if(u==="matching"||u==="ordering")try{const r=typeof t=="object"?JSON.stringify(t):t,d=typeof n=="object"?JSON.stringify(n):n;return r===d}catch{return!1}return typeof t=="string"&&typeof n=="string"?t.toLowerCase().trim()===n.toLowerCase().trim():String(t).toLowerCase().trim()===String(n).toLowerCase().trim()}let x={};document.addEventListener("DOMContentLoaded",()=>{D(),A()});async function D(){try{if(!localStorage.getItem("token"))return;P=(await M.getAll()).classes||[],x={},P.forEach(i=>{x[i._id]=i.name});const u=document.getElementById("classFilter");P.forEach(i=>{const r=document.createElement("option");r.value=i._id,r.textContent=i.name,u.appendChild(r)}),l.debug(`Loaded ${P.length} classes`)}catch(t){l.error("Error loading classes:",t)}}async function A(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}k=(await E.getAll({limit:1e3})).sessions||[],l.debug(`Loaded ${k.length} sessions`),N()}catch(t){l.error("Error loading sessions:",t),alert("Failed to load session history")}}function v(t){const n=document.getElementById("historyContainer"),u=document.getElementById("emptyState"),i=document.getElementById("paginationControls");if(t.length===0){n.style.display="none",u.style.display="block",i.style.display="none";return}const r=t.length,d=w==="all"?1:Math.ceil(r/w);p>d&&(p=Math.max(1,d));let c,h,o;w==="all"?(c=t,h=1,o=r):(h=(p-1)*w+1,o=Math.min(p*w,r),c=t.slice(h-1,o)),n.style.display="grid",u.style.display="none",i.style.display=r>10?"flex":"none",n.innerHTML=c.map(a=>{const e=new Date(a.createdAt).toLocaleDateString(),s=new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),g=a.participantCount||0,m=a.totalQuestions||0,$=a.responseCount||0,I=f.has(a.id),S=x[a.classId]||"No Class";return`
                    <div class="session-card ${a.status}">
                        <div class="session-card-header">
                            <input type="checkbox" class="session-checkbox"
                                   data-session-id="${a.id}"
                                   ${I?"checked":""}
                                   onclick="event.stopPropagation(); toggleSessionSelection('${a.id}')"
                                   style="margin-top: 4px;">
                            <div class="session-card-content" onclick="viewSession('${a.id}')">
                                <div class="session-header">
                                    <div>
                                        <div class="session-title">${a.title||"Untitled Session"}</div>
                                        <div class="session-code">Code: ${a.sessionCode}</div>
                                        ${a.classId?`<div class="class-badge">📚 ${S}</div>`:""}
                                    </div>
                                    <span class="status-badge status-${a.status}">${a.status}</span>
                                </div>

                                <div class="session-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">${g}</div>
                                        <div class="stat-label">Students</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${m}</div>
                                        <div class="stat-label">Questions</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${$}</div>
                                        <div class="stat-label">Responses</div>
                                    </div>
                                </div>

                                <div class="session-date">📅 ${e} at ${s}</div>

                                <div class="session-actions" onclick="event.stopPropagation()">
                                    <button class="btn btn-view" onclick="viewSession('${a.id}')">
                                        View Details
                                    </button>
                                    <button class="btn btn-export" onclick="exportSession('${a.id}')">
                                        Export CSV
                                    </button>
                                    <button class="btn btn-delete" onclick="deleteSession('${a.id}')">
                                        Delete
                                    </button>
                                    ${a.status==="active"?`
                                        <button class="btn" style="background: #F59E0B; color: white;" onclick="endSession('${a.id}')">
                                            End Session
                                        </button>
                                    `:""}
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join(""),document.getElementById("showingStart").textContent=h,document.getElementById("showingEnd").textContent=o,document.getElementById("totalSessions").textContent=r,document.getElementById("currentPageNum").textContent=p,document.getElementById("totalPagesNum").textContent=d,document.getElementById("firstPageBtn").disabled=p===1,document.getElementById("prevPageBtn").disabled=p===1,document.getElementById("nextPageBtn").disabled=p===d,document.getElementById("lastPageBtn").disabled=p===d}function N(){const t=document.getElementById("searchInput").value.toLowerCase(),n=document.getElementById("statusFilter").value,u=document.getElementById("classFilter").value;y=k.filter(i=>{const r=i.title.toLowerCase().includes(t)||i.sessionCode.toLowerCase().includes(t),d=n==="all"||i.status===n,c=i.classId||i.class||i.class_id||i.classID;return r&&d&&(u==="all"||c===u)}),l.debug(`Filter: classId="${u}", found ${y.length} sessions`),p=1,v(y)}function F(){const t=document.getElementById("pageSizeSelect");w=t.value==="all"?"all":parseInt(t.value),p=1,v(y)}function U(){const t=w==="all"?1:Math.ceil(y.length/w);p<t&&(p++,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function R(){p>1&&(p--,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function O(){p!==1&&(p=1,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function j(){const t=w==="all"?1:Math.ceil(y.length/w);p!==t&&(p=t,v(y),window.scrollTo({top:0,behavior:"smooth"}))}async function Q(t){try{l.debug("Loading session:",t);const n=localStorage.getItem("token"),u=await E.getById(t);l.debug("Session data:",u),b=u.session,l.debug("Questions:",b.questions),l.debug("Responses:",b.responses),b.responses&&b.responses.length>0&&l.debug("First response structure:",b.responses[0]),_(b),document.getElementById("sessionModal").classList.add("active")}catch(n){l.error("Error loading session:",n),alert(`Failed to load session details: ${n.message}`)}}function _(t){document.getElementById("modalTitle").textContent=t.title;const n=t.questions||[],u=t.responses||[],i=t.participants||[];function r(o){return{multiple_choice:"Multiple Choice",mcq:"Multiple Choice",true_false:"True/False",boolean:"True/False",tf:"True/False",short_answer:"Short Answer",matching:"Matching",ordering:"Put in Order",fill_blank:"Fill in the Blank"}[o]||o}const d={};i.forEach(o=>{d[o.participantId]={name:o.name,totalPoints:0,questionsAnswered:0,responses:[]}}),u.forEach(o=>{if(d[o.participantId]){let a=0;if(o.points!==void 0)a=o.points,l.debug("✓ Using backend-provided points:",o.points);else if(o.score!==void 0)a=o.score,l.debug("✓ Using backend-provided score:",o.score);else{const e=n.find(g=>g.questionId===o.questionId);l.debug("📊 Calculating points for response:",{participantId:o.participantId,questionId:o.questionId,studentAnswer:o.answer,responseCorrectAnswer:o.correctAnswer,questionCorrectAnswer:e==null?void 0:e.correctAnswer,questionType:(e==null?void 0:e.questionType)||(e==null?void 0:e.type),questionPoints:e==null?void 0:e.points});const s=T(o.answer,o.correctAnswer||(e==null?void 0:e.correctAnswer),(e==null?void 0:e.questionType)||(e==null?void 0:e.type));a=s?(e==null?void 0:e.points)||10:0,l.debug(`💰 Earned points: ${a} (correct: ${s})`)}d[o.participantId].totalPoints+=a,d[o.participantId].questionsAnswered++,d[o.participantId].responses.push(o)}});const c=Object.values(d).sort((o,a)=>a.totalPoints-o.totalPoints);let h=`
                <div style="margin-bottom: 2rem;">
                    <h3>Session Information</h3>
                    <p><strong>Code:</strong> ${t.sessionCode}</p>
                    <p><strong>Status:</strong> ${t.status}</p>
                    <p><strong>Participants:</strong> ${i.length}</p>
                    <p><strong>Questions Asked:</strong> ${n.length}</p>
                    <p><strong>Total Responses:</strong> ${u.length}</p>
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
                            ${c.map((o,a)=>{const e=n.length>0?Math.round(o.questionsAnswered/n.length*100):0;return`
                                    <tr>
                                        <td><strong>#${a+1}</strong></td>
                                        <td>${o.name}</td>
                                        <td><strong>${o.totalPoints}</strong></td>
                                        <td>${o.questionsAnswered} / ${n.length}</td>
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
            `;n.forEach((o,a)=>{const e=u.filter(s=>s.questionId===o.questionId);h+=`
                    <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h4>Question ${a+1}: ${o.questionText}</h4>
                        <p><strong>Type:</strong> ${r(o.questionType)} | <strong>Points:</strong> ${o.points}</p>

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
                                ${e.map(s=>{const g=i.find(C=>C.participantId===s.participantId);let m=0;if(s.points!==void 0)m=s.points,l.debug("✓ Using backend-provided points:",s.points);else if(s.score!==void 0)m=s.score,l.debug("✓ Using backend-provided score:",s.score);else{l.debug("📊 Calculating points (question details):",{participantId:s.participantId,studentAnswer:s.answer,responseCorrectAnswer:s.correctAnswer,questionCorrectAnswer:o.correctAnswer,questionType:o.questionType,questionPoints:o.points});const C=T(s.answer,s.correctAnswer||o.correctAnswer,o.questionType);m=C?o.points||10:0,l.debug(`💰 Earned points: ${m} (correct: ${C})`)}const $=m>0,I=s.submittedAt||s.timestamp||s.answeredAt||s.createdAt,S=I?new Date(I).toLocaleTimeString():"N/A";return`
                                        <tr>
                                            <td>${(g==null?void 0:g.name)||s.participantId}</td>
                                            <td>${s.answer}</td>
                                            <td class="${$?"correct":"incorrect"}">
                                                ${m} / ${o.points}
                                            </td>
                                            <td>${S}</td>
                                        </tr>
                                    `}).join("")}
                                ${e.length===0?'<tr><td colspan="4">No responses</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                `}),document.getElementById("modalBody").innerHTML=h}function z(){document.getElementById("sessionModal").classList.remove("active")}async function H(t){try{const n=localStorage.getItem("token"),i=(await E.getById(t)).session,r={};(i.participants||[]).forEach(e=>{r[e.participantId]={name:e.name,totalPoints:0,questionsAnswered:0}}),(i.responses||[]).forEach(e=>{if(r[e.participantId]){const s=(i.questions||[]).find(m=>m.questionId===e.questionId);let g=0;e.points!==void 0?g=e.points:e.score!==void 0?g=e.score:g=T(e.answer,e.correctAnswer||(s==null?void 0:s.correctAnswer),(s==null?void 0:s.questionType)||(s==null?void 0:s.type))?(s==null?void 0:s.points)||10:0,r[e.participantId].totalPoints+=g,r[e.participantId].questionsAnswered++}});const d=Object.values(r).sort((e,s)=>s.totalPoints-e.totalPoints);let c=`STUDENT PERFORMANCE SUMMARY
`;c+=`Rank,Student Name,Total Points,Questions Answered,Participation %
`,d.forEach((e,s)=>{const g=(i.questions||[]).length>0?Math.round(e.questionsAnswered/(i.questions||[]).length*100):0;c+=`${s+1},"${e.name}",${e.totalPoints},${e.questionsAnswered},${g}%
`}),c+=`

DETAILED RESPONSES
`,c+=`Student,Question,Answer,Points,Correct Answer,Timestamp
`,(i.responses||[]).forEach(e=>{const s=(i.questions||[]).find(S=>S.questionId===e.questionId),g=(i.participants||[]).find(S=>S.participantId===e.participantId);let m=0;e.points!==void 0?m=e.points:e.score!==void 0?m=e.score:m=T(e.answer,e.correctAnswer||(s==null?void 0:s.correctAnswer),(s==null?void 0:s.questionType)||(s==null?void 0:s.type))?(s==null?void 0:s.points)||10:0;const $=e.submittedAt||e.timestamp||e.answeredAt||e.createdAt,I=$?new Date($).toLocaleString():"N/A";c+=`"${(g==null?void 0:g.name)||e.participantId}",`,c+=`"${(s==null?void 0:s.questionText)||"Unknown"}",`,c+=`"${e.answer}",`,c+=`${m},`,c+=`"${(s==null?void 0:s.correctAnswer)||"N/A"}",`,c+=`"${I}"
`});const h=new Blob([c],{type:"text/csv"}),o=window.URL.createObjectURL(h),a=document.createElement("a");a.href=o,a.download=`${i.sessionCode}_${i.title}_responses.csv`,a.click(),window.URL.revokeObjectURL(o),L.success("Session exported successfully!")}catch(n){l.error("Error exporting session:",n),l.error("Error details:",{message:n.message,stack:n.stack,sessionId:t}),L.error(`Failed to export session: ${n.message}`)}}async function q(t){var u;if(!window.confirm("Are you sure you want to delete this session? This cannot be undone."))return;const n=(u=document.querySelector(`[data-session-id="${t}"]`))==null?void 0:u.closest(".session-card");n&&(n.style.opacity="0.5",n.style.pointerEvents="none");try{l.debug("=== DELETE SESSION DEBUG ==="),l.debug("Session ID:",t),await E.delete(t),l.debug("DELETE SUCCESS"),l.debug("=== END DEBUG ==="),await A(),alert("Session deleted successfully")}catch(i){l.error("Error deleting session:",i),l.error("Error type:",i.constructor.name),l.error("Error stack:",i.stack),n&&(n.style.opacity="1",n.style.pointerEvents="auto");const r=i.message||String(i);alert(`Failed to delete session

Error: ${r}

Check browser console (F12) for full details.`)}}function G(t){f.has(t)?f.delete(t):f.add(t),B()}function J(){const t=Array.from(document.querySelectorAll(".session-checkbox"));f.size===t.length&&t.length>0?f.clear():t.forEach(n=>{f.add(n.dataset.sessionId)}),v(y),B()}function B(){const t=f.size;document.getElementById("selectedCount").textContent=t,document.getElementById("deleteSelectedBtn").disabled=t===0;const n=document.querySelectorAll(".session-checkbox"),u=t>0&&t===n.length;document.getElementById("selectAllText").textContent=u?"Deselect All":"Select All"}async function V(){const t=f.size;if(t===0||!window.confirm(`Are you sure you want to delete ${t} session(s)? This cannot be undone.`))return;const n=Array.from(f);localStorage.getItem("token");let u=0,i=0;const r=[],d=document.getElementById("deleteSelectedBtn"),c=d.innerHTML;d.disabled=!0;for(let o=0;o<n.length;o++){const a=n[o];d.innerHTML=`Deleting ${o+1}/${n.length}...`,l.debug(`
=== BULK DELETE ${o+1}/${n.length} ===`),l.debug("Session ID:",a);try{await E.delete(a),l.debug("✅ Delete successful"),u++,f.delete(a)}catch(e){l.error("❌ Delete failed:",e.message),i++,r.push(`${a.substring(0,8)}: ${e.message}`)}}d.innerHTML=c;let h=`Successfully deleted ${u} session(s).`;i>0&&(h+=`

Failed to delete ${i} session(s):
${r.join(`
`)}`),await A(),f.clear(),B(),alert(h)}async function K(t){if(window.confirm("Are you sure you want to end this session?"))try{await E.end(t),await A(),alert("Session ended successfully")}catch(n){l.error("Error ending session:",n),alert(`Failed to end session: ${n.message}`)}}window.toggleSelectAll=J;window.deleteSelected=V;window.filterSessions=N;window.changePageSize=F;window.goToFirstPage=O;window.previousPage=R;window.nextPage=U;window.goToLastPage=j;window.closeModal=z;window.toggleSessionSelection=G;window.viewSession=Q;window.endSession=K;window.exportSession=H;window.deleteSession=q;
