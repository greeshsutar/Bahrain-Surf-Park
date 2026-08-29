/**
 * Bahrain Surf Park — Booking Modal Controller
 * Accessible, focus-trapped, pre-selected tier booking request modal
 */

document.addEventListener("DOMContentLoaded", () => {
  initBookingModal();
});

function initBookingModal() {
  const modalOverlay = document.getElementById("booking-modal-overlay");
  const modalContainer = document.getElementById("booking-modal-container");
  const closeBtn = document.getElementById("booking-modal-close");
  const bookingForm = document.getElementById("booking-form");
  const sessionTypeSelect = document.getElementById("booking-session-type");
  const successState = document.getElementById("booking-success-state");
  const formState = document.getElementById("booking-form-state");
  const resetBtn = document.getElementById("booking-reset-btn");

  if (!modalOverlay || !modalContainer) return;

  let lastActiveElement = null;

  // Open Modal Function
  function openModal(tierName = null) {
    lastActiveElement = document.activeElement;

    // Reset form state
    if (formState && successState) {
      formState.classList.remove("hidden");
      successState.classList.add("hidden");
    }

    if (bookingForm) {
      bookingForm.reset();
    }

    // Set today's date as min date
    const dateInput = document.getElementById("booking-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }

    // Pre-select session type if provided
    if (tierName && sessionTypeSelect) {
      for (let i = 0; i < sessionTypeSelect.options.length; i++) {
        if (sessionTypeSelect.options[i].value.toLowerCase() === tierName.toLowerCase()) {
          sessionTypeSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Show modal
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
    document.body.style.overflow = "hidden";

    // Focus first input or close button
    setTimeout(() => {
      const firstInput = modalContainer.querySelector("select, input, button");
      if (firstInput) firstInput.focus();
    }, 50);
  }

  // Close Modal Function
  function closeModal() {
    modalOverlay.classList.add("hidden");
    modalOverlay.classList.remove("flex");
    document.body.style.overflow = "";

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Bind All Booking Trigger Buttons Across Page
  const bookingTriggers = document.querySelectorAll(
    '[data-booking-trigger], a[href="#book"], .nav-book-btn, #hero a[href="#find-your-wave"], #technology a[href="#find-your-wave"], #academy a[href="#visit"], #cabanas a[href="#visit"], #visit a[href="#find-your-wave"]'
  );

  bookingTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      // Check if it's a booking action
      const tier = trigger.getAttribute("data-tier");
      e.preventDefault();
      openModal(tier);
    });
  });

  // Close on button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close on overlay click (click outside)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key & trap focus
  document.addEventListener("keydown", (e) => {
    if (modalOverlay.classList.contains("hidden")) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab") {
      const focusableElements = modalContainer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
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

  // Form Submission (Simulated Booking Request Confirmation)
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      // Show confirmation state inside modal
      if (formState && successState) {
        formState.classList.add("hidden");
        successState.classList.remove("hidden");
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", closeModal);
  }

  // Expose globally if needed
  window.openBookingModal = openModal;
  window.closeBookingModal = closeModal;
}
