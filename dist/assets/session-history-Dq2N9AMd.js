import{t as L}from"./toast-93yYkT8V.js";/* empty css               */import{c as M,s as E}from"./api-DhNc_vJl.js";import{l as p}from"./logger-gSLuc3Ra.js";let k=[],y=[],b=null,h=new Set,g=1,w=20,A=[];function D(e,n,i){var r;if(!e)return"No answer";if(n==="matching")try{const a=typeof e=="string"?JSON.parse(e):e;if(console.log("🔍 Matching answer debug:",{answerObj:a,answerType:Array.isArray(a)?"array":typeof a,questionPairs:i==null?void 0:i.pairs,questionLeftColumn:i==null?void 0:i.leftColumn,questionRightColumn:i==null?void 0:i.rightColumn}),Array.isArray(a)&&a.length>0&&((r=a[0])!=null&&r.left))return a.map(d=>`${d.left} → ${d.right}`).join(", ");if(Array.isArray(a)&&(i!=null&&i.pairs))return a.map((d,c)=>{var s;return`${((s=i.pairs[c])==null?void 0:s.left)||`Item ${c+1}`} → ${d}`}).join(", ");if(Array.isArray(a)&&(i!=null&&i.leftColumn))return a.map((d,c)=>`${i.leftColumn[c]||`Item ${c+1}`} → ${d}`).join(", ");if(typeof a=="object"&&!Array.isArray(a)){const d=Object.entries(a);if(i!=null&&i.pairs||i!=null&&i.leftColumn){const c=i.pairs||i.leftColumn;return d.map(([u,s])=>{var t;return`${((t=c[parseInt(u)])==null?void 0:t.left)||c[parseInt(u)]||`Item ${parseInt(u)+1}`} → ${s}`}).join(", ")}return d.map(([c,u])=>`${c} → ${u}`).join(", ")}return console.warn("Could not format matching answer - falling back to JSON:",a),JSON.stringify(a)}catch(a){return console.error("Error formatting matching answer:",a,e),String(e)}if(n==="ordering")try{const a=typeof e=="string"?JSON.parse(e):e;if(Array.isArray(a))return a.map((d,c)=>`${c+1}. ${d}`).join(", ")}catch{}return String(e)}function P(e,n,i){if(e==null||n===null||n===void 0)return!1;const r=a=>typeof a=="string"&&a.length===1&&/^[A-Z]$/i.test(a)?a.toUpperCase().charCodeAt(0)-65:null;if(typeof e=="number"||typeof n=="number"){let a=typeof e=="number"?e:parseInt(e),d=typeof n=="number"?n:parseInt(n);if(isNaN(a)){const c=r(e);c!==null&&(a=c)}if(isNaN(d)){const c=r(n);c!==null&&(d=c)}if(!isNaN(a)&&!isNaN(d))return a===d}if(i==="matching"||i==="ordering")try{const a=typeof e=="object"?JSON.stringify(e):e,d=typeof n=="object"?JSON.stringify(n):n;return a===d}catch{return!1}return typeof e=="string"&&typeof n=="string"?e.toLowerCase().trim()===n.toLowerCase().trim():String(e).toLowerCase().trim()===String(n).toLowerCase().trim()}let B={};document.addEventListener("DOMContentLoaded",()=>{F(),T()});async function F(){try{if(!localStorage.getItem("token"))return;A=(await M.getAll()).classes||[],B={},A.forEach(r=>{B[r._id]=r.name});const i=document.getElementById("classFilter");A.forEach(r=>{const a=document.createElement("option");a.value=r._id,a.textContent=r.name,i.appendChild(a)}),p.debug(`Loaded ${A.length} classes`)}catch(e){p.error("Error loading classes:",e)}}async function T(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}k=(await E.getAll({limit:1e3})).sessions||[],p.debug(`Loaded ${k.length} sessions`),N()}catch(e){p.error("Error loading sessions:",e),alert("Failed to load session history")}}function $(e){const n=document.getElementById("historyContainer"),i=document.getElementById("emptyState"),r=document.getElementById("paginationControls");if(e.length===0){n.style.display="none",i.style.display="block",r.style.display="none";return}const a=e.length,d=w==="all"?1:Math.ceil(a/w);g>d&&(g=Math.max(1,d));let c,u,s;w==="all"?(c=e,u=1,s=a):(u=(g-1)*w+1,s=Math.min(g*w,a),c=e.slice(u-1,s)),n.style.display="grid",i.style.display="none",r.style.display=a>10?"flex":"none",n.innerHTML=c.map(l=>{const t=new Date(l.createdAt).toLocaleDateString(),o=new Date(l.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),m=l.participantCount||0,f=l.totalQuestions||0,v=l.responseCount||0,I=h.has(l.id),S=B[l.classId]||"No Class";return`
                    <div class="session-card ${l.status}">
                        <div class="session-card-header">
                            <input type="checkbox" class="session-checkbox"
                                   data-session-id="${l.id}"
                                   ${I?"checked":""}
                                   onclick="event.stopPropagation(); toggleSessionSelection('${l.id}')"
                                   style="margin-top: 4px;">
                            <div class="session-card-content" onclick="viewSession('${l.id}')">
                                <div class="session-header">
                                    <div>
                                        <div class="session-title">${l.title||"Untitled Session"}</div>
                                        <div class="session-code">Code: ${l.sessionCode}</div>
                                        ${l.classId?`<div class="class-badge">📚 ${S}</div>`:""}
                                    </div>
                                    <span class="status-badge status-${l.status}">${l.status}</span>
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

                                <div class="session-date">📅 ${t} at ${o}</div>

                                <div class="session-actions" onclick="event.stopPropagation()">
                                    <button class="btn btn-view" onclick="viewSession('${l.id}')">
                                        View Details
                                    </button>
                                    <button class="btn btn-export" onclick="exportSession('${l.id}')">
                                        Export CSV
                                    </button>
                                    <button class="btn btn-delete" onclick="deleteSession('${l.id}')">
                                        Delete
                                    </button>
                                    ${l.status==="active"?`
                                        <button class="btn" style="background: #F59E0B; color: white;" onclick="endSession('${l.id}')">
                                            End Session
                                        </button>
                                    `:""}
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join(""),document.getElementById("showingStart").textContent=u,document.getElementById("showingEnd").textContent=s,document.getElementById("totalSessions").textContent=a,document.getElementById("currentPageNum").textContent=g,document.getElementById("totalPagesNum").textContent=d,document.getElementById("firstPageBtn").disabled=g===1,document.getElementById("prevPageBtn").disabled=g===1,document.getElementById("nextPageBtn").disabled=g===d,document.getElementById("lastPageBtn").disabled=g===d}function N(){const e=document.getElementById("searchInput").value.toLowerCase(),n=document.getElementById("statusFilter").value,i=document.getElementById("classFilter").value;y=k.filter(r=>{const a=r.title.toLowerCase().includes(e)||r.sessionCode.toLowerCase().includes(e),d=n==="all"||r.status===n,c=r.classId||r.class||r.class_id||r.classID;return a&&d&&(i==="all"||c===i)}),p.debug(`Filter: classId="${i}", found ${y.length} sessions`),g=1,$(y)}function j(){const e=document.getElementById("pageSizeSelect");w=e.value==="all"?"all":parseInt(e.value),g=1,$(y)}function U(){const e=w==="all"?1:Math.ceil(y.length/w);g<e&&(g++,$(y),window.scrollTo({top:0,behavior:"smooth"}))}function O(){g>1&&(g--,$(y),window.scrollTo({top:0,behavior:"smooth"}))}function R(){g!==1&&(g=1,$(y),window.scrollTo({top:0,behavior:"smooth"}))}function Q(){const e=w==="all"?1:Math.ceil(y.length/w);g!==e&&(g=e,$(y),window.scrollTo({top:0,behavior:"smooth"}))}async function _(e){try{p.debug("Loading session:",e);const n=localStorage.getItem("token"),i=await E.getById(e);p.debug("Session data:",i),b=i.session,p.debug("Questions:",b.questions),p.debug("Responses:",b.responses),b.responses&&b.responses.length>0&&p.debug("First response structure:",b.responses[0]),z(b),document.getElementById("sessionModal").classList.add("active")}catch(n){p.error("Error loading session:",n),alert(`Failed to load session details: ${n.message}`)}}function z(e){document.getElementById("modalTitle").textContent=e.title;const n=e.questions||[],i=e.responses||[],r=e.participants||[];function a(s){return{multiple_choice:"Multiple Choice",mcq:"Multiple Choice",true_false:"True/False",boolean:"True/False",tf:"True/False",short_answer:"Short Answer",matching:"Matching",ordering:"Put in Order",fill_blank:"Fill in the Blank"}[s]||s}const d={};r.forEach(s=>{d[s.participantId]={name:s.name,totalPoints:0,questionsAnswered:0,responses:[]}}),i.forEach(s=>{if(d[s.participantId]){let l=0;if(s.points!==void 0)l=s.points,p.debug("✓ Using backend-provided points:",s.points);else if(s.score!==void 0)l=s.score,p.debug("✓ Using backend-provided score:",s.score);else{const t=n.find(m=>m.questionId===s.questionId);p.debug("📊 Calculating points for response:",{participantId:s.participantId,questionId:s.questionId,studentAnswer:s.answer,responseCorrectAnswer:s.correctAnswer,questionCorrectAnswer:t==null?void 0:t.correctAnswer,questionType:(t==null?void 0:t.questionType)||(t==null?void 0:t.type),questionPoints:t==null?void 0:t.points});const o=P(s.answer,s.correctAnswer||(t==null?void 0:t.correctAnswer),(t==null?void 0:t.questionType)||(t==null?void 0:t.type));l=o?(t==null?void 0:t.points)||10:0,p.debug(`💰 Earned points: ${l} (correct: ${o})`)}d[s.participantId].totalPoints+=l,d[s.participantId].questionsAnswered++,d[s.participantId].responses.push(s)}});const c=Object.values(d).sort((s,l)=>l.totalPoints-s.totalPoints);let u=`
                <div style="margin-bottom: 2rem;">
                    <h3>Session Information</h3>
                    <p><strong>Code:</strong> ${e.sessionCode}</p>
                    <p><strong>Status:</strong> ${e.status}</p>
                    <p><strong>Participants:</strong> ${r.length}</p>
                    <p><strong>Questions Asked:</strong> ${n.length}</p>
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
                            ${c.map((s,l)=>{const t=n.length>0?Math.round(s.questionsAnswered/n.length*100):0;return`
                                    <tr>
                                        <td><strong>#${l+1}</strong></td>
                                        <td>${s.name}</td>
                                        <td><strong>${s.totalPoints}</strong></td>
                                        <td>${s.questionsAnswered} / ${n.length}</td>
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
                            ${c.length===0?'<tr><td colspan="5">No student data available</td></tr>':""}
                        </tbody>
                    </table>
                </div>

                <h3>Questions & Responses</h3>
            `;n.forEach((s,l)=>{const t=i.filter(o=>o.questionId===s.questionId);u+=`
                    <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h4>Question ${l+1}: ${s.questionText}</h4>
                        <p><strong>Type:</strong> ${a(s.questionType)} | <strong>Points:</strong> ${s.points}</p>

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
                                ${t.map(o=>{const m=r.find(C=>C.participantId===o.participantId);let f=0;if(o.points!==void 0)f=o.points,p.debug("✓ Using backend-provided points:",o.points);else if(o.score!==void 0)f=o.score,p.debug("✓ Using backend-provided score:",o.score);else{p.debug("📊 Calculating points (question details):",{participantId:o.participantId,studentAnswer:o.answer,responseCorrectAnswer:o.correctAnswer,questionCorrectAnswer:s.correctAnswer,questionType:s.questionType,questionPoints:s.points});const C=P(o.answer,o.correctAnswer||s.correctAnswer,s.questionType);f=C?s.points||10:0,p.debug(`💰 Earned points: ${f} (correct: ${C})`)}const v=f>0,I=o.submittedAt||o.timestamp||o.answeredAt||o.createdAt,S=I?new Date(I).toLocaleTimeString():"N/A";return`
                                        <tr>
                                            <td>${(m==null?void 0:m.name)||o.participantId}</td>
                                            <td>${D(o.answer,s.questionType,s)}</td>
                                            <td class="${v?"correct":"incorrect"}">
                                                ${f} / ${s.points}
                                            </td>
                                            <td>${S}</td>
                                        </tr>
                                    `}).join("")}
                                ${t.length===0?'<tr><td colspan="4">No responses</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                `}),document.getElementById("modalBody").innerHTML=u}function V(){document.getElementById("sessionModal").classList.remove("active")}async function J(e){try{const n=localStorage.getItem("token"),r=(await E.getById(e)).session,a={};(r.participants||[]).forEach(t=>{a[t.participantId]={name:t.name,totalPoints:0,questionsAnswered:0}}),(r.responses||[]).forEach(t=>{if(a[t.participantId]){const o=(r.questions||[]).find(f=>f.questionId===t.questionId);let m=0;t.points!==void 0?m=t.points:t.score!==void 0?m=t.score:m=P(t.answer,t.correctAnswer||(o==null?void 0:o.correctAnswer),(o==null?void 0:o.questionType)||(o==null?void 0:o.type))?(o==null?void 0:o.points)||10:0,a[t.participantId].totalPoints+=m,a[t.participantId].questionsAnswered++}});const d=Object.values(a).sort((t,o)=>o.totalPoints-t.totalPoints);let c=`STUDENT PERFORMANCE SUMMARY
`;c+=`Rank,Student Name,Total Points,Questions Answered,Participation %
`,d.forEach((t,o)=>{const m=(r.questions||[]).length>0?Math.round(t.questionsAnswered/(r.questions||[]).length*100):0;c+=`${o+1},"${t.name}",${t.totalPoints},${t.questionsAnswered},${m}%
`}),c+=`

DETAILED RESPONSES
`,c+=`Student,Question,Answer,Points,Correct Answer,Timestamp
`,(r.responses||[]).forEach(t=>{const o=(r.questions||[]).find(S=>S.questionId===t.questionId),m=(r.participants||[]).find(S=>S.participantId===t.participantId);let f=0;t.points!==void 0?f=t.points:t.score!==void 0?f=t.score:f=P(t.answer,t.correctAnswer||(o==null?void 0:o.correctAnswer),(o==null?void 0:o.questionType)||(o==null?void 0:o.type))?(o==null?void 0:o.points)||10:0;const v=t.submittedAt||t.timestamp||t.answeredAt||t.createdAt,I=v?new Date(v).toLocaleString():"N/A";c+=`"${(m==null?void 0:m.name)||t.participantId}",`,c+=`"${(o==null?void 0:o.questionText)||"Unknown"}",`,c+=`"${t.answer}",`,c+=`${f},`,c+=`"${(o==null?void 0:o.correctAnswer)||"N/A"}",`,c+=`"${I}"
`});const u=new Blob([c],{type:"text/csv"}),s=window.URL.createObjectURL(u),l=document.createElement("a");l.href=s,l.download=`${r.sessionCode}_${r.title}_responses.csv`,l.click(),window.URL.revokeObjectURL(s),L.success("Session exported successfully!")}catch(n){p.error("Error exporting session:",n),p.error("Error details:",{message:n.message,stack:n.stack,sessionId:e}),L.error(`Failed to export session: ${n.message}`)}}async function H(e){var i;if(!window.confirm("Are you sure you want to delete this session? This cannot be undone."))return;const n=(i=document.querySelector(`[data-session-id="${e}"]`))==null?void 0:i.closest(".session-card");n&&(n.style.opacity="0.5",n.style.pointerEvents="none");try{p.debug("=== DELETE SESSION DEBUG ==="),p.debug("Session ID:",e),await E.delete(e),p.debug("DELETE SUCCESS"),p.debug("=== END DEBUG ==="),await T(),alert("Session deleted successfully")}catch(r){p.error("Error deleting session:",r),p.error("Error type:",r.constructor.name),p.error("Error stack:",r.stack),n&&(n.style.opacity="1",n.style.pointerEvents="auto");const a=r.message||String(r);alert(`Failed to delete session

Error: ${a}

Check browser console (F12) for full details.`)}}function G(e){h.has(e)?h.delete(e):h.add(e),x()}function K(){const e=Array.from(document.querySelectorAll(".session-checkbox"));h.size===e.length&&e.length>0?h.clear():e.forEach(n=>{h.add(n.dataset.sessionId)}),$(y),x()}function x(){const e=h.size;document.getElementById("selectedCount").textContent=e,document.getElementById("deleteSelectedBtn").disabled=e===0;const n=document.querySelectorAll(".session-checkbox"),i=e>0&&e===n.length;document.getElementById("selectAllText").textContent=i?"Deselect All":"Select All"}async function Y(){const e=h.size;if(e===0||!window.confirm(`Are you sure you want to delete ${e} session(s)? This cannot be undone.`))return;const n=Array.from(h);localStorage.getItem("token");let i=0,r=0;const a=[],d=document.getElementById("deleteSelectedBtn"),c=d.innerHTML;d.disabled=!0;for(let s=0;s<n.length;s++){const l=n[s];d.innerHTML=`Deleting ${s+1}/${n.length}...`,p.debug(`
=== BULK DELETE ${s+1}/${n.length} ===`),p.debug("Session ID:",l);try{await E.delete(l),p.debug("✅ Delete successful"),i++,h.delete(l)}catch(t){p.error("❌ Delete failed:",t.message),r++,a.push(`${l.substring(0,8)}: ${t.message}`)}}d.innerHTML=c;let u=`Successfully deleted ${i} session(s).`;r>0&&(u+=`

Failed to delete ${r} session(s):
${a.join(`
`)}`),await T(),h.clear(),x(),alert(u)}async function Z(e){if(window.confirm("Are you sure you want to end this session?"))try{await E.end(e),await T(),alert("Session ended successfully")}catch(n){p.error("Error ending session:",n),alert(`Failed to end session: ${n.message}`)}}window.toggleSelectAll=K;window.deleteSelected=Y;window.filterSessions=N;window.changePageSize=j;window.goToFirstPage=R;window.previousPage=O;window.nextPage=U;window.goToLastPage=Q;window.closeModal=V;window.toggleSessionSelection=G;window.viewSession=_;window.endSession=Z;window.exportSession=J;window.deleteSession=H;
