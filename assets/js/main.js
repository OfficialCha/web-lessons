document.addEventListener("DOMContentLoaded", (event) => initializeApp())

function showError(inputElement, errorElement) {
    inputElement.classList.add("error")
    errorElement.style.opacity = 1
    inputElement.previousElementSibling.classList.add("error")
}

function hideError(inputElement, errorElement) {
    inputElement.classList.remove("error")
    errorElement.style.opacity = 0
    inputElement.previousElementSibling.classList.remove("error")
}

function initializeApp() {
    const submitButton = document.getElementById('submitButton')
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const telegramInput = document.getElementById('telegram')
    const messageInput = document.getElementById('message')
    const firstNameError = document.getElementById('firstNameError')
    const lastNameError = document.getElementById('lastNameError')
    const telegramError = document.getElementById('telegramError')
    const messageError = document.getElementById('messageError')
    const menuToggle = document.getElementById('menuToggle')
    const mobileMenu = document.getElementById('mobileMenu')

    if (submitButton) {
        submitButton.addEventListener("click", handleSubmit)

        firstNameInput.addEventListener("input", () => {
            hideError(firstNameInput, firstNameError)
        })
        lastNameInput.addEventListener("input", () => {
            hideError(lastNameInput, lastNameError)
        })
        telegramInput.addEventListener("input", () => {
            hideError(telegramInput, telegramError)
        })
        messageInput.addEventListener("input", () => {
            hideError(messageInput, messageError)
        })
    }

    let isMenuOpen = false

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            if (!isMenuOpen) {
                openMobileMenu()
            } else {
                closeMobileMenu()
            }
        })

        const menuItems = document.querySelectorAll('.mobile-menu-item')
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target')
                const targetElement = document.getElementById(targetId)
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' })
                }
                
                closeMobileMenu()
            })
        })

        mobileMenu.addEventListener('click', function(event) {
            if (event.target === mobileMenu) {
                closeMobileMenu()
            }
        })
    }

    function openMobileMenu() {
        menuToggle.classList.add('active')
        mobileMenu.classList.add('active')
        document.body.style.overflow = 'hidden'
        isMenuOpen = true
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active')
        mobileMenu.classList.remove('active')
        document.body.style.overflow = 'auto'
        isMenuOpen = false
    }
}

function handleSubmit(event) {
    event.preventDefault()

    const firstName = document.getElementById('firstName').value.trim()
    const lastName = document.getElementById('lastName').value.trim()
    const telegram = document.getElementById('telegram').value.trim()
    const message = document.getElementById('message').value.trim()

    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const telegramInput = document.getElementById('telegram')
    const messageInput = document.getElementById('message')
    const firstNameError = document.getElementById('firstNameError')
    const lastNameError = document.getElementById('lastNameError')
    const telegramError = document.getElementById('telegramError')
    const messageError = document.getElementById('messageError')

    if (firstName === "" || lastName === "" || telegram === "" || message === "") {
        if (firstName === "") {
            showError(firstNameInput, firstNameError)
        }
        if (lastName === "") {
            showError(lastNameInput, lastNameError)
        }
        if (telegram === "") {
            showError(telegramInput, telegramError)
        }
        if (message === "") {
            showError(messageInput, messageError)
        }
    } else {
        alert(`Спасибо за ваше сообщение!\n\nИмя: ${firstName}\nФамилия: ${lastName}\nТелеграм: ${telegram}\nСообщение: ${message}\n\nЯ свяжусь с вами в ближайшее время!`)
        
        document.getElementById('firstName').value = ''
        document.getElementById('lastName').value = ''
        document.getElementById('telegram').value = ''
        document.getElementById('message').value = ''
    }
}