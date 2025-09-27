// User Authentication

async function register() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const userName = document.getElementById('signupUserName').value;

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, userName })
    });

    if (!response.ok) throw new Error("Signup failed");
    alert("Now, log in with the email and password only please :)");
  } catch (error) {
    alert(error.message);
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);

      // Update navbar
      updateNavbarOnLogin(data.userName);

      // Close modal
      const modalElement = document.getElementById("authModal");
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    alert(error.message);
  }
}

async function logout() {
  const token = localStorage.getItem("token");

  if (!token) {
    updateNavbarOnLogout();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `access ${token}` // send token
      }
    });

    const data = await response.json();

    if (response.ok) {
      // Clear storage on successful logout
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      updateNavbarOnLogout();
      alert("You have been logged out.");
    } else {
      // Even if server logout fails, clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      updateNavbarOnLogout();
      alert(data.message || "Logout failed, but you have been logged out locally.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    // If network fails, still clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    updateNavbarOnLogout();
    alert("Network error during logout, but you have been logged out locally.");
  }
}

function updateNavbarOnLogin(userName) {
  const authButtons = document.getElementById("auth-buttons");
  const userButtons = document.getElementById("user-buttons");
  const welcomeMessage = document.getElementById("welcome-message");

  // Only update if elements exist (i.e., we're on a page with the navbar)
  if (authButtons) {
    authButtons.classList.add("d-none");
  }
  if (userButtons) {
    userButtons.classList.remove("d-none");
  }
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${userName}!`;
  }
}

function updateNavbarOnLogout() {
  const authButtons = document.getElementById("auth-buttons");
  const userButtons = document.getElementById("user-buttons");
  const welcomeMessage = document.getElementById("welcome-message");

  // Only update if elements exist (i.e., we're on a page with the navbar)
  if (authButtons) {
    authButtons.classList.remove("d-none");
  }
  if (userButtons) {
    userButtons.classList.add("d-none");
  }
  if (welcomeMessage) {
    welcomeMessage.textContent = "";
  }
}

// Function to initialize auth state after components are loaded
function initializeAuthState() {
  const storedUser = localStorage.getItem("userName");
  if (storedUser) {
    updateNavbarOnLogin(storedUser);
  }

  // Set up logout button event listener
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Just call logout() - it handles everything
      logout();
    });
  }
}

// Wait for components to be loaded before initializing auth state
function waitForComponents() {
  const navbar = document.getElementById("auth-buttons");
  if (navbar) {
    // Navbar is loaded, initialize auth state
    initializeAuthState();
  } else {
    // Navbar not loaded yet, wait a bit and check again
    setTimeout(waitForComponents, 50);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Start checking for components
  waitForComponents();
});