import {el} from "./dom/jsx-runtime";
import {Preset} from "./preset";
import {PresetData} from "./preset-data";
import {PresetInputType} from "./preset-input-type";
import {PresetInput} from "./preset-input";
import {TransferSearchViewModel} from "./transfer-search-view-model";

const presetsStorageName: string = "transfer-search-presets";
let transferSearchPresets: Preset[] = [];


function getFormData(): PresetData {
  const searchContainer: HTMLElement = document.getElementById("ctl00_cphContent_pnlTL");
  const presetData: PresetData = {};
  const inputs = searchContainer.getElementsByTagName("input");
  const selects = searchContainer.getElementsByTagName("select");

  for (const input of inputs) {
    if( !input.id || !Object.values(PresetInputType).includes(input.type as PresetInputType) ) {
      // TODO: some sort of log?
      continue;
    }

    const presetInput: PresetInput = {
      id: input.id,
      inputType: input.type as PresetInputType,
      value: undefined
    };

    if (presetInput.inputType === PresetInputType.CheckBox) {
      presetInput.value = input.checked;
    } else {
      presetInput.value = input.value;
    }

    presetData[presetInput.id] = presetInput;
  }

  for (const select of selects) {
    if( !select.id ) {
      // TODO: log?
      continue;
    }

    const presetInput: PresetInput = {
      id: select.id,
      inputType: PresetInputType.Select,
      value: select.value
    };

    presetData[presetInput.id] = presetInput;
  }

  return presetData;
}


function saveSearch(name: string): void {
  const searchData: Preset = {
    data: getFormData(),
    name
  };

  const matchingPresetIndex = transferSearchPresets.findIndex(preset => preset.name === name);

  if (matchingPresetIndex !== -1) {
    transferSearchPresets[matchingPresetIndex] = searchData;
  } else {
    transferSearchPresets.push(searchData);
  }

  browser.storage.local.set({
    [presetsStorageName]: JSON.stringify(transferSearchPresets)
  })
}


function loadSearchData(name: string): void {
    const preset: Preset|undefined = transferSearchPresets.find(preset => preset.name === name);

    if( !preset ) {
        console.debug(`Preset ${name} not found!`);
    }

    for(const id of Object.getOwnPropertyNames(preset.data)) {
      const input = preset.data[id];

      const element = document.getElementById(id) as HTMLInputElement;

      if( !!input ) {
        if( input.inputType === PresetInputType.CheckBox ) {
          element.checked = input.value;
        } else {
          element.value = input.value;
        }
      }
    }
}

// function retrieveTransferPresets(): Promise<Preset[]> {
//   return browser.storage.local.get(presetsStorageName)
//     .then(results => results[presetsStorageName])
//     .then((presetsJson: string | undefined) => {
//       if (!!presetsJson) {
//         return JSON.parse(presetsJson) as Preset[];
//       }
//       return [];
//     })
//     .catch(error => {
//       console.debug(error);
//       return [];
//     });
// }

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
      <input id="presetTextBox" type="text"/>
      <button
        id="savePresetButton"
        type="button">
        Save
      </button>
    </div>
  </div>;

const viewModel = new TransferSearchViewModel(browser.storage.local);

viewModel
  .presets
  .subscribe((presets: Preset[]) => {
    transferSearchPresets = presets;

    const presetNames = presets.map(preset => preset.name);
    const controlsContainer = createControls(presetNames);
    const searchPanel = document.getElementById("searchpanel");
    searchPanel.prepend(controlsContainer);

    const savePresetButton = document.getElementById("savePresetButton");
    savePresetButton.onclick = onSaveSearchClick;

    const currentPresetSelect = document.getElementById("currentPresetSelect");
    currentPresetSelect.onchange = (ev: Event) => {
      loadSearchData((ev.target as HTMLSelectElement).value)
    };
  })

// retrieveTransferPresets()
//   .then((presets: Preset[]) => {
//     transferSearchPresets = presets;
//
//     const presetNames = presets.map(preset => preset.name);
//     const controlsContainer = createControls(presetNames);
//     const searchPanel = document.getElementById("searchpanel");
//     searchPanel.prepend(controlsContainer);
//
//     const savePresetButton = document.getElementById("savePresetButton");
//     savePresetButton.onclick = onSaveSearchClick;
//
//     const currentPresetSelect = document.getElementById("currentPresetSelect");
//     currentPresetSelect.onchange = (ev: Event) => {
//       loadSearchData((ev.target as HTMLSelectElement).value)
//     };
//   });








