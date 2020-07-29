
import { el } from "./dom/jsx-runtime";
import { SearchPreset } from "./SearchPreset";
import StorageArray = browser.storage.StorageArray;

const presetsStorageName: string = "transfer-search-presets";
let presets: SearchPreset[] = [];

function getFormData(): Record<string, any> {
  const searchContainer: HTMLElement = document.getElementById("ctl00_cphContent_pnlTL");
  const idsToData = {};
  const inputs = searchContainer.getElementsByTagName("input");
  const selects = searchContainer.getElementsByTagName("select");

  for(const input of inputs) {
      if (input.type === "checkbox") {
          idsToData[input.id] = input.checked;
      }
      if (input.type === "text") {
          idsToData[input.id] = input.value;
      }
  }
  for(const select of selects) {
      idsToData[select.id] = select.value;
  }

  return idsToData;
}


function saveSearch(name: string): void {
  const searchData: SearchPreset = {
      data: getFormData(),
      name
  };

  const matchingPresetIndex = presets.findIndex(preset => preset.name === name);

  if( matchingPresetIndex !== -1 ) {
    presets[matchingPresetIndex] = searchData;
  } else {
    presets.push(searchData);
  }

  browser.storage.local.set({
    [presetsStorageName]: JSON.stringify(presets)
  })
}


function loadSearchData(name: string): void {

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

function retrieveTransferPresets(): Promise<SearchPreset[]> {
    return browser.storage.local.get(presetsStorageName)
        .then(results => results[presetsStorageName])
        .then((presetsJson: string|undefined) => {
            if( !!presetsJson ) {
                return JSON.parse(presetsJson) as SearchPreset[];
            }
            return [];
        })
        .catch(error => {
            console.debug(error);
            return [];
        });
}

const createControls = (searchNames) =>
<div id="transfer-search-container">
  <div>
    <select id="currentPreset" onChange={ev => loadSearchData(ev.target.value)}>
      {searchNames.map(name =>
        <option value={name}>{name}</option>
      )}
    </select>
  </div>
  <div>
    <input id="presetTextBox" type="text" />
    <button
      id="savePresetButton"
      onClick={() => saveSearch(document.getElementById("presetTextBox").value)}
      type="button"
    >
      Save
    </button>
  </div>
</div>;



transferSearchPresets
  .subscribe(presets => {
    let controlsContainer = document.getElementById("transfer-search-container");

    if( !!controlsContainer ) {
      controlsContainer.remove();
    }

    const presetNames = presets.map(preset => preset.name);
    controlsContainer = createControls(presetNames);
    const searchPanel = document.getElementById("searchpanel");
    searchPanel.prepend(controlsContainer);
  });

retrieveTransferPresets()
  .subscribe(presets => {
    transferSearchPresets.next(presets);
  });







