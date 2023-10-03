const content = document.querySelector('.grid-container');
const pokeData = [1, 2, 3, 4, 5];

const fetchData = () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
    .then((response) => response.json())
    .then((data) => console.log(data));

  pokeCards();
};

const pokeCards = () => {
  const cards = pokeData.map((pokemon) => {
    return ` <div class="grid-item" id="grid1">
    <div class=id><p>id</p> </div
          <span><img src="/media/Pikachu.png" alt="Pikachu" />
          <h3>Name will be here</h3></span>
          <span> 
          <div class=types>
          <img class="icon" id="normal" src="media/Normal.ico" /></span> 
          <img class="icon" id="normal" src="media/Electric.ico" /></span> 
          </div>
      </div>`;
  });

  content.innerHTML = cards;
};

fetchData();
