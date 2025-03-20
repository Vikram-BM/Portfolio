// This service centralizes all navigation logic to ensure consistency

// Store a reference to the active section
let activeSection = "hero"

// Flag to prevent navigation loops
let isNavigating = false;

// Store a callback for updating the active section in the UI
let updateActiveSectionCallback: ((sectionId: string) => void) | null = null

// Register the callback for updating the active section
export function registerUpdateCallback(callback: (sectionId: string) => void) {
  updateActiveSectionCallback = callback
}

// Navigate to a section
export function navigateToSection(sectionId: string) {
  // Prevent navigation loops
  if (isNavigating) return;
  
  // If already at the section, do nothing
  if (activeSection === sectionId) return

  // Set navigating flag
  isNavigating = true;
  
  // Update the active section
  activeSection = sectionId

  // Only update the URL if it's not already set correctly
  if (window.location.hash !== `#${sectionId}`) {
    window.history.pushState(null, "", `#${sectionId}`)
  }

  // Call the update callback if registered
  if (updateActiveSectionCallback) {
    updateActiveSectionCallback(sectionId)
  }

  // Find the target element
  const targetElement = document.getElementById(sectionId)

  // Scroll to the target element if found
  if (targetElement) {
    // Use a small timeout to ensure the DOM has updated
    setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      
      // Reset the navigating flag after scrolling completes
      setTimeout(() => {
        isNavigating = false;
      }, 700); // Wait for scroll to complete
    }, 10)
  } else {
    // Reset the navigating flag if no target element
    setTimeout(() => {
      isNavigating = false;
    }, 50);
  }
}

// Get the current active section
export function getActiveSection() {
  return activeSection
}

// Check if currently navigating
export function isCurrentlyNavigating() {
  return isNavigating;
}

// Initialize the navigation service
export function initNavigationService() {
  // Set initial section from URL hash if available
  if (window.location.hash) {
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      activeSection = initialHash;
    }
  }

  // Handle hash changes
  const handleHashChange = () => {
    // Skip if already navigating
    if (isNavigating) return;
    
    const hash = window.location.hash.replace("#", "");
    // Only navigate if the hash is different from the active section and not empty
    if (hash && hash !== activeSection) {
      // Just update the active section without scrolling
      activeSection = hash;
      if (updateActiveSectionCallback) {
        updateActiveSectionCallback(hash);
      }
      
      // Find and scroll to the target element
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        isNavigating = true;
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          
          // Reset the navigating flag after scrolling completes
          setTimeout(() => {
            isNavigating = false;
          }, 700);
        }, 10);
      }
    }
  };

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashChange);

  // Check hash on initial load
  if (window.location.hash) {
    // Wrap in setTimeout to ensure components are mounted
    setTimeout(() => {
      handleHashChange();
    }, 100);
  }

  // Return a cleanup function
  return () => {
    window.removeEventListener("hashchange", handleHashChange);
  };
}