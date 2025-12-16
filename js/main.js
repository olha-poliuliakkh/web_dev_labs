// 1. Connecting JS file: this file is connected via <script src="../js/main.js"></script>

// 2. Working with DOM - various manipulations and event handlers

// 2.1 Element manipulation - Find and change style of .home-card elements
function changeHomeCardStyles() {
    const homeCards = document.querySelectorAll('.home-card');
    homeCards.forEach(card => {
        card.style.backgroundColor = '#f0f8ff';
        card.style.color = '#2c3e50';
    });
}

// 2.2 Add new element to main container
function addElementToMain() {
    const main = document.querySelector('main');
    if (main) {
        // Create new element
        const newParagraph = document.createElement('p');
        newParagraph.textContent = ''; // Empty text as per user request
        newParagraph.id = 'dynamic-element';
        newParagraph.className = 'dynamic-item';
    }
}

// 2.3 Dynamic content change - Display current date in footer
function displayCurrentDate() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = currentDate.toLocaleDateString('uk-UA', options);
        footer.innerHTML = `&copy; 2025 Really Good Advices | Сьогодні: ${dateString}`;
    }
}

// 2.4 Create "Show more" accordion button - Hide existing content on page
function createAccordion() {
    // Find the last section in main (existing content to hide)
    const main = document.querySelector('main');
    if (main && !document.getElementById('show-more-btn')) {
        const sections = main.querySelectorAll('section');
        if (sections.length > 0) {
            // Get the last section to hide
            const lastSection = sections[sections.length - 1];
            lastSection.id = 'hideable-section';

            // Create the "Show more" button
            const accordionButton = document.createElement('button');
            accordionButton.id = 'show-more-btn';
            accordionButton.textContent = 'Показати більше';
            accordionButton.style.padding = '10px 20px';
            accordionButton.style.cursor = 'pointer';
            accordionButton.style.marginTop = '20px';
            accordionButton.style.marginBottom = '10px';
            accordionButton.style.display = 'block';

            // Insert button before the last section
            lastSection.parentNode.insertBefore(accordionButton, lastSection);

            // Initially hide the last section
            lastSection.style.display = 'none';

            // Add click event to toggle visibility
            accordionButton.addEventListener('click', function() {
                if (lastSection.style.display === 'none') {
                    lastSection.style.display = 'block';
                    accordionButton.textContent = 'Приховати';
                } else {
                    lastSection.style.display = 'none';
                    accordionButton.textContent = 'Показати більше';
                }
            });
        }
    }
}

// 3. Events and handlers

// 3.1 Theme change button
function createThemeButton() {
    if (!document.getElementById('theme-toggle-btn')) {
        const header = document.querySelector('header');
        if (header) {
            const themeButton = document.createElement('button');
            themeButton.id = 'theme-toggle-btn';
            themeButton.textContent = 'Змінити тему';
            themeButton.style.position = 'absolute';
            themeButton.style.right = '20px';
            themeButton.style.top = '20px';
            themeButton.style.padding = '10px 15px';
            themeButton.style.cursor = 'pointer';
            themeButton.style.borderRadius = '20px';
            themeButton.style.border = 'none';
            themeButton.style.backgroundColor = '#fff';
            themeButton.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
            header.style.position = 'relative';
            header.appendChild(themeButton);

            themeButton.addEventListener('click', toggleTheme);

            // Load saved theme from localStorage
            const savedTheme = localStorage.getItem('siteTheme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
            }
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        applyDarkTheme();
        localStorage.setItem('siteTheme', 'dark');
    } else {
        // Reset to original colors
        document.body.style.backgroundColor = '';
        document.body.style.color = '';

        // Reset header
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = '';
            const headerH1 = header.querySelector('h1');
            if (headerH1) headerH1.style.color = '';
        }

        // Reset all headings
        const h2Elements = document.querySelectorAll('h2');
        h2Elements.forEach(h2 => h2.style.color = '');

        const h3Elements = document.querySelectorAll('h3');
        h3Elements.forEach(h3 => h3.style.color = '');

        const h4Elements = document.querySelectorAll('h4');
        h4Elements.forEach(h4 => h4.style.color = '');

        // Reset navigation
        const nav = document.querySelector('nav');
        if (nav) nav.style.backgroundColor = '';

        // Reset footer
        const footer = document.querySelector('footer');
        if (footer) footer.style.backgroundColor = '';

        // Reset cards
        const cards = document.querySelectorAll('.home-card, .advice-card, .cooking-card');
        cards.forEach(card => {
            card.style.backgroundColor = '';
            card.style.color = '';
        });

        // Reset forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.style.backgroundColor = '';
            form.style.padding = '';
            form.style.borderRadius = '';

            const labels = form.querySelectorAll('label');
            labels.forEach(label => label.style.color = '');
        });

        // Reset inputs and textareas
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea, select');
        inputs.forEach(input => {
            input.style.backgroundColor = '';
            input.style.color = '';
            input.style.borderColor = '';
        });

        // Reset buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = '';
            button.style.color = '';
        });

        localStorage.setItem('siteTheme', 'light');
    }
}

