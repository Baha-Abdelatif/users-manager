const register_form = document.forms.register_form;
const apiUrl = "http://localhost:1337";

register_form.addEventListener('submit', register);

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