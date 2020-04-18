const copyClipBoardTemplate = document.createElement('template');
copyClipBoardTemplate.innerHTML = 
  `<main>  
   <slot name="my-text" id="type">Put your text here!</slot>
   <button id="btn-copy">copy</button>
  </main>`;

class CopyClipboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(copyClipBoardTemplate.content.cloneNode(true));
  }
}

window.customElements.define('copy-clipboard',CopyClipboard);