const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearNode = document.querySelector('#year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});

const form = document.querySelector('#lead-form');
const errorNode = document.querySelector('#form-error');

if (form && errorNode) {
  form.addEventListener('submit', (event) => {
    errorNode.textContent = '';

    if (!form.checkValidity()) {
      event.preventDefault();
      errorNode.textContent = 'Por favor completá todos los campos obligatorios antes de enviar.';
      form.reportValidity();
      return;
    }

    const email = form.elements.email?.value?.trim() || '';
    const phone = form.elements.telefono?.value?.trim() || '';

    if (!email.includes('@')) {
      event.preventDefault();
      errorNode.textContent = 'Ingresá un email válido.';
      return;
    }

    if (phone.replace(/\D/g, '').length < 8) {
      event.preventDefault();
      errorNode.textContent = 'Ingresá un teléfono válido.';
    }
  });
}
