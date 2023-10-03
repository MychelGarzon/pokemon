const content = document.querySelector('.grid-container');
let pokeData = [1, 2, 3, 4, 5];

const fetchData = async () => {
  await fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
    .then((response) => response.json())
    .then((data) => {
      pokeData = data.results;
      console.log(data.results);
    });
  pokeCards();
};

const pokeCards = () => {
  const cards = pokeData
    .map((pokemon) => {
      return ` <div class="grid-item" id="grid1">
    <div class=id><p>1</p> </div
          <span><img src="/media/Pikachu.png" alt="Pikachu" />
          <h3>${pokemon.name}</h3></span>
          <div class=types>
          <img class="icon" id="normal" src="media/icons/Normal.ico" /></span> 
          <img class="icon" id="normal" src="media/icons/Electric.ico" /></span> 
          </div>
      </div>`;
    })
    .join('');

  content.innerHTML = cards;
};

fetchData();
