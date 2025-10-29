import"./toast-93yYkT8V.js";/* empty css               */import{s as i}from"./api-Dxj3jBlT.js";import{l as a}from"./logger-gSLuc3Ra.js";async function o(){try{if(!localStorage.getItem("token")){window.location.href="login.html";return}const e=await i.getActive();r(e.sessions)}catch(t){a.error("Error loading active sessions:",t),document.getElementById("sessionsContainer").innerHTML=`
                    <div class="error">Failed to load active sessions. Please try again.</div>
                `}}function r(t){const e=document.getElementById("sessionsContainer");if(!t||t.length===0){e.innerHTML=`
                    <div class="empty-state">
                        <h3>No Active Sessions</h3>
                        <p>Create a new session to get started</p>
                        <button class="btn btn-primary" onclick="window.location.href='/classes.html'">
                            Go to Classes
                        </button>
                    </div>
                `;return}e.innerHTML=t.map(n=>`
                <div class="session-card ${n.status}">
                    <div class="session-info">
                        <div class="session-code">
                            ${n.sessionCode}
                            <span class="status-badge ${n.status}">${n.status}</span>
                        </div>
                        <div class="session-title">${n.title}</div>
                        <div class="session-meta">
                            ${n.participants} participants •
                            Started ${c(n.createdAt)}
                        </div>
                    </div>
                    <div class="session-actions">
                        <button class="btn btn-primary" onclick="resumeSession('${n._id}', '${n.sessionCode}')">
                            Resume Session
                        </button>
                        <button class="btn btn-danger" onclick="endSession('${n._id}')">
                            End Session
                        </button>
                    </div>
                </div>
            `).join("")}function c(t){const e=new Date(t),s=Math.floor((new Date-e)/1e3);return s<60?`${s} seconds ago`:s<3600?`${Math.floor(s/60)} minutes ago`:s<86400?`${Math.floor(s/3600)} hours ago`:e.toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}function d(t,e){window.location.href=`/session.html?id=${t}&code=${e}`}async function l(t){if(confirm("Are you sure you want to end this session?"))try{await i.updateStatus(t,"ended"),alert("Session ended successfully"),o()}catch(e){a.error("Error ending session:",e),alert("Failed to end session. Please try again.")}}function u(){localStorage.removeItem("token"),window.location.href="login.html"}window.logout=u;window.resumeSession=d;window.endSession=l;setInterval(o,1e4);o();
