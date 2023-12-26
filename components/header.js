class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
  <div class="w-full block fixed inset-x-0 top-0 z-10 p-4 | bg-gradient-to-b from-sky-300 to-cyan-200 | text-center font-bold text-xl truncate">
    FlySafe Dashboard
  </div>
`;
  }
}
customElements.define("header-component", Header);
