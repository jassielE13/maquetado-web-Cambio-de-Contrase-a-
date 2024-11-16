document.addEventListener('DOMContentLoaded', () => {
    const changePasswordLink = document.getElementById('changePasswordLink');
    const changePasswordModal = document.getElementById('changePasswordModal');
    const closeModal = document.querySelector('.close');
    const generateCodeButton = document.getElementById('generateCodeButton');

    // Credenciales de ejemplo para usuarios
    const users = {
        "Usuario13@gmail.com": "12345678",
        "Admin13@gmail.com": "12345678",
    };

    // Mostrar la ventana modal
    changePasswordLink.addEventListener('click', (event) => {
        event.preventDefault();
        changePasswordModal.style.display = 'block';
    });

    // Cerrar la ventana modal
    closeModal.addEventListener('click', () => {
        changePasswordModal.style.display = 'none';
    });

    // Cerrar la ventana modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === changePasswordModal) {
            changePasswordModal.style.display = 'none';
        }
    });

    // Generar código de validación
    generateCodeButton.addEventListener('click', () => {
        const generatedCode = Math.floor(10000 + Math.random() * 90000);
        alert(`Tu código de validación es: ${generatedCode}`);
        document.getElementById('validationCode').value = generatedCode;
    });

    // Manejo del formulario de cambio de contraseña
    document.getElementById('changePasswordForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('modalEmail').value;
        const validationCode = document.getElementById('validationCode').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validar datos
        if (!email) {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        if (!users[email]) {
            alert("El correo electrónico no está registrado.");
            return;
        }

        if (!validationCode) {
            alert("Por favor, genera y ingresa el código de validación.");
            return;
        }

        if (newPassword.length < 8) {
            alert("La nueva contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Actualizar contraseña en el objeto de usuarios
        users[email] = newPassword;
        alert("Contraseña actualizada con éxito. Ahora puedes iniciar sesión.");
        changePasswordModal.style.display = 'none';
    });

    // Manejo del formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (users[email] === password) {
            alert(`Bienvenido, ${email.includes("Admin") ? "Admin" : "Usuario"}`);
            window.location.href = email.includes("Admin") ? "Admin.html" : "HTML.html";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
});
