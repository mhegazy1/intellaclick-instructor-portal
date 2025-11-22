import{t as i}from"./toast-CsVVNeTg.js";/* empty css               */import{c as d,g as m}from"./api-Cc5qfUA_.js";import{l as o}from"./logger-CifuMjS_.js";let l=null;o.debug("🔵 Gamification Sync Page Loaded - Version 1.0.0-modular");document.addEventListener("DOMContentLoaded",async()=>{await y(),await g()});async function y(){const s=localStorage.getItem("token");if(!s){window.location.href="login.html";return}const e=JSON.parse(atob(s.split(".")[1]));l=e.userId||e.id}async function g(){try{const e=(await d.getAll()).classes||[],t=document.getElementById("classFilter");e.forEach(r=>{const n=document.createElement("option");n.value=r._id||r.id,n.textContent=r.name,t.appendChild(n)})}catch(s){o.error("Error loading classes:",s),i.error("Failed to load classes")}}async function u(){const s=document.getElementById("syncButton"),e=document.getElementById("results");s.disabled=!0,s.innerHTML='<span class="spinner"></span> Syncing...';try{const t=document.getElementById("classFilter").value,n={days:document.getElementById("daysBack").value};t&&(n.classId=t),o.debug("Syncing sessions with params:",n);const a=await m.syncInstructorSessions(l,n);e.classList.add("visible"),e.innerHTML=`
                    <div class="success-message">
                        <strong>✅ Sync Complete!</strong><br>
                        ${a.message}
                    </div>

                    <h3>Sync Summary</h3>
                    <div class="result-item">
                        <h4>📊 Overall Statistics</h4>
                        <p><strong>Sessions Synced:</strong> ${a.sessionsSynced}</p>
                        <p><strong>Total Player Records Updated:</strong> ${a.totalPlayersSynced}</p>
                    </div>

                    ${a.sessions&&a.sessions.length>0?`
                        <h3>Session Details</h3>
                        ${a.sessions.map(c=>`
                            <div class="result-item">
                                <h4>Session ${c.sessionCode||c.sessionId}</h4>
                                <p><strong>Players Synced:</strong> ${c.playersSynced}</p>
                            </div>
                        `).join("")}
                    `:""}

                    <p style="margin-top: 1.5rem;">
                        <a href="gamification-dashboard.html" class="btn btn-primary">
                            View Gamification Dashboard
                        </a>
                    </p>
                `,o.debug("Sync results:",a),i.success("Sessions synced successfully!")}catch(t){o.error("Error syncing sessions:",t),e.classList.add("visible"),e.innerHTML=`
                    <div class="error-message">
                        <strong>❌ Sync Failed</strong><br>
                        ${t.message}
                    </div>
                    <p>Please check the console for more details or contact support.</p>
                `,i.error(`Sync failed: ${t.message}`)}finally{s.disabled=!1,s.innerHTML="Sync Sessions"}}window.syncSessions=u;
