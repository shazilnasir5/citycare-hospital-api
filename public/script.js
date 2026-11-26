
// ========================================
// AUTHENTICATION SYSTEM - FRONTEND
// ========================================

// Backend API URL
const API_URL = "http://localhost:3000/api/auth";

// HTML Elements
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");

const registerFormElement = document.getElementById("registerFormElement");
const loginFormElement = document.getElementById("loginFormElement");

const showLoginButton = document.getElementById("showLogin");
const showRegisterButton = document.getElementById("showRegister");
const logoutButton = document.getElementById("logoutBtn");

// ========================================
// SHOW AND HIDE FORMS
// ========================================

function showRegister() {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    dashboard.classList.add("hidden");

    clearMessages();
}

function showLogin() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    dashboard.classList.add("hidden");

    clearMessages();
}

// ========================================
// CLEAR MESSAGES
// ========================================

function clearMessages() {
    document.getElementById("registerMessage").textContent = "";
    document.getElementById("loginMessage").textContent = "";

    document.getElementById("registerMessage").className = "message";
    document.getElementById("loginMessage").className = "message";
}

// ========================================
// DISPLAY MESSAGE
// ========================================

function displayMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);

    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
}

// ========================================
// PASSWORD SHOW / HIDE
// ========================================

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;
        const passwordInput = document.getElementById(targetId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            button.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            button.textContent = "Show";
        }

    });

});

// ========================================
// REGISTER API
// ========================================

registerFormElement.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    const submitButton = registerFormElement.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";

    try {

        const response = await fetch(`${API_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        displayMessage(
            "registerMessage",
            "Account created successfully! Please sign in.",
            "success"
        );

        registerFormElement.reset();

        setTimeout(() => {
            showLogin();

            document.getElementById("loginEmail").value = email;
        }, 1200);

    } catch (error) {

        displayMessage(
            "registerMessage",
            error.message || "Something went wrong. Please try again.",
            "error"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.innerHTML = 'Create Account <span>→</span>';

    }

});

// ========================================
// LOGIN API
// ========================================

loginFormElement.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const submitButton = loginFormElement.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Signing in...";

    try {

        const response = await fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Save JWT token for the current browser session
        sessionStorage.setItem("authToken", data.token);

        // Retrieve protected user profile
        await loadProfile();

        loginFormElement.reset();

    } catch (error) {

        displayMessage(
            "loginMessage",
            error.message || "Login failed. Please try again.",
            "error"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.innerHTML = 'Sign In <span>→</span>';

    }

});

// ========================================
// PROTECTED PROFILE API
// ========================================

async function loadProfile() {

    const token = sessionStorage.getItem("authToken");

    if (!token) {
        showLogin();
        return;
    }

    const response = await fetch(`${API_URL}/profile`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    });

    const data = await response.json();

    if (!response.ok) {
        sessionStorage.removeItem("authToken");
        throw new Error(data.message || "Unable to load profile");
    }

    // Display user information
    document.getElementById("dashboardName").textContent = data.user.name;

    document.getElementById("profileName").textContent = data.user.name;

    document.getElementById("profileEmail").textContent = data.user.email;

    document.getElementById("profileId").textContent = data.user.id;

    // Show dashboard
    registerForm.classList.add("hidden");
    loginForm.classList.add("hidden");
    dashboard.classList.remove("hidden");

}

// ========================================
// LOGOUT
// ========================================

logoutButton.addEventListener("click", () => {

    sessionStorage.removeItem("authToken");

    showLogin();

    loginFormElement.reset();

});

// ========================================
// BUTTON EVENTS
// ========================================

showLoginButton.addEventListener("click", showLogin);

showRegisterButton.addEventListener("click", showRegister);

// ========================================
// CHECK EXISTING SESSION
// ========================================

document.addEventListener("DOMContentLoaded", async () => {

    const token = sessionStorage.getItem("authToken");

    if (token) {

        try {
            await loadProfile();
        } catch (error) {
            showLogin();
        }

    }

});
