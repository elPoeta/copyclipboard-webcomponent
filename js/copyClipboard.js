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

  connectedCallback() {
    this.shadowRoot.querySelector('#btn-copy').addEventListener('click', () => this.copyToClipboard());
    const elementType = this.shadowRoot.querySelector( 'slot' ).assignedNodes()[0] || document.createElement('div').constructor.name;
     if (elementType.nodeName && ( elementType.nodeName.toLowerCase() === 'input' || elementType.nodeName.toLowerCase() === 'textarea' || elementType.nodeName.toLowerCase() === 'pre')) {
        console.log('node name ',elementType.nodeName )
        elementType.setAttribute('readonly',true);
     } else {
        console.log('node name ',elementType.nodeName )
     }
  }

  copyToClipboard() {
   console.log('copied!');
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#btn-copy').removeEventListener();
  } 
}

window.customElements.define('copy-clipboard',CopyClipboard);