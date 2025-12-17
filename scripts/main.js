//тема
(function() {
    const storageKey = 'museum-theme';
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    const getStoredTheme = () => localStorage.getItem(storageKey);

    const getSystemTheme = () => 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = (theme) => {
        if (theme === 'light' || theme === 'dark') {
            root.setAttribute('data-theme', theme);
            localStorage.setItem(storageKey, theme);
        } else {
            root.removeAttribute('data-theme');
            localStorage.removeItem(storageKey);
        }
    };

    const initialTheme = getStoredTheme() || getSystemTheme();
    applyTheme(initialTheme);

    toggleBtn?.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || getSystemTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });
})();

//валид формы
(function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const validateField = (input, errorId, validator) => {
        const value = input.value.trim();
        const errorEl = document.getElementById(errorId);
        const error = validator(value);
        
        errorEl.textContent = error;
        input.classList.toggle('is-invalid', !!error);
        return !error;
    };

    const validators = {
        name: (value) => value.length < 2 ? 'Имя должно содержать минимум 2 символа' : '',
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Введите корректный email';
        },
        message: (value) => value.length < 10 ? 'Сообщение должно быть не короче 10 символов' : ''
    };

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const field = input.id;
            validateField(input, `error-${field}`, validators[field]);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateField(nameInput, 'error-name', validators.name);
        const isEmailValid = validateField(emailInput, 'error-email', validators.email);
        const isMessageValid = validateField(messageInput, 'error-message', validators.message);

        if (isNameValid && isEmailValid && isMessageValid) {
            alert('Сообщение отправлено!');
            form.reset();
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('is-invalid');
            });
        }
    });
})();

//скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
//бургер
(function() {
    const burgerBtn = document.querySelector('.burger');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (!burgerBtn || !mobileNav) return;

    burgerBtn.addEventListener('click', () => {
        const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        burgerBtn.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('mobile-nav--active');
        burgerBtn.classList.toggle('burger--active');
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('mobile-nav--active');
            burgerBtn.classList.remove('burger--active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('mobile-nav--active') && 
            !mobileNav.contains(e.target) && 
            !burgerBtn.contains(e.target)) {
            burgerBtn.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('mobile-nav--active');
            burgerBtn.classList.remove('burger--active');
            document.body.style.overflow = '';
        }
    });
})();