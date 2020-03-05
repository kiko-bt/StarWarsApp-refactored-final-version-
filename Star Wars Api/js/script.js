let navigationService = {
    btnNext: document.getElementById('btn-Next'),
    btnPrev: document.getElementById('btn-Prev'),
    btnPeople: document.getElementById('btnPeople'),
    btnShips: document.getElementById('btnShips'),
    pageMode: '',
    currentPage: 1,
    registerListeners: function () {
        this.btnPeople.addEventListener('click', () => {
            this.currentPage = 1;
            starWarsService.getPeople(this.currentPage);
            this.pageMode = 'people';
        });
        this.btnShips.addEventListener('click', () => {
            this.currentPage = 1;
            starWarsService.getStarShips(this.currentPage);
            this.pageMode = 'ships'
        });
        this.btnNext.addEventListener('click', () => {
            this.getNextPage(this.pageMode);
        });
        this.btnPrev.addEventListener('click', () => {
            this.getPrevousPage(this.pageMode);
        });
    },
    getNextPage: function (pageType) {
        ++this.currentPage;
        pageType === 'people' ? starWarsService.getPeople(this.currentPage) : null;
        pageType === 'ships' ? starWarsService.getStarShips(this.currentPage) : null;
    },
    getPrevousPage: function (pageType) {
        --this.currentPage;
        pageType === 'people' ? starWarsService.getPeople(this.currentPage) : null;
        pageType === 'ships' ? starWarsService.getStarShips(this.currentPage) : null;
    },
    toggleNavButtons: function (response) {
        if (!response.next) {
            this.btnNext.style.display = 'none';
        } else {
            this.btnNext.style.display = 'block';
        }
        if (!response.previous) {
            this.btnPrev.style.display = 'none';
        } else {
            this.btnPrev.style.display = 'block';
        }
    }
}



let starWarsService = {
    baseUrl: "https://swapi.co/api/",
    getPeople: function (page) {
        const url = `${this.baseUrl}people/?page=${page}`;
        uiService.toggleLoader(true);
        fetch(url)
            .then(res => res.json())
            .then(people => {
                console.log('The request succeeded', people);
                uiService.toggleLoader(false);
                navigationService.toggleNavButtons(people);
                uiService.displayPeople(people.results);
            })
            .catch(err => console.log(err));
    },
    getStarShips: function (page) {
        const link = `${this.baseUrl}starships/?page=${page}`;
        uiService.toggleLoader(true);
        $.ajax({
            url: link,
            success: (ships) => {
                console.log('The request succeeded');
                uiService.toggleLoader(false);
                navigationService.toggleNavButtons(ships);
                uiService.displayShips(ships.results);
            }
        })
            .catch(err => console.log(err));
    }


}



let uiService = {
    result: document.getElementById('result'),
    loader: document.getElementById('loader'),
    toggleLoader: function (toggle) {
        if (toggle)
            this.loader.style.display = 'block';
        else
            this.loader.style.display = 'none';
    },
    displayPeople: function (people) {
        if (people) {
            this.result.innerHTML = "";
            this.result.innerHTML += `
    <div class="row">
        <div class="col-md-3">Name</div>
        <div class="col-md-2">Height</div>
        <div class="col-md-2">Mass</div>
        <div class="col-md-2">Gender</div>
        <div class="col-md-2">Birth Year</div>
        <div class="col-md-1">Films</div>
    </div>
    <hr color="green">`;
            for (const person of people) {
                this.result.innerHTML += `
        <div class="row">
        <div class="col-md-3">${person.name}</div>
        <div class="col-md-2">${person.height}</div>
        <div class="col-md-2">${person.mass}</div>
        <div class="col-md-2">${person.gender}</div>
        <div class="col-md-2">${person.birth_year}</div>
        <div class="col-md-1">${person.films.length}</div>
    </div>
    <hr color="red">`
            }
        } else {
            this.result.innerHTML += `<h2>There is something wrong with data</h2>`;
        }

    },
    displayShips: function (ships) {
        if (ships) {
            this.result.innerHTML = "";
            this.result.innerHTML = `
        <div class="row">
        <div class="col-md-3">Name</div>
        <div class="col-md-2">Model</div>
        <div class="col-md-2">Manufacturer</div>
        <div class="col-md-2">Cost</div>
        <div class="col-md-2">People Capacity</div>
        <div class="col-md-1">Class</div>
        </div>
        <hr color="green">`;
            for (const starships of ships) {
                this.result.innerHTML += `<div class="row">
            <div class="col-md-3">${starships.name}</div>
            <div class="col-md-2">${starships.model}</div>
            <div class="col-md-2">${starships.manufacturer}</div>
            <div class="col-md-2">${starships.cost_in_credits}</div>
            <div class="col-md-2">${parseInt(starships.crew) + parseInt(starships.passengers)}</div>
            <div class="col-md-1">${starships.starship_class}</div>
            </div>
            <hr color="red">`
            }
        } else {
            this.result.innerHTML += `<h2>There is something wrong with data</h2>`;
        }
    }
}



navigationService.registerListeners();