function d(i){const r=[...i];for(let e=r.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[r[e],r[t]]=[r[t],r[e]]}return r}function u(i){const{text:r,type:e,options:t,matching:n,ordering:o,timeLimit:s,points:l}=i;let a="";switch(e!=="fillblank"&&(a+=`<div class="preview-question">${r||"No question text"}</div>`),e){case"mcq":case"poll":a+=c(t,e==="poll");break;case"tf":a+=v();break;case"fillblank":a+=m(r);break;case"matching":a+=f(n);break;case"ordering":a+=g(o);break;default:a+='<div class="alert alert-info">Preview not available for this question type</div>'}return a+=h(s,l,e),a}function c(i,r=!1){if(!i||i.length===0)return'<div class="alert alert-info">No options added yet</div>';let e='<div class="preview-options">';return i.forEach((t,n)=>{const o=String.fromCharCode(65+n),s=t.trim()||`Option ${o}`;e+=`
            <div class="preview-option">
                <input type="radio" name="preview-answer" value="${n}">
                <div class="preview-option-text"><strong>${o}.</strong> ${s}</div>
            </div>
        `}),e+="</div>",r&&(e+='<div class="alert alert-info" style="margin-top: 1rem;"><i class="fas fa-info-circle"></i> This is a poll question - no correct answer</div>'),e}function v(){return`
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
    `}function m(i){return`
        <div class="preview-fill-blank">${i.replace(/\[blank\]/gi,'<input type="text" class="preview-blank-input" placeholder="___">')}</div>
    `}function f(i){if(!i||!i.items||!i.matches)return'<div class="alert alert-info">Add items and matches to preview</div>';const{items:r,matches:e}=i;if(r.length===0||e.length===0)return'<div class="alert alert-info">Add items and matches to preview</div>';let t='<div class="preview-matching-column"><h4>Items to Match</h4>';r.forEach((s,l)=>{const a=s.trim()||`Item ${l+1}`;t+=`<div class="preview-matching-item"><strong>${l+1}.</strong> ${a}</div>`}),t+="</div>";const n=d(e);let o='<div class="preview-matching-column"><h4>Match Options</h4>';return n.forEach((s,l)=>{const a=String.fromCharCode(65+l),p=s.trim()||`Match ${a}`;o+=`<div class="preview-matching-item"><strong>${a}.</strong> ${p}</div>`}),o+="</div>",`
        <div class="alert alert-info"><i class="fas fa-info-circle"></i> Match each item on the left with the correct option on the right (matches randomized)</div>
        <div class="preview-matching-grid">
            ${t}
            ${o}
        </div>
    `}function g(i){if(!i||i.length===0)return'<div class="alert alert-info">Add items to put in order</div>';const r=d(i);let e='<div class="alert alert-info"><i class="fas fa-info-circle"></i> Put these items in the correct order (items randomized)</div>';return e+='<div class="preview-ordering-items">',r.forEach((t,n)=>{const o=t.trim()||`Item ${n+1}`;e+=`
            <div class="preview-ordering-item">
                <i class="fas fa-grip-vertical preview-ordering-handle"></i>
                <div>${o}</div>
            </div>
        `}),e+="</div>",e}function h(i,r,e){let t='<div class="preview-metadata">';i&&(t+=`<div class="preview-meta-item"><i class="fas fa-clock"></i> <strong>Time:</strong> ${i}s</div>`),r&&(t+=`<div class="preview-meta-item"><i class="fas fa-star"></i> <strong>Points:</strong> ${r}</div>`);const n={mcq:"Multiple Choice",poll:"Poll Question",tf:"True/False",fillblank:"Fill in the Blank",matching:"Matching",ordering:"Put in Order"};return e&&n[e]&&(t+=`<div class="preview-meta-item"><i class="fas fa-question-circle"></i> <strong>Type:</strong> ${n[e]}</div>`),t+="</div>",t}function w(){return`
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
    `}export{u as a,w as g};
