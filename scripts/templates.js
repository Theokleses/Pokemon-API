function renderPokeDialogTemplate({ imgUrl, id, name, typeIconsHTML, bgColor, height, weight, baseExperience, abilities, statsHTML, evoChainHTML }) {
  return `
    <div class="poke-container" style="background-color: ${bgColor}">
      <div class="poke-header">
        <p>#${id}</p> <p class="mg-right">${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
        <div class="close-button" onclick="closeOverlay(event)">
          <span class="close-icon close-btn">&times;</span>
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
         <h3>Evolution-Chain</h3>
          <div class="evo-chain-container" style="display: flex; gap: 10px;">
            ${evoChainHTML}
          </div>
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
          <p>#${id}</p> <p>${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
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

  function renderEvolutionChainTemplate(evolutionChain) {
    return evolutionChain
      .map(
        (evo) => `
        <div class="evo-chain">
          <div class="evo-chain-item display-flex">
          <div class="dis-flex">
            <img src="${evo.spriteUrl}" alt="${evo.name}" />
            </div>
            <p>${evo.name}</p>
          </div>
        </div>  
        `
      )
      .join("");
  }

  function renderStatsTemplates(statBars) {
    return statBars
    .map(
     (stat) => `
       <div class="stat-bar">
         <span class="stat-name">${stat.stat.name.toUpperCase()}</span>
         <div class="bar-container">
           <div class="bar-filled" style="width: ${Math.min(stat.base_stat, 120) / 1.2}%;"></div>
           <div class="bar-empty" style="width: ${Math.max(120 - stat.base_stat, 0) / 1.2}%;"></div>
         </div>
         <span class="stat-value">${stat.base_stat}</span>
       </div>
     `
   )
   .join("");
   }
 
   function renderIconsTemplates(types, bgColor) {
    return types
      .map(
        (typeInfo) => `
          <div class="type-icon" style="background-color: ${bgColor}">
            <img class="icons" src="${typeIcons[typeInfo.type.name]}" alt="${typeInfo.type.name}" />
          </div>`
      )
      .join("");
  }