(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();let s=null;function l(){s||(s=document.createElement("div"),s.id="toast-container",s.style.cssText=`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    max-width: calc(100vw - 40px);
  `,document.body.appendChild(s))}function i(t,n="info",a=3e3){l();const r=document.createElement("div");r.className=`toast toast-${n}`;const e={success:"✓",error:"✗",warning:"⚠",info:"ℹ"},o={success:"#10B981",error:"#EF4444",warning:"#F59E0B",info:"#3B82F6"};r.innerHTML=`
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
      border-left: 4px solid ${o[n]};
      animation: slideIn 0.3s ease-out;
    ">
      <span style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${o[n]};
        color: white;
        font-weight: bold;
        flex-shrink: 0;
      ">${e[n]}</span>
      <span style="color: #374151; font-size: 14px; word-wrap: break-word; overflow-wrap: break-word;">${t}</span>
    </div>
  `,s.appendChild(r),setTimeout(()=>{r.style.animation="slideOut 0.3s ease-out",setTimeout(()=>r.remove(),300)},a)}function d(t){i(t,"success")}function f(t){i(t,"error",4e3)}function u(t){i(t,"warning")}function p(t){i(t,"info")}if(!document.getElementById("toast-animations")){const t=document.createElement("style");t.id="toast-animations",t.textContent=`
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
  `,document.head.appendChild(t)}const m={show:i,success:d,error:f,warning:u,info:p};export{i as a,f as s,m as t};
