function f(e){const{text:r,type:i,options:t,matching:a,ordering:o,timeLimit:s,points:l}=e;let n="";switch(n+=`<div class="preview-question">${r||"No question text"}</div>`,i){case"mcq":case"poll":n+=d(t,i==="poll");break;case"tf":n+=p();break;case"fillblank":n+=c(r);break;case"matching":n+=v(a);break;case"ordering":n+=m(o);break;default:n+='<div class="alert alert-info">Preview not available for this question type</div>'}return n+=g(s,l,i),n}function d(e,r=!1){if(!e||e.length===0)return'<div class="alert alert-info">No options added yet</div>';let i='<div class="preview-options">';return e.forEach((t,a)=>{const o=String.fromCharCode(65+a),s=t.trim()||`Option ${o}`;i+=`
            <div class="preview-option">
                <input type="radio" name="preview-answer" value="${a}">
                <div class="preview-option-text"><strong>${o}.</strong> ${s}</div>
            </div>
        `}),i+="</div>",r&&(i+='<div class="alert alert-info" style="margin-top: 1rem;"><i class="fas fa-info-circle"></i> This is a poll question - no correct answer</div>'),i}function p(){return`
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
    `}function c(e){return`
        <div class="preview-fill-blank">${e.replace(/\[blank\]/gi,'<input type="text" class="preview-blank-input" placeholder="___">')}</div>
    `}function v(e){if(!e||!e.items||!e.matches)return'<div class="alert alert-info">Add items and matches to preview</div>';const{items:r,matches:i}=e;if(r.length===0||i.length===0)return'<div class="alert alert-info">Add items and matches to preview</div>';let t='<div class="preview-matching-column"><h4>Items to Match</h4>';r.forEach((o,s)=>{const l=o.trim()||`Item ${s+1}`;t+=`<div class="preview-matching-item"><strong>${s+1}.</strong> ${l}</div>`}),t+="</div>";let a='<div class="preview-matching-column"><h4>Match Options</h4>';return i.forEach((o,s)=>{const l=String.fromCharCode(65+s),n=o.trim()||`Match ${l}`;a+=`<div class="preview-matching-item"><strong>${l}.</strong> ${n}</div>`}),a+="</div>",`
        <div class="alert alert-info"><i class="fas fa-info-circle"></i> Match each item on the left with the correct option on the right</div>
        <div class="preview-matching-grid">
            ${t}
            ${a}
        </div>
    `}function m(e){if(!e||e.length===0)return'<div class="alert alert-info">Add items to put in order</div>';let r='<div class="alert alert-info"><i class="fas fa-info-circle"></i> Put these items in the correct order</div>';return r+='<div class="preview-ordering-items">',e.forEach((i,t)=>{const a=i.trim()||`Item ${t+1}`;r+=`
            <div class="preview-ordering-item">
                <i class="fas fa-grip-vertical preview-ordering-handle"></i>
                <div>${a}</div>
            </div>
        `}),r+="</div>",r}function g(e,r,i){let t='<div class="preview-metadata">';e&&(t+=`<div class="preview-meta-item"><i class="fas fa-clock"></i> <strong>Time:</strong> ${e}s</div>`),r&&(t+=`<div class="preview-meta-item"><i class="fas fa-star"></i> <strong>Points:</strong> ${r}</div>`);const a={mcq:"Multiple Choice",poll:"Poll Question",tf:"True/False",fillblank:"Fill in the Blank",matching:"Matching",ordering:"Put in Order"};return i&&a[i]&&(t+=`<div class="preview-meta-item"><i class="fas fa-question-circle"></i> <strong>Type:</strong> ${a[i]}</div>`),t+="</div>",t}function w(){return`
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
    `}export{f as a,w as g};
