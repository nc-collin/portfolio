// Load header, footer, timeline dynamically
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
  loadComponent("timeline", "components/timeline.html");

  rotateSkills();
});

function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data);
}

// Animated skill rotator
const skills = ["NLP", "Data Analytics", "LLM & ML", "Mathematics", "Operations", "AI"];
let skillIndex = 0;

function rotateSkills() {
  const skillRotator = document.getElementById("skill-rotator");
  if (!skillRotator) return;
  setInterval(() => {
    skillRotator.textContent = skills[skillIndex];
    skillIndex = (skillIndex + 1) % skills.length;
  }, 2000);
}

// Timeline interactivity
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".timeline-dot");
  const popup = document.getElementById("timeline-popup");
  const title = document.getElementById("popup-title");
  const place = document.getElementById("popup-place");
  const date = document.getElementById("popup-date");
  const details = document.getElementById("popup-details");

  dots.forEach(dot => {
    dot.addEventListener("mouseenter", () => {
      title.textContent = dot.dataset.title;
      place.textContent = dot.dataset.place;
      date.textContent = dot.dataset.date;
      details.textContent = dot.dataset.details;

      popup.style.top = dot.getBoundingClientRect().top + window.scrollY - 30 + "px";
      popup.style.left = "120px"; // offset to the right of timeline
      popup.classList.add("active");
    });

    dot.addEventListener("mouseleave", () => {
      popup.classList.remove("active");
    });
  });
});
