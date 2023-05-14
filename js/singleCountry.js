const countryContainer = document.querySelector(".countryContainer")
const btnBack = document.querySelector(".btn-prev-country")
btnBack.addEventListener("click", function (e) {
    location.replace("index.html")
})
async function fetchSingleCountry() {
    const id = localStorage.getItem("country")
    if (!id) {

        location.replace("index.html")
    } 
    try {
        
        const response = await handleCommonFetch("alpha", id)
        spinner.classList.add("hidden")
        displayCountry(response)
    }
    catch (error) {
        spinner.classList.remove("hidden")
        console.log(error)
        
    }





}
function displayCountry(data) {
    data = data[0]
    const lang = []
    for (const Language in data.languages) {
        lang.push(data.languages[Language])
        
    }
    const strLang = lang.join(" , ")
    countryContainer.innerHTML = ''
    let nativeNames = new Set()
    for (const t in data.name.nativeName) {
        
        nativeNames.add(data.name.nativeName[t].common)
    }
    nativeNames = Array.from(nativeNames).join(" , ")
    let currencies = []
    for (const key in data.currencies) {
        currencies.push(`${data.currencies[key].name} ${data.currencies[key].symbol}`)
        
    }
    currencies = currencies.join(" , ")
    console.log(data.borders?? 'done')
    const html = `
<div class='img'>
    <img src='${data.flags.svg}' alt="${data.name.common}">

</div> 
    <div class="info">
    <h2>${data.name.common}</h2>
    <div class="table">
      <div class="col">
      <span><strong>Native Name:</strong> ${nativeNames}</span>
      <span><strong>Population:</strong> ${formatter(data.population)}</span>
      <span><strong>Region:</strong> ${data.region}</span>
      <span><strong>Sub Region:</strong> ${data.subregion}</span>
      <span><strong>Capital:</strong> ${data.capital}</span>
      </div>
      <div class="col">
      <span><strong>
Top Level Domain:</strong> ${data.tld}</span>
      <span><strong>Currencies:</strong> ${currencies}</span>
      <span><strong>Languages:</strong> ${strLang}</span>
      </div>

    </div>
    <div class="border">
      <h3>Border Countries:</h3>
<div class="">

${data.borders ?  data.borders.map(d => {return `<a href="country.html" data-id="${d}" class="btn btn-border">${d}</a>
            `
        }).join("") :  '<p>Not Exist</p>'
}

</div>
</div>
</div>

 `
        
    countryContainer.innerHTML = html
}
fetchSingleCountry()

handlerNavigateToSingleCountry(countryContainer)
