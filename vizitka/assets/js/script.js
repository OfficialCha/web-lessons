// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const commentsInput = document.getElementById('comments');
    const charCounter = document.getElementById('charCounter');
    const addInterestBtn = document.getElementById('addInterest');
    const interestList = document.getElementById('interestList');
    const resultDiv = document.getElementById('result');
    
    // Обработчик события для подсчета символов в реальном времени
    commentsInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = parseInt(this.getAttribute('maxlength'));
        const remaining = maxLength - currentLength;
        
        charCounter.textContent = `Осталось символов: ${remaining}`;
        
        // Изменяем цвет счетчика в зависимости от количества оставшихся символов
        if (remaining <= 20) {
            charCounter.className = 'char-counter warning';
        } else if (remaining <= 0) {
            charCounter.className = 'char-counter error';
        } else {
            charCounter.className = 'char-counter';
        }
    });
    
    // Обработчик для добавления новых полей интересов
    addInterestBtn.addEventListener('click', function() {
        const newInterest = document.createElement('input');
        newInterest.setAttribute('type', 'text');
        newInterest.setAttribute('name', 'interest');
        newInterest.setAttribute('placeholder', 'Новый интерес');
        newInterest.className = 'interest-input';
        
        interestList.appendChild(newInterest);
    });
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Отключаем стандартную отправку формы
        
        // Очищаем предыдущие ошибки
        clearErrors();
        
        // Проверяем валидность формы
        if (validateForm()) {
            // Если форма валидна, выводим данные
            displayResults();
        }
    });
    
    // Функция для очистки сообщений об ошибках
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Функция валидации формы
    function validateForm() {
        let isValid = true;
        
        // Проверка имени
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            document.getElementById('nameError').textContent = 'Имя не должно быть пустым';
            isValid = false;
        }
        
        // Проверка возраста
        const ageValue = parseInt(ageInput.value);
        if (isNaN(ageValue) || ageValue <= 0 || ageValue > 120) {
            document.getElementById('ageError').textContent = 'Возраст должен быть числом от 1 до 120';
            isValid = false;
        }
        
        // Проверка пола
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        if (!genderSelected) {
            document.getElementById('genderError').textContent = 'Пожалуйста, выберите пол';
            isValid = false;
        }
        
        // Проверка интересов (чекбоксы и динамически добавленные поля)
        const interestsCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
        const dynamicInterests = document.querySelectorAll('input[name="interest"]');
        
        // Проверяем, есть ли хотя бы один выбранный чекбокс или заполненное динамическое поле
        let hasInterests = interestsCheckboxes.length > 0;
        
        // Проверяем динамически добавленные поля
        dynamicInterests.forEach(input => {
            if (input.value.trim() !== '') {
                hasInterests = true;
            }
        });
        
        if (!hasInterests) {
            document.getElementById('interestsError').textContent = 'Пожалуйста, выберите или добавьте хотя бы один интерес';
            isValid = false;
        }
        
        // Проверка комментария
        const commentsValue = commentsInput.value.trim();
        if (commentsValue.length > 200) {
            document.getElementById('commentsError').textContent = 'Комментарий не должен превышать 200 символов';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Функция для отображения результатов
    function displayResults() {
        // Получаем значения из формы
        const name = nameInput.value.trim();
        const age = ageInput.value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const genderText = getGenderText(gender);
        
        // Получаем выбранные интересы
        const interestsCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
        const interests = Array.from(interestsCheckboxes).map(cb => getInterestText(cb.value));
        
        // Получаем динамически добавленные интересы
        const dynamicInterests = document.querySelectorAll('input[name="interest"]');
        dynamicInterests.forEach(input => {
            if (input.value.trim() !== '') {
                interests.push(input.value.trim());
            }
        });
        
        const comments = commentsInput.value.trim();
        
        // Формируем HTML для отображения результатов
        let resultHTML = '<h3>Спасибо за вашу заявку!</h3>';
        resultHTML += '<div class="result-data">';
        resultHTML += `<p><strong>Имя:</strong> ${name}</p>`;
        resultHTML += `<p><strong>Возраст:</strong> ${age}</p>`;
        resultHTML += `<p><strong>Пол:</strong> ${genderText}</p>`;
        resultHTML += `<p><strong>Интересы:</strong> ${interests.join(', ')}</p>`;
        resultHTML += `<p><strong>Комментарии:</strong> ${comments}</p>`;
        resultHTML += '</div>';
        
        // Отображаем результаты
        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = 'block';
        
        // Прокручиваем страницу к результатам
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Вспомогательные функции для преобразования значений
    function getGenderText(genderValue) {
        switch(genderValue) {
            case 'male': return 'Мужской';
            case 'female': return 'Женский';
            case 'other': return 'Другой';
            default: return 'Не указан';
        }
    }
    
    function getInterestText(interestValue) {
        switch(interestValue) {
            case 'sport': return 'Спорт';
            case 'music': return 'Музыка';
            case 'movies': return 'Кино';
            case 'books': return 'Книги';
            default: return interestValue;
        }
    }
});