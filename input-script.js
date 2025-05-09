// sets the event listener for when the search button is clicked and executes the async function
document.getElementById('searchButton').addEventListener('click', async function() {
  const pokemonInput = document.getElementById('pokemonInput').value.trim().toLowerCase();
  const displayDiv = document.getElementById('pokemonDisplay');

  // Clears any previous search results
  displayDiv.innerHTML = '';

  // Check if the user actually entered something
  if (!pokemonInput) {
    displayDiv.textContent = 'Please enter a Pokémon name or ID.';
    return;
  }

  try {
    // Fetch data from the PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);

    // If the Pokémon is not found, throw an error to be caught below
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }

    const data = await response.json();

    // Extract the Pokémon's name, image source, type and abilities (bonus)
    const pokemonName = data.name;
    const pokemonImage = data.sprites.front_default;
    const types = data.types.map(item => item.type.name).join(', ');
    const abilities = data.abilities.map(ability => ability.ability.name).join(', ')

    // Create an element to display the Pokémon's name (capitalizing the first letter)
    const nameElement = document.createElement('h2');
    nameElement.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    // Create an image element for the Pokémon
    const imageElement = document.createElement('img');
    imageElement.src = pokemonImage;
    imageElement.alt = pokemonName;

    // Optional bonus: Display the Pokémon's type and ability
    const typeElement = document.createElement('p');
    const abilityElement = document.createElement('p')
    typeElement.innerHTML =
    `<b>Type:</b>
            <ul>
              <li>${types}</li>
            </ul>`;

    abilityElement.innerHTML =
    `<b>Abilities:</b>
                <ul>
                  <li>${abilities}</li>
                </ul>`;

    displayDiv.appendChild(nameElement);
    displayDiv.appendChild(imageElement);
    displayDiv.appendChild(abilityElement);
    displayDiv.appendChild(typeElement);

  } catch (error) {
    // Display an error message if the Pokémon is not found or if something went wrong
    displayDiv.textContent = 'Error: Pokémon not found. Please try again.';
  }
});