import{s as V}from"./toast-93yYkT8V.js";/* empty css               */const T={},X=typeof import.meta<"u"&&(T==null?void 0:T.VITE_API_URL)||"https://api.intellaclick.com/api";function K(){const e=localStorage.getItem("token");return{"Content-Type":"application/json",...e&&{Authorization:`Bearer ${e}`}}}async function Z(e){var t,n,s,a,r;if(!e.ok){if(e.status===401){const d=await e.json().catch(()=>({error:"Authentication failed"}));if(((t=d.error)==null?void 0:t.toLowerCase().includes("token"))||((n=d.error)==null?void 0:n.toLowerCase().includes("expired"))||((s=d.error)==null?void 0:s.toLowerCase().includes("jwt"))||((a=d.message)==null?void 0:a.toLowerCase().includes("token"))||((r=d.message)==null?void 0:r.toLowerCase().includes("expired")))throw localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),alert("Your session has expired. Please log in again."),window.location.href="/login.html",new Error("Session expired. Please log in again.")}const o=await e.json().catch(()=>({error:"Request failed"}));console.error("API Error Response:",{status:e.status,statusText:e.statusText,url:e.url,errorData:o});let i=o.error||o.message||`HTTP ${e.status}`;throw(i.includes("E11000")||i.includes("duplicate key"))&&(i.includes("code_1")||i.includes("code:")?i="A class with this code already exists. Please use a different class code.":i="This record already exists in the database."),new Error(i)}return e.json()}async function p(e,t={}){const n=`${X}${e}`,s={...t,headers:{...K(),...t.headers}};try{const a=await fetch(n,s);return await Z(a)}catch(a){throw console.error(`API Error [${e}]:`,a),a}}const ee={async login(e,t){return p("/auth/login",{method:"POST",body:JSON.stringify({email:e,password:t})})},async register(e){return p("/auth/register",{method:"POST",body:JSON.stringify(e)})},async getMe(){return p("/auth/me")}},B={async getAll(e={}){const t=new URLSearchParams(e).toString();return p(`/classes${t?`?${t}`:""}`)},async getById(e){return p(`/classes/${e}`)},async create(e){return p("/classes",{method:"POST",body:JSON.stringify(e)})},async update(e,t){return p(`/classes/${e}`,{method:"PUT",body:JSON.stringify(t)})},async delete(e,t={}){const n=new URLSearchParams(t).toString();return p(`/classes/${e}${n?`?${n}`:""}`,{method:"DELETE"})},async archive(e){return p(`/classes/${e}/archive`,{method:"POST"})},async getStudents(e){return p(`/classes/${e}/students`)}};let E=null;function te(){E||(E=document.createElement("div"),E.id="toast-container",E.style.cssText=`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    max-width: calc(100vw - 40px);
  `,document.body.appendChild(E))}function $(e,t="info",n=3e3){te();const s=document.createElement("div");s.className=`toast toast-${t}`;const a={success:"✓",error:"✗",warning:"⚠",info:"ℹ"},r={success:"#10B981",error:"#EF4444",warning:"#F59E0B",info:"#3B82F6"};s.innerHTML=`
    <div style="
      background: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 250px;
      max-width: min(400px, calc(100vw - 60px));
      pointer-events: auto;
      border-left: 4px solid ${r[t]};
      animation: slideIn 0.3s ease-out;
    ">
      <span style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${r[t]};
        color: white;
        font-weight: bold;
        flex-shrink: 0;
      ">${a[t]}</span>
      <span style="color: #374151; font-size: 14px; word-wrap: break-word; overflow-wrap: break-word;">${e}</span>
    </div>
  `,E.appendChild(s),setTimeout(()=>{s.style.animation="slideOut 0.3s ease-out",setTimeout(()=>s.remove(),300)},n)}function ne(e){$(e,"success")}function oe(e){$(e,"error",4e3)}function se(e){$(e,"warning")}function ae(e){$(e,"info")}if(!document.getElementById("toast-animations")){const e=document.createElement("style");e.id="toast-animations",e.textContent=`
    @keyframes slideIn {
      from {
        transform: translateX(400px) translateY(0);
        opacity: 0;
      }
      to {
        transform: translateX(0) translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px) translateY(0);
        opacity: 0;
      }
    }
  `,document.head.appendChild(e)}const m={show:$,success:ne,error:oe,warning:se,info:ae},C={ERROR:0,WARN:1,INFO:2,DEBUG:3},O=typeof import.meta<"u"&&"production"||"production",S=O==="production"?C.WARN:C.DEBUG,F=O!=="production";function j(e,t=null,n={}){if(C.ERROR<=S){const a={level:"ERROR",timestamp:new Date().toISOString(),message:e,context:n,...t&&{error:t.message,stack:t.stack}};return console.error("[ERROR]",e,t||"",n),F||V(e),a}}function re(e,t={}){if(C.WARN<=S){const s={level:"WARN",timestamp:new Date().toISOString(),message:e,context:t};return F&&console.warn("[WARN]",e,t),s}}function Y(e,t={}){C.INFO<=S&&F&&console.info("[INFO]",e,t)}function A(e,t=null){C.DEBUG<=S&&F&&console.log("[DEBUG]",e,t||"")}function ie(e,t,n=null){A(`API ${e} ${t}`,n)}function le(e,t,n,s=null){n>=400?j(`API ${e} ${t} failed with status ${n}`,null,{data:s}):A(`API ${e} ${t} succeeded (${n})`,s)}function de(e,t={}){Y(`User action: ${e}`,t)}const l={error:j,warn:re,info:Y,debug:A,apiRequest:ie,apiResponse:le,userAction:de};let g=null,x=0;function ce(){if(!g&&(g=document.createElement("div"),g.id="loading-overlay",g.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `,g.innerHTML=`
    <div style="
      background: white;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    ">
      <div class="spinner"></div>
      <div id="loading-message" style="
        color: #374151;
        font-size: 16px;
        font-weight: 500;
      ">Loading...</div>
    </div>
  `,document.body.appendChild(g),!document.getElementById("spinner-styles"))){const e=document.createElement("style");e.id="spinner-styles",e.textContent=`
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #E5E7EB;
        border-top: 4px solid #3B82F6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .btn-loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }

      .btn-loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
    `,document.head.appendChild(e)}}function U(e="Loading..."){ce(),x++;const t=document.getElementById("loading-message");t&&(t.textContent=e),g.style.display="flex"}function J(){g&&(x=Math.max(0,x-1),x===0&&(g.style.display="none"))}function ue(){g&&(x=0,g.style.display="none")}function R(e,t){e&&(t?(e.dataset.originalText=e.textContent,e.classList.add("btn-loading"),e.disabled=!0):(e.classList.remove("btn-loading"),e.disabled=!1,e.dataset.originalText&&(e.textContent=e.dataset.originalText,delete e.dataset.originalText)))}async function me(e,t="Loading..."){U(t);try{return await e()}finally{J()}}async function fe(e,t){R(e,!0);try{return await t()}finally{R(e,!1)}}function ge(e){if(!e)return;const t=document.createElement("div");t.className="inline-spinner",t.style.cssText=`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `,t.innerHTML='<div class="spinner"></div>',e.innerHTML="",e.appendChild(t)}const v={show:U,hide:J,forceHide:ue,setButton:R,withLoading:me,withButtonLoading:fe,showInline:ge};let _=null,h=[];document.addEventListener("DOMContentLoaded",function(){we(),ye(),b(),I(),Ie(),pe()});function ye(){const e=document.getElementById("yearFilter"),t=new Date().getFullYear();for(let n=t+5;n>=t-2;n--){const s=document.createElement("option");s.value=n,s.textContent=n,e.appendChild(s)}}function pe(){const e=document.getElementById("termYear"),t=new Date().getFullYear();for(let n=t-2;n<=t+5;n++){const s=document.createElement("option");s.value=n,s.textContent=n,n===t&&(s.selected=!0),e.appendChild(s)}}function q(){H(),b(),I()}function he(){document.getElementById("yearFilter").value="",document.getElementById("semesterFilter").value="",document.getElementById("statusFilter").value="active",document.getElementById("classFilter").value="",document.getElementById("classFilter").style.display="none",q()}function H(){const e=document.getElementById("statusFilter").value,t=document.getElementById("classFilter");e?(t.style.display="block",ve()):(t.style.display="none",t.value="")}function ve(){const e=document.getElementById("classFilter"),t=document.getElementById("yearFilter").value,n=document.getElementById("semesterFilter").value,s=document.getElementById("statusFilter").value;let a=h.filter(o=>{if(o.status==="deleted"||s&&o.status!==s)return!1;if(t||n){const[i,d]=o.term.split(" ");if(t&&d!==t||n&&i!==n)return!1}return!0});const r=e.value;e.innerHTML='<option value="">All Classes</option>',a.forEach(o=>{const i=document.createElement("option");i.value=o._id,i.textContent=`${o.name} (${o.code})`,o._id===r&&(i.selected=!0),e.appendChild(i)})}function we(){var s;const e=localStorage.getItem("token"),t=JSON.parse(localStorage.getItem("user")||"{}");if(!e||!t.id){window.location.href="login.html";return}l.debug("Current user",t),l.debug("User role",t.role),l.debug("Token exists",!!e);const n=["instructor","admin","teacher","professor","faculty","teaching_assistant","user"];if(!n.includes((s=t.role)==null?void 0:s.toLowerCase())){l.error("Invalid user role",null,{role:t.role,allowedRoles:n}),alert(`Access denied. Your role is '${t.role}' but instructor privileges are required. Allowed roles: ${n.join(", ")}`),setTimeout(()=>{window.location.href="dashboard.html"},3e3);return}_=t,W(t),Ce()}function W(e){var n;const t=document.getElementById("userName");if(t){const s=e.name||(e.firstName&&e.lastName?`${e.firstName} ${e.lastName}`:"")||e.firstName||((n=e.email)==null?void 0:n.split("@")[0])||"Instructor";t.textContent=s}}function Ee(){window.confirm("Are you sure you want to logout?")&&(localStorage.removeItem("token"),localStorage.removeItem("user"),localStorage.removeItem("refreshToken"),window.location.href="login.html")}async function Ce(){try{const e=await ee.getMe();e.user&&(localStorage.setItem("user",JSON.stringify(e.user)),_=e.user,W(e.user),l.debug("Updated user profile",e.user))}catch(e){l.error("Failed to fetch user profile",e)}}function Ie(){const e=document.getElementById("classForm");l.debug("🔵 setupEventListeners called"),console.log("🔵 Form element found:",!!e),e?(e.addEventListener("submit",$e),l.debug("🔵 Submit event listener attached to form"),console.log("🔵 Submit handler attached")):(l.error("🔴 classForm element not found!"),console.error("🔴 classForm element not found!")),document.getElementById("classModal").addEventListener("click",function(t){t.target===this&&k("classModal")})}async function I(){try{const e=document.getElementById("yearFilter").value,t=document.getElementById("semesterFilter").value,n=document.getElementById("statusFilter").value,s=document.getElementById("classFilter").value;let a=h.filter(c=>{if(c.status==="deleted"||n&&c.status!==n||s&&c._id!==s)return!1;if(e||t){const[u,f]=c.term.split(" ");if(e&&f!==e||t&&u!==t)return!1}return!0});const r=a.length,o=a.reduce((c,u)=>{var f;return c+(((f=u.enrollmentSummary)==null?void 0:f.totalEnrolled)||0)},0),i=a.reduce((c,u)=>{var f;return c+(((f=u.stats)==null?void 0:f.sessionCount)||0)},0);let d=0,y=0;a.forEach(c=>{var f,M,N,P,D;const u=((f=c.enrollmentSummary)==null?void 0:f.avgAttendance)||((M=c.stats)==null?void 0:M.avgAttendance)||((N=c.stats)==null?void 0:N.avgParticipation);if(u)d+=u,y++;else if(((P=c.stats)==null?void 0:P.sessionCount)>0&&((D=c.enrollmentSummary)==null?void 0:D.totalEnrolled)>0){const L=(c.stats.totalParticipants||0)/(c.stats.sessionCount*c.enrollmentSummary.totalEnrolled)*100;!isNaN(L)&&L>0&&(d+=L,y++)}});const w=y>0?Math.round(d/y):0;document.getElementById("totalClasses").textContent=r,document.getElementById("totalStudents").textContent=o,document.getElementById("totalSessions").textContent=i,document.getElementById("avgEngagement").textContent=`${w}%`}catch(e){l.error("Failed to load stats",e)}}async function b(){v.show("Loading classes...");try{h=(await B.getAll({includeArchived:"true"})).classes||[],h=h.map(t=>(typeof t.instructorId=="object"&&t.instructorId._id?t.instructorIdRaw=t.instructorId._id:t.instructorIdRaw=t.instructorId,t)),l.debug("Loaded classes",{count:h.length,classes:h.map(t=>({name:t.name,instructorId:t.instructorIdRaw}))}),H(),be(),I()}catch(e){l.error("Failed to load classes",e),m.error("Failed to load classes")}finally{v.hide()}}function be(){const e=document.getElementById("classesContainer"),t=document.getElementById("yearFilter").value,n=document.getElementById("semesterFilter").value,s=document.getElementById("statusFilter").value,a=document.getElementById("classFilter").value;let r=h.filter(o=>{if(o.status==="deleted"||s&&o.status!==s||a&&o._id!==a)return!1;if(t||n){const[i,d]=o.term.split(" ");if(t&&d!==t||n&&i!==n)return!1}return!0});if(r.length===0){const o=h.length>0;e.innerHTML=`
                    <div class="empty-state">
                        <h3>${o?"No classes match your filters":"No classes yet"}</h3>
                        <p>${o?"Try adjusting your filters to see more classes":"Create your first class to start engaging with students"}</p>
                        ${o?'<button class="btn btn-secondary" onclick="clearFilters()">Clear Filters</button>':'<button class="btn btn-primary" onclick="showCreateClassModal()">Create Your First Class</button>'}
                    </div>
                `;return}e.innerHTML=r.map(o=>{var u;const i=o.stats||{},d=o.enrollmentSummary||{},y=d.totalEnrolled||i.enrolledCount||0,w=d.pending||i.pendingCount||0,c=o.status==="archived";return`
                    <div class="class-card">
                        <div class="class-card-header">
                            <h3>${o.name}</h3>
                            <p>${o.code}${o.section?` - Section ${o.section}`:""}</p>
                        </div>

                        <div class="class-card-body">
                            <div class="class-info">
                                <div class="class-info-item">
                                    <i>📅</i>
                                    <span>${o.term}</span>
                                </div>
                                <div class="class-info-item">
                                    <i>🕒</i>
                                    <span>${xe(o.schedule)}</span>
                                </div>
                                ${(u=o.schedule)!=null&&u.location?`
                                    <div class="class-info-item">
                                        <i>📍</i>
                                        <span>${o.schedule.location}</span>
                                    </div>
                                `:""}
                            </div>

                            ${o.joinCode?`
                                <div class="join-code-section">
                                    <div class="join-code-label">Join Code</div>
                                    <div class="join-code-display">
                                        <span class="join-code-text">${o.joinCode}</span>
                                        <button class="copy-btn" onclick="copyJoinCode(event, '${o.joinCode}')">
                                            Copy
                                        </button>
                                        <button class="qr-btn" onclick="showQRCode(event, '${o.joinCode}', '${o.name}')">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                            </svg>
                                            QR Code
                                        </button>
                                    </div>
                                </div>
                            `:""}

                            <div class="enrollment-stats">
                                <div class="enrollment-stat">
                                    <div class="enrollment-stat-number">${y}</div>
                                    <div class="enrollment-stat-label">Enrolled</div>
                                </div>
                                <div class="enrollment-stat">
                                    <div class="enrollment-stat-number">${w}</div>
                                    <div class="enrollment-stat-label">Pending</div>
                                </div>
                                <div class="enrollment-stat">
                                    <div class="enrollment-stat-number">${i.sessionCount||0}</div>
                                    <div class="enrollment-stat-label">Sessions</div>
                                </div>
                            </div>

                            <div style="background: #f3f4f6; padding: 8px; border-radius: 4px; margin-bottom: 16px; font-size: 11px; color: #666; font-family: monospace;">
                                <strong>Class ID:</strong> <span style="user-select: all;">${o._id}</span>
                                <button class="copy-btn" style="float: right; font-size: 10px; padding: 2px 8px;" onclick="copyText(event, '${o._id}')">Copy ID</button>
                            </div>

                            <div class="class-actions">
                                <button class="btn btn-secondary" onclick="manageRoster(event, '${o._id}')">
                                    Manage Roster
                                </button>
                                <button class="btn btn-primary" onclick="startSession(event, '${o._id}')">
                                    Start Session
                                </button>
                                <button class="btn btn-secondary" onclick="viewAnalytics(event, '${o._id}')">
                                    Analytics
                                </button>
                                <button class="btn btn-secondary" onclick="editClass(event, '${o._id}')">
                                    Settings
                                </button>
                                ${c?`
                                    <button class="btn btn-danger" onclick="deleteClassPermanently(event, '${o._id}', '${o.name.replace(/'/g,"\\'")}')">
                                        Permanently Delete
                                    </button>
                                `:`
                                    <button class="btn btn-secondary" onclick="archiveClass(event, '${o._id}', '${o.name.replace(/'/g,"\\'")}')">
                                        Archive
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join("")}function xe(e){if(!e||!e.days||e.days.length===0)return"Schedule not set";const t={monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat",sunday:"Sun"},n=e.days.map(a=>t[a.toLowerCase()]||a).join(", "),s=e.startTime&&e.endTime?` ${e.startTime} - ${e.endTime}`:"";return n+s}function Be(){document.getElementById("modalTitle").textContent="Create New Class",document.getElementById("classForm").reset();const e=new Date,t=new Date(e);t.setMonth(t.getMonth()+4),document.getElementById("startDate").valueAsDate=e,document.getElementById("endDate").valueAsDate=t,G("classModal")}async function $e(e){e.preventDefault(),l.debug("🔵 handleCreateClass called"),console.log("🔵 Form submission triggered");const t=document.getElementById("termSeason").value,n=document.getElementById("termYear").value,s=document.getElementById("customJoinCode").value.trim(),a=document.getElementById("enrollmentLimit").value.trim(),r={name:document.getElementById("className").value,code:document.getElementById("classCode").value,section:document.getElementById("classSection").value,term:`${t} ${n}`,description:document.getElementById("classDescription").value,startDate:document.getElementById("startDate").value,endDate:document.getElementById("endDate").value};s&&(r.customJoinCode=s),a&&(r.enrollmentLimit=parseInt(a,10)),l.debug("Creating class",r),console.log("Form data:",r),v.show("Creating class...");try{const o=await B.create(r);l.info("Class created successfully",{className:r.name}),m.success("Class created successfully!"),k("classModal"),b(),I()}catch(o){l.error("Failed to create class",o,{formData:r}),m.error(o.message||"Failed to create class")}finally{v.hide()}}function Se(e,t){e.stopPropagation(),Q(e,t,"Join code")}function Q(e,t,n="Text"){e.stopPropagation(),navigator.clipboard.writeText(t).then(()=>{m.success(`${n} copied to clipboard!`)}).catch(()=>{const s=document.createElement("textarea");s.value=t,document.body.appendChild(s),s.select(),document.execCommand("copy"),document.body.removeChild(s),m.success(`${n} copied!`)})}function Fe(e,t){e.stopPropagation(),window.location.href=`roster.html?id=${t}`}function Le(e,t){return e.preventDefault(),e.stopPropagation(),window.location.href=`create-session.html?classId=${t}`,!1}function Te(e,t){return e.preventDefault(),e.stopPropagation(),window.location.href=`analytics.html?classId=${t}`,!1}function Re(e,t){return e.preventDefault(),e.stopPropagation(),Ae(t),!1}function Ae(e){const t=h.find(o=>o._id===e);if(!t)return;const n=document.getElementById("editTermYear");n.innerHTML='<option value="">Select Year</option>';const s=new Date().getFullYear();for(let o=s-2;o<=s+5;o++){const i=document.createElement("option");i.value=o,i.textContent=o,n.appendChild(i)}const[a,r]=t.term?t.term.split(" "):["",""];document.getElementById("editClassName").value=t.name,document.getElementById("editClassCode").value=t.code,document.getElementById("editClassSection").value=t.section||"",document.getElementById("editTermSeason").value=a,document.getElementById("editTermYear").value=r,document.getElementById("editClassDescription").value=t.description||"",document.getElementById("editStartDate").value=t.startDate?t.startDate.split("T")[0]:"",document.getElementById("editEndDate").value=t.endDate?t.endDate.split("T")[0]:"",document.getElementById("editCustomJoinCode").value="",document.getElementById("editEnrollmentLimit").value=t.enrollmentLimit||"",document.getElementById("editClassId").value=e,document.getElementById("editClassModal").classList.add("show")}async function ke(e){e.preventDefault();const t=document.getElementById("editClassId").value,n=document.getElementById("editClassName").value.trim(),s=document.getElementById("editClassCode").value.trim(),a=document.getElementById("editClassSection").value.trim(),r=document.getElementById("editTermSeason").value,o=document.getElementById("editTermYear").value,i=document.getElementById("editClassDescription").value.trim(),d=document.getElementById("editStartDate").value,y=document.getElementById("editEndDate").value,w=document.getElementById("editCustomJoinCode").value.trim(),c=document.getElementById("editEnrollmentLimit").value.trim();if(!n||!s||!r||!o||!d||!y){m.error("Please fill in all required fields");return}const u={name:n,code:s,section:a,term:`${r} ${o}`,description:i,startDate:d,endDate:y};w&&(u.joinCode=w),u.enrollmentLimit=c?parseInt(c,10):null,v.show("Updating class...");try{await B.update(t,u),l.info("Class updated successfully",{classId:t,className:u.name}),m.success("Class updated successfully!"),z(),b()}catch(f){l.error("Failed to update class",f,{classId:t,updateData:u}),m.error("Failed to update class")}finally{v.hide()}}function z(){document.getElementById("editClassModal").classList.remove("show")}async function Me(e,t,n){if(e.stopPropagation(),!!window.confirm(`Are you sure you want to archive "${n}"?

Archived classes can still be viewed in the "Archived" filter.`)){v.show("Archiving class...");try{const a=JSON.parse(localStorage.getItem("user")||"{}");l.debug("Archiving class",{classId:t,className:n,userId:a.id,userRole:a.role}),await B.archive(t),l.info("Class archived successfully",{classId:t,className:n}),m.success("Class archived successfully"),b(),I()}catch(a){l.error("Failed to archive class",a,{classId:t,className:n}),m.error(a.message||"Failed to archive class")}finally{v.hide()}}}async function Ne(e,t,n){if(e.stopPropagation(),!(!window.confirm(`⚠️ PERMANENT DELETE WARNING ⚠️

Are you sure you want to PERMANENTLY delete "${n}"?

This action CANNOT be undone. All student data, sessions, and records will be permanently removed.

Click OK only if you are absolutely certain.`)||!window.confirm(`Final confirmation:

Delete "${n}" permanently?`))){v.show("Permanently deleting class...");try{const r=JSON.parse(localStorage.getItem("user")||"{}");l.debug("Permanently deleting class",{classId:t,className:n,userId:r.id,userRole:r.role}),await B.delete(t,{force:"true"}),l.info("Class permanently deleted",{classId:t,className:n}),m.success("Class permanently deleted"),b(),I()}catch(r){l.error("Failed to permanently delete class",r,{classId:t,className:n}),m.error(r.message||"Failed to permanently delete class")}finally{v.hide()}}}function G(e){document.getElementById(e).classList.add("show")}function k(e){document.getElementById(e).classList.remove("show")}function Pe(e,t,n){e.stopPropagation(),e.preventDefault();const s=document.getElementById("qrModal"),a=document.getElementById("qrCodeContainer"),r=document.getElementById("qrJoinCode"),o=document.getElementById("qrJoinUrl"),i=document.getElementById("qrClassName");a.innerHTML="",i.textContent=n,r.textContent=t;const d=`https://join.intellaclick.com/join-class?code=${t}`;o.textContent=d,new QRCode(a,{text:d,width:256,height:256,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H}),s.classList.add("active"),o.onclick=function(){navigator.clipboard.writeText(d).then(()=>{m.info("URL copied to clipboard!")})}}function De(){document.getElementById("qrModal").classList.remove("active")}window.handleLogout=Ee;window.showCreateClassModal=Be;window.applyFilters=q;window.clearFilters=he;window.copyJoinCode=Se;window.copyText=Q;window.showQRCode=Pe;window.closeQRModal=De;window.manageRoster=Fe;window.startSession=Le;window.viewAnalytics=Te;window.editClass=Re;window.archiveClass=Me;window.deleteClassPermanently=Ne;window.showModal=G;window.hideModal=k;window.closeEditClassModal=z;window.saveClassEdits=ke;
