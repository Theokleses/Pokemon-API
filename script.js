let isFiltering = false; 
let allPokemon = []; 
let startPokemon = 0; 
const maxPokemon = 30; 


loadPokemon();

async function loadPokemon(startPokemon, append = false) {
  showSpinner(); 
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}&offset=${startPokemon}`
    );
    let responseAsJson = await response.json();
    let newPokemon = responseAsJson["results"]; 
    allPokemon = allPokemon.concat(newPokemon); 
    renderPokemon(newPokemon, append); 
  } catch (error) {
    console.error("Fehler beim Laden der Pokémon:", error);
  } finally {
    hideSpinner(); 
  }
}

function getPokemon() {
  let query = document.getElementById("search-pokemon").value.toLowerCase().trim();
  let content = document.getElementById("content");
  content.innerHTML = "";

  if (query.length >= 3) {
    let filteredPokemon = allPokemon.filter(p => p.name.toLowerCase().includes(query));
    isFiltering = true;
    document.getElementById("load-more").classList.add("d_none");
    if (filteredPokemon.length > 0) {
      renderPokemon(filteredPokemon);
    } else {
      content.innerHTML = "<p>Kein Pokémon gefunden!</p>";
    }
  } else {
    isFiltering = false;
    document.getElementById("load-more").classList.remove("d_none");
    if (query.length === 0) {
      startPokemon = 0;
      allPokemon = [];
      loadPokemon(startPokemon);
    } else {
      content.innerHTML = "<p>Bitte mindestens 3 Buchstaben eingeben!</p>";
    }
  }
}

async function loadPokemonDetails(url) {
  let response = await fetch(url);
  let pokemonDetails = await response.json();

  let speciesResponse = await fetch(pokemonDetails.species.url);
  let speciesDetails = await speciesResponse.json();
  let evolutionChainResponse = await fetch(speciesDetails.evolution_chain.url);
  let evolutionChainDetails = await evolutionChainResponse.json();

  let evoChain = [];
  let currentEvo = evolutionChainDetails.chain;
  while (currentEvo) {
    let id = currentEvo.species.url.split("/").filter(Boolean).pop();
    let spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    evoChain.push({ name: currentEvo.species.name, spriteUrl });
    currentEvo = currentEvo.evolves_to[0];
  }

  pokemonDetails.evolutionChain = evoChain;
  return pokemonDetails;
}

async function renderPokemon(pokemonList, append = false) {
  const content = document.getElementById("content");
  if (!append) {
    content.innerHTML = "";
  }

  for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    let id = pokemon.url.split("/").filter(Boolean).pop();
    let gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    let details = await loadPokemonDetails(pokemon.url);
    let bgColor = typeColors[details.types[0].type.name] || "#ffffff";
    let typeIconsHTML = renderIconsTemplates(details.types, bgColor);
    
    pokemonHTML = renderPokemonTemplate({id,name: pokemon.name,gifUrl,bgColor,typeIconsHTML,});
    content.innerHTML += pokemonHTML;
  }
}

function renderPokeDialog(element) {
  let id = parseInt(element.getAttribute("data-id"), 10) - 1; // ID ist 1-basiert
  currentIndex = id;
  showPokemonByIndex(currentIndex);
}

async function renderPokeDialogContent(imgUrl, id, name, typeIconsHTML, bgColor) {
  let details = await loadPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let height = details.height / 10;
  let weight = details.weight / 10;
  let baseExperience = details.base_experience;
  let abilities = details.abilities.map((ability) => ability.ability.name).join(", ");
  let statsHTML = renderStatsTemplates(details.stats)
  let evoChainHTML = renderEvolutionChainTemplate(details.evolutionChain)
  
  dialogHTML = renderPokeDialogTemplate({imgUrl,id,name,typeIconsHTML,bgColor,height,weight,baseExperience,abilities,statsHTML,evoChainHTML});
  document.getElementById("overlay").classList.remove("d_none");
  document.getElementById("img-fullsize").innerHTML = dialogHTML;
}

function showTab(tabId) {
  let sections = document.querySelectorAll(".tab-section");
  sections.forEach((section) => {
    section.style.display = section.id === tabId ? "block" : "none";
  });
}

async function showPokemonByIndex(index) { 
  let pokemon = allPokemon[index];
  let details = await loadPokemonDetails(pokemon.url);
  let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${index + 1}.gif`;
  let bgColor = typeColors[details.types[0].type.name] || "#ffffff";
  let typeIconsHTML = renderIconsTemplates(details.types, bgColor);

  renderPokeDialogContent(imgUrl, index + 1, pokemon.name, typeIconsHTML, bgColor);
}

let currentIndex = 0;

function nextPokemon() {
  currentIndex = (currentIndex + 1) % allPokemon.length;
  showPokemonByIndex(currentIndex);
}

function backPokemon() {
  currentIndex = (currentIndex - 1 + allPokemon.length) % allPokemon.length;
  showPokemonByIndex(currentIndex);
}

function closeOverlay(event) {
  let overlay = document.getElementById("overlay");
  if (event.target === overlay) { 
    overlay.classList.add("d_none");
  }
}

function loadMorePokemon() {
  startPokemon += maxPokemon; 
  loadPokemon(startPokemon, true); 
}

function showSpinner() {
  document.getElementById("loading-spinner").classList.remove("d_none");
}

function hideSpinner() {
  document.getElementById("loading-spinner").classList.add("d_none");
}
