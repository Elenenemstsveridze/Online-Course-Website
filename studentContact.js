document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("contactForm")
    let nameInput = document.getElementById("nameInput")
    let emailInput = document.getElementById("emailInput")
    let websiteInput = document.getElementById("websiteInput")
    let messageInput = document.getElementById("messageInput")

    form.addEventListener("submit", (event) => {
        event.preventDefault() 

        if (!nameInput.value.trim() || !emailInput.value.trim() || !websiteInput.value.trim()) {
            showMessageBox("Error", "Please fill in all required fields: Name, Email, and Website.")
            return
        }

        sessionStorage.setItem("name", nameInput.value)
        sessionStorage.setItem("email", emailInput.value)
        sessionStorage.setItem("website", websiteInput.value)
        sessionStorage.setItem("message", messageInput.value)

        showMessageBox("Success", "Your message has been sent successfully.")
    })

    setInterval(() => {
      console.log("Saved data in sessionStorage:")
      console.log("Name:", sessionStorage.getItem("name"))
      console.log("Email:", sessionStorage.getItem("email"))
      console.log("Website:", sessionStorage.getItem("website"))
      console.log("Message:", sessionStorage.getItem("message"))
    }, 5000)
})

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
