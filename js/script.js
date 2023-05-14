"use strict"
const searchInput = document.querySelector("input")
const drowpdown = document.querySelector("select")
const row = document.querySelector(".row")
const nxtPaginitation = document.querySelector(".btns .btn-next")
const prevPaginitation = document.querySelector(".btns .btn-prev")
const form = document.querySelector("form")
const countriesLength = 10
let countries = []
let changed = false;

const drowpdownCountries = document.querySelector(".drowpdownCountries")
function handleCountries(response) {
const lenPerArray = Math.ceil(response.length  / countriesLength)

  return  Array.from({ length: lenPerArray }, (_, i) => {
            const start = i * countriesLength
            const end = start + countriesLength
            return response.slice(start , end)
         })
        
}

searchInput.addEventListener("input", (e) => {

    if (!e.target.value) return
    const country = e.target.value.toLowerCase()
    console.log(country)
        countries = []
    fetchReigion("name", country);

})
let currIndex = 0

const fetchReigion = async (query , region) => {
    spinner.classList.remove("hidden")

    try {
        const response = await handleCommonFetch(query, region)
        console.log(response , region)
            handleCountries(response).forEach(c => countries.push(c))
            displayCountries(countries[currIndex])
    }
    catch (error) {
        nxtPaginitation.classList.add("hidden")
        prevPaginitation.classList.add("hidden")

        spinner.classList.add("hidden")
        row.innerHTML = '<h2>Country Not Exist Try Another Country</h2>'
        console.log(error)
        
    }
}

function displayCountries(data) {
    console.log(data , changed)
    row.innerHTML = ''
    let html = data.map((country) => {
        const {
            name: { common },
            capital,
            population,
            cca3,
            region,
            flags: { svg },
        } = country;
     
        return `
        <a href="country.html" class="country" data-id="${cca3}">
        <img src='${svg}' alt="">
        <div class="info">
        <h2>
        <strong>${common}</strong>
        </h2>
        <p><span>Population:</span> ${formatter(population)} </p>
        <p><span>Region: </span>${region}</p>
        <p><span>Capital: </span>${capital}</p>
        </div>
        </a>
        `;
    }).join(" ");
  row.innerHTML = html;
if (currIndex == 0) {
        prevPaginitation.classList.add("hidden")
    }
  return html;
}
nxtPaginitation.addEventListener("click", function (e) {
    currIndex += 1
    if (currIndex > countries.length - 1) {
        nxtPaginitation.classList.add("hidden")
        return
    }
    else {
        nxtPaginitation.classList.remove("hidden")
    }
    prevPaginitation.classList.remove("hidden")


        displayCountries(countries[currIndex])  
})    
prevPaginitation.addEventListener("click", function (e) {
    
    currIndex -= 1
    
    if (currIndex < 0) {
        prevPaginitation.classList.add("hidden")
        return
    }
    else {
        prevPaginitation.classList.remove("hidden")
    }
    nxtPaginitation.classList.remove("hidden")
  displayCountries(countries[currIndex])  
})    



const container = document.querySelector(".container")


handlerNavigateToSingleCountry(container)



  fetchReigion("region", "all");

drowpdownCountries.addEventListener("change", function (e) {
    countries = []
    fetchReigion("region", e.target.value);
});
