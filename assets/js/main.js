// assets/js/main.js

// --- Helper: load a component and return a Promise that resolves when inserted
function loadComponent(id, file) {
  return fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
      return res.text();
    })
    .then((html) => {
      const el = document.getElementById(id);
      if (!el) throw new Error(`No element with id="${id}" found in the page`);
      el.innerHTML = html;
    });
}

// --- Skill rotator (from CV)
function initSkillRotator() {
  const skills = [
    "Natural Language Processing",
    "Data Analytics",
    "LLM & ML",
    "Mathematics & Statistics",
    "Project Management",
    "Stakeholder Management"
  ];
  const el = document.getElementById("skill-rotator");
  if (!el) return;
  let idx = 0;
  el.textContent = skills[idx];
  setInterval(() => {
    idx = (idx + 1) % skills.length;
    el.textContent = skills[idx];
  }, 2200);
}

// --- Timeline initialization (simplified - now using pure CSS hover effects)
function initTimeline() {
  // Timeline is now fully CSS-based with hover effects
  // This function can be used for future enhancements if needed
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Optional: Add click-to-expand for mobile devices
  timelineItems.forEach(item => {
    const card = item.querySelector('.timeline-card');
    const details = item.querySelector('.timeline-details');

    if (card && details) {
      card.addEventListener('click', () => {
        // Toggle expanded state on mobile
        if (window.innerWidth <= 720) {
          item.classList.toggle('expanded');

          if (item.classList.contains('expanded')) {
            details.style.maxHeight = '200px';
            details.style.opacity = '1';
          } else {
            details.style.maxHeight = '0';
            details.style.opacity = '0';
          }
        }
      });
    }
  });
}

// --- Boot: load components then initialize
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // load header, timeline, footer (order doesn't strictly matter but timeline must be loaded before initTimeline)
    await loadComponent("header", "components/header.html");
    await loadComponent("timeline", "components/timeline.html");
    await loadComponent("footer", "components/footer.html");

    // initialization
    initSkillRotator();
    initTimeline();
  } catch (err) {
    console.error("Error loading components or initializing:", err);
  }
});
