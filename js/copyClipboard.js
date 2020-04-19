const copyClipBoardTemplate = document.createElement('template');
copyClipBoardTemplate.innerHTML = 
  `<style>
     :host {
       margin: 10px;
       padding: 5px;
     }
     .container {
       display: grid;
       grid-template-columns: 80% 10%;
       grid-gap: 10px;
       justify-content: center;
       align-items: center;  
     }
     .btn-copy {
       border: 2px solid #555;
       color: #555;
       outline: none;
       background: none;
       font-size: 1.2em;
       padding: 5px;
       border-radius: .3em;
     }
   </style>
   <main class="container">  
     <slot name="my-text">Put your text here!</slot>
     <button id="btn-copy" class="btn-copy">	&#x1f4cb; Copy</button>
   </main>`;

class CopyClipboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(copyClipBoardTemplate.content.cloneNode(true));
    this.isSelectedTag = false;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#btn-copy').addEventListener('click', () => this.copyToClipboard());  
    this.elementType = this.shadowRoot.querySelector( 'slot' ).assignedNodes()[0] || document.createElement('div').constructor.name;
     if (this.elementType.nodeName && ( this.elementType.nodeName.toLowerCase() === 'input' || this.elementType.nodeName.toLowerCase() === 'textarea')) {
        this.elementType.setAttribute('readonly','');
        this.isSelectedTag = true;
     } 
  }

  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.isSelectedTag ? this.elementType.value : this.elementType.innerText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-100%';
    document.body.appendChild(el);
    el.select(); 
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#btn-copy').removeEventListener();
  } 
}

window.customElements.define('copy-clipboard',CopyClipboard);