
var mymap = L.map('mapid').setView([51.505, -0.09], 3);

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

const renderCountriesList = (data) => {
    console.log(data);
    const countriesListCont = document.querySelector('.countries-list');
    const countriesListFragment = document.createDocumentFragment();

    let totalCasesByCountry = [];
    data.forEach((item) => {
        totalCasesByCountry.push( [item.country, item.cases] );
    });
    totalCasesByCountry.sort(function(a, b) {
        return b[1] - a[1] ;
    });

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
debugger
    countriesListCont.appendChild(countriesListFragment);

};
