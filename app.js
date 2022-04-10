
function adicionarPokemon () {
    const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const ul = document.querySelector('.pokedex');
    const pokemonPromisses = [];


    for (let i = 1; i <= 150; i++){
        pokemonPromisses.push(fetch(getUrl(i)).then(resposta => resposta.json()))
    };
    
    
    Promise.all(pokemonPromisses).then(
        (pokemons) => {
            const listPokemon = pokemons.reduce((acumulador, pokemon) => {
                const types = pokemon.types.map( valor => valor.type.name);
                acumulador +=`
                <li class="card ${types[0]}">
                    <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"> 
                    <h2 class="card-title"> ${pokemon.id} ${pokemon.name} </h2>
                    <p class="card-subtitle"> ${types.join(' | ')} </p>     
                </li> 
                `
                return acumulador
            },'')
            ul.innerHTML = listPokemon
        }
    )    

    

};
adicionarPokemon();
