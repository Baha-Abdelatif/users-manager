const apiUrl = "http://localhost:1337";

const register_form = document.forms.register_form;
register_form.addEventListener('submit', register);

const login_form = document.forms.login_form;
login_form.addEventListener('submit', login);

const profile_elt = document.querySelector(".profile_container");
let is_logged_in = false;

const profile = document.getElementById("profile");
profile.style.display = "none";

const show_profile_btn = document.querySelector(".show_profile");
show_profile_btn.addEventListener("click", showProfile);

const logout_button = document.querySelector(".logout_button");
logout_button.addEventListener("click", logout);

function register(e) {
  e.preventDefault();
  const { username, email, password } = register_form;
  // console.log(username.value, email.value, password.value)
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value
  }
  fetch(`${apiUrl}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.querySelector(".forms").style.display = "none";
      is_logged_in = true;
      profile_elt.style.display = "flex"
    })
    .catch(err => console.error(err))
}

function login(e) {
  e.preventDefault();
  const { login_email, login_password } = login_form;
  // console.log(username.value, email.value, password.value)
  const payload = {
    identifier: login_email.value,
    password: login_password.value
  }
  console.log(payload)
  fetch(`${apiUrl}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.querySelector(".forms").style.display = "none";
      is_logged_in = true;
      profile_elt.style.display = "flex"
      localStorage.setItem("user", JSON.stringify(data))
    })
    .catch(err => console.error(err))
}

function logout() {
  document.querySelector(".forms").style.display = "flex";
  is_logged_in = false;
  profile_elt.style.display = "none";
  profile.style.display = "none";
  show_profile_btn.style.display = "block";
  localStorage.removeItem("user");
  console.log("logging out...")
}

function showProfile() {
  const token = JSON.parse(localStorage.getItem("user")).jwt;
  // console.log(token)
  fetch(`${apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      document.querySelector(".profile_username").innerHTML = data.username;
      document.querySelector(".profile_email").innerHTML = data.email;
      document.querySelector(".member_since").innerHTML = data.created_at;
      profile.style.display = "block";
      show_profile_btn.style.display = "none";
      console.log(data);
    })
    .catch(err => console.error(err))
}