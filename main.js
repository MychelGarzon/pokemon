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

let pokeData = [1, 2, 3, 4, 5];
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
      Promise.all(fetches).then((res) => {
        pokeData = res;
      });
    });
};

const pokeCards = () => {
  const filteredPokeData = pokeData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchBar.value.toLowerCase())
  );

  const cards = filteredPokeData
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
  pokemonCount.textContent = `The number of Pokemon displayed are: ${filteredPokeData.length}`;
};

searchBar.addEventListener('input', pokeCards);

generation1Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then(
    pokeCards
  );
});

generation2Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151').then(
    pokeCards
  );
});

generation3Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251').then(
    pokeCards
  );
});
generation4Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386').then(
    pokeCards
  );
});
generation5Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=156&offset=493').then(
    pokeCards
  );
});
generation6Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=72&offset=649').then(
    pokeCards
  );
});
generation7Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=88&offset=721').then(
    pokeCards
  );
});
generation8Button.addEventListener('click', () => {
  fetchData('https://pokeapi.co/api/v2/pokemon?limit=96&offset=809').then(
    pokeCards
  );
});
