let users = [
    { email: "example@example.com", password: "password123", firstName: "example1" },
    { email: "test@test.com", password: "mypassword", firstName: "example2" }
]

function handleSignUp(event) {
    event.preventDefault()

    let firstNameInput = document.getElementById("first-name")
    let lastNameInput = document.getElementById("last-name")
    let emailInput = document.getElementById("email")
    let passwordInput = document.getElementById("password")
    let confirmPasswordInput = document.getElementById("confirm-password")

    resetInputStyles([firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput])

    let hasError = false

    if (firstNameInput.value.trim() === "") {
        displayError(firstNameInput, "First name is required.")
        hasError = true
    }

    if (lastNameInput.value.trim() === "") {
        displayError(lastNameInput, "Last name is required.")
        hasError = true
    }

    if (emailInput.value.trim() === "") {
        displayError(emailInput, "Email is required.")
        hasError = true
    } else {
        let storedUsers = JSON.parse(localStorage.getItem('users')) || users
        if (storedUsers.find(user => user.email === emailInput.value.trim())) {
            showMessageBox("Error", "This email is already registered.")
            hasError = true
        }
    }

    if (passwordInput.value.trim() === "") {
        displayError(passwordInput, "Password is required.")
        hasError = true
    } else if (passwordInput.value.length <= 6) {
        displayError(passwordInput, "The password must be longer than six characters.")
        hasError = true
    }

    if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
        displayError(confirmPasswordInput, "Passwords do not match.")
        hasError = true
    }

    if (hasError) return

    let newUser = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    }

    let storedUsers = JSON.parse(localStorage.getItem('users')) || users
    storedUsers.push(newUser)

    localStorage.setItem('users', JSON.stringify(storedUsers))

    showMessageBox("Success", "Sign-Up Successful!", () => {
        window.location.href = "StudentLogin.html"
    })

    document.querySelector(".signUpForm").reset()
}

function resetInputStyles(inputs) {
    inputs.forEach(input => {
        input.style.border = ""
        const errorText = input.nextElementSibling

        if (errorText && errorText.classList.contains("error-text")) {
            errorText.remove()
        }
    })
}

function displayError(input, message) {
    input.style.border = "2px solid red"
    const errorText = document.createElement("p")

    errorText.classList.add("error-text")
    errorText.style.color = "red"

    errorText.textContent = message
    input.insertAdjacentElement("afterend", errorText)
}

function showMessageBox(title, message, callback = null) {
    let modal = document.createElement("div")
    modal.classList.add("message-box")

    modal.innerHTML = `
        <div class="message-box-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <button class="message-box-close">OK</button>
        </div>
    `

    document.body.appendChild(modal)

    document.querySelector(".message-box-close").addEventListener("click", () => {
        modal.remove()
        if (callback) callback()
    })
}

document.querySelector(".signUpForm").addEventListener("submit", handleSignUp)

///log in

function handleSignIn(event) {
    event.preventDefault()

    let email = document.getElementById("email").value.trim()
    let password = document.getElementById("password").value.trim()

    resetInputStyles([document.getElementById("email"), document.getElementById("password")])

    let hasError = false

    if (email === "") {
        displayError(document.getElementById("email"), "Email is required.")
        hasError = true
    }

    if (password === "") {
        displayError(document.getElementById("password"), "Password is required.")
        hasError = true
    } else if (password.length <= 6) {
        displayError(document.getElementById("password"), "The password must be longer than six characters.")
        hasError = true
    }

    if (hasError) return

    let users = JSON.parse(localStorage.getItem('users')) || []

    let user = users.find(user => user.email === email && user.password === password)
    if (!user) {
        showMessageBox("Error", "Invalid email or password.")
        return
    }

    showMessageBox("Success", `Welcome, ${user.firstName}!`, () => {
        window.location.href = "index.html"
    })
}
