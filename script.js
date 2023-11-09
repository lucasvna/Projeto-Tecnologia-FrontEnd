const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 200;
const colors = {
  fire: "#FB6C6A",
  grass: "#66C821",
  electric: "#E8DD09",
  water: "#97CBF2",
  ground: "#CD9B47",
  rock: "#B8C7CE",
  fairy: "#764ABA",
  poison: "#0146E9",
  bug: "#59D0B7",
  dragon: "#F16E57",
  psychic: "#B169D5",
  flying: "#3DC7EF",
  fighting: "#70AB1F",
  normal: "#9FC5C5",
  ghost: "#7B62A3",
  dark: "#707070",
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
  }
}

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const resp = await fetch(url)
  const data = await resp.json()
  createPokemonCard(data)
}

const createPokemonCard = (poke) => {
  const card = document.createElement('div')  
  card.classList.add("pokemon")

  const name = poke.name[0].toUpperCase() + poke.name.slice(1)
  const id = poke.id.toString().padStart(3, '0')

  const pokeTypes = poke.types.map(type => type.type.name)
  const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
  const color = colors[type]

  card.style.backgroundColor = color

  const pokemonInnerHTML = `
  <div class="imagemContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
  </div>
  <div class="info">
   <span class="number">#${id}</span>
   <h3 class="name">${name}</h3>
   <small class="type">Type: <Span>${type}</Span></small>
    </div>
  `

  card.innerHTML = pokemonInnerHTML

  pokeContainer.appendChild(card)

}

fetchPokemons()