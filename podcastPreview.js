class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // List of attributes to observe for changes
  static get observedAttributes() {
    return ["cover", "title", "genres", "seasons", "updated"];
  }

  // Called whenever observed attributes change
  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal; // Store updated value on the instance
    this.render(); // Re-render component with new data
  }

  // Called when the component is added to the DOM
  connectedCallback() {
    this.render(); // Initial render

    // Listen for clicks and emit a custom event to notify parent app
    this.shadowRoot.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("podcast-clicked", {
          bubbles: true, // Allow event to bubble up the DOM
          composed: true, // Cross shadow DOM boundary
          detail: {
            title: this.title,
            updated: this.updated,
          },
        })
      );
    });
  }
}
