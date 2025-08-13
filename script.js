function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    console.log("Sidebar toggled, classes:", sidebar.classList); // Debug log
}
const form = document.getElementById('contact-form');
const sendButton = document.getElementById('send-button');
const notification = document.getElementById('notification');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('char-count');

messageInput.addEventListener('input', function() {
    const max = 500;
    const count = this.value.length;
    charCount.textContent = `${count}/${max}`;
    charCount.style.color = count > max ? '#e74c3c' : '#444';
});

function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    if (!name) {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    if (!subject) {
        document.getElementById('subject-error').style.display = 'block';
        isValid = false;
    }

    if (!message) {
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
    } else if (message.length > 500) {
        document.getElementById('message-error').textContent = 'Message too long (max 500)';
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';
        setTimeout(() => {
            showNotification('Message sent!', 'success');
            form.reset();
            charCount.textContent = '0/500';
            sendButton.disabled = false;
            sendButton.textContent = 'Send';
        }, 1000);
    } else {
        showNotification('Please check the form', 'error');
    }
});
