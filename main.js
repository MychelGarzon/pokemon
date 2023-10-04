const content = document.querySelector('.grid-container');

let pokeData = [1, 2, 3, 4, 5];

const fetchData = async () => {
  await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then((response) => response.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((response) => response.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other['official-artwork'].front_default,
              types: data.types.map((type) => type.type.name),
            };
          });
      });
      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards();
        console.log(pokeData);
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
          <span><img src="${pokemon.img}"<></span>
          <div class="pokeInfo">
            <h3>${pokemon.name}</h3></span>
             <div class="types">
           ${typeIcons}
             </div>
         <div class="typesNames">
         <p>${pokemon.types}</p>
         </div>
         </div>
      </div>`;
    })
    .join('');

  content.innerHTML = cards;
};

fetchData();
