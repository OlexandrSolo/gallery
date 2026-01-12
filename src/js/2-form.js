const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = {
    email: '',
    message: ''
}

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
    try {
        const parseData = JSON.parse(savedData);
        form.email.value = parseData.email || '';
        form.message.value = parseData.message || ''
    } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.value || !form.message.value) {
        alert('Please fill in all the fields!');
        return;
    }

    if (!emailPattern.test(formData.email)) {
        alert('Invalid email');
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    form.reset();

    formData = { email: '', message: '' };
})

form.addEventListener('input', ({ target }) => {
    const { name, value } = target;
    formData[name] = value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
});