# Personal Portfolio
Personal Website and Portfolio

```
Base Structure
/portfolio
│── index.html              → Landing page (Hi! I'm Collin, intro, roles, skills)
│── portfolio.html           → Personal Portfolio
│── showcase.html            → Project Showcase
│── blog.html                → Blog
│── docs.html                → Documentation site
│── assets/
│    ├── css/style.css       → Global styles
│    ├── js/main.js          → Animations + interactivity
│    └── img/                → Profile photo + icons
│── components/
     ├── header.html         → Navigation bar
     ├── footer.html         → Footer
     └── timeline.html       → Reusable timeline component
```

Add new Experiences:

Example (Adding a New Job Later)

If you take a new AI Consultant role in 2025, you just add:
```
<div class="timeline-item">
  <div class="timeline-date">Jan 2025 – Present</div>
  <div class="timeline-content">
    <h3>AI Consultant</h3>
    <p>Freelance</p>
    <div class="details">
      <ul>
        <li>Advised companies on AI adoption and LLM integration.</li>
        <li>Built custom NLP pipelines for business clients.</li>
      </ul>
    </div>
  </div>
</div>
```

This automatically inherits the hover behavior + styling without extra code.

🔹 Timeline Update Workflow
```
1. Open components/timeline.html.
2. Copy the template block.
3. Replace:
     [Start Date – End Date] → ex: Jan 2025 – Present
     [Job Title / Degree] → ex: AI Consultant
     [Company / Org] → ex: Freelance
     [Details list] → ex: achievements, skills, tools.
4. Save → refresh browser → done ✅
```


🔹 Reusable Template (to add new projects)
```
To add more projects, copy this block inside <div class="project-grid">:

<div class="project-card">
  <h3>🚀 [Project Title]</h3>
  <p>[Short description of project]</p>
  <a href="[GitHub or Demo link]" target="_blank" class="btn">View Project</a>
  <a href="[Optional second link]" target="_blank" class="btn">Read More</a>
</div>
```
