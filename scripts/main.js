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

//бургер
(function() {
    const burgerBtn = document.querySelector('.burger');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (!burgerBtn || !mobileNav) return;

    burgerBtn.addEventListener('click', () => {
        const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        
        burgerBtn.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('mobile-nav-active');
        
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav_link').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('mobile-nav-active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('mobile-nav-active') && 
            !mobileNav.contains(e.target) && 
            !burgerBtn.contains(e.target)) {
            burgerBtn.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('mobile-nav-active');
            document.body.style.overflow = '';
        }
    });
})();



//стикииииииииииииииииииииии
(function() {
    const contactWidget = document.getElementById('contact-widget');
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const burgerBtn = document.querySelector('.burger');
    
    const desktopContactLink = document.querySelector('.nav_link[href="#contact"]');
    
    if (!contactModal) return;
    

    const openModal = () => {
        contactModal.classList.add('contact-modal-active');
        document.body.style.overflow = 'hidden';
    };
    

    const closeModal = () => {
        contactModal.classList.remove('contact-modal-active');
        document.body.style.overflow = '';
    };
    

    contactWidget?.addEventListener('click', openModal);
    

    desktopContactLink?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('contact-modal-active')) {
            closeModal();
        }
    });
})();

(function() {

    const searchInput = document.getElementById('search-input');
    const searchInputMobile = document.getElementById('search-input-mobile');
    const clearButton = document.getElementById('clear-search');
    const clearButtonMobile = document.getElementById('clear-search-mobile');
    const main = document.querySelector('main');
    const sections = main.querySelectorAll('.section');
    

    const getActiveSearchInput = () => {
        return window.innerWidth >= 768 ? searchInput : searchInputMobile;
    };
    
    const getActiveClearButton = () => {
        return window.innerWidth >= 768 ? clearButton : clearButtonMobile;
    };
    

    const originalHTML = {};
    sections.forEach(section => {
        originalHTML[section.id || section.className] = section.innerHTML;
    });
    

    const normalizeText = (text) => {
        return text.toLowerCase().replace(/\s+/g, ' ').trim();
    };

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    

    const removeAllHighlights = () => {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const textNode = document.createTextNode(highlight.textContent);
            highlight.parentNode.replaceChild(textNode, highlight);
        });
    };
    

    const restoreOriginalSections = () => {
        sections.forEach(section => {
            const key = section.id || section.className;
            if (originalHTML[key]) {
                section.innerHTML = originalHTML[key];
            }
            section.classList.remove('hidden');
        });
    };
    

    const highlightMatches = (element, searchText) => {
        if (!searchText || searchText.length < 2) return;
        
        const normalizedSearch = normalizeText(searchText);
        const escapedSearch = escapeRegExp(normalizedSearch);
        const regex = new RegExp(`(${escapedSearch})`, 'gi');
        
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentNode.tagName === 'SCRIPT' || 
                        node.parentNode.tagName === 'STYLE' ||
                        node.parentNode.classList?.contains('search-highlight')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (node.textContent.trim().length === 0) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        const nodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (regex.test(node.textContent)) {
                nodes.push(node);
            }
        }
        

        nodes.forEach(textNode => {
            const span = document.createElement('span');
            const parent = textNode.parentNode;
            
            if (parent.classList?.contains('search-highlight')) {
                return;
            }
            
            const text = textNode.textContent;
            const highlightedHTML = text.replace(regex, '<span class="search-highlight">$1</span>');
            
            span.innerHTML = highlightedHTML;
            parent.replaceChild(span, textNode);
        });
    };
    
    let searchTimeout;
    

    const performSearch = (searchText) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        

        if (!searchText.trim()) {
            hideNoResults();
            removeAllHighlights();
            restoreOriginalSections();
            showAllSections();
            updateClearButton(false);
            return;
        }
        

        searchTimeout = setTimeout(() => {

            restoreOriginalSections();
            
            const normalizedSearch = normalizeText(searchText);
            let foundCount = 0;
            
            sections.forEach(section => {
                const sectionText = normalizeText(section.textContent);
                const hasMatch = sectionText.includes(normalizedSearch);
                
                if (hasMatch) {
                    section.style.display = 'block';
                    section.classList.remove('hidden');
                    highlightMatches(section, normalizedSearch);
                    foundCount++;
                } else {
                    section.style.display = 'none';
                    section.classList.add('hidden');
                }
            });
            

            if (foundCount === 0) {
                showNoResults(searchText);
            } else {
                hideNoResults();
            }
            

            updateClearButton(true);
        }, 500);
    };
    

    const updateClearButton = (show) => {
        const activeClearButton = getActiveClearButton();
        if (activeClearButton) {
            activeClearButton.style.display = show ? 'flex' : 'none';
        }
    };
    

    const showNoResults = (searchQuery) => {
        const noResults = document.getElementById('no-results');
        const querySpan = document.querySelector('.no-results_query');
        
        if (noResults && querySpan) {
            querySpan.textContent = searchQuery;
            noResults.style.display = 'block';
        }
    };
    
    const hideNoResults = () => {
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    };
    

    const showAllSections = () => {
        sections.forEach(section => {
            section.style.display = 'block';
            section.classList.remove('hidden');
        });
    };
    

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                performSearch('');
                searchInput.focus();
            }
        });
        
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                performSearch('');
                searchInput.focus();
            });
        }
    }
    

    if (searchInputMobile) {
        searchInputMobile.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        
        searchInputMobile.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInputMobile.value = '';
                performSearch('');
                searchInputMobile.focus();
            }
        });
        
        if (clearButtonMobile) {
            clearButtonMobile.addEventListener('click', () => {
                searchInputMobile.value = '';
                performSearch('');
                searchInputMobile.focus();
            });
        }
    }
    

    window.addEventListener('resize', () => {
        const activeInput = getActiveSearchInput();
        if (activeInput && activeInput.value.trim()) {
            updateClearButton(true);
        }
    });
})();
