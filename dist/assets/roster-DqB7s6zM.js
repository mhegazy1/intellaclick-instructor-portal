import"./toast-93yYkT8V.js";import{l as i}from"./logger-gSLuc3Ra.js";import{l as g}from"./loading-CWfhFw7n.js";let l,d,c=[],f=null,p=null,m="active";function k(){localStorage.getItem("token")||(window.location.href="login.html")}document.addEventListener("DOMContentLoaded",function(){if(l=new URLSearchParams(window.location.search).get("id"),!l){window.location.href="classes.html";return}k(),L(),u(),B()});function B(){const t=document.getElementById("fileUpload"),o=document.getElementById("fileInput");t.addEventListener("click",()=>o.click()),o.addEventListener("change",A),t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("dragover")}),t.addEventListener("dragleave",()=>{t.classList.remove("dragover")}),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("dragover");const e=n.dataTransfer.files;e.length>0&&y(e[0])})}async function L(){try{i.info("Loading class data for classId:",l);const t=await fetch(`https://api-modular.intellaclick.com/api/classes/${l}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(i.info("Class API response status:",t.status),!t.ok)throw new Error("Failed to load class data");const o=await t.json();i.info("Class API data received:",o),d=o.class,i.info("Class data extracted:",d),document.getElementById("className").textContent=d.name,document.getElementById("classCode").textContent=`${d.code}${d.section?" - "+d.section:""}`,document.getElementById("classTerm").textContent=d.term,document.getElementById("joinCode").textContent=d.joinCode||"N/A",i.info("UI updated successfully")}catch(t){i.error("Failed to load class data",t),a("Failed to load class data","error")}}async function u(){var t;g.show("Loading roster...");try{i.debug("Loading enrollments",{classId:l});const o=await fetch(`https://api-modular.intellaclick.com/api/classes/${l}/students`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(i.debug("Enrollment response",{status:o.status}),!o.ok){const e=await o.json();throw i.error("Enrollment API error",null,e),new Error(e.error||"Failed to load enrollments")}const n=await o.json();i.debug("Enrollment data loaded",{studentCount:((t=n.students)==null?void 0:t.length)||0}),c=(n.students||[]).map(e=>({_id:e.enrollmentId,student:{_id:e.studentId,firstName:e.firstName||"",lastName:e.lastName||"",email:e.email||""},status:e.status,stats:e.stats||{},enrolledAt:e.enrolledAt,enrollmentMethod:e.enrollmentMethod,academicInfo:e.academicInfo||{},permissions:e.permissions||{}})),b(),v()}catch(o){i.error("Failed to load enrollments",o),a("Failed to load student roster: "+o.message,"error"),document.getElementById("rosterTableBody").innerHTML=`
                    <tr>
                        <td colspan="5" class="empty-state">
                            <h3>Failed to load roster</h3>
                            <p>${o.message}</p>
                            <button class="btn btn-primary" onclick="loadEnrollments()">Try Again</button>
                        </td>
                    </tr>
                `}finally{g.hide()}}function b(){const o={total:c.filter(s=>s.status!=="dropped"&&s.status!=="withdrawn").length,enrolled:c.filter(s=>s.status==="enrolled").length,pending:c.filter(s=>s.status==="pending").length,invited:c.filter(s=>s.status==="invited").length};document.getElementById("totalStudents").textContent=o.total,document.getElementById("enrolledCount").textContent=o.enrolled,document.getElementById("pendingCount").textContent=o.pending,document.getElementById("invitedCount").textContent=o.invited;const n=c.filter(s=>{var r;return((r=s.stats)==null?void 0:r.attendanceRate)!==void 0}).map(s=>s.stats.attendanceRate),e=n.length>0?Math.round(n.reduce((s,r)=>s+r,0)/n.length):0;document.getElementById("avgAttendance").textContent=`${e}%`}function v(){const t=document.getElementById("rosterTableBody"),o=document.getElementById("searchInput").value.toLowerCase();let n=c;if(m==="active"?n=n.filter(e=>e.status!=="dropped"&&e.status!=="withdrawn"):m==="dropped"?n=n.filter(e=>e.status==="dropped"||e.status==="withdrawn"):m!=="all"&&(n=n.filter(e=>e.status===m)),o&&(n=n.filter(e=>{const s=`${e.student.firstName} ${e.student.lastName}`.toLowerCase(),r=e.student.email.toLowerCase();return s.includes(o)||r.includes(o)})),n.length===0){t.innerHTML=`
                    <tr>
                        <td colspan="5" class="empty-state">
                            <h3>No students found</h3>
                            <p>${m==="all"?"Upload a roster or invite students to get started":"No students match the current filter"}</p>
                        </td>
                    </tr>
                `;return}t.innerHTML=n.map(e=>{const s=e.student,r=e.stats||{},$=r.attendanceRate||0,S=r.questionsAnswered>0?Math.round(r.correctAnswers/r.questionsAnswered*100):0;return`
                    <tr>
                        <td>
                            <div class="student-name">${s.firstName} ${s.lastName}</div>
                            <div class="student-email">${s.email}</div>
                        </td>
                        <td>
                            <span class="status-badge ${e.status}">
                                ${e.status.charAt(0).toUpperCase()+e.status.slice(1)}
                            </span>
                        </td>
                        <td>
                            <div class="student-stats">
                                <span>${$}% (${r.sessionsAttended||0} sessions)</span>
                            </div>
                        </td>
                        <td>
                            <div class="student-stats">
                                <span>${S}% (${r.questionsAnswered||0} questions)</span>
                            </div>
                        </td>
                        <td>
                            <div class="student-actions">
                                ${e.status==="pending"?`
                                    <button class="action-btn" onclick="approveStudent('${e._id}')">
                                        Approve
                                    </button>
                                `:""}
                                ${e.status==="invited"?`
                                    <button class="action-btn" onclick="resendInvite('${e._id}')">
                                        Resend
                                    </button>
                                `:""}
                                <button class="action-btn" onclick="viewStudent('${s._id}')">
                                    View
                                </button>
                                <button class="action-btn" onclick="removeStudent('${e._id}')">
                                    ${e.status==="dropped"||e.status==="withdrawn"?"Delete":"Remove"}
                                </button>
                            </div>
                        </td>
                    </tr>
                `}).join("")}function C(t){m=t,document.querySelectorAll(".filter-tab").forEach(o=>{o.classList.remove("active");const n=o.textContent.toLowerCase();(t==="active"&&n==="active"||t==="enrolled"&&n==="enrolled"||t==="pending"&&n==="pending"||t==="invited"&&n==="invited"||t==="dropped"&&n==="dropped")&&o.classList.add("active")}),v()}function F(){h("uploadModal")}function A(t){const o=t.target.files[0];o&&y(o)}async function y(t){if(!t.name.endsWith(".csv")){a("Please upload a CSV file","error");return}const o=new FormData;o.append("roster",t);try{const n=await fetch(`https://api-modular.intellaclick.com/api/classes/${l}/upload-roster`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:o}),e=await n.json();if(!n.ok)throw new Error(e.error||"Failed to process roster");f=e,T(e)}catch(n){i.error("Failed to upload roster file",n),a(n.message||"Failed to upload roster","error")}}function T(t){const o=document.getElementById("uploadResults"),n=document.getElementById("confirmUpload");o.innerHTML=`
                <h3>Upload Results</h3>
                <p><strong>Total rows:</strong> ${t.totalRows}</p>
                <p><strong>Matched students:</strong> ${t.matchedStudents}</p>
                <p><strong>New students to invite:</strong> ${t.newStudents}</p>
                
                ${t.duplicates>0?`
                    <p style="color: var(--warning-color);">
                        <strong>Duplicates skipped:</strong> ${t.duplicates}
                    </p>
                `:""}
                
                ${t.errors&&t.errors.length>0?`
                    <div style="margin-top: 16px;">
                        <p style="color: var(--danger-color);"><strong>Errors:</strong></p>
                        <ul style="margin-left: 20px; color: var(--danger-color);">
                            ${t.errors.map(e=>`<li>${e}</li>`).join("")}
                        </ul>
                    </div>
                `:""}
            `,o.style.display="block",(t.matchedStudents>0||t.newStudents>0)&&(n.style.display="inline-flex")}async function M(){if(f)try{const t=await fetch(`https://api-modular.intellaclick.com/api/classes/${l}/confirm-roster`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({uploadId:f.uploadId})}),o=await t.json();if(!t.ok)throw new Error(o.error||"Failed to confirm roster");a("Roster uploaded successfully!","success"),w("uploadModal"),u(),f=null,document.getElementById("fileInput").value="",document.getElementById("uploadResults").style.display="none",document.getElementById("confirmUpload").style.display="none"}catch(t){i.error("Failed to confirm roster",t),a(t.message||"Failed to confirm roster","error")}}function x(){h("inviteModal")}async function R(){const t=document.getElementById("inviteEmails").value,o=document.getElementById("inviteMessage").value;if(!t.trim()){a("Please enter at least one email address","error");return}const n=t.split(/[\n,]/).map(e=>e.trim()).filter(e=>e.length>0);try{const e=await fetch(`https://api-modular.intellaclick.com/api/classes/${l}/invite`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({emails:n,customMessage:o})}),s=await e.json();if(!e.ok)throw new Error(s.error||"Failed to send invitations");a(`Successfully sent ${s.sent} invitations`,"success"),w("inviteModal"),u(),document.getElementById("inviteEmails").value="",document.getElementById("inviteMessage").value=""}catch(e){i.error("Failed to send invitations",e),a(e.message||"Failed to send invitations","error")}}async function D(t){try{if(!(await fetch(`https://api-modular.intellaclick.com/api/enrollment/${t}/approve`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).ok)throw new Error("Failed to approve student");a("Student approved successfully","success"),u()}catch(o){i.error("Failed to approve student",o),a("Failed to approve student","error")}}async function U(t){if(window.confirm("Are you sure you want to remove this student from the class?"))try{if(!(await fetch(`https://api-modular.intellaclick.com/api/enrollment/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).ok)throw new Error("Failed to remove student");a("Student removed successfully","success"),u()}catch(o){i.error("Failed to remove student",o),a("Failed to remove student","error")}}async function N(t){try{if(!(await fetch(`https://api-modular.intellaclick.com/api/enrollment/${t}/resend-invite`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).ok)throw new Error("Failed to resend invitation");a("Invitation resent successfully","success")}catch(o){i.error("Failed to resend invitation",o),a("Failed to resend invitation","error")}}function O(t){window.location.href=`student-profile.html?id=${t}&classId=${l}`}async function j(){try{const t=await fetch(`https://api-modular.intellaclick.com/api/classes/${l}/export-roster`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!t.ok)throw new Error("Failed to export roster");const o=await t.blob(),n=window.URL.createObjectURL(o),e=document.createElement("a");e.href=n,e.download=`${d.code}_roster_${new Date().toISOString().split("T")[0]}.csv`,document.body.appendChild(e),e.click(),document.body.removeChild(e),window.URL.revokeObjectURL(n),a("Roster exported successfully","success")}catch(t){i.error("Failed to export roster",t),a("Failed to export roster","error")}}function h(t){document.getElementById(t).classList.add("show")}function w(t){document.getElementById(t).classList.remove("show")}function a(t,o="success"){const n=document.getElementById("toast");n.className=`toast ${o}`,n.textContent=t,n.classList.add("show"),setTimeout(()=>{n.classList.remove("show")},3e3)}function P(t,o){const n=document.getElementById("enrollmentLimitDialog"),e=document.getElementById("enrollmentLimitMessage"),s=`This class has reached its enrollment limit of ${t.limit} students (currently ${t.currentEnrollment} enrolled). Do you want to override the limit and add the student anyway?`;e.textContent=s,p=o,n.classList.add("show")}function E(){document.getElementById("enrollmentLimitDialog").classList.remove("show"),p=null}function z(){p&&(p(),E())}async function I(t,o={}){const n=o.override||!1,e=`https://api-modular.intellaclick.com/api/classes/${l}/students/add${n?"?override=true":""}`;try{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({email:t,sendInvitation:o.sendInvitation!==!1})}),r=await s.json();if(!s.ok){if(r.canOverride&&!n)return P(r,()=>{I(t,{...o,override:!0})}),null;throw new Error(r.error||"Failed to add student")}return a(r.message||"Student added successfully","success"),u(),r}catch(s){throw p||a(s.message,"error"),s}}window.addSingleStudent=I;window.showUploadModal=F;window.showInviteModal=x;window.exportRoster=j;window.filterByStatus=C;window.showModal=h;window.hideModal=w;window.showToast=a;window.resendInvite=N;window.approveStudent=D;window.removeStudent=U;window.viewStudent=O;window.confirmRosterUpload=M;window.sendInvitations=R;window.loadEnrollments=u;window.closeEnrollmentLimitDialog=E;window.confirmEnrollmentOverride=z;
