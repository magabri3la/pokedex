
const pokeapi = "https://pokeapi.co/api/v2/pokemon/";
const display = document.getElementById("display");

async function fetchGetPokemon(selectedPokemon) {
  let data;
  await fetch (`${pokeapi}${selectedPokemon}`)
  .then(response => data = response.json())
  .catch(error => console.log(error.message));
  return data;
}

async function getPokemon(id) {
  return await fetchGetPokemon(id);
}

function printPokemon(selectedPokemon) {
  const pokeData = selectedPokemon;
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('pokeCard');
  pokeCard.innerHTML = `
    <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
    <div>
      <h2>${pokeData.name}</h2>
      <p>${pokeData.types.map(type => type.type.name).join(', ')}</p>
    </div>
  `;

  display.appendChild(pokeCard);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function deletePrint() {
  let pokemon = document.getElementsByClassName("pokeCard")[0];
  display.removeChild(pokemon);
}

let getPokeId = getRandomInt(1,100);
let previusPoke = getPokeId;
const historyPokemons = [];
let index = 0;

async function firstCall () {
  const pokemon = await getPokemon(previusPoke);
  historyPokemons.push(pokemon);
  printPokemon(historyPokemons[index]);
};
firstCall();

function updatePokemonBefore(newPokemon) {
  historyPokemons.push(previusPoke);
  previusPoke = newPokemon;
}

const btnBefore = document.getElementById("btn-before");
const btnAfter = document.getElementById("btn-after");

btnBefore.addEventListener("click", () => {
  index--;
  if(index >= 0) {
    deletePrint();
    previusPoke = historyPokemons[index];
    printPokemon(previusPoke);
  }
  else {
    index=0;
  }
});

btnAfter.addEventListener("click", async () => {
  deletePrint();
  index++
  getPokeId = getRandomInt(1,100);
  const newPokemon = await getPokemon(getPokeId);
  historyPokemons.push(newPokemon);
  printPokemon(historyPokemons[index]);
});

