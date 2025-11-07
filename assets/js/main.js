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

// --- Typewriter Effect with Skill Rotation
function initTypewriter() {
  const skills = [
    "Natural Language Processing",
    "Data Analytics",
    "LLM & Machine Learning",
    "Mathematics & Statistics",
    "Project Management",
    "Stakeholder Management",
    "Operations & Strategy",
    "AI Solutions"
  ];

  const el = document.getElementById("typewriter-text");
  if (!el) return;

  let skillIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentSkill = skills[skillIndex];

    if (isDeleting) {
      // Deleting characters
      el.textContent = currentSkill.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster deletion

      if (charIndex === 0) {
        isDeleting = false;
        skillIndex = (skillIndex + 1) % skills.length;
        typingSpeed = 500; // Pause before typing next skill
      }
    } else {
      // Typing characters
      el.textContent = currentSkill.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed

      if (charIndex === currentSkill.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of word
      }
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typewriter effect
  type();
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
    initTypewriter();
    initTimeline();
  } catch (err) {
    console.error("Error loading components or initializing:", err);
  }
});
