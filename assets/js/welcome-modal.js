/**
 * Bahrain Surf Park — First-Visit Welcome Modal Controller
 * Automatically opens on first visit (~1.5s after load), persisted in localStorage
 */

document.addEventListener("DOMContentLoaded", () => {
  initWelcomeModal();
});

function initWelcomeModal() {
  const welcomeOverlay = document.getElementById("welcome-modal-overlay");
  const welcomeContainer = document.getElementById("welcome-modal-container");
  const closeBtn = document.getElementById("welcome-modal-close");
  const ctaBtn = document.getElementById("welcome-modal-cta");

  if (!welcomeOverlay || !welcomeContainer) return;

  const STORAGE_KEY = "bsp_welcome_seen";
  let lastActiveElement = null;

  function openWelcomeModal() {
    lastActiveElement = document.activeElement;

    welcomeOverlay.classList.remove("hidden");
    welcomeOverlay.classList.add("flex");
    document.body.style.overflow = "hidden";

    // Focus the primary CTA or close button
    setTimeout(() => {
      if (ctaBtn) {
        ctaBtn.focus();
      } else if (closeBtn) {
        closeBtn.focus();
      }
    }, 100);
  }

  function closeWelcomeModal(markAsSeen = true) {
    if (markAsSeen) {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch (e) {
        // Handle private browsing storage limitations gracefully
      }
    }

    welcomeOverlay.classList.add("hidden");
    welcomeOverlay.classList.remove("flex");
    document.body.style.overflow = "";

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Check if first-time visitor
  try {
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      setTimeout(() => {
        // Ensure no other modal is currently open
        const bookingModal = document.getElementById("booking-modal-overlay");
        if (!bookingModal || bookingModal.classList.contains("hidden")) {
          openWelcomeModal();
        }
      }, 1500);
    }
  } catch (e) {
    // If storage restricted, fallback to session-only
    setTimeout(openWelcomeModal, 1500);
  }

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeWelcomeModal(true));
  }

  welcomeOverlay.addEventListener("click", (e) => {
    if (e.target === welcomeOverlay) {
      closeWelcomeModal(true);
    }
  });

  // CTA button handler: scroll to Explore section
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeWelcomeModal(true);
      const targetSection = document.getElementById("find-your-wave");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Keyboard accessibility: Escape key and Focus Trap
  document.addEventListener("keydown", (e) => {
    if (welcomeOverlay.classList.contains("hidden")) return;

    if (e.key === "Escape") {
      closeWelcomeModal(true);
      return;
    }

    if (e.key === "Tab") {
      const focusableElements = welcomeContainer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Expose helper globally to test or trigger if needed
  window.openWelcomeModal = openWelcomeModal;
  window.closeWelcomeModal = closeWelcomeModal;
}
