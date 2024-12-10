function renderPokeDialogTemplate({ imgUrl, id, name, typeIconsHTML, bgColor, height, weight, baseExperience, abilities, statsHTML }) {
    return `
      <div class="poke-container" style="background-color: ${bgColor}">
        <div class="poke-header">
          <p>#${id}</p> <p class="mg-right">${name}</p>
          <div class="close-button" onclick="closeOverlay()">
            <span class="close-icon">&times;</span>
          </div>
        </div>
        <div class="poke-image">
          <img src="${imgUrl}" alt="${name}" />
        </div>
        <div class="poke-footer">${typeIconsHTML}</div>
        <div class="poke-tabs">
          <button class="tab-button" onclick="showTab('main')">Main</button>
          <button class="tab-button" onclick="showTab('stats')">Stats</button>
          <button class="tab-button" onclick="showTab('evo-chain')">Evo-Chain</button>
        </div>
        <div id="tab-content">
          <div class="tab-section" id="main" style="display: block;">
            <h3>Main Information</h3>
            <div class="main-info">
              <p><strong>Height:</strong> ${height} m</p>
              <p><strong>Weight:</strong> ${weight} kg</p>
              <p><strong>Base Experience:</strong> ${baseExperience}</p>
              <p><strong>Abilities:</strong> ${abilities}</p>
            </div>
          </div>
          <div class="tab-section" id="stats" style="display: none;">
            <h3>Stats</h3>
            ${statsHTML}
          </div>
          <div class="tab-section" id="evo-chain" style="display: none;">
            <p>Evo-Chain content goes here</p>
          </div>
        </div>
        <div class="footer-overlay">
          <button onclick="backPokemon()">Back</button>
          <button onclick="nextPokemon()">Next</button>
        </div>
      </div>
    `;
  }

  function renderPokemonTemplate({ id, name, gifUrl, bgColor, typeIconsHTML }) {
    return `
      <div class="poke-container" style="background-color: ${bgColor}" onclick="renderPokeDialog(this)" 
           data-img-url="${gifUrl}" 
           data-id="${id}" 
           data-bg-color="${bgColor}" 
           data-name="${encodeURIComponent(name)}" 
           data-type-icons='${encodeURIComponent(typeIconsHTML)}'>
        <div class="poke-header">
          <p>#${id}</p> <p>${name}</p>
        </div>
        <div class="poke-image" style="background-color: ${bgColor};">
          <img src="${gifUrl}" alt="${name}"/>
        </div>
        <div class="poke-footer">
          ${typeIconsHTML}
        </div>
      </div>
    `;
  }