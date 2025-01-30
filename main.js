///eventebi da filterebi

document.addEventListener("DOMContentLoaded", () => {
    const categoryBtn = document.querySelector(".category-btn")
    const dropdown = document.querySelector(".dropdown")
    const searchButton = document.querySelector(".search-btn")
    const searchInput = document.querySelector(".search-input") 


    let selectedCategory = null

    const categories = [
        "United Kingdom",
        "Tokyo, Japan",
        "Colorado",
        "Alaska",
        "Alexander City",
        "Estes Park",
        "WalsenBurg",
        "New York"
    ]

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        const item = document.createElement("div")
        item.classList.add("dropdown-item")
        item.textContent = category

        item.addEventListener("click", () => {
            selectedCategory = category
            categoryBtn.innerHTML = `
                <img src="img/categories.png" alt="" class="CategoriesIcon">
                ${category}  <span class="arrow">▼</span>
            `
            dropdown.classList.add("hidden")
        })

        dropdown.appendChild(item)
    }

    categoryBtn.addEventListener("click", () => {
        dropdown.classList.toggle("hidden")
    })

    document.addEventListener("click", (event) => {
        if (!categoryBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden")
        }
    })

    let events = []
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            events = data
            renderEvents(events)
        })

    function renderEvents(eventList) {
        const container = document.getElementById("eventContainers")
        container.innerHTML = "" 
        eventList.forEach((event, index) => {
            const div = document.createElement("div")
            div.classList.add("content")

            if (index === 0) {
                div.innerHTML = `
                    <a href="Event Details.html" class="event-link">
                        <img src=${event.image} alt="">
                        <div class="date">${event.date}</div>
                        <h1>${event.title}</h1>
                        <div class="wrap">
                            <img src="img/mapMarker.png" alt="">
                            <p>${event.location}</p>
                        </div>
                    </a>
                `
            } else {
                div.innerHTML = `
                    <img src=${event.image} alt="">
                    <div class="date">${event.date}</div>
                    <h1>${event.title}</h1>
                    <div class="wrap">
                        <img src="img/mapMarker.png" alt="">
                        <p>${event.location}</p>
                    </div>
                `
            }

            container.appendChild(div)
        })
    }

    searchButton.addEventListener("click", () => {
        const searchText = searchInput.value.trim().toLowerCase()

        let filteredEvents = events

        if (selectedCategory) {
            filteredEvents = filteredEvents.filter(event => event.location === selectedCategory)
        }

        if (searchText) {
            filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(searchText))
        }

        if (filteredEvents.length === 0) {
            alert("No events found matching your search criteria.")
        }

        renderEvents(filteredEvents)
    })
})

