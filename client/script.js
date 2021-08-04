const register_form = document.forms.register_form;

register_form.addEventListener('submit', register);

function register(e) {
  e.preventDefault();
  const email = register_form.email.value;
  const password = register_form.password.value;

}