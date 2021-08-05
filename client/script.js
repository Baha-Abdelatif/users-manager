const apiUrl = "http://localhost:1337";

const register_form = document.forms.register_form;
register_form.addEventListener('submit', register);

const login_form = document.forms.login_form;
login_form.addEventListener('submit', login);

const profile_elt = document.querySelector(".profile");
let is_logged_in = false;

const show_profile_btn = document.querySelector(".show_profile");
show_profile_btn.addEventListener("click", showProfile);

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
      localStorage.setItem("user", JSON.stringify(data))
    })
    .catch(err => console.error(err))
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
      console.log(data);
    })
    .catch(err => console.error(err))
}