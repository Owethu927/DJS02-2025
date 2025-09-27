class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // List of attributes to observe for changes
  static get observedAttributes() {
    return ["cover", "title", "genres", "seasons", "updated"];
  }
}