// 3.2 Mouse events - Navigation menu highlighting
function setupNavigationHighlight() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('nav-highlight');
            this.style.backgroundColor = '#E6F4EC';
            this.style.color = '#29693F';
            this.style.padding = '5px 10px';
            this.style.borderRadius = '15px';
            this.style.transition = 'all 0.3s';
        });

        link.addEventListener('mouseleave', function() {
            this.classList.remove('nav-highlight');
            this.style.backgroundColor = '';
            this.style.color = '';
            this.style.padding = '';
        });
    });
}

// 3.2.2 Mouse events - Card hover effects with JavaScript
function setupCardHoverEffects() {
    // Get all card elements
    const allCards = document.querySelectorAll('.home-card, .advice-card, .cooking-card');

    allCards.forEach(card => {
        // Store original styles
        const originalTransform = card.style.transform || '';
        const originalBoxShadow = card.style.boxShadow || '';

        card.addEventListener('mouseenter', function() {
            this.classList.add('js-card-hover');
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('js-card-hover');
            this.style.transform = originalTransform;
            this.style.boxShadow = originalBoxShadow;
        });
    });

    // Also add hover effects to card icons
    const cardIcons = document.querySelectorAll('.home-card-icon, .card-icon');
    cardIcons.forEach(icon => {
        const parentCard = icon.closest('.home-card, .advice-card, .cooking-card');
        if (parentCard) {
            parentCard.addEventListener('mouseenter', function() {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            });

            parentCard.addEventListener('mouseleave', function() {
                icon.style.transform = '';
            });
        }
    });
}

// 3.3 Keyboard events - Font size change with arrow keys
function setupKeyboardFontControl() {
    let currentFontSize = 16;
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        document.body.style.fontSize = currentFontSize + 'px';
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            currentFontSize += 1;
            if (currentFontSize > 24) currentFontSize = 24;
            document.body.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('fontSize', currentFontSize);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            currentFontSize -= 1;
            if (currentFontSize < 10) currentFontSize = 10;
            document.body.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('fontSize', currentFontSize);
        }
    });
}

// 4. Forms and validation

function setupFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Disable HTML5 validation to use only JavaScript validation
        form.setAttribute('novalidate', 'novalidate');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Clear previous error messages
            const oldErrors = form.querySelectorAll('.error-message');
            oldErrors.forEach(error => error.remove());

            // Clear previous error styling
            const oldErrorFields = form.querySelectorAll('.error-field');
            oldErrorFields.forEach(field => {
                field.classList.remove('error-field');
                field.style.removeProperty('border');
                field.style.removeProperty('outline');
            });

            let isValid = true;
            const formData = {};

            // Get all form fields
            const nameField = form.querySelector('#name, input[name="name"]');
            const emailField = form.querySelector('#email, input[type="email"]');
            const messageField = form.querySelector('#message, textarea[name="message"]');
            const contactTypeField = form.querySelector('#contact-type');
            const contactInfoField = form.querySelector('#contact-info');

            // Validation for name field (at least 3 characters)
            if (nameField) {
                const nameValue = nameField.value.trim();
                formData.name = nameValue;

                if (nameValue.length < 3) {
                    showError(nameField, "Ім'я повинно містити принаймні 3 символи");
                    isValid = false;
                }
            }

            // Validation for email field (contains @ and domain)
            if (emailField) {
                const emailValue = emailField.value.trim();
                formData.email = emailValue;

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailValue)) {
                    showError(emailField, "Email повинен містити @ та домен (наприклад, user@example.com)");
                    isValid = false;
                }
            }

            // Validation for message field (at least 10 characters)
            if (messageField) {
                const messageValue = messageField.value.trim();
                formData.message = messageValue;

                if (messageValue.length < 10) {
                    showError(messageField, "Повідомлення повинно містити принаймні 10 символів");
                    isValid = false;
                }
            }

            // Validation for contact type
            if (contactTypeField) {
                const contactTypeValue = contactTypeField.value;
                formData.contactType = contactTypeValue;

                if (!contactTypeValue) {
                    showError(contactTypeField, "Оберіть спосіб зв'язку");
                    isValid = false;
                }
            }

            // Validation for contact info
            if (contactInfoField) {
                const contactInfoValue = contactInfoField.value.trim();
                formData.contactInfo = contactInfoValue;

                if (contactInfoValue.length < 3) {
                    showError(contactInfoField, "Введіть коректну контактну інформацію");
                    isValid = false;
                }
            }

            // If validation is successful
            if (isValid) {
                console.log('Дані форми:', formData);

                // Clear form
                form.reset();

                // Show success message
                showSuccessMessage(form, 'Форму успішно відправлено!');
            }
        });
    });
}

