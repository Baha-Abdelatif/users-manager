const apiUrl = "http://localhost:1337";
const register_form = document.forms.register_form;
register_form.addEventListener('submit', register);

const login_form = document.forms.login_form;
login_form.addEventListener('submit', login);

const profile_elt = document.querySelector(".profile_container");
let is_logged_in = false;

const profile = document.getElementById("profile");

const show_profile_btn = document.querySelector(".show_profile");
show_profile_btn.addEventListener("click", showProfile);

const logout_button = document.querySelector(".logout_button");
logout_button.addEventListener("click", logout);

const messages_elt = document.querySelector(".messages_container")
const show_messages_btn = document.querySelector(".show_messages");
show_messages_btn.addEventListener("click", showMessages);

function init() {
  // TODO
  isLogged()
}

init()

function isLogged() {
  if (is_logged_in === true) {
    document.querySelector(".forms").style.display = "none";
    profile_elt.style.display = "flex"
    messages_elt.style.display = "flex"

  } else {
    document.querySelector(".forms").style.display = "flex";
    profile_elt.style.display = "none"
    profile.style.display = "none";
    show_profile_btn.style.display = "block";
    messages_elt.style.display = "none"
  }
}

function retrieveJWTtoken() {
  const userFromStorage = localStorage.getItem("user");
  if (!userFromStorage) {
    return { status: "anonymous", msg: "please login", token: null }
  }
  const user = JSON.parse(userFromStorage);
  return { status: "authenticated", msg: "success", token: user.jwt }
}

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
      is_logged_in = true;
      isLogged()
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
      is_logged_in = true;
      isLogged()
      localStorage.setItem("user", JSON.stringify(data))
    })
    .catch(err => console.error(err))
}

function logout() {
  document.querySelector(".forms").style.display = "flex";
  document.querySelector('.all_messages').style.display = "none"

  is_logged_in = false;
  isLogged()
  localStorage.removeItem("user");
  console.log("logging out...")
}

function showProfile() {
  const token = retrieveJWTtoken().token
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

function showMessages() {
  const token = retrieveJWTtoken().token
  fetch(`${apiUrl}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      data.map((message) => {
        let message_title = document.createElement("h5");
        message_title.innerText = message.title;
        let message_content = document.createElement("p");
        message_content.innerText = message.description;
        let message_box = document.createElement("li");
        message_box.appendChild(message_title);
        message_box.appendChild(message_content);
        document.querySelector(".messages_list").appendChild(message_box);
      });
      show_messages_btn.style.display = "none";
      document.querySelector('.all_messages').style.display = "block"
    })
    .catch(err => console.error(err))
}