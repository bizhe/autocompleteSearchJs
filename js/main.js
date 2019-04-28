const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//search indeks function
const searchCountry = async searchText => {
  const res = await fetch("../data/pindex.json");
  const countries = await res.json();
  //get matches
  let matches = countries.filter(country => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return country.name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `<div class="card card-body mb-1">
       <h4>${match.name}  (${match.code}) 
       <span class="text-primary">${match.dial_code}</span></h4>
       </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchCountry(search.value));
