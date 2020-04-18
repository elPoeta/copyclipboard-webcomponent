const copyClipBoardTemplate = document.createElement('template');
copyClipBoardTemplate.innerHTML = 
  `<main>  
   <slot name="my-text" id="type">Put your text here!</slot>
   <button id="btn-copy">copy</button>
  </main>`;
  
class CopyClipboard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `This is a test`;
  }
}

window.customElements.define('copy-clipboard',CopyClipboard);