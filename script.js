
const avatarInput = document.getElementById('avatar-input');
const errorMessage = document.getElementById('error-message');
const emailInput = document.querySelector('input[type="email"]');
const emailError = document.getElementById('email-error');
const emailErrorContainer = document.getElementById('email-error-container');
const uploadIcon = document.querySelector('.upload-icon');
const uploadText = document.querySelector('.upload-text');
const avatarActions = document.getElementById('avatar-actions');
const removeBtn = document.getElementById('remove-avatar-btn');
const changeBtn = document.getElementById('change-avatar-btn');
const ticketForm = document.getElementById('ticket-form');
const nameInput = document.getElementById('full-name');
const nameErrorContainer = document.getElementById('name-error-container');
const githubInput = document.getElementById('github-username');
const githubErrorContainer = document.getElementById('github-error-container');
const avatarErrorContainer = errorMessage.parentElement;
const formSection = document.getElementById('form-section');
const ticketSection = document.getElementById('ticket-section');

avatarInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    const maxFile = 500 * 1024
    if(selectedFile) {
        if(selectedFile.size > maxFile) {
            errorMessage.textContent = 'File size exceeds 500KB. Please upload a smaller image.';
            avatarErrorContainer.classList.add('active-error');
            resetDropzone();
        } else {
            errorMessage.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
            avatarErrorContainer.classList.remove('active-error');

            // Create preview link
            const previewUrl = URL.createObjectURL(selectedFile);
            uploadIcon.src = previewUrl;
            uploadIcon.classList.add('has-avatar');
            
            // Toggle UI elements
            uploadText.classList.add('hidden');
            avatarActions.classList.remove('hidden');
        }
    }
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('blur', () => {
    const emailValue = emailInput.value.trim();
    const isValid = EMAIL_REGEX.test(emailValue);

    if (emailValue !== '' && !isValid) {
        emailInput.classList.add('input-error');
        emailErrorContainer.classList.remove('hidden');
        emailErrorContainer.classList.add('active-error');
    } else {
        emailInput.classList.remove('input-error');
        emailErrorContainer.classList.add('hidden'); 
        emailErrorContainer.classList.remove('active-error');
    }
});

function resetDropzone() {
    avatarInput.value = '';
    uploadIcon.src = 'images/icon-upload.svg';
    uploadIcon.classList.remove('has-avatar');
    uploadText.classList.remove('hidden');
    avatarActions.classList.add('hidden');
}

removeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents label click propagation
    e.stopPropagation();
    resetDropzone();
});

changeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents default button behavior
    e.stopPropagation();
    avatarInput.click(); // Re-opens file dialog window
});

ticketForm.addEventListener('submit', (event) => {
    // Stop the page from refreshing immediately
    event.preventDefault();

    // Keep track of whether the whole form is valid
    let isFormValid = true;

    // Check Avatar Upload
    if (avatarInput.files.length === 0) {
        errorMessage.textContent = 'Please upload a photo (JPG or PNG, max size: 500KB).';
        avatarErrorContainer.classList.add('active-error');
        isFormValid = false;
    }

    // Check Email Address
    const emailValue = emailInput.value.trim();
    if (emailValue === '' || !EMAIL_REGEX.test(emailValue)) {
        emailInput.classList.add('input-error');
        emailErrorContainer.classList.remove('hidden');
        emailErrorContainer.classList.add('active-error');
        isFormValid = false;
    } else {
        emailInput.classList.remove('input-error');
        emailErrorContainer.classList.add('hidden');
        emailErrorContainer.classList.remove('active-error');
    }

    // Check Full Name
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('input-error');
        nameErrorContainer.classList.remove('hidden');
        isFormValid = false; // Flag that something failed!
    } else {
        nameInput.classList.remove('input-error');
        nameErrorContainer.classList.add('hidden');
    }

    // Check GitHub Username
    if (githubInput.value.trim() === '') {
        githubInput.classList.add('input-error');
        githubErrorContainer.classList.remove('hidden');
        isFormValid = false; // Flag that something failed!
    } else {
        githubInput.classList.remove('input-error');
        githubErrorContainer.classList.add('hidden');
    }

    // If ALL checks passed, inject user data and swap screens!
    if (isFormValid) {
        const cleanName = nameInput.value.trim();
        const cleanEmail = emailInput.value.trim();
        let cleanGithub = githubInput.value.trim();

        // Automatically add '@' if the user forgot to type it
        if (!cleanGithub.startsWith('@')) {
            cleanGithub = `@${cleanGithub}`;
        }

        // Generate a random 5-digit ticket number (e.g. #04821)
        const randomTicketNum = `#${String(Math.floor(10000 + Math.random() * 90000))}`;

        // Populate ticket elements
        document.getElementById('ticket-name-heading').textContent = cleanName;
        document.getElementById('ticket-email-display').textContent = cleanEmail;
        document.getElementById('ticket-card-name').textContent = cleanName;
        document.getElementById('ticket-card-github').textContent = cleanGithub;
        document.getElementById('ticket-card-avatar').src = uploadIcon.src;
        document.getElementById('ticket-number').textContent = randomTicketNum;

        // Swap the views
        formSection.classList.add('hidden');
        ticketSection.classList.remove('hidden');
    }
});
console.log('Avatar Input:', avatarInput);
console.log('Email Input:', emailInput);