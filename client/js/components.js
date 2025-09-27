// js/components.js
class ComponentLoader {
  static async loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
      } else {
        console.error(`Element with id "${elementId}" not found`);
      }
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
  }

  static async loadAllComponents() {
    // Load all components in parallel
    await Promise.all([
      this.loadComponent('navbar-placeholder', 'components/navbar.html'),
      this.loadComponent('footer-placeholder', 'components/footer.html'),
      this.loadComponent('auth-modal-placeholder', 'components/auth-modal.html')
    ]);
    
    // Initialize functionality after components are loaded
    this.initializeNavigation();
    this.initializeModalHandlers();
  }

  static initializeNavigation() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkPage = link.getAttribute('data-page');
      
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  static initializeModalHandlers() {
    // Wait a bit for Bootstrap to fully initialize
    setTimeout(() => {
      const loginButton = document.getElementById("login-form-open");
      const signupButton = document.getElementById("signup-form-open");
      const loginTabElement = document.getElementById("login-tab");
      const signupTabElement = document.getElementById("signup-tab");
      
      if (loginButton && signupButton && loginTabElement && signupTabElement) {
        const loginTab = new bootstrap.Tab(loginTabElement);
        const signupTab = new bootstrap.Tab(signupTabElement);
        
        loginButton.addEventListener("click", () => {
          loginTab.show();
        });
        
        signupButton.addEventListener("click", () => {
          signupTab.show();
        });

        // Handle form submissions
        this.handleFormSubmissions();
      }
    }, 100);
  }

  static handleFormSubmissions() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        login(); // call your login() function from auth.js
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        register(); // call your register() function from auth.js
      });
    }
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ComponentLoader.loadAllComponents();
});