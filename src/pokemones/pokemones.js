import React, { useEffect } from 'react';
import '../pokemones/pokemones.css'

const Pokemones = () => {
    const [result, setResult] = React.useState([]);
    const [poke, setPoke] = React.useState([]);
    const [load, setLoad] = React.useState('true');
    const arr = [];

    useEffect(() => {
        // fetch('https://rickandmortyapi.com/api/character')
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then((response) => response.json())
            .then((data) => setResult(
                data.results.map((item) => {
                    fetch(item.url)
                        .then((response) => response.json())
                        .then((allpokemon) => arr.push(allpokemon));
                    setPoke(arr);
                }),
            ));
    },[]);

    setTimeout(() => {
        setLoad(false);
    }, 2000);

    
    const arrinfo = [];
    const handleClick = event => {
        
        console.log('https://pokeapi.co/api/v2/pokemon/' + event.currentTarget.id + '/')

        fetch('https://pokeapi.co/api/v2/pokemon/' + event.currentTarget.id + '/')
            .then((response) => response.json())
            .then((pokemon) => alert(pokemon.name));

      };
    return (
        <div className="pokemonesFather">
            <div className='pokegallery'>
                {load ? (
                    <div className='Loader'>
                        <img src='https://i0.wp.com/creatividadenblanco.com/wp-content/uploads/2016/08/pikachu.gif?resize=800%2C600&ssl=1' alt='carga' />
                    </div>
                ) : (
                    poke.map((pokemon, i) => (
                        <div id={pokemon.id}pokemon key={i} onClick={handleClick}>
                            <div  className='card'>
                                <div className='number'>
                                    <h6>{i+1}</h6>
                                </div>
                                <img src={pokemon.sprites.front_default} alt='pokemon' />
                                {/* <img src={pokemon.image} alt='pokemon' /> */}
                                <div  className='informacion'>
                                    <h5>{pokemon.name}</h5>
                                    {/* <h6>Tipo: {pokemon.types[0].type.name}</h6> */}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Pokemones