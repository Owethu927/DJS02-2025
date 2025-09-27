//Importing the DateUtils file to format human readable dates
import { DateUtils } from "./Utils/DateUtils";

//Create a template
const template = document.createElement("template");
template.innerHTML = `
 <style>
.card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.card img {
  width: 100%;
  border-radius: 6px;
}

.card h3 {
  margin: 0.5rem 0;
}

.card p {
  margin: 0px;
  font-size: 0.8rem;
  color: var(--grey-text);
}

.tags {
  margin: 0.5rem 0;
}

.tag {
  background: #eee;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.8rem;
}

.updated-text {
  font-size: 0.8rem;
  color: var(--grey-text);
}

 
 <style>
 
 <div class="card">
  <img />
  <h3></h3>
  <div class"tag" id="tag"></div>
  <p id="seasons"></p>
  <p class="updated-text"></p>
 <div>`;

// Creating a class
class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerHTML = this.getAttribute("title");
    this.shadowRoot.querySelector("img").src = this.getAttribute("image");
    this.shadowRoot.querySelector("p").innerHTML = this.getAttribute("genres");
  }
}

window.customElements.define("podcast-preview", PodcastPreview);
