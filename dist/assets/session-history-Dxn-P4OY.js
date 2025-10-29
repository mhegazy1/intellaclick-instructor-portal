import{t as L}from"./toast-93yYkT8V.js";/* empty css               */import{c as M,s as E}from"./api-DhNc_vJl.js";import{l as c}from"./logger-gSLuc3Ra.js";let k=[],y=[],b=null,h=new Set,u=1,w=20,A=[];function D(e,s,d){if(!e)return"No answer";if(s==="matching")try{const o=typeof e=="string"?JSON.parse(e):e;if(Array.isArray(o)&&o.length>0&&o[0].left)return o.map(a=>`${a.left} → ${a.right}`).join(", ");if(Array.isArray(o)&&(d!=null&&d.pairs))return o.map((a,l)=>{var m;return`${((m=d.pairs[l])==null?void 0:m.left)||`Item ${l+1}`} → ${a}`}).join(", ");if(typeof o=="object"&&!Array.isArray(o))return Object.entries(o).map(([a,l])=>`${a} → ${l}`).join(", ")}catch(o){console.warn("Error formatting matching answer:",o)}if(s==="ordering")try{const o=typeof e=="string"?JSON.parse(e):e;if(Array.isArray(o))return o.map((a,l)=>`${l+1}. ${a}`).join(", ")}catch{}return String(e)}function P(e,s,d){if(e==null||s===null||s===void 0)return!1;const o=a=>typeof a=="string"&&a.length===1&&/^[A-Z]$/i.test(a)?a.toUpperCase().charCodeAt(0)-65:null;if(typeof e=="number"||typeof s=="number"){let a=typeof e=="number"?e:parseInt(e),l=typeof s=="number"?s:parseInt(s);if(isNaN(a)){const p=o(e);p!==null&&(a=p)}if(isNaN(l)){const p=o(s);p!==null&&(l=p)}if(!isNaN(a)&&!isNaN(l))return a===l}if(d==="matching"||d==="ordering")try{const a=typeof e=="object"?JSON.stringify(e):e,l=typeof s=="object"?JSON.stringify(s):s;return a===l}catch{return!1}return typeof e=="string"&&typeof s=="string"?e.toLowerCase().trim()===s.toLowerCase().trim():String(e).toLowerCase().trim()===String(s).toLowerCase().trim()}let B={};document.addEventListener("DOMContentLoaded",()=>{F(),T()});async function F(){try{if(!localStorage.getItem("token"))return;A=(await M.getAll()).classes||[],B={},A.forEach(o=>{B[o._id]=o.name});const d=document.getElementById("classFilter");A.forEach(o=>{const a=document.createElement("option");a.value=o._id,a.textContent=o.name,d.appendChild(a)}),c.debug(`Loaded ${A.length} classes`)}catch(e){c.error("Error loading classes:",e)}}async function T(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}k=(await E.getAll({limit:1e3})).sessions||[],c.debug(`Loaded ${k.length} sessions`),N()}catch(e){c.error("Error loading sessions:",e),alert("Failed to load session history")}}function v(e){const s=document.getElementById("historyContainer"),d=document.getElementById("emptyState"),o=document.getElementById("paginationControls");if(e.length===0){s.style.display="none",d.style.display="block",o.style.display="none";return}const a=e.length,l=w==="all"?1:Math.ceil(a/w);u>l&&(u=Math.max(1,l));let p,m,i;w==="all"?(p=e,m=1,i=a):(m=(u-1)*w+1,i=Math.min(u*w,a),p=e.slice(m-1,i)),s.style.display="grid",d.style.display="none",o.style.display=a>10?"flex":"none",s.innerHTML=p.map(r=>{const t=new Date(r.createdAt).toLocaleDateString(),n=new Date(r.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),g=r.participantCount||0,f=r.totalQuestions||0,$=r.responseCount||0,I=h.has(r.id),S=B[r.classId]||"No Class";return`
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
                                        ${r.classId?`<div class="class-badge">📚 ${S}</div>`:""}
                                    </div>
                                    <span class="status-badge status-${r.status}">${r.status}</span>
                                </div>

                                <div class="session-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">${g}</div>
                                        <div class="stat-label">Students</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${f}</div>
                                        <div class="stat-label">Questions</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${$}</div>
                                        <div class="stat-label">Responses</div>
                                    </div>
                                </div>

                                <div class="session-date">📅 ${t} at ${n}</div>

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
                `}).join(""),document.getElementById("showingStart").textContent=m,document.getElementById("showingEnd").textContent=i,document.getElementById("totalSessions").textContent=a,document.getElementById("currentPageNum").textContent=u,document.getElementById("totalPagesNum").textContent=l,document.getElementById("firstPageBtn").disabled=u===1,document.getElementById("prevPageBtn").disabled=u===1,document.getElementById("nextPageBtn").disabled=u===l,document.getElementById("lastPageBtn").disabled=u===l}function N(){const e=document.getElementById("searchInput").value.toLowerCase(),s=document.getElementById("statusFilter").value,d=document.getElementById("classFilter").value;y=k.filter(o=>{const a=o.title.toLowerCase().includes(e)||o.sessionCode.toLowerCase().includes(e),l=s==="all"||o.status===s,p=o.classId||o.class||o.class_id||o.classID;return a&&l&&(d==="all"||p===d)}),c.debug(`Filter: classId="${d}", found ${y.length} sessions`),u=1,v(y)}function U(){const e=document.getElementById("pageSizeSelect");w=e.value==="all"?"all":parseInt(e.value),u=1,v(y)}function j(){const e=w==="all"?1:Math.ceil(y.length/w);u<e&&(u++,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function O(){u>1&&(u--,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function R(){u!==1&&(u=1,v(y),window.scrollTo({top:0,behavior:"smooth"}))}function Q(){const e=w==="all"?1:Math.ceil(y.length/w);u!==e&&(u=e,v(y),window.scrollTo({top:0,behavior:"smooth"}))}async function _(e){try{c.debug("Loading session:",e);const s=localStorage.getItem("token"),d=await E.getById(e);c.debug("Session data:",d),b=d.session,c.debug("Questions:",b.questions),c.debug("Responses:",b.responses),b.responses&&b.responses.length>0&&c.debug("First response structure:",b.responses[0]),z(b),document.getElementById("sessionModal").classList.add("active")}catch(s){c.error("Error loading session:",s),alert(`Failed to load session details: ${s.message}`)}}function z(e){document.getElementById("modalTitle").textContent=e.title;const s=e.questions||[],d=e.responses||[],o=e.participants||[];function a(i){return{multiple_choice:"Multiple Choice",mcq:"Multiple Choice",true_false:"True/False",boolean:"True/False",tf:"True/False",short_answer:"Short Answer",matching:"Matching",ordering:"Put in Order",fill_blank:"Fill in the Blank"}[i]||i}const l={};o.forEach(i=>{l[i.participantId]={name:i.name,totalPoints:0,questionsAnswered:0,responses:[]}}),d.forEach(i=>{if(l[i.participantId]){let r=0;if(i.points!==void 0)r=i.points,c.debug("✓ Using backend-provided points:",i.points);else if(i.score!==void 0)r=i.score,c.debug("✓ Using backend-provided score:",i.score);else{const t=s.find(g=>g.questionId===i.questionId);c.debug("📊 Calculating points for response:",{participantId:i.participantId,questionId:i.questionId,studentAnswer:i.answer,responseCorrectAnswer:i.correctAnswer,questionCorrectAnswer:t==null?void 0:t.correctAnswer,questionType:(t==null?void 0:t.questionType)||(t==null?void 0:t.type),questionPoints:t==null?void 0:t.points});const n=P(i.answer,i.correctAnswer||(t==null?void 0:t.correctAnswer),(t==null?void 0:t.questionType)||(t==null?void 0:t.type));r=n?(t==null?void 0:t.points)||10:0,c.debug(`💰 Earned points: ${r} (correct: ${n})`)}l[i.participantId].totalPoints+=r,l[i.participantId].questionsAnswered++,l[i.participantId].responses.push(i)}});const p=Object.values(l).sort((i,r)=>r.totalPoints-i.totalPoints);let m=`
                <div style="margin-bottom: 2rem;">
                    <h3>Session Information</h3>
                    <p><strong>Code:</strong> ${e.sessionCode}</p>
                    <p><strong>Status:</strong> ${e.status}</p>
                    <p><strong>Participants:</strong> ${o.length}</p>
                    <p><strong>Questions Asked:</strong> ${s.length}</p>
                    <p><strong>Total Responses:</strong> ${d.length}</p>
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
                            ${p.map((i,r)=>{const t=s.length>0?Math.round(i.questionsAnswered/s.length*100):0;return`
                                    <tr>
                                        <td><strong>#${r+1}</strong></td>
                                        <td>${i.name}</td>
                                        <td><strong>${i.totalPoints}</strong></td>
                                        <td>${i.questionsAnswered} / ${s.length}</td>
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
                            ${p.length===0?'<tr><td colspan="5">No student data available</td></tr>':""}
                        </tbody>
                    </table>
                </div>

                <h3>Questions & Responses</h3>
            `;s.forEach((i,r)=>{const t=d.filter(n=>n.questionId===i.questionId);m+=`
                    <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h4>Question ${r+1}: ${i.questionText}</h4>
                        <p><strong>Type:</strong> ${a(i.questionType)} | <strong>Points:</strong> ${i.points}</p>

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
                                ${t.map(n=>{const g=o.find(C=>C.participantId===n.participantId);let f=0;if(n.points!==void 0)f=n.points,c.debug("✓ Using backend-provided points:",n.points);else if(n.score!==void 0)f=n.score,c.debug("✓ Using backend-provided score:",n.score);else{c.debug("📊 Calculating points (question details):",{participantId:n.participantId,studentAnswer:n.answer,responseCorrectAnswer:n.correctAnswer,questionCorrectAnswer:i.correctAnswer,questionType:i.questionType,questionPoints:i.points});const C=P(n.answer,n.correctAnswer||i.correctAnswer,i.questionType);f=C?i.points||10:0,c.debug(`💰 Earned points: ${f} (correct: ${C})`)}const $=f>0,I=n.submittedAt||n.timestamp||n.answeredAt||n.createdAt,S=I?new Date(I).toLocaleTimeString():"N/A";return`
                                        <tr>
                                            <td>${(g==null?void 0:g.name)||n.participantId}</td>
                                            <td>${D(n.answer,i.questionType,i)}</td>
                                            <td class="${$?"correct":"incorrect"}">
                                                ${f} / ${i.points}
                                            </td>
                                            <td>${S}</td>
                                        </tr>
                                    `}).join("")}
                                ${t.length===0?'<tr><td colspan="4">No responses</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                `}),document.getElementById("modalBody").innerHTML=m}function H(){document.getElementById("sessionModal").classList.remove("active")}async function J(e){try{const s=localStorage.getItem("token"),o=(await E.getById(e)).session,a={};(o.participants||[]).forEach(t=>{a[t.participantId]={name:t.name,totalPoints:0,questionsAnswered:0}}),(o.responses||[]).forEach(t=>{if(a[t.participantId]){const n=(o.questions||[]).find(f=>f.questionId===t.questionId);let g=0;t.points!==void 0?g=t.points:t.score!==void 0?g=t.score:g=P(t.answer,t.correctAnswer||(n==null?void 0:n.correctAnswer),(n==null?void 0:n.questionType)||(n==null?void 0:n.type))?(n==null?void 0:n.points)||10:0,a[t.participantId].totalPoints+=g,a[t.participantId].questionsAnswered++}});const l=Object.values(a).sort((t,n)=>n.totalPoints-t.totalPoints);let p=`STUDENT PERFORMANCE SUMMARY
`;p+=`Rank,Student Name,Total Points,Questions Answered,Participation %
`,l.forEach((t,n)=>{const g=(o.questions||[]).length>0?Math.round(t.questionsAnswered/(o.questions||[]).length*100):0;p+=`${n+1},"${t.name}",${t.totalPoints},${t.questionsAnswered},${g}%
`}),p+=`

DETAILED RESPONSES
`,p+=`Student,Question,Answer,Points,Correct Answer,Timestamp
`,(o.responses||[]).forEach(t=>{const n=(o.questions||[]).find(S=>S.questionId===t.questionId),g=(o.participants||[]).find(S=>S.participantId===t.participantId);let f=0;t.points!==void 0?f=t.points:t.score!==void 0?f=t.score:f=P(t.answer,t.correctAnswer||(n==null?void 0:n.correctAnswer),(n==null?void 0:n.questionType)||(n==null?void 0:n.type))?(n==null?void 0:n.points)||10:0;const $=t.submittedAt||t.timestamp||t.answeredAt||t.createdAt,I=$?new Date($).toLocaleString():"N/A";p+=`"${(g==null?void 0:g.name)||t.participantId}",`,p+=`"${(n==null?void 0:n.questionText)||"Unknown"}",`,p+=`"${t.answer}",`,p+=`${f},`,p+=`"${(n==null?void 0:n.correctAnswer)||"N/A"}",`,p+=`"${I}"
`});const m=new Blob([p],{type:"text/csv"}),i=window.URL.createObjectURL(m),r=document.createElement("a");r.href=i,r.download=`${o.sessionCode}_${o.title}_responses.csv`,r.click(),window.URL.revokeObjectURL(i),L.success("Session exported successfully!")}catch(s){c.error("Error exporting session:",s),c.error("Error details:",{message:s.message,stack:s.stack,sessionId:e}),L.error(`Failed to export session: ${s.message}`)}}async function V(e){var d;if(!window.confirm("Are you sure you want to delete this session? This cannot be undone."))return;const s=(d=document.querySelector(`[data-session-id="${e}"]`))==null?void 0:d.closest(".session-card");s&&(s.style.opacity="0.5",s.style.pointerEvents="none");try{c.debug("=== DELETE SESSION DEBUG ==="),c.debug("Session ID:",e),await E.delete(e),c.debug("DELETE SUCCESS"),c.debug("=== END DEBUG ==="),await T(),alert("Session deleted successfully")}catch(o){c.error("Error deleting session:",o),c.error("Error type:",o.constructor.name),c.error("Error stack:",o.stack),s&&(s.style.opacity="1",s.style.pointerEvents="auto");const a=o.message||String(o);alert(`Failed to delete session

Error: ${a}

Check browser console (F12) for full details.`)}}function G(e){h.has(e)?h.delete(e):h.add(e),x()}function K(){const e=Array.from(document.querySelectorAll(".session-checkbox"));h.size===e.length&&e.length>0?h.clear():e.forEach(s=>{h.add(s.dataset.sessionId)}),v(y),x()}function x(){const e=h.size;document.getElementById("selectedCount").textContent=e,document.getElementById("deleteSelectedBtn").disabled=e===0;const s=document.querySelectorAll(".session-checkbox"),d=e>0&&e===s.length;document.getElementById("selectAllText").textContent=d?"Deselect All":"Select All"}async function Y(){const e=h.size;if(e===0||!window.confirm(`Are you sure you want to delete ${e} session(s)? This cannot be undone.`))return;const s=Array.from(h);localStorage.getItem("token");let d=0,o=0;const a=[],l=document.getElementById("deleteSelectedBtn"),p=l.innerHTML;l.disabled=!0;for(let i=0;i<s.length;i++){const r=s[i];l.innerHTML=`Deleting ${i+1}/${s.length}...`,c.debug(`
=== BULK DELETE ${i+1}/${s.length} ===`),c.debug("Session ID:",r);try{await E.delete(r),c.debug("✅ Delete successful"),d++,h.delete(r)}catch(t){c.error("❌ Delete failed:",t.message),o++,a.push(`${r.substring(0,8)}: ${t.message}`)}}l.innerHTML=p;let m=`Successfully deleted ${d} session(s).`;o>0&&(m+=`

Failed to delete ${o} session(s):
${a.join(`
`)}`),await T(),h.clear(),x(),alert(m)}async function Z(e){if(window.confirm("Are you sure you want to end this session?"))try{await E.end(e),await T(),alert("Session ended successfully")}catch(s){c.error("Error ending session:",s),alert(`Failed to end session: ${s.message}`)}}window.toggleSelectAll=K;window.deleteSelected=Y;window.filterSessions=N;window.changePageSize=U;window.goToFirstPage=R;window.previousPage=O;window.nextPage=j;window.goToLastPage=Q;window.closeModal=H;window.toggleSessionSelection=G;window.viewSession=_;window.endSession=Z;window.exportSession=J;window.deleteSession=V;
