
import { el } from "./dom/jsx-runtime";
import { SearchPreset } from "./SearchPreset";

const presetsStorageName: string = "transfer-search-presets";
let transferSearchPresets: SearchPreset[] = [];

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

  const matchingPresetIndex = transferSearchPresets.findIndex(preset => preset.name === name);

  if( matchingPresetIndex !== -1 ) {
    transferSearchPresets[matchingPresetIndex] = searchData;
  } else {
    transferSearchPresets.push(searchData);
  }

  browser.storage.local.set({
    [presetsStorageName]: JSON.stringify(transferSearchPresets)
  })
}


function loadSearchData(name: string): void {
    const preset: SearchPreset|undefined = transferSearchPresets.find(preset => preset.name === name);

    if( !preset ) {
        console.debug(`Preset ${name} not found!`);
    }

    for(const id of Object.getOwnPropertyNames(preset.data)) {
      const value = preset.data[id];
      // TODO: make sure we can differentiate between value and checked the right way
      const element = document.getElementById(id) as HTMLInputElement;

      if( !!element ) {
        if( typeof value === "boolean" ) {
          element.checked = value;
        } else {
          element.value = value;
        }
      }
    }
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

function onSaveSearchClick() {
    const presetTextBox = document.getElementById('presetTextBox') as HTMLInputElement;

    saveSearch(presetTextBox.value);
}

 const createControls = (searchNames) =>
     <div id="transfer-search-container" className={["boxcontent"]}>
       <div>
         <select id="currentPresetSelect">
           {searchNames.map(name =>
             <option value={name}>{name}</option>
           )}
         </select>
       </div>
       <div>
         <input id="presetTextBox" type="text" />
         <button
           id="savePresetButton"
           type="button">
           Save
         </button>
       </div>
     </div>;



//let controlsContainer = document.getElementById("transfer-search-container");

// if( !!controlsContainer ) {
//   controlsContainer.remove();
// }

retrieveTransferPresets()
    .then((presets: SearchPreset[]) => {
        transferSearchPresets = presets;

        const presetNames = presets.map(preset => preset.name);
        const controlsContainer = createControls(presetNames);
        const searchPanel = document.getElementById("searchpanel");
        searchPanel.prepend(controlsContainer);

        const savePresetButton = document.getElementById("savePresetButton");
        savePresetButton.onclick = onSaveSearchClick;

        const currentPresetSelect = document.getElementById("currentPresetSelect");
        currentPresetSelect.onchange = (ev: Event) => { loadSearchData((ev.target as HTMLSelectElement).value) };
    })








