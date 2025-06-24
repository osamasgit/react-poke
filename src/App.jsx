import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
  const trimmedInputValue = inputValue.trim();

  if (trimmedInputValue === '') {
    setPokemon(null);
    setError('No has introducido ningún nombre');
    return;
  }

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error('Pokémon no encontrado');
        return res.json();
      })
      .then(data => {
        setPokemon(data);
        setError('');
      })
      .catch(err => {
        setPokemon(null);
        setError(err.message);
      });

  }, [inputValue]);

  return (
    <>
      <h1>Buscador de Pokémon</h1>
      <input
        type="text"
        placeholder="Escribe el nombre de un Pokémon"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {error && <p>{error}</p>}
      {pokemon && (
        <div className='pokemon-card'>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Tipo: {pokemon.types.map(t => t.type.name).join(', ')}</p>
        </div>
      )}
    </>
  );
}

export default App;
