const form = document.getElementById("loginForm");
const message = document.getElementById("message");

function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const users = getUsers();
    const existing = users.find(function (user) {
        return user.email === email;
    });

    if (existing) {
        if (existing.password === password) {
            localStorage.setItem("currentUser", email);
            message.style.color = "#16a34a";
            message.textContent = "Hesaba daxil olundu.";
        } else {
            message.style.color = "#dc2626";
            message.textContent = "Şifrə yanlışdır.";
        }
        return;
    }

    users.push({ email: email, password: password });
    saveUsers(users);
    localStorage.setItem("currentUser", email);

    message.style.color = "#16a34a";
    message.textContent = "Hesab yadda saxlanıldı.";
    form.reset();
});