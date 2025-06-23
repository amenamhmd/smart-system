document.addEventListener("DOMContentLoaded", function () {
  
  const signUpForm = document.querySelector("#signUpForm");
  const loginForm = document.querySelector("#loginForm");

  // =============== Sign Up ===================
  if (signUpForm) {
    let nameInput = document.getElementById('userName');
    let emailInput = document.getElementById('userEmail');
    let passwordInput = document.getElementById('userPassword');
    let inputs = [nameInput, emailInput, passwordInput];

    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validationAllInput(inputs)) {
        let user = {
          userName: nameInput.value.trim().toLowerCase(),
          userEmail: emailInput.value.trim().toLowerCase(),
          userPassword: passwordInput.value.trim()
        };

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        clearInputs(inputs);
        clearMsg(inputs);
        window.location.href = "index.html";
      }
    });

    function validationAllInput(inputs) {
      let regex = {
        userName: /^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$/,
        userEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        userPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      };

      let allValid = true;

      inputs.forEach(input => {
        let span = input.nextElementSibling;
        if (!span || span.tagName !== "SPAN") {
          span = document.createElement("span");
          span.style.color = "red";
          input.parentNode.appendChild(span);
        }

        const id = input.id;
        if (input.value.trim() === '') {
          input.classList.add('is-invalid');
          span.textContent = `${id} is required`;
          allValid = false;
        } else if (!regex[id].test(input.value.trim())) {
          input.classList.add('is-invalid');
          if (id === 'userName') {
            span.textContent = `Name must be at least 2 characters`;
          } else if (id === 'userEmail') {
            span.textContent = `Email must be in format example@gmail.com`;
          } else if (id === 'userPassword') {
            span.textContent = `Password must be like P@ssw0rd`;
          }
          allValid = false;
        } else {
          input.classList.remove('is-invalid');
          span.textContent = '';
        }
      });

      return allValid;
    }

    function clearInputs(inputs) {
      inputs.forEach(input => input.value = '');
    }

    function clearMsg(inputs) {
      inputs.forEach(input => {
        let span = input.nextElementSibling;
        if (span && span.tagName === "SPAN") span.textContent = '';
      });
    }
  }

  // =============== Login ===================
  if (loginForm) {
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const incorrectMsg = document.getElementById("incorrect");

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (storedUsers.length === 0) {
        incorrectMsg.textContent = "No registered accounts found. Please register first.";
        incorrectMsg.style.color = "red";
        setTimeout(() => {
          window.location.href = "signup.html";
        }, 1500);
        return;
      }

      const email = loginEmail.value.trim().toLowerCase();
      const password = loginPassword.value.trim();

      const foundUser = storedUsers.find(user =>
        user.userEmail === email && user.userPassword === password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", foundUser.userName);
        incorrectMsg.textContent = '';
        window.location.href = "home.html";
      } else {
        incorrectMsg.textContent = "❌ E-mail or Password is incorrect";
        incorrectMsg.style.color = "red";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  
  const welcomeBox = document.getElementById("welcomeBox");
  const logoutBtn = document.querySelector(".logout-btn");

  if (welcomeBox && logoutBtn) {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      welcomeBox.textContent = `Welcome ${currentUser}`;
    } else {
      
      window.location.href = "index.html";
    }

    
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
});
