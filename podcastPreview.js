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

  // Format the "updated" date into a human-readable format
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Render the component's HTML and styles
  render() {
    if (!this.shadowRoot) return;

    // Parse the genres from a JSON string attribute
    const genres = this.genres ? JSON.parse(this.genres) : [];

    // Set the HTML inside the Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        /* Host element base styling */
        :host {
          display: block;
          max-width: 300px;
          font-family: sans-serif;
        }

        /* Card container styles */
        .card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s;
        }

        /* Hover effect for the card */
        .card:hover {
          transform: scale(1.02);
        }

        /* Podcast cover image styling */
        .card img {
          width: 100%;
          border-radius: 6px;
          object-fit: cover;
          height: auto;
        }

        /* Podcast title styling */
        .card h3 {
          margin: 0.5rem 0;
          font-size: 1rem;
        }

        /* Season info styling */
        .card p {
          margin: 0px;
          font-size: 0.8rem;
          color: var(--grey-text, #666);
        }

        /* Genre tag container */
        .tags {
          margin: 0.5rem 0;
          display: flex;
          flex-wrap: wrap;
        }

        /* Individual genre tag */
        .tag {
          background: #eee;
          padding: 0.3rem 0.6rem;
          margin-right: 0.5rem;
          margin-top: 0.5rem;
          border-radius: 4px;
          display: inline-block;
          font-size: 0.8rem;
        }

        /* Last updated text */
        .updated-text {
          font-size: 0.8rem;
          color: var(--grey-text, #666);
          margin-top: 0.5rem;
        }
      </style>

      <!-- Component layout -->
      <div class="card">
        <!-- Cover image -->
        <img src="${this.cover || ""}" alt="Podcast Cover" />
        
        <!-- Podcast title -->
        <h3>${this.title || "Untitled Podcast"}</h3>

        <!-- Number of seasons -->
        <p>${this.seasons || 0} Season(s)</p>

        <!-- Genre tags -->
        <div class="tags">
          ${genres.map((g) => `<span class="tag">${g}</span>`).join("")}
        </div>

        <!-- Last updated date -->
        <p class="updated-text">Updated: ${
          this.updated ? this.formatDate(this.updated) : "N/A"
        }</p>
      </div>
    `;
  }
}

// Register the custom element with the browser
customElements.define("podcast-preview", PodcastPreview);
