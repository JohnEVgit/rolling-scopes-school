
let mymap = L.map('mapid').setView([51.505, -0.09], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

const getCountriesList = () => {
    fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            renderCountriesList(data);
        });
};

getCountriesList();

const sortCasesByCountry = (data) => {
    let totalCasesByCountry = [];
    data.forEach((item) => {
        totalCasesByCountry.push( [item.country, item.cases] );
    });
    totalCasesByCountry.sort(function(a, b) {
        return b[1] - a[1] ;
    });
    return totalCasesByCountry;
};

const renderCountriesList = (data) => {
    const countriesListCont = document.querySelector('.countries-list');
    const countriesListFragment = document.createDocumentFragment();

    const totalCasesByCountry = sortCasesByCountry(data);

    totalCasesByCountry.forEach((item) => {

        const countriesListElem = document.createElement('div');
        countriesListElem.classList.add('countries-list-elem');

        const countriesListVal = document.createElement('span');
        countriesListVal.classList.add('countries-list-val');
        countriesListVal.textContent = item[1];

        const countriesListName = document.createElement('span');
        countriesListName.classList.add('countries-list-name');
        countriesListName.textContent = item[0];

        countriesListElem.appendChild(countriesListVal);
        countriesListElem.appendChild(countriesListName);
        countriesListFragment.appendChild(countriesListElem);

    });

    countriesListCont.appendChild(countriesListFragment);

};


const getWorldList = (info) => {
    fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            renderWorldList(data,info);
        });
};

const renderWorldListHead = () => {
    const worldListTable = document.querySelector('.info-table');

    worldListTable.innerHTML = `<tr>
                    <th>Cases</th>
                    <th>Deaths</th>
                    <th>Recovered</th>
                </tr>`
};

const renderWorldList = (data,info) => {

    let textContentMass;
    switch (info) {
        case 'total':
            textContentMass = [data.cases, data.deaths, data.recovered];
            break;
        case 'totalLastDay':
            textContentMass = [data.todayCases, data.todayDeaths, data.todayRecovered];
            break;
        case 'totalOneThousand':
            textContentMass = [data.casesPerOneMillion / 1000, data.deathsPerOneMillion / 1000, data.recoveredPerOneMillion / 1000, ];
            break;
        case 'totalOneThousandLastDay':
            textContentMass = [data.todayCases/(data.population / 1000), data.todayDeaths/(data.population / 1000), data.todayRecovered/(data.population / 1000), ];
            break;
    }

    if (textContentMass) {
        textContentMass = textContentMass.map(function(val) {
            return (Math.round(val * 100000)) / 100000;
        });
    }

    const worldListTable = document.querySelector('.info-table');
    const worldListElem = document.createElement('tr');

    renderWorldListHead();

    const casesVal = document.createElement('td');
    casesVal.textContent = textContentMass ? textContentMass[0] : data.cases;

    const deathsVal = document.createElement('td');
    deathsVal.textContent = textContentMass ? textContentMass[1] : data.deaths;

    const recoveredVal = document.createElement('td');
    recoveredVal.textContent = textContentMass ? textContentMass[2] : data.recovered;

    worldListElem.appendChild(casesVal);
    worldListElem.appendChild(deathsVal);
    worldListElem.appendChild(recoveredVal);
    worldListTable.appendChild(worldListElem);

};

getWorldList();

const infoTableBtns = document.querySelectorAll('.info-table-btn');
infoTableBtns.forEach(function (button) {

    button.addEventListener("click", function () {
        getWorldList(this.dataset.info);
    });

});