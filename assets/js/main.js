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

// --- Timeline initialization
function initTimeline() {
  const dots = Array.from(document.querySelectorAll(".timeline-dot"));
  const popup = document.getElementById("timeline-popup");
  if (!dots.length || !popup) return;

  const popupTitle = document.getElementById("popup-title");
  const popupPlace = document.getElementById("popup-place");
  const popupDate = document.getElementById("popup-date");
  const popupDetails = document.getElementById("popup-details");
  const popupClose = document.getElementById("popup-close");

  let persistentDot = null;
  let hoverLock = false; // prevents hide while moving to popup

  // Utility: show popup for a given dot
  function showPopup(dot) {
    if (!dot) return;
    // fill content
    popupTitle.textContent = dot.dataset.title || "";
    popupPlace.textContent = dot.dataset.place || "";
    popupDate.textContent = dot.dataset.date || "";
    popupDetails.textContent = dot.dataset.details || "";

    // ensure popup is visible for measurement
    popup.style.display = "block";
    popup.style.opacity = "0";
    popup.setAttribute("aria-hidden", "false");

    // small delay to allow width/height to be calculated
    requestAnimationFrame(() => {
      const rect = dot.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      // prefer putting popup to the right of the timeline; fallback to left if no space
      const spaceRight = window.innerWidth - rect.right;
      const gap = 18; // pixels gap from dot to popup

      let left;
      if (spaceRight > popupRect.width + 40) {
        left = rect.right + gap + scrollX;
      } else {
        left = rect.left - popupRect.width - gap + scrollX;
        if (left < 10) left = 10 + scrollX;
      }

      // vertically center relative to the dot
      const top = rect.top + scrollY + (rect.height / 2) - (popupRect.height / 2);

      popup.style.left = `${Math.round(left)}px`;
      popup.style.top = `${Math.max(16 + scrollY, Math.round(top))}px`;
      popup.style.opacity = "1";
      popup.classList.add("active");
    });
  }

  function hidePopup(forDot) {
    // If a dot is persistent, do not hide unless it's another dot or close clicked
    if (persistentDot) return;
    popup.style.opacity = "0";
    popup.classList.remove("active");
    // hide after transition
    setTimeout(() => {
      if (!popup.classList.contains("active")) {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
      }
    }, 220);
  }

  function togglePersistent(dot) {
    if (persistentDot === dot) {
      // unpin
      persistentDot = null;
      popupClose.focus();
      hidePopup();
      return;
    }
    persistentDot = dot;
    showPopup(dot);
  }

  // attach listeners
  dots.forEach((dot) => {
    // make keyboard-focusable
    if (!dot.hasAttribute("tabindex")) dot.setAttribute("tabindex", "0");

    dot.addEventListener("mouseenter", () => {
      if (persistentDot) return; // pinned; ignore hover
      hoverLock = true;
      showPopup(dot);
    });

    dot.addEventListener("mouseleave", () => {
      hoverLock = false;
      // small delay to allow moving into popup
      setTimeout(() => {
        if (!hoverLock) hidePopup(dot);
      }, 120);
    });

    // opening by click/tap: toggles persistent state
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      togglePersistent(dot);
    });

    // keyboard support: Enter / Space toggles persistent
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePersistent(dot);
      }
    });

    // mobile-friendly: touch toggles persistent
    dot.addEventListener("touchstart", (e) => {
      e.preventDefault();
      togglePersistent(dot);
    });
  });

  // Keep popup open while hovering it (so user can move pointer).
  popup.addEventListener("mouseenter", () => {
    hoverLock = true;
  });
  popup.addEventListener("mouseleave", () => {
    hoverLock = false;
    setTimeout(() => {
      if (!hoverLock && !persistentDot) hidePopup();
    }, 120);
  });

  // Close button: clears persistent and hides
  popupClose.addEventListener("click", () => {
    persistentDot = null;
    hidePopup();
  });

  // hide popup if user scrolls far
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const s = window.scrollY || window.pageYOffset;
    // small debounce
    if (Math.abs(s - lastScroll) > 10 && !persistentDot) hidePopup();
    lastScroll = s;
  });

  // hide popup on resize (repositioning would be needed)
  window.addEventListener("resize", () => {
    if (!persistentDot) hidePopup();
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