function showError(field, message) {
    field.classList.add('error-field');
    field.style.setProperty('border', '2px solid red', 'important');
    field.style.setProperty('outline', '2px solid red', 'important');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.marginBottom = '10px';
    errorDiv.style.fontWeight = 'bold';
    errorDiv.style.display = 'block';

    // Insert error message after the field
    let nextElement = field.nextSibling;
    while (nextElement && nextElement.nodeName === 'BR') {
        nextElement = nextElement.nextSibling;
    }

    if (nextElement) {
        field.parentNode.insertBefore(errorDiv, nextElement);
    } else {
        field.parentNode.appendChild(errorDiv);
    }
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = 'green';
    successDiv.style.backgroundColor = '#d4edda';
    successDiv.style.padding = '15px';
    successDiv.style.marginTop = '20px';
    successDiv.style.borderRadius = '5px';
    successDiv.style.border = '1px solid green';
    successDiv.style.fontWeight = 'bold';

    form.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// 5. Local Storage implementation

function loadThemeFromLocalStorage() {
    // Apply saved theme from localStorage
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        applyDarkTheme();
    }
}

// Function to apply dark theme styles
function applyDarkTheme() {
    // Dark theme colors
    const darkBgColor = '#0F2F1F'; // Main background
    const darkTextColor = '#E6F4EC'; // Main text

    const darkHeaderBg = '#143D2A'; // Header background
    const darkHeaderTextColor = '#E6F4EC'; // Header h1 text

    const darkH2Color = '#9AD8B3'; // H2 headings
    const darkH3Color = '#7FCFA3'; // H3 headings
    const darkH4Color = '#62B880'; // H4 headings (brand green)

    const darkNavBg = '#0B2418'; // Navigation background

    const darkCardBg = '#1C4F36'; // Cards background

    const darkButtonBg = '#62B880'; // Primary button
    const darkButtonTextColor = '#0F2F1F'; // Button text

    const darkFooterBg = '#143D2A'; // Footer background

    const darkFormBg = '#1C4F36'; // Form background
    const darkFormTextColor = '#E6F4EC'; // Form labels

    const darkInputBg = '#0F2F1F'; // Input background
    const darkInputTextColor = '#E6F4EC'; // Input text
    const darkInputBorderColor = '#62B880'; // Input border

    document.body.style.backgroundColor = darkBgColor;
    document.body.style.color = darkTextColor;

    // Apply dark theme to header
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = darkHeaderBg;
        const headerH1 = header.querySelector('h1');
        if (headerH1) headerH1.style.color = darkHeaderTextColor;
    }

    // Apply dark theme to all headings
    const h2Elements = document.querySelectorAll('h2');
    h2Elements.forEach(h2 => h2.style.color = darkH2Color);

    const h3Elements = document.querySelectorAll('h3');
    h3Elements.forEach(h3 => h3.style.color = darkH3Color);

    const h4Elements = document.querySelectorAll('h4');
    h4Elements.forEach(h4 => h4.style.color = darkH4Color);

    // Apply dark theme to navigation
    const nav = document.querySelector('nav');
    if (nav) nav.style.backgroundColor = darkNavBg;

    // Apply dark theme to footer
    const footer = document.querySelector('footer');
    if (footer) footer.style.backgroundColor = darkFooterBg;

    // Apply dark theme to all cards
    const cards = document.querySelectorAll('.home-card, .advice-card, .cooking-card');
    cards.forEach(card => {
        card.style.backgroundColor = darkCardBg;
        card.style.color = darkTextColor;
    });

    // Apply dark theme to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.style.backgroundColor = darkFormBg;
        form.style.padding = '20px';
        form.style.borderRadius = '8px';

        // Form labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => label.style.color = darkFormTextColor);
    });

    // Apply dark theme to inputs and textareas
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea, select');
    inputs.forEach(input => {
        input.style.backgroundColor = darkInputBg;
        input.style.color = darkInputTextColor;
        input.style.borderColor = darkInputBorderColor;
    });

    // Apply dark theme to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = darkButtonBg;
        button.style.color = darkButtonTextColor;
    });
}


// Inizialization on DOMContentLoaded


document.addEventListener('DOMContentLoaded', function() {
    // DOM manipulation
    changeHomeCardStyles();
    addElementToMain();
    displayCurrentDate();
    createAccordion();

    // Events
    createThemeButton();
    setupNavigationHighlight();
    setupCardHoverEffects();
    setupKeyboardFontControl();

    // Forms
    setupFormValidation();

    // LocalStorage
    loadThemeFromLocalStorage();

    console.log('JavaScript успішно підключено та ініціалізовано!');
});
