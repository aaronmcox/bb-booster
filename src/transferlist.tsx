import {el} from "./dom/jsx-runtime";
import {Preset} from "./preset";
import {PresetData} from "./preset-data";
import {PresetInputType} from "./preset-input-type";
import {PresetInput} from "./preset-input";
import {TransferListViewModel} from "./transfer-list-view-model";
import {TransferListUpdate} from "./transfer-list-update";

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
    name,
    data: getFormData()
  };

  viewModel.savePreset(searchData)
}


function loadSearchData(preset: Preset): void {
  if( !preset ) {
    return;
  }

  const currentPresetSelect = document.getElementById("currentPresetSelect") as HTMLInputElement;
  currentPresetSelect.value = preset.name;

  // TODO: make preset data an array instead of object??
  for (const id of Object.getOwnPropertyNames(preset.data)) {
    const input = preset.data[id];

    const element = document.getElementById(id) as HTMLInputElement;

    // TODO: enable skills
    if (!!input) {
      if (input.inputType === PresetInputType.CheckBox) {
        element.checked = input.value;
      } else {
        element.value = input.value;
      }
    }
  }
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

const viewModel = new TransferListViewModel(browser.storage.local);

viewModel
  .updates
  .subscribe((update: TransferListUpdate) => {
    if( update.presets.isUpdated  ) {
      const presetNames = update.presets.payload.map(preset => preset.name);

      const controlsContainer = createControls(presetNames);

      const searchPanel = document.getElementById("searchpanel");
      const existingSearchContainer = document.getElementById("transfer-search-container");

      if( !!existingSearchContainer ) {
        existingSearchContainer.remove();
      }

      searchPanel.prepend(controlsContainer);

      const presetTextBox = document.getElementById('presetTextBox') as HTMLInputElement;
      const savePresetButton = document.getElementById("savePresetButton");
      savePresetButton.onclick = () => saveSearch(presetTextBox.value);

      const currentPresetSelect = document.getElementById("currentPresetSelect");
      currentPresetSelect.onchange = (ev: Event) => {
        viewModel.selectPreset((ev.target as HTMLSelectElement).value);
      };
    }

    if( update.selectedPreset.isUpdated ) {
      loadSearchData(update.selectedPreset.payload);
    }

  })








