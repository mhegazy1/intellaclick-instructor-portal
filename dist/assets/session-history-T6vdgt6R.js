import{t as L}from"./toast-93yYkT8V.js";/* empty css               */import{c as M,s as E}from"./api-Dxj3jBlT.js";import{l as d}from"./logger-gSLuc3Ra.js";let k=[],y=[],b=null,h=new Set,p=1,w=20,A=[];function D(e,s){if(!e)return"No answer";if(s==="matching")try{const l=typeof e=="string"?JSON.parse(e):e;if(Array.isArray(l))return l.map(i=>`${i.left} → ${i.right}`).join(", ");if(typeof l=="object")return Object.entries(l).map(([i,r])=>`${i} → ${r}`).join(", ")}catch{}if(s==="ordering")try{const l=typeof e=="string"?JSON.parse(e):e;if(Array.isArray(l))return l.map((i,r)=>`${r+1}. ${i}`).join(", ")}catch{}return String(e)}function P(e,s,l){if(e==null||s===null||s===void 0)return!1;const i=r=>typeof r=="string"&&r.length===1&&/^[A-Z]$/i.test(r)?r.toUpperCase().charCodeAt(0)-65:null;if(typeof e=="number"||typeof s=="number"){let r=typeof e=="number"?e:parseInt(e),c=typeof s=="number"?s:parseInt(s);if(isNaN(r)){const u=i(e);u!==null&&(r=u)}if(isNaN(c)){const u=i(s);u!==null&&(c=u)}if(!isNaN(r)&&!isNaN(c))return r===c}if(l==="matching"||l==="ordering")try{const r=typeof e=="object"?JSON.stringify(e):e,c=typeof s=="object"?JSON.stringify(s):s;return r===c}catch{return!1}return typeof e=="string"&&typeof s=="string"?e.toLowerCase().trim()===s.toLowerCase().trim():String(e).toLowerCase().trim()===String(s).toLowerCase().trim()}let x={};document.addEventListener("DOMContentLoaded",()=>{F(),T()});async function F(){try{if(!localStorage.getItem("token"))return;A=(await M.getAll()).classes||[],x={},A.forEach(i=>{x[i._id]=i.name});const l=document.getElementById("classFilter");A.forEach(i=>{const r=document.createElement("option");r.value=i._id,r.textContent=i.name,l.appendChild(r)}),d.debug(`Loaded ${A.length} classes`)}catch(e){d.error("Error loading classes:",e)}}async function T(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}k=(await E.getAll({limit:1e3})).sessions||[],d.debug(`Loaded ${k.length} sessions`),N()}catch(e){d.error("Error loading sessions:",e),alert("Failed to load session history")}}function v(e){const s=document.getElementById("historyContainer"),l=document.getElementById("emptyState"),i=document.getElementById("paginationControls");if(e.length===0){s.style.display="none",l.style.display="block",i.style.display="none";return}const r=e.length,c=w==="all"?1:Math.ceil(r/w);p>c&&(p=Math.max(1,c));let u,f,o;w==="all"?(u=e,f=1,o=r):(f=(p-1)*w+1,o=Math.min(p*w,r),u=e.slice(f-1,o)),s.style.display="grid",l.style.display="none",i.style.display=r>10?"flex":"none",s.innerHTML=u.map(a=>{const t=new Date(a.createdAt).toLocaleDateString(),n=new Date(a.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),g=a.participantCount||0,m=a.totalQuestions||0,$=a.responseCount||0,I=h.has(a.id),S=x[a.classId]||"No Class";return`
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

                                <div class="session-date">📅 ${t} at ${n}</div>

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
                `}).join(""),document.getElementById("showingStart").textContent=f,document.getElementById("showingEnd").textContent=o,document.getElementById("totalSessions").textContent=r,document.getElementById("currentPageNum").textContent=p,document.getElementById("totalPagesNum").textContent=c,document.getElementById("firstPageBtn").disabled=p===1,document.getElementById("prevPageBtn").disabled=p===1,document.getElementById("nextPageBtn").disabled=p===c,document.getElementById("lastPageBtn").disabled=p===c}function N(){const e=document.getElementById("searchInput").value.toLowerCase(),s=document.getElementById("statusFilter").value,l=document.getElementById("classFilter").value;y=k.filter(i=>{const r=i.title.toLowerCase().includes(e)||i.sessionCode.toLowerCase().includes(e),c=s==="all"||i.status===s,u=i.classId||i.class||i.class_id||i.classID;return r&&c&&(l==="all"||u===l)}),d.debug(`Filter: classId="${l}", found ${y.length} sessions`),p=1,v(y)}function U(){const e=document.getElementById("pageSizeSelect");w=e.value==="all"?"all":parseInt(e.value),p=1,v(y)}function j(){const e=w==="all"?1:Math.ceil(y.length/w);p<e&&(p++,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function O(){p>1&&(p--,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function R(){p!==1&&(p=1,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function Q(){const e=w==="all"?1:Math.ceil(y.length/w);p!==e&&(p=e,v(y),window.scrollTo({top:0,behavior:"smooth"}))}async function _(e){try{d.debug("Loading session:",e);const s=localStorage.getItem("token"),l=await E.getById(e);d.debug("Session data:",l),b=l.session,d.debug("Questions:",b.questions),d.debug("Responses:",b.responses),b.responses&&b.responses.length>0&&d.debug("First response structure:",b.responses[0]),z(b),document.getElementById("sessionModal").classList.add("active")}catch(s){d.error("Error loading session:",s),alert(`Failed to load session details: ${s.message}`)}}function z(e){document.getElementById("modalTitle").textContent=e.title;const s=e.questions||[],l=e.responses||[],i=e.participants||[];function r(o){return{multiple_choice:"Multiple Choice",mcq:"Multiple Choice",true_false:"True/False",boolean:"True/False",tf:"True/False",short_answer:"Short Answer",matching:"Matching",ordering:"Put in Order",fill_blank:"Fill in the Blank"}[o]||o}const c={};i.forEach(o=>{c[o.participantId]={name:o.name,totalPoints:0,questionsAnswered:0,responses:[]}}),l.forEach(o=>{if(c[o.participantId]){let a=0;if(o.points!==void 0)a=o.points,d.debug("✓ Using backend-provided points:",o.points);else if(o.score!==void 0)a=o.score,d.debug("✓ Using backend-provided score:",o.score);else{const t=s.find(g=>g.questionId===o.questionId);d.debug("📊 Calculating points for response:",{participantId:o.participantId,questionId:o.questionId,studentAnswer:o.answer,responseCorrectAnswer:o.correctAnswer,questionCorrectAnswer:t==null?void 0:t.correctAnswer,questionType:(t==null?void 0:t.questionType)||(t==null?void 0:t.type),questionPoints:t==null?void 0:t.points});const n=P(o.answer,o.correctAnswer||(t==null?void 0:t.correctAnswer),(t==null?void 0:t.questionType)||(t==null?void 0:t.type));a=n?(t==null?void 0:t.points)||10:0,d.debug(`💰 Earned points: ${a} (correct: ${n})`)}c[o.participantId].totalPoints+=a,c[o.participantId].questionsAnswered++,c[o.participantId].responses.push(o)}});const u=Object.values(c).sort((o,a)=>a.totalPoints-o.totalPoints);let f=`
                <div style="margin-bottom: 2rem;">
                    <h3>Session Information</h3>
                    <p><strong>Code:</strong> ${e.sessionCode}</p>
                    <p><strong>Status:</strong> ${e.status}</p>
                    <p><strong>Participants:</strong> ${i.length}</p>
                    <p><strong>Questions Asked:</strong> ${s.length}</p>
                    <p><strong>Total Responses:</strong> ${l.length}</p>
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
                            ${u.map((o,a)=>{const t=s.length>0?Math.round(o.questionsAnswered/s.length*100):0;return`
                                    <tr>
                                        <td><strong>#${a+1}</strong></td>
                                        <td>${o.name}</td>
                                        <td><strong>${o.totalPoints}</strong></td>
                                        <td>${o.questionsAnswered} / ${s.length}</td>
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
                            ${u.length===0?'<tr><td colspan="5">No student data available</td></tr>':""}
                        </tbody>
                    </table>
                </div>

                <h3>Questions & Responses</h3>
            `;s.forEach((o,a)=>{const t=l.filter(n=>n.questionId===o.questionId);f+=`
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
                                ${t.map(n=>{const g=i.find(C=>C.participantId===n.participantId);let m=0;if(n.points!==void 0)m=n.points,d.debug("✓ Using backend-provided points:",n.points);else if(n.score!==void 0)m=n.score,d.debug("✓ Using backend-provided score:",n.score);else{d.debug("📊 Calculating points (question details):",{participantId:n.participantId,studentAnswer:n.answer,responseCorrectAnswer:n.correctAnswer,questionCorrectAnswer:o.correctAnswer,questionType:o.questionType,questionPoints:o.points});const C=P(n.answer,n.correctAnswer||o.correctAnswer,o.questionType);m=C?o.points||10:0,d.debug(`💰 Earned points: ${m} (correct: ${C})`)}const $=m>0,I=n.submittedAt||n.timestamp||n.answeredAt||n.createdAt,S=I?new Date(I).toLocaleTimeString():"N/A";return`
                                        <tr>
                                            <td>${(g==null?void 0:g.name)||n.participantId}</td>
                                            <td>${D(n.answer,o.questionType)}</td>
                                            <td class="${$?"correct":"incorrect"}">
                                                ${m} / ${o.points}
                                            </td>
                                            <td>${S}</td>
                                        </tr>
                                    `}).join("")}
                                ${t.length===0?'<tr><td colspan="4">No responses</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                `}),document.getElementById("modalBody").innerHTML=f}function H(){document.getElementById("sessionModal").classList.remove("active")}async function J(e){try{const s=localStorage.getItem("token"),i=(await E.getById(e)).session,r={};(i.participants||[]).forEach(t=>{r[t.participantId]={name:t.name,totalPoints:0,questionsAnswered:0}}),(i.responses||[]).forEach(t=>{if(r[t.participantId]){const n=(i.questions||[]).find(m=>m.questionId===t.questionId);let g=0;t.points!==void 0?g=t.points:t.score!==void 0?g=t.score:g=P(t.answer,t.correctAnswer||(n==null?void 0:n.correctAnswer),(n==null?void 0:n.questionType)||(n==null?void 0:n.type))?(n==null?void 0:n.points)||10:0,r[t.participantId].totalPoints+=g,r[t.participantId].questionsAnswered++}});const c=Object.values(r).sort((t,n)=>n.totalPoints-t.totalPoints);let u=`STUDENT PERFORMANCE SUMMARY
`;u+=`Rank,Student Name,Total Points,Questions Answered,Participation %
`,c.forEach((t,n)=>{const g=(i.questions||[]).length>0?Math.round(t.questionsAnswered/(i.questions||[]).length*100):0;u+=`${n+1},"${t.name}",${t.totalPoints},${t.questionsAnswered},${g}%
`}),u+=`

DETAILED RESPONSES
`,u+=`Student,Question,Answer,Points,Correct Answer,Timestamp
`,(i.responses||[]).forEach(t=>{const n=(i.questions||[]).find(S=>S.questionId===t.questionId),g=(i.participants||[]).find(S=>S.participantId===t.participantId);let m=0;t.points!==void 0?m=t.points:t.score!==void 0?m=t.score:m=P(t.answer,t.correctAnswer||(n==null?void 0:n.correctAnswer),(n==null?void 0:n.questionType)||(n==null?void 0:n.type))?(n==null?void 0:n.points)||10:0;const $=t.submittedAt||t.timestamp||t.answeredAt||t.createdAt,I=$?new Date($).toLocaleString():"N/A";u+=`"${(g==null?void 0:g.name)||t.participantId}",`,u+=`"${(n==null?void 0:n.questionText)||"Unknown"}",`,u+=`"${t.answer}",`,u+=`${m},`,u+=`"${(n==null?void 0:n.correctAnswer)||"N/A"}",`,u+=`"${I}"
`});const f=new Blob([u],{type:"text/csv"}),o=window.URL.createObjectURL(f),a=document.createElement("a");a.href=o,a.download=`${i.sessionCode}_${i.title}_responses.csv`,a.click(),window.URL.revokeObjectURL(o),L.success("Session exported successfully!")}catch(s){d.error("Error exporting session:",s),d.error("Error details:",{message:s.message,stack:s.stack,sessionId:e}),L.error(`Failed to export session: ${s.message}`)}}async function q(e){var l;if(!window.confirm("Are you sure you want to delete this session? This cannot be undone."))return;const s=(l=document.querySelector(`[data-session-id="${e}"]`))==null?void 0:l.closest(".session-card");s&&(s.style.opacity="0.5",s.style.pointerEvents="none");try{d.debug("=== DELETE SESSION DEBUG ==="),d.debug("Session ID:",e),await E.delete(e),d.debug("DELETE SUCCESS"),d.debug("=== END DEBUG ==="),await T(),alert("Session deleted successfully")}catch(i){d.error("Error deleting session:",i),d.error("Error type:",i.constructor.name),d.error("Error stack:",i.stack),s&&(s.style.opacity="1",s.style.pointerEvents="auto");const r=i.message||String(i);alert(`Failed to delete session

Error: ${r}

Check browser console (F12) for full details.`)}}function G(e){h.has(e)?h.delete(e):h.add(e),B()}function V(){const e=Array.from(document.querySelectorAll(".session-checkbox"));h.size===e.length&&e.length>0?h.clear():e.forEach(s=>{h.add(s.dataset.sessionId)}),v(y),B()}function B(){const e=h.size;document.getElementById("selectedCount").textContent=e,document.getElementById("deleteSelectedBtn").disabled=e===0;const s=document.querySelectorAll(".session-checkbox"),l=e>0&&e===s.length;document.getElementById("selectAllText").textContent=l?"Deselect All":"Select All"}async function K(){const e=h.size;if(e===0||!window.confirm(`Are you sure you want to delete ${e} session(s)? This cannot be undone.`))return;const s=Array.from(h);localStorage.getItem("token");let l=0,i=0;const r=[],c=document.getElementById("deleteSelectedBtn"),u=c.innerHTML;c.disabled=!0;for(let o=0;o<s.length;o++){const a=s[o];c.innerHTML=`Deleting ${o+1}/${s.length}...`,d.debug(`
=== BULK DELETE ${o+1}/${s.length} ===`),d.debug("Session ID:",a);try{await E.delete(a),d.debug("✅ Delete successful"),l++,h.delete(a)}catch(t){d.error("❌ Delete failed:",t.message),i++,r.push(`${a.substring(0,8)}: ${t.message}`)}}c.innerHTML=u;let f=`Successfully deleted ${l} session(s).`;i>0&&(f+=`

Failed to delete ${i} session(s):
${r.join(`
`)}`),await T(),h.clear(),B(),alert(f)}async function Y(e){if(window.confirm("Are you sure you want to end this session?"))try{await E.end(e),await T(),alert("Session ended successfully")}catch(s){d.error("Error ending session:",s),alert(`Failed to end session: ${s.message}`)}}window.toggleSelectAll=V;window.deleteSelected=K;window.filterSessions=N;window.changePageSize=U;window.goToFirstPage=R;window.previousPage=O;window.nextPage=j;window.goToLastPage=Q;window.closeModal=H;window.toggleSessionSelection=G;window.viewSession=_;window.endSession=Y;window.exportSession=J;window.deleteSession=q;
