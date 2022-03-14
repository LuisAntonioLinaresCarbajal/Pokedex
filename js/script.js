const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//definimos los tipos de colores segun el tipo de pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

//busca los valores del pokemon dentro de la pokeapi
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        //asigna los datos en un json
        .then(data => data.json())
        // inserta el render  en nuestro response
        .then(response => renderPokemonData(response))
        //try catch para control de errores
        .catch(err => renderNotFound())
}

//recopila los sprites del pokemon que estamos buscando
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    //asigna los status y tipos en nuestra data
    const { stats, types } = data;
    //busca el nombre del pokemon y lo asigna en la data
    pokeName.textContent = data.name;
    //recopila el sprite del pokemon
    pokeImg.setAttribute('src', sprite);
    //identifica al pokemon por su id
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


//definimos los tipos de color del pokemon
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    /*se setan los valores de cada pokemon para que 
    se actualicen si se hace una busqueda en seguida de 
    otra*/

    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

//mostrar imagen de no encontrado para pokemones inexistentes 
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('img', 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}