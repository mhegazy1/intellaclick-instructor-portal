import{t as y}from"./toast-Cbd37M37.js";/* empty css               */import{l as w}from"./logger-CXzo1yMG.js";async function U(t,e="Text"){try{await navigator.clipboard.writeText(t),y.success(`${e} copied to clipboard!`)}catch{const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-999999px",document.body.appendChild(r),r.select();try{document.execCommand("copy"),y.success(`${e} copied to clipboard!`)}catch{y.error(`Failed to copy ${e.toLowerCase()}`)}finally{document.body.removeChild(r)}}}function Z(t){const{text:e,type:n,options:r,matching:o,ordering:a,timeLimit:c,points:d}=t;let s="";switch(s+=`<div class="preview-question">${e||"No question text"}</div>`,n){case"mcq":case"poll":s+=K(r,n==="poll");break;case"tf":s+=X();break;case"fillblank":s+=Y(e);break;case"matching":s+=ee(o);break;case"ordering":s+=te(a);break;default:s+='<div class="alert alert-info">Preview not available for this question type</div>'}return s+=oe(c,d,n),s}function K(t,e=!1){if(!t||t.length===0)return'<div class="alert alert-info">No options added yet</div>';let n='<div class="preview-options">';return t.forEach((r,o)=>{const a=String.fromCharCode(65+o),c=r.trim()||`Option ${a}`;n+=`
            <div class="preview-option">
                <input type="radio" name="preview-answer" value="${o}">
                <div class="preview-option-text"><strong>${a}.</strong> ${c}</div>
            </div>
        `}),n+="</div>",e&&(n+='<div class="alert alert-info" style="margin-top: 1rem;"><i class="fas fa-info-circle"></i> This is a poll question - no correct answer</div>'),n}function X(){return`
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
    `}function Y(t){return`
        <div class="preview-question">Fill in the blanks:</div>
        <div class="preview-fill-blank">${t.replace(/\[blank\]/gi,'<input type="text" class="preview-blank-input" placeholder="___">')}</div>
    `}function ee(t){if(!t||!t.items||!t.matches)return'<div class="alert alert-info">Add items and matches to preview</div>';const{items:e,matches:n}=t;if(e.length===0||n.length===0)return'<div class="alert alert-info">Add items and matches to preview</div>';let r='<div class="preview-matching-column"><h4>Items to Match</h4>';e.forEach((a,c)=>{const d=a.trim()||`Item ${c+1}`;r+=`<div class="preview-matching-item"><strong>${c+1}.</strong> ${d}</div>`}),r+="</div>";let o='<div class="preview-matching-column"><h4>Match Options</h4>';return n.forEach((a,c)=>{const d=String.fromCharCode(65+c),s=a.trim()||`Match ${d}`;o+=`<div class="preview-matching-item"><strong>${d}.</strong> ${s}</div>`}),o+="</div>",`
        <div class="alert alert-info"><i class="fas fa-info-circle"></i> Match each item on the left with the correct option on the right</div>
        <div class="preview-matching-grid">
            ${r}
            ${o}
        </div>
    `}function te(t){if(!t||t.length===0)return'<div class="alert alert-info">Add items to put in order</div>';let e='<div class="alert alert-info"><i class="fas fa-info-circle"></i> Put these items in the correct order</div>';return e+='<div class="preview-ordering-items">',t.forEach((n,r)=>{const o=n.trim()||`Item ${r+1}`;e+=`
            <div class="preview-ordering-item">
                <i class="fas fa-grip-vertical preview-ordering-handle"></i>
                <div>${o}</div>
            </div>
        `}),e+="</div>",e}function oe(t,e,n){let r='<div class="preview-metadata">';t&&(r+=`<div class="preview-meta-item"><i class="fas fa-clock"></i> <strong>Time:</strong> ${t}s</div>`),e&&(r+=`<div class="preview-meta-item"><i class="fas fa-star"></i> <strong>Points:</strong> ${e}</div>`);const o={mcq:"Multiple Choice",poll:"Poll Question",tf:"True/False",fillblank:"Fill in the Blank",matching:"Matching",ordering:"Put in Order"};return n&&o[n]&&(r+=`<div class="preview-meta-item"><i class="fas fa-question-circle"></i> <strong>Type:</strong> ${o[n]}</div>`),r+="</div>",r}function ne(){return`
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
    `}const _=document.createElement("style");_.textContent=ne();document.head.appendChild(_);let k,T,x,ie,f=[],E=-1,R,N=null,Q={defaultTimeLimit:60,defaultPoints:10,defaultAwardParticipation:!1,defaultShowCorrectAnswer:!0,defaultAllowAnswerChange:!0};document.addEventListener("DOMContentLoaded",function(){const t=new URLSearchParams(window.location.search);if(k=t.get("id"),T=t.get("code"),t.get("type"),!k||!T){y.error("Invalid session parameters"),setTimeout(()=>window.location.href="classes.html",2e3);return}const e=sessionStorage.getItem("pendingQuestions");if(e){const n=JSON.parse(e);f.push(...n),sessionStorage.removeItem("pendingQuestions"),sessionStorage.removeItem("currentQuestionIndex"),O()}else{const n=sessionStorage.getItem("pendingQuestion");if(n){const r=JSON.parse(n);f.push(r),sessionStorage.removeItem("pendingQuestion"),O()}}if(f.length===0){const n=sessionStorage.getItem("questionQueue_"+T),r=sessionStorage.getItem("questionIndex_"+T);n&&(console.log("[Session] Restoring queue from sessionStorage"),f=JSON.parse(n),E=r?parseInt(r):-1,O())}f.length===0&&(console.log("[Session] Attempting to restore queue from backend"),se()),re(),F(),ae(),be()});function re(){localStorage.getItem("token")||(window.location.href="/login.html")}async function F(){try{const t=await fetch(`https://api-modular.intellaclick.com/api/sessions/code/${T}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!t.ok)throw new Error("Failed to load session");x=(await t.json()).session,ie=x.classId,w.debug("Session loaded:",{sessionId:k,sessionCode:T,sessionData:x,hasCurrentQuestion:!!x.currentQuestion}),le()}catch(t){w.error("Error loading session:",t),y.error("Failed to load session")}}async function se(){try{const t=await fetch(`https://api-modular.intellaclick.com/api/sessions/${k}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!t.ok){console.error("[Session] Failed to fetch session data for queue restoration");return}const e=await t.json();e.success&&e.session.questionQueue&&e.session.questionQueue.length>0?(f=e.session.questionQueue,E=e.session.currentQuestionIndex??-1,console.log("[Session] Queue restored from backend:",{queueLength:f.length,currentIndex:E}),O(),y.success(`Restored ${f.length} questions from previous session`)):console.log("[Session] No saved queue found in backend")}catch(t){console.error("[Session] Error restoring queue from backend:",t)}}async function z(){try{if(!(await fetch(`https://api-modular.intellaclick.com/api/sessions/${k}/question-queue`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({questionQueue:f,currentQuestionIndex:E})})).ok){console.error("[Session] Failed to save queue to backend");return}console.log("[Session] Queue saved to backend successfully")}catch(t){console.error("[Session] Error saving queue to backend:",t)}}async function ae(){try{const t=await fetch("https://api-modular.intellaclick.com/api/users/question-defaults",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});t.ok?(Q=(await t.json()).defaults||Q,document.getElementById("modalTimeLimit").value=Q.defaultTimeLimit,document.getElementById("modalPoints").value=Q.defaultPoints,document.getElementById("modalAwardParticipation").checked=Q.defaultAwardParticipation,w.debug("✅ Loaded question defaults:",Q)):w.debug("No saved question defaults found, using system defaults")}catch(t){w.error("Error loading question defaults:",t)}}function le(){document.getElementById("sessionCode").textContent=x.sessionCode,document.getElementById("participantCount").textContent=x.participantCount||0;const t=`https://join.intellaclick.com/session/${x.sessionCode}`;document.getElementById("joinUrl").innerHTML=`
                <strong>Students can join at:</strong><br>
                <div style="display: flex; align-items: center; gap: 12px; margin: 8px 0;">
                    <span style="font-size: 16px; user-select: all; flex: 1;">${t}</span>
                    <button class="btn btn-secondary" onclick="copyJoinUrl('${t}')" style="padding: 6px 12px; font-size: 12px;">
                        Copy Link
                    </button>
                </div>
                <small style="color: var(--text-secondary); margin-top: 4px; display: block;">
                    Session ID: ${x.id||x._id}<br>
                    ${x.restrictToEnrolled===!1?"Open to all students":"Restricted to enrolled students only"}
                </small>
            `,ce(t);const e=document.getElementById("sessionStatus");e.textContent=x.status.charAt(0).toUpperCase()+x.status.slice(1),e.className=`status-badge status-${x.status}`,x.status==="active"&&x.currentQuestion&&(document.getElementById("stopBtn").disabled=!1,document.getElementById("resultsBtn").disabled=!1,D(x.currentQuestion)),de()}function de(){const t=document.getElementById("participantsList");fetch(`https://api-modular.intellaclick.com/api/sessions/${k}/participants`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(e=>e.json()).then(e=>{e.participants&&e.participants.length>0?(t.innerHTML="",e.participants.forEach(n=>{const r=document.createElement("div");r.className="participant-card",r.innerHTML=`
                            <strong>${n.name||"Anonymous"}</strong><br>
                            <small style="color: var(--text-secondary);">
                                Joined: ${new Date(n.joinedAt).toLocaleTimeString()}<br>
                                ${n.isEnrolled?"Enrolled Student":"Guest"}
                            </small>
                        `,t.appendChild(r)})):t.innerHTML='<p style="color: var(--text-secondary);">No participants yet. Share the session code for students to join.</p>'}).catch(e=>{w.error("Error loading participants:",e)})}function ce(t){const e=document.getElementById("qrcode");e.innerHTML="";const n=document.createElement("canvas");QRCode.toCanvas(n,t,{width:400,margin:2,color:{dark:"#000000",light:"#FFFFFF"}},function(r){if(r){w.error("QR Code generation error:",r),e.innerHTML='<p style="color: var(--text-secondary);">QR Code generation failed</p>';return}n.style.width="200px",n.style.height="200px",e.appendChild(n)})}function O(){const t=document.getElementById("queueList");sessionStorage.setItem("questionQueue_"+T,JSON.stringify(f)),sessionStorage.setItem("questionIndex_"+T,E.toString()),z(),f.length===0?(t.innerHTML='<p style="color: var(--text-secondary); font-size: 14px;">No questions in queue. Create a new question or import from a quiz.</p>',document.getElementById("sendBtn").disabled=!0):(t.innerHTML="",f.forEach((e,n)=>{const r=document.createElement("div");r.className="question-item",r.style.padding="12px",r.style.marginBottom="8px",r.style.border="1px solid var(--border-color)",r.style.borderRadius="6px",r.style.backgroundColor="var(--bg-primary)";const o=document.createElement("div");o.style.display="flex",o.style.alignItems="flex-start",o.style.marginBottom="10px";const a=document.createElement("div");a.style.fontWeight="bold",a.style.marginRight="8px",a.style.minWidth="24px",a.style.color="var(--text-secondary)",a.textContent=`${n+1}.`;const c=document.createElement("div");if(c.style.flex="1",c.style.lineHeight="1.4",c.textContent=e.text||e.questionText,o.appendChild(a),o.appendChild(c),n>E){const d=document.createElement("div");d.style.display="flex",d.style.justifyContent="space-between",d.style.alignItems="center",d.style.paddingTop="10px",d.style.borderTop="1px solid var(--border-color)";const s=document.createElement("div");s.style.display="grid",s.style.gridTemplateColumns="auto auto auto",s.style.gap="12px 20px",s.style.alignItems="center",s.style.fontSize="13px";const i=document.createElement("span");i.style.color="var(--text-secondary)",i.style.textAlign="right",i.style.minWidth="50px",i.textContent="Time:";const h=document.createElement("input");h.type="number",h.value=e.timeLimit||60,h.min=10,h.max=300,h.style.width="60px",h.style.padding="4px 8px",h.style.border="1px solid var(--border-color)",h.style.borderRadius="4px",h.style.fontSize="13px";const u=()=>{const P=parseInt(h.value)||60;e.timeLimit=P,console.log(`✏️ Updated question ${n+1} time limit:`,P,"Full question:",e),sessionStorage.setItem("questionQueue_"+T,JSON.stringify(f)),z()};h.onchange=u,h.onblur=u;const b=document.createElement("span");b.style.color="var(--text-secondary)",b.textContent="sec";const m=document.createElement("span");m.style.color="var(--text-secondary)",m.style.textAlign="right",m.style.minWidth="50px",m.textContent="Points:";const g=document.createElement("input");g.type="number",g.value=e.points||10,g.min=1,g.max=100,g.style.width="60px",g.style.padding="4px 8px",g.style.border="1px solid var(--border-color)",g.style.borderRadius="4px",g.style.fontSize="13px";const l=()=>{const P=parseInt(g.value)||10;e.points=P,console.log(`✏️ Updated question ${n+1} points:`,P,"Full question:",e),sessionStorage.setItem("questionQueue_"+T,JSON.stringify(f)),z()};g.onchange=l,g.onblur=l;const p=document.createElement("span");p.style.color="var(--text-secondary)",p.textContent="pts";const C=document.createElement("span");C.style.color="var(--text-secondary)",C.style.textAlign="right",C.style.minWidth="50px",C.textContent="Award:";const v=document.createElement("div");v.style.width="60px",v.style.display="flex",v.style.alignItems="center",v.style.paddingLeft="4px";const I=document.createElement("input");I.type="checkbox",I.checked=e.awardParticipationPoints||!1,I.style.cursor="pointer",I.style.width="16px",I.style.height="16px",I.style.margin="0",I.onchange=()=>{e.awardParticipationPoints=I.checked,console.log(`✏️ Updated question ${n+1} awardParticipationPoints:`,I.checked,"Full question:",e),sessionStorage.setItem("questionQueue_"+T,JSON.stringify(f)),z()},v.appendChild(I);const $=document.createElement("span");$.textContent="Participation points",s.appendChild(i),s.appendChild(h),s.appendChild(b),s.appendChild(m),s.appendChild(g),s.appendChild(p),s.appendChild(C),s.appendChild(v),s.appendChild($);const A=document.createElement("div");A.style.display="flex",A.style.gap="6px",A.style.flexShrink="0";const q=document.createElement("button");q.className="btn btn-secondary",q.style.padding="6px 10px",q.style.fontSize="12px",q.style.minWidth="32px",q.innerHTML="↑",q.title="Move up",n>E+1?q.onclick=()=>j(n,-1):(q.disabled=!0,q.style.opacity="0.3",q.style.cursor="not-allowed"),A.appendChild(q);const B=document.createElement("button");B.className="btn btn-secondary",B.style.padding="6px 10px",B.style.fontSize="12px",B.style.minWidth="32px",B.innerHTML="↓",B.title="Move down",n<f.length-1?B.onclick=()=>j(n,1):(B.disabled=!0,B.style.opacity="0.3",B.style.cursor="not-allowed"),A.appendChild(B);const S=document.createElement("button");S.className="btn btn-secondary",S.style.padding="6px 12px",S.style.fontSize="12px",S.textContent="Edit",S.onclick=()=>ue(n),A.appendChild(S);const M=document.createElement("button");M.className="btn btn-secondary",M.style.padding="6px 12px",M.style.fontSize="12px",M.textContent="Remove",M.onclick=()=>pe(n),A.appendChild(M),d.appendChild(s),d.appendChild(A),r.appendChild(o),r.appendChild(d)}else r.appendChild(o),r.style.opacity="0.6",r.style.backgroundColor="var(--bg-secondary)";t.appendChild(r)}),document.getElementById("sendBtn").disabled=!1)}function pe(t){f.splice(t,1),O()}function j(t,e){const n=t+e;if(n<=E||n>=f.length)return;const r=f[t];f[t]=f[n],f[n]=r,O(),y.success("Question moved")}let L=null;function ue(t){L=t;const e=f[t];document.getElementById("questionModal").style.display="block";const n=!e.correctAnswer&&e.correctAnswer!==0&&e.correctAnswer!==!1,r=n?"poll":e.type||e.questionType||"mcq";w.debug("Editing question:",{type:r,isPoll:n,correctAnswer:e.correctAnswer,options:e.options||e.optionTexts}),document.getElementById("modalQuestionType").value=r,document.getElementById("modalQuestionText").value=e.text||e.questionText||"",document.getElementById("modalTimeLimit").value=e.timeLimit||60,document.getElementById("modalPoints").value=e.points||10,document.getElementById("modalAwardParticipation").checked=e.awardParticipationPoints||!1,setTimeout(()=>H(),10),setTimeout(()=>{switch(r){case"poll":if(e.options||e.optionTexts){const s=e.optionTexts||e.options;["A","B","C","D"].forEach((i,h)=>{const u=document.getElementById(`modalOption${i}`);u&&s[h]&&(u.value=s[h])})}break;case"mcq":if(e.optionTexts||e.options){const s=e.optionTexts||e.options;["A","B","C","D"].forEach((i,h)=>{const u=document.getElementById(`modalOption${i}`);if(u&&s[h]&&(u.value=s[h]),e.correctAnswer===i||e.correctAnswer===h){const b=document.querySelector(`input[name="modalCorrect"][value="${i}"]`);b&&(b.checked=!0)}})}break;case"tf":const a=e.correctAnswer==="true"||e.correctAnswer===!0?"true":"false",c=document.querySelector(`input[name="modalTF"][value="${a}"]`);c&&(c.checked=!0);break;case"matching":e.pairs&&e.pairs.forEach((s,i)=>{const h=document.getElementById(`modalMatch${i+1}Left`),u=document.getElementById(`modalMatch${i+1}Right`);h&&(h.value=s.left||""),u&&(u.value=s.right||"")});break;case"ordering":e.correctOrder&&e.correctOrder.forEach((s,i)=>{const h=document.getElementById(`modalOrder${i+1}`);h&&(h.value=s||"")});break;case"fillblank":const d=document.getElementById("modalBlankAnswer");d&&(d.value=e.correctAnswer||"");break}},100);const o=document.querySelector("#questionModal h2");o&&(o.textContent="Edit Question")}async function me(){if(console.log("🚀 SEND NEXT QUESTION CALLED:",{currentIndex:E,queueLength:f.length,willPassCheck:E+1<f.length,nextQuestion:f[E+1]}),E+1>=f.length){y.error("No more questions in queue");return}E++,sessionStorage.setItem("questionIndex_"+T,E.toString());const t=f[E];console.log("🔍 QUESTION FROM QUEUE (before normalization):",{index:E,timeLimit:t.timeLimit,points:t.points,awardParticipationPoints:t.awardParticipationPoints,fullQuestion:t});const e={...t};console.log("🔍 NORMALIZED QUESTION (after spread):",{timeLimit:e.timeLimit,points:e.points,awardParticipationPoints:e.awardParticipationPoints,fullQuestion:e}),delete e.type;const r={mcq:"multiple_choice",tf:"boolean",matching:"matching",ordering:"ordering",fillblank:"fill_blank"}[t.type]||t.type;if(e.questionType=r,e.type=r,e.questionText=t.text||t.questionText,t.type==="tf")e.options=["True","False"];else if(t.type==="mcq")t.optionTexts&&(e.options=t.options,e.optionTexts=t.optionTexts);else if(t.type==="matching"){e.pairs=t.pairs||[];const o=e.pairs.map(c=>c.right),a=o.sort(()=>Math.random()-.5);e.shuffledMatchingRight=a,console.log("🎲 MATCHING SHUFFLE DEBUG:",{originalPairs:e.pairs,originalRight:o,shuffledRight:a})}else if(t.type==="ordering"){e.correctOrder=t.correctOrder||[];const o=[...e.correctOrder].sort(()=>Math.random()-.5);e.shuffledOrderingItems=o,console.log("🎲 ORDERING SHUFFLE DEBUG:",{originalOrder:e.correctOrder,shuffledItems:o})}else t.type==="fillblank"&&(e.correctAnswer=t.correctAnswer||"");console.log("📤 SENDING QUESTION TO BACKEND:",{sessionId:k,questionType:e.questionType,type:e.type,timeLimit:e.timeLimit,points:e.points,awardParticipationPoints:e.awardParticipationPoints,shuffledMatchingRight:e.shuffledMatchingRight,shuffledOrderingItems:e.shuffledOrderingItems,fullQuestion:e}),w.debug("Sending question:",{sessionId:k,endpoint:`https://api-modular.intellaclick.com/api/sessions/${k}/questions`,questionData:e,hasQuestionText:!!e.questionText,questionType:e.questionType}),console.log("🌐 MAKING FETCH REQUEST:",{url:`https://api-modular.intellaclick.com/api/sessions/${k}/questions`,method:"POST",timeLimit:e.timeLimit,points:e.points});try{const o=await fetch(`https://api-modular.intellaclick.com/api/sessions/${k}/questions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(e)});if(console.log("📡 FETCH RESPONSE:",{status:o.status,ok:o.ok}),!o.ok){const c=await o.json();throw console.log("❌ FETCH ERROR:",c),w.error("API Error:",{status:o.status,error:c}),new Error(c.error||"Failed to send question")}const a=await o.json();console.log("✅ FETCH SUCCESS:",a),w.debug("Question sent successfully:",a),y.success("Question sent successfully!"),document.getElementById("stopBtn").disabled=!1,document.getElementById("resultsBtn").disabled=!1,D(t),O(),setTimeout(async()=>{await F()},500)}catch(o){w.error("Error sending question:",o),o.name==="TypeError"&&o.message==="Failed to fetch"?(y.error("Network error: Unable to reach the API server. This may be a CORS issue."),w.error("CORS Error Details:",{error:o,message:"The API server may need to add instructor.intellaclick.com to its allowed origins",currentOrigin:window.location.origin,apiUrl:"https://api-modular.intellaclick.com"}),window.confirm(`Network error detected. This is likely a CORS configuration issue.

The backend needs to add instructor.intellaclick.com to its allowed origins.

Click OK to open the CORS test page for more details.`)&&window.open("/cors-test.html","_blank")):y.error(o.message||"Failed to send question"),E--}}function D(t){document.getElementById("currentQuestionSection").style.display="block";const e=t.type||t.questionType,n=t.text||t.questionText||"";w.debug("📺 DISPLAYING QUESTION IN SESSION CONTROL:",{questionType:e,questionText:n,hasPairs:!!t.pairs,pairs:t.pairs,hasCorrectOrder:!!t.correctOrder,correctOrder:t.correctOrder,fullQuestion:t});let r=n;(e==="fillblank"||e==="fill_blank")&&(r=r.replace(/\[blank\]/gi,'<span style="display: inline-block; min-width: 100px; border-bottom: 2px solid #4F46E5; margin: 0 6px; height: 1.2em; vertical-align: bottom;"></span>')),document.getElementById("questionText").innerHTML=r;const o=document.getElementById("questionOptions");if(o.innerHTML="",(e==="mcq"||e==="multiple_choice")&&(t.optionTexts||t.options)){const a=t.optionTexts||t.options;(t.options&&t.optionTexts?t.options:["A","B","C","D"]).forEach((d,s)=>{if(a[s]){const i=document.createElement("div");i.style.marginTop="8px",i.textContent=`${d}: ${a[s]}`,o.appendChild(i)}})}else if(e==="tf"||e==="boolean")o.innerHTML='<div style="margin-top: 8px;">A: True</div><div style="margin-top: 8px;">B: False</div>';else if(e==="matching"&&t.pairs){if(o.innerHTML="<strong>Match the following:</strong>",t.pairs.forEach((a,c)=>{const d=document.createElement("div");d.style.marginTop="8px",d.textContent=`${c+1}. ${a.left} → ?`,o.appendChild(d)}),t.shuffledMatchingRight){const a=document.createElement("div");a.style.marginTop="12px",a.innerHTML="<strong>Options to match:</strong>",t.shuffledMatchingRight.forEach((c,d)=>{const s=document.createElement("div");s.style.marginTop="4px",s.textContent=`${String.fromCharCode(65+d)}. ${c}`,a.appendChild(s)}),o.appendChild(a)}}else(e==="ordering"||e==="ordering")&&t.correctOrder&&(o.innerHTML="<strong>Put in correct order:</strong>",(t.shuffledOrderingItems||t.correctOrder).forEach((c,d)=>{const s=document.createElement("div");s.style.marginTop="8px",s.textContent=`${String.fromCharCode(65+d)}. ${c}`,o.appendChild(s)}))}function ge(){document.getElementById("questionModal").style.display="block",H()}function J(){document.getElementById("questionModal").style.display="none",document.getElementById("modalQuestionText").value="",document.getElementById("modalQuestionType").value="mcq",L=null;const t=document.querySelector("#questionModal h2");t&&(t.textContent="Create Question")}function ye(){const t=document.getElementById("modalQuestionText").value.trim();if(!t){y.error("Please enter question text first");return}const e=document.getElementById("modalQuestionType").value,n=parseInt(document.getElementById("modalTimeLimit").value),r=parseInt(document.getElementById("modalPoints").value);let o={text:t,type:e,timeLimit:n,points:r};if(e==="mcq"||e==="poll"){const c=document.querySelectorAll('#modalQuestionOptions input[type="text"]');o.options=Array.from(c).map(d=>d.value.trim()).filter(d=>d)}else if(e==="matching"){const c=document.querySelectorAll("#modalQuestionOptions .matching-item-input"),d=document.querySelectorAll("#modalQuestionOptions .matching-match-input");o.matching={items:Array.from(c).map(s=>s.value.trim()).filter(s=>s),matches:Array.from(d).map(s=>s.value.trim()).filter(s=>s)}}else if(e==="ordering"){const c=document.querySelectorAll("#modalQuestionOptions .ordering-item-input");o.ordering=Array.from(c).map(d=>d.value.trim()).filter(d=>d)}const a=Z(o);document.getElementById("questionPreviewBody").innerHTML=a,document.getElementById("questionPreviewModal").classList.add("active")}function G(){document.getElementById("questionPreviewModal").classList.remove("active")}window.previewModalQuestion=ye;window.closePreviewModal=G;document.addEventListener("keydown",t=>{if(t.key==="Escape"){const e=document.getElementById("questionPreviewModal");e&&e.classList.contains("active")&&G()}});function he(){document.getElementById("importModal").style.display="block",Ce()}function W(){document.getElementById("importModal").style.display="none",N=null}function H(){const t=document.getElementById("modalQuestionType").value,e=document.getElementById("modalQuestionOptions");switch(t){case"poll":e.innerHTML=`
                        <label>Poll Options (no correct answer - all answers award participation points)</label>
                        <div style="margin-top: 8px;">
                            <input type="text" id="modalOptionA" placeholder="Option A" style="width: 100%; margin-bottom: 8px;">
                        </div>
                        <div style="margin-top: 8px;">
                            <input type="text" id="modalOptionB" placeholder="Option B" style="width: 100%; margin-bottom: 8px;">
                        </div>
                        <div style="margin-top: 8px;">
                            <input type="text" id="modalOptionC" placeholder="Option C" style="width: 100%; margin-bottom: 8px;">
                        </div>
                        <div style="margin-top: 8px;">
                            <input type="text" id="modalOptionD" placeholder="Option D" style="width: 100%;">
                        </div>
                        <small style="display: block; margin-top: 8px; color: var(--text-secondary);">
                            💡 Poll questions have no correct answer. All students who answer receive participation points.
                        </small>
                    `;break;case"mcq":e.innerHTML=`
                        <label>Answer Options (select correct answer)</label>
                        <div style="margin-top: 8px;">
                            <input type="radio" name="modalCorrect" value="A" checked>
                            <input type="text" id="modalOptionA" placeholder="Option A" style="width: calc(100% - 30px); margin-left: 8px;">
                        </div>
                        <div style="margin-top: 8px;">
                            <input type="radio" name="modalCorrect" value="B">
                            <input type="text" id="modalOptionB" placeholder="Option B" style="width: calc(100% - 30px); margin-left: 8px;">
                        </div>
                        <div style="margin-top: 8px;">
                            <input type="radio" name="modalCorrect" value="C">
                            <input type="text" id="modalOptionC" placeholder="Option C" style="width: calc(100% - 30px); margin-left: 8px;">
                        </div>
                        <div style="margin-top: 8px;">
                            <input type="radio" name="modalCorrect" value="D">
                            <input type="text" id="modalOptionD" placeholder="Option D" style="width: calc(100% - 30px); margin-left: 8px;">
                        </div>
                    `;break;case"tf":e.innerHTML=`
                        <label>Correct Answer</label>
                        <div style="margin-top: 8px;">
                            <input type="radio" name="modalTF" value="true" checked> True
                            <input type="radio" name="modalTF" value="false" style="margin-left: 20px;"> False
                        </div>
                    `;break;case"matching":e.innerHTML=`
                        <label>Matching Pairs</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
                            <input type="text" placeholder="Item 1" id="modalMatch1Left">
                            <input type="text" placeholder="Match 1" id="modalMatch1Right">
                            <input type="text" placeholder="Item 2" id="modalMatch2Left">
                            <input type="text" placeholder="Match 2" id="modalMatch2Right">
                            <input type="text" placeholder="Item 3" id="modalMatch3Left">
                            <input type="text" placeholder="Match 3" id="modalMatch3Right">
                        </div>
                    `;break;case"ordering":e.innerHTML=`
                        <label>Items in Correct Order</label>
                        <div style="margin-top: 8px;">
                            <input type="text" placeholder="1st item" id="modalOrder1" style="margin-bottom: 8px;">
                            <input type="text" placeholder="2nd item" id="modalOrder2" style="margin-bottom: 8px;">
                            <input type="text" placeholder="3rd item" id="modalOrder3" style="margin-bottom: 8px;">
                            <input type="text" placeholder="4th item" id="modalOrder4">
                        </div>
                    `;break;case"fillblank":e.innerHTML=`
                        <label>Correct Answer</label>
                        <input type="text" id="modalBlankAnswer" placeholder="Enter the correct answer" style="margin-top: 8px;">
                        <small style="display: block; margin-top: 8px; color: var(--text-secondary);">Use [blank] in your question where the answer should go</small>
                    `;break}}async function fe(){var t;try{const e=((t=x.currentQuestion)==null?void 0:t.questionId)||"current";if(!(await fetch(`https://api-modular.intellaclick.com/api/sessions/${k}/questions/${e}/end`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).ok)throw new Error("Failed to stop question");y.success("Question stopped"),document.getElementById("currentQuestionSection").style.display="none",await F()}catch(e){w.error("Error stopping question:",e),y.error("Failed to stop question")}}async function ve(){var t,e;try{const r=await(await fetch(`https://api-modular.intellaclick.com/api/sessions/code/${T}/responses`)).json();if(!r.success){y.error("Failed to load results");return}const a=await(await fetch(`https://api-modular.intellaclick.com/api/sessions/code/${T}`)).json();console.log("📊 Results data:",{responses:r.responses,responsesByQuestion:r.responsesByQuestion,sessionQuestions:(t=a.session)==null?void 0:t.questions,currentQuestion:(e=a.session)==null?void 0:e.currentQuestion}),document.getElementById("responsesSection").style.display="block",we(r.responses,r.responsesByQuestion,a.session),document.getElementById("responsesSection").scrollIntoView({behavior:"smooth"})}catch(n){console.error("Error fetching results:",n),y.error("Failed to load results")}}function we(t,e,n){var a,c;const r=document.getElementById("responseChart");if(!t||t.length===0){r.innerHTML='<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No responses yet</p>';return}let o="<h3>Session Results Summary</h3>";o+=`<p style="margin-bottom: 20px; color: var(--text-secondary);">Total Responses: ${t.length}</p>`,o+='<div style="padding-bottom: 20px;">';for(const[d,s]of Object.entries(e)){let i=(a=n==null?void 0:n.questions)==null?void 0:a.find(l=>{var p;return((p=l._id)==null?void 0:p.toString())===d||l.questionId===d||l.id===d});if(!i&&(n!=null&&n.questionQueue)&&(i=n.questionQueue.find(l=>{var p;return((p=l._id)==null?void 0:p.toString())===d||l.questionId===d||l.id===d})),!i&&(n!=null&&n.currentQuestion)){const l=n.currentQuestion;(((c=l._id)==null?void 0:c.toString())===d||l.questionId===d||l.id===d)&&(i=l)}if(!i&&s.length>0){const l=t.find(p=>p.questionId===d);l&&(i=l.questionData||l.question||l.questionDetails)}console.log("🔍 Question lookup:",{questionId:d,questionsArray:n==null?void 0:n.questions,questionQueue:n==null?void 0:n.questionQueue,foundQuestion:i,firstResponse:s[0],fullResponse:t.find(l=>l.questionId===d)});const h=(i==null?void 0:i.text)||(i==null?void 0:i.questionText)||"Question text not found",u=(i==null?void 0:i.type)||(i==null?void 0:i.questionType)||"unknown",b=(i==null?void 0:i.options)||[];let m=i==null?void 0:i.correctAnswer;typeof m=="string"&&m.length===1&&m>="A"&&m<="Z"?m=m.charCodeAt(0)-65:u==="boolean"&&typeof m=="string"&&(m==="true"||m==="True"?m=0:(m==="false"||m==="False")&&(m=1)),o+=`
                    <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h4 style="margin-bottom: 16px; word-wrap: break-word;">${h}</h4>
                        <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 12px;">
                            ${s.length} response${s.length!==1?"s":""}
                        </p>
                `;const g={};if(s.forEach(l=>{let p=l.answer;typeof p=="string"&&p.length===1&&p>="A"&&p<="Z"?p=p.charCodeAt(0)-65:u==="boolean"&&(p==="true"||p===!0?p=0:(p==="false"||p===!1)&&(p=1)),g[p]=(g[p]||0)+1}),console.log("📊 Answer counting:",{questionId:d,questionResponses:s,answerCounts:g,options:b,questionType:u}),(u==="multiple_choice"||u==="mcq"||u==="poll"||u==="boolean")&&(o+='<div style="margin-bottom: 20px;">',b.forEach((l,p)=>{const C=g[p]||0,v=Math.round(C/s.length*100)||0,$=(u==="multiple_choice"||u==="mcq")&&m===p;o+=`
                            <div style="margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <span style="font-weight: 500;">
                                        ${l} ${$?'<span style="color: var(--secondary-color);">✓ Correct</span>':""}
                                    </span>
                                    <span style="color: var(--text-secondary);">${C} (${v}%)</span>
                                </div>
                                <div style="background: #E5E7EB; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div style="background: ${$?"var(--secondary-color)":"var(--primary-color)"}; height: 100%; width: ${v}%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                        `}),o+="</div>"),u==="multiple_choice"||u==="mcq")console.log("🔍 MCQ correct answer check:",{questionType:u,correctAnswer:m,options:b,hasCorrectAnswer:m!==void 0,optionAtIndex:b[m]}),m!==void 0&&b[m]&&(o+='<div style="background: #F0FDF4; border-left: 4px solid var(--secondary-color); padding: 12px; margin-bottom: 16px; border-radius: 4px;">',o+='<strong style="color: var(--secondary-color);">Correct Answer:</strong> ',o+=`<span>${b[m]}</span>`,o+="</div>");else if(u==="boolean")console.log("🔍 Boolean correct answer check:",{questionType:u,correctAnswer:m,options:b,hasCorrectAnswer:m!==void 0,optionAtIndex:b[m]}),m!==void 0&&b[m]&&(o+='<div style="background: #F0FDF4; border-left: 4px solid var(--secondary-color); padding: 12px; margin-bottom: 16px; border-radius: 4px;">',o+='<strong style="color: var(--secondary-color);">Correct Answer:</strong> ',o+=`<span>${b[m]}</span>`,o+="</div>");else if(u==="matching"){console.log("🔍 Matching question debug:",{question:i,pairs:i==null?void 0:i.pairs,leftColumn:i==null?void 0:i.leftColumn,rightColumn:i==null?void 0:i.rightColumn,correctPairs:i==null?void 0:i.correctPairs,correctAnswer:i==null?void 0:i.correctAnswer});let l=(i==null?void 0:i.leftColumn)||[];l.length===0&&(i!=null&&i.pairs)&&Array.isArray(i.pairs)&&(l=i.pairs.map(C=>C.left),console.log("📝 Built leftColumn from pairs:",l));const p=(i==null?void 0:i.correctPairs)||(i==null?void 0:i.correctAnswer);if(p){o+='<div style="background: #F0FDF4; border-left: 4px solid var(--secondary-color); padding: 12px; margin-bottom: 16px; border-radius: 4px;">',o+='<strong style="color: var(--secondary-color);">Correct Answer:</strong><br>';const C=Object.entries(p).map(([v,I])=>`${l[parseInt(v)]||v} → ${I}`).join(", ");o+=`<span style="margin-top: 4px; display: block;">${C}</span>`,o+="</div>"}}else u==="ordering"&&(i!=null&&i.correctOrder)?(o+='<div style="background: #F0FDF4; border-left: 4px solid var(--secondary-color); padding: 12px; margin-bottom: 16px; border-radius: 4px;">',o+='<strong style="color: var(--secondary-color);">Correct Order:</strong><br>',o+=`<span style="margin-top: 4px; display: block;">${i.correctOrder.join(", ")}</span>`,o+="</div>"):u==="fill_blank"&&(i!=null&&i.correctAnswer)&&(o+='<div style="background: #F0FDF4; border-left: 4px solid var(--secondary-color); padding: 12px; margin-bottom: 16px; border-radius: 4px;">',o+='<strong style="color: var(--secondary-color);">Correct Answer:</strong><br>',o+=`<span style="margin-top: 4px; display: block;">${i.correctAnswer}</span>`,o+="</div>");o+='<details style="margin-top: 16px;">',o+='<summary style="cursor: pointer; color: var(--primary-color); font-weight: 500;">View individual responses</summary>',o+='<div style="margin-top: 12px; max-height: 300px; overflow-y: auto;">',o+='<table style="width: 100%; border-collapse: collapse;">',o+='<tr style="background: #F9FAFB;"><th style="text-align: left; padding: 8px;">Student</th><th style="text-align: left; padding: 8px;">Answer</th><th style="text-align: left; padding: 8px;">Time</th></tr>',s.forEach(l=>{let p;if(u==="multiple_choice"||u==="mcq"||u==="poll"){let v=l.answer;typeof v=="string"&&v.length===1&&v>="A"&&v<="Z"&&(v=v.charCodeAt(0)-65),p=b[v]||l.answer}else if(u==="boolean")p=l.answer==="true"||l.answer===!0?"True":"False";else if(u==="matching")if(typeof l.answer=="object"&&l.answer!==null){let v=(i==null?void 0:i.leftColumn)||[];v.length===0&&(i!=null&&i.pairs)&&Array.isArray(i.pairs)&&(v=i.pairs.map(I=>I.left)),console.log("🔍 Processing matching answer:",{answer:l.answer,leftColumn:v,participantName:l.participantName}),p=Object.entries(l.answer).map(([I,$])=>{const A=v[parseInt(I)]||I;return console.log(`   Mapping: index=${I}, right=${$}, leftItem=${A}`),`${A} → ${$}`}).join(", ")}else p=JSON.stringify(l.answer);else u==="ordering"&&Array.isArray(l.answer)?p=l.answer.join(", "):p=l.answer;const C=l.submittedAt?new Date(l.submittedAt).toLocaleTimeString():"N/A";o+=`
                        <tr style="border-bottom: 1px solid #E5E7EB;">
                            <td style="padding: 8px;">${l.participantName}</td>
                            <td style="padding: 8px;">${p}</td>
                            <td style="padding: 8px; color: var(--text-secondary);">${C}</td>
                        </tr>
                    `}),o+="</table></div></details>",o+="</div>"}o+="</div>",r.innerHTML=o}async function xe(){var t;if(confirm("Are you sure you want to end this session?"))try{const e=((t=x==null?void 0:x.gamification)==null?void 0:t.enabled)&&(x==null?void 0:x.classId);let n;if(e?(w.debug("Ending session with gamification processing..."),n=await fetch(`https://api-modular.intellaclick.com/api/sessions-gamified/${k}/end-with-gamification`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}})):(w.debug("Ending session (no gamification)..."),n=await fetch(`https://api-modular.intellaclick.com/api/sessions/${k}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({status:"ended"})})),!n.ok)throw new Error("Failed to end session");const r=await n.json();w.debug("Session ended:",r),e&&r.gamificationResults?y.success(`Session ended - ${r.gamificationResults.length} students earned points!`):y.success("Session ended"),V(),setTimeout(()=>window.location.href="classes.html",2e3)}catch(e){w.error("Error ending session:",e),y.error("Failed to end session")}}function be(){R=setInterval(F,3e3)}function V(){R&&clearInterval(R)}function Ie(){const t=`display.html?id=${k}&code=${T}`;window.open(t,"IntellaClickDisplay","width=1920,height=1080,menubar=no,toolbar=no,location=no,status=no")}function Ee(t){U(t,"Join link")}function ke(){const t=document.getElementById("sessionCode").textContent;U(t,"Session code")}function Te(){const t=document.getElementById("modalQuestionText").value.trim(),e=document.getElementById("modalQuestionType").value;if(!t){y.error("Please enter a question");return}const n=parseInt(document.getElementById("modalTimeLimit").value)||60,r=parseInt(document.getElementById("modalPoints").value)||10,o=document.getElementById("modalAwardParticipation").checked;let a={text:t,type:e,timeLimit:n,points:r,awardParticipationPoints:o};switch(e){case"poll":const c=[],d=[];if(["A","B","C","D"].forEach(g=>{const l=document.getElementById(`modalOption${g}`);l&&l.value.trim()&&(c.push(g),d.push(l.value.trim()))}),c.length<2){y.error("Please provide at least 2 options");return}a.type="mcq",a.options=c,a.optionTexts=d,a.awardParticipationPoints=!0;break;case"mcq":const s=[],i=[];let h=null;if(["A","B","C","D"].forEach(g=>{const l=document.getElementById(`modalOption${g}`);if(l&&l.value.trim()){s.push(g),i.push(l.value.trim());const p=document.querySelector(`input[name="modalCorrect"][value="${g}"]`);p&&p.checked&&(h=g)}}),s.length<2){y.error("Please provide at least 2 options");return}a.options=s,a.optionTexts=i,a.correctAnswer=h;break;case"tf":a.options=["True","False"],a.correctAnswer=document.querySelector('input[name="modalTF"]:checked').value;break;case"matching":const u=[];for(let g=1;g<=3;g++){const l=document.getElementById(`modalMatch${g}Left`).value.trim(),p=document.getElementById(`modalMatch${g}Right`).value.trim();l&&p&&u.push({left:l,right:p})}if(u.length<2){y.error("Please provide at least 2 matching pairs");return}a.pairs=u;break;case"ordering":const b=[];for(let g=1;g<=4;g++){const l=document.getElementById(`modalOrder${g}`).value.trim();l&&b.push(l)}if(b.length<2){y.error("Please provide at least 2 items");return}a.correctOrder=b;break;case"fillblank":const m=document.getElementById("modalBlankAnswer").value.trim();if(!m){y.error("Please provide the correct answer");return}if(!t.includes("[blank]")){y.error("Please include [blank] in your question");return}a.correctAnswer=m;break}L!==null?(f[L]=a,L=null,y.success("Question updated")):(f.push(a),y.success("Question added to queue")),O(),J()}async function Ce(){try{const t=await fetch("https://api-modular.intellaclick.com/api/quizzes",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!t.ok)throw new Error("Failed to load quizzes");const n=(await t.json()).quizzes||[],r=document.getElementById("quizList");n.length===0?(r.innerHTML='<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No quizzes found. <a href="saved-questions.html" style="color: var(--primary-color);">Create your first quiz</a></p>',document.getElementById("importBtn").disabled=!0):(r.innerHTML="",n.forEach(o=>{const a=document.createElement("div");a.className="quiz-item",a.innerHTML=`
                            <strong>${o.title}</strong><br>
                            <small style="color: var(--text-secondary);">${o.questionCount||0} questions • ${o.totalPoints||0} points</small>
                        `,a.onclick=()=>Ae(o._id,a),r.appendChild(a)}))}catch(t){w.error("Error loading quizzes:",t);const e=document.getElementById("quizList");e.innerHTML='<p style="color: var(--danger-color); text-align: center; padding: 20px;">Failed to load quizzes. Please try again.</p>'}}function Ae(t,e){N=t,document.querySelectorAll(".quiz-item").forEach(n=>{n.classList.remove("selected")}),e.classList.add("selected"),document.getElementById("importBtn").disabled=!1}async function qe(){if(!N){y.error("Please select a quiz");return}try{const t=await fetch(`https://api-modular.intellaclick.com/api/quizzes/${N}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!t.ok)throw new Error("Failed to load quiz");const e=await t.json(),n=e.quiz||e;n.questions&&n.questions.length>0?(w.debug("📋 Applying question defaults to imported quiz:",Q),n.questions.forEach(r=>{const o=r.questionSnapshot||r,a=o.questionType||o.type||"mcq",c={text:o.questionText||r.text||"",type:a,options:o.options||[],correctAnswer:o.correctAnswer||0,timeLimit:o.timeLimit||r.timeLimit||Q.defaultTimeLimit,points:o.points||r.points||Q.defaultPoints,awardParticipationPoints:Q.defaultAwardParticipation};c.type==="matching"&&o.pairs&&(c.pairs=o.pairs,w.debug("📦 Imported matching question with pairs:",o.pairs)),c.type==="ordering"&&o.correctOrder&&(c.correctOrder=o.correctOrder,w.debug("📦 Imported ordering question with correctOrder:",o.correctOrder)),f.push(c)}),O(),W(),y.success(`Imported ${n.questions.length} questions from ${n.title}`)):y.error("Quiz has no questions")}catch(t){w.error("Error importing quiz:",t),y.error("Failed to import quiz")}}window.onclick=function(t){t.target.className==="modal"&&(t.target.style.display="none")};window.addEventListener("beforeunload",V);window.copySessionCode=ke;window.openDisplayView=Ie;window.showQuestionModal=ge;window.showImportModal=he;window.sendNextQuestion=me;window.stopQuestion=fe;window.showResults=ve;window.loadSession=F;window.endSession=xe;window.closeQuestionModal=J;window.addQuestionToQueue=Te;window.closeImportModal=W;window.importSelectedQuiz=qe;window.copyJoinUrl=Ee;window.updateModalOptions=H;
