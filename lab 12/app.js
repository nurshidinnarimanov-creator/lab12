document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        showDashboard();
    } else {
        showLoginForm();
    }
});

function showLoginForm() {
    document.getElementById("app").innerHTML = `
        <div class="container">
            <h2>Вход</h2>
            <input id="email" placeholder="E-mail">
            <input id="password" type="password" placeholder="Пароль">
            <button onclick="login()">Войти</button>
        </div>
    `;
}

function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (!email || !pass) {
        alert("Введите данные!");
        return;
    }

    const fakeToken = generateFakeJWT(email);

    localStorage.setItem("token", fakeToken);

    showDashboard();
}

function showDashboard() {
    const token = localStorage.getItem("token");

    document.getElementById("app").innerHTML = `
        <div class="container">
            <h2>Личный кабинет</h2>
            <p>Вы успешно вошли в систему!</p>
            <p><b>Ваш токен:</b></p>
            <textarea style="width:100%; height:80px;">${token}</textarea>
            <button onclick="logout()">Выйти</button>
        </div>
    `;
}

function logout() {
    localStorage.removeItem("token");
    showLoginForm();
}

function generateFakeJWT(email) {
    const header = btoa(JSON.stringify({alg: "HS256", typ: "JWT"}));
    const payload = btoa(JSON.stringify({
        email: email,
        time: Date.now()
    }));
    const signature = btoa("secret");

    return `${header}.${payload}.${signature}`;
}