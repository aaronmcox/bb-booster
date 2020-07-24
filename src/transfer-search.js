

function getFormData() {
  const searchContainer = document.getElementById("ctl00_cphContent_pnlTL");

  const idsToData = Object.assign({}, getSelectData(searchContainer), getInputData(searchContainer));

  return idsToData;
  // browser.storage.sync.set(idsToData);
}

function getInputData(searchContainer) {
  const idsToData = {};
  const inputs = searchContainer.getElementsByTagName("input");

  for(const input of inputs) {
    if( input.type === "checkbox" ) {
      idsToData[input.id] = input.checked;
    }
    if( input.type === "text" ) {
      idsToData[input.id] = input.value;
    }
  }

  return idsToData;
}

function getSelectData(searchContainer) {
  const idsToData = {};
  const selects = searchContainer.getElementsByTagName("select");

  for(const select of selects) {
    idsToData[select.id] = select.value;
  }

  return idsToData;
}

function saveSearch(name) {
  const searchData = getFormData();

  browser.storage.local.set({
    [name]: JSON.stringify(searchData)
  });
}

function loadSearchData(name) {
  if( typeof name !== "string" ) {
    return;
  }

  retrieveSearchData(name)
    .then(idsToData => {
      for(const id of Object.getOwnPropertyNames(idsToData)) {
        const value = idsToData[id];
        // TODO: make sure we can differentiate between value and checked the right way
        const element = document.getElementById(id);

        if( !!element ) {
          if( typeof value === "boolean" ) {
            element.checked = value;
          } else {
            element.value = value;
          }
        }
      }
    })
}

function retrieveSearchData(name) {
  return browser.storage.local.get(name)
    .then(results => JSON.parse(results[name]))
    .catch(error => {
      console.debug(error);
      return undefined;
    });
}

const model = {
  currentPreset: undefined,
};

const controls = ([searchNames]) =>
  <div>
    <div>
      <select id="currentPreset">
        {searchNames.map(name =>
          <option value={name}>{name}</option>
        )}
      </select>
      <button id="loadPresetButton">
        Load
      </button>
    </div>
    <div>
      <input type="text" />
      <button id="savePresetButton">
        Save
      </button>
    </div>
  </div>;




