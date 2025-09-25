//Create a template
const template = document.createElement("template");
template.innerHTML = `
 <style>
 
 <style>`;

// Creating a class
class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("podcast-preview", PodcastPreview);
