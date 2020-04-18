class CopyClipboard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `This is a test`;
  }
}

window.customElements.define('copy-clipboard',CopyClipboard);