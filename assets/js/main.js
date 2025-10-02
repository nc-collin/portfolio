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
