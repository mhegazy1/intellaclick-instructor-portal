let n=null,t=0;function s(){if(!n&&(n=document.createElement("div"),n.id="loading-overlay",n.style.cssText=`
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
  `,n.innerHTML=`
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
  `,document.body.appendChild(n),!document.getElementById("spinner-styles"))){const e=document.createElement("style");e.id="spinner-styles",e.textContent=`
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
    `,document.head.appendChild(e)}}function d(e="Loading..."){s(),t++;const i=document.getElementById("loading-message");i&&(i.textContent=e),n.style.display="flex"}function o(){n&&(t=Math.max(0,t-1),t===0&&(n.style.display="none"))}function l(){n&&(t=0,n.style.display="none")}function a(e,i){e&&(i?(e.dataset.originalText=e.textContent,e.classList.add("btn-loading"),e.disabled=!0):(e.classList.remove("btn-loading"),e.disabled=!1,e.dataset.originalText&&(e.textContent=e.dataset.originalText,delete e.dataset.originalText)))}async function r(e,i="Loading..."){d(i);try{return await e()}finally{o()}}async function p(e,i){a(e,!0);try{return await i()}finally{a(e,!1)}}function g(e){if(!e)return;const i=document.createElement("div");i.className="inline-spinner",i.style.cssText=`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `,i.innerHTML='<div class="spinner"></div>',e.innerHTML="",e.appendChild(i)}const c={show:d,hide:o,forceHide:l,setButton:a,withLoading:r,withButtonLoading:p,showInline:g};export{c as l};
