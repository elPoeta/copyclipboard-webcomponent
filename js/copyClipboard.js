const copyClipBoardTemplate = document.createElement('template');
copyClipBoardTemplate.innerHTML = 
  `<main>  
   <slot name="my-text">Put your text here!</slot>
   <button id="btn-copy">copy</button>
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