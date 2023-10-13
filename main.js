const content = document.querySelector('.grid-container');
const searchBar = document.querySelector('#searchBar');
const pokemonCount = document.querySelector('.pokemonCount p');
const generation1Button = document.querySelector('#IgenerationButton');
const generation2Button = document.querySelector('#IIgenerationButton');
const generation3Button = document.querySelector('#IIIgenerationButton');
const generation4Button = document.querySelector('#IVgenerationButton');
const generation5Button = document.querySelector('#VgenerationButton');
const generation6Button = document.querySelector('#VIgenerationButton');
const generation7Button = document.querySelector('#VIIgenerationButton');
const generation8Button = document.querySelector('#VIIIgenerationButton');
const generation9Button = document.querySelector('#IXgenerationButton');

let pokeData = [1, 2, 3, 4, 5];
let generationName = '';

generation1Button.addEventListener('click', () => {
  generationName = 'Generation I';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then(pokeCards)
    .then(infoDisplay);
});

generation2Button.addEventListener('click', () => {
  generationName = 'Generation II';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151')
    .then(pokeCards)
    .then(infoDisplay);
});

generation3Button.addEventListener('click', () => {
  generationName = 'Generation III';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251')
    .then(pokeCards)
    .then(infoDisplay);
});
generation4Button.addEventListener('click', () => {
  generationName = 'Generation IV';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386')
    .then(pokeCards)
    .then(infoDisplay);
});
generation5Button.addEventListener('click', () => {
  generationName = 'Generation V';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=156&offset=493').then(
    pokeCards
  );
});
generation6Button.addEventListener('click', () => {
  generationName = 'Generation VI';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=72&offset=649').then(
    pokeCards
  );
});
generation7Button.addEventListener('click', () => {
  generationName = 'Generation VII';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=88&offset=721')
    .then(pokeCards)
    .then(infoDisplay);
});
generation8Button.addEventListener('click', () => {
  generationName = 'Generation VIII';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=96&offset=809')
    .then(pokeCards)
    .then(infoDisplay);
});

generation9Button.addEventListener('click', () => {
  generationName = 'Generation IX';
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=116&offset=905')
    .then(pokeCards)
    .then(infoDisplay);
});

const fetchData = async (url) => {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((response) => response.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              weight: data.weight,
              height: data.height,
              img: data.sprites.other['official-artwork'].front_default,
              types: data.types.map((type) => type.type.name),
            };
          });
      });
      return Promise.all(fetches).then((res) => {
        pokeData = res;
      });
    });
};

const pokeCards = () => {
  const cards = pokeData
    .map((pokemon) => {
      const typeIcons = pokemon.types
        .map((type) => {
          return `<img class="icon" src="media/icons/${type}.ico" alt="${type}" />`;
        })
        .join('');
      return ` <div class="grid-item" id="grid1">
      <div class=id><p>${pokemon.id}</p> </div>
          <span><img src="${pokemon.img}" alt="${pokemon.name}"/></span>
          <div class="pokeInfo">
            <h3>${pokemon.name}</h3>
             <div class="types">
           ${typeIcons}
             </div>
            <div class="information">
            <p>${pokemon.weight}KG | ${pokemon.height}CM</p>
            </div>
        </div>
      </div>`;
    })
    .join('');
  content.innerHTML = cards;
};

const infoDisplay = () => {
  pokemonCount.textContent = `The number of Pokemon in the ${generationName} displayed are: ${pokeData.length}`;
};

const searchCards = () => {
  const query = searchBar.value.toLowerCase();
  const cards = document.querySelectorAll('.grid-item');

  cards.forEach((card) => {
    const textContent = card
      .querySelector('.pokeInfo h3')
      .textContent.toLowerCase();

    if (textContent.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};
searchBar.addEventListener('input', searchCards);
