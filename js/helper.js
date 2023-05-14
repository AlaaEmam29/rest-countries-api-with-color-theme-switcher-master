const spinner = document.querySelector(".spinner")
const url = 'https://restcountries.com/v3.1'
const darkThemeBtn = document.querySelector(".toggle-theme")
const spanTheme = document.querySelector(".spanTheme")
const iconTheme  = document.querySelector(".iconTheme")
if (localStorage.getItem("darkTheme")) {
    document.body.classList.add("theme-dark")
    spanTheme.textContent = "Light Theme"
    iconTheme.classList.replace("fa-moon","fa-sun")

}
darkThemeBtn.addEventListener("click", function (e) {
    document.body.classList.toggle("theme-dark")
    if (document.body.classList.contains("theme-dark")) {
            spanTheme.textContent = "Light Theme"
    iconTheme.classList.replace("fa-moon","fa-sun")
        localStorage.setItem("darkTheme", "theme-dark")

    }
    else {
            spanTheme.textContent = "Dark Theme"
    iconTheme.classList.replace("fa-sun","fa-moon")

    localStorage.removeItem("darkTheme")
    }
})
const handleCommonFetch = async (query, region) => {
        const handleQ = region != 'all'?`${url}/${query}/${region.toLowerCase()}` : `${url}/${region.toLowerCase()}`

    const request = await fetch(handleQ)
    spinner.classList.add("hidden")
    const response = await request.json()
    return response
    
}

function formatter(data) {
    return Intl.NumberFormat("en", { notation: "compact" }).format(data)
}
function handlerNavigateToSingleCountry(countryContainer) {
    countryContainer.addEventListener("click", function (e) {
    const country = e.target.closest("a")
    if (!country) return
    const name = country.dataset.id
    localStorage.setItem("country",name.toLowerCase())
})
}
