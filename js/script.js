
// Försök att undvika globala variablar så mycket du kan
const results = document.querySelector("#results");
const restCountryForm = document.querySelector("#restCountryForm");
const h2Error = document.querySelector(".hide");

restCountryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  getCountryInfo();
});

function getCountryInfo() {
  const countryLangInput = document.querySelector("#countryLangInput").value;
  const searchType = document.querySelector('input[name="searchType"]:checked').value;

  console.log(countryLangInput, searchType);

  results.innerHTML = "";

  let url;

  if (searchType === "name") {
    url = `https://restcountries.com/v3.1/name/${countryLangInput}`;
  } else if (searchType === "language") {
    url = `https://restcountries.com/v3.1/lang/${countryLangInput}`;
  }

  fetch(url)
    .then((res) => {
      return res.json();
      // if (res.status >= 200 && res.status <= 300) {
      //   return res.json();
      // } else {
      //   return [];
      // }
    })
    .then((data) => {
      displayResult(data);
    })
    .catch(()=>{
      console.error('promise rejected');
      pEl.classList.remove('hide');
    })
}

function sortCountryByPopulation(data) {
  return data.sort((a, b) => b.population - a.population);
}

function displayResult(data) {
  // if (data.length === 0) {
  //   const noCountry = document.createElement("div");
  //   noCountry.classList.add("no-country");
  //   noCountry.innerText = "No country found";
  //   results.appendChild(noCountry);
  // }

  let sortedData = sortCountryByPopulation(data);

  sortedData.forEach((country) => {
    const countryContainer = document.createElement("div");
    countryContainer.classList.add("country-container");
    results.appendChild(countryContainer);

    const flagImage = document.createElement("img");
    flagImage.src = country.flags.png;
    countryContainer.appendChild(flagImage);

    const officialName = document.createElement("p");
    officialName.textContent = `Official Name: ${country.name.official}`;
    countryContainer.appendChild(officialName);

    const subregion = document.createElement("p");
    subregion.textContent = `Subregion: ${country.subregion}`;
    countryContainer.appendChild(subregion);

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital}`;
    countryContainer.appendChild(capital);

    const population = document.createElement("p");
    population.textContent = `Population: ${country.population}`;
    countryContainer.appendChild(population);
  });
}
