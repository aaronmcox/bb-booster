import {el} from "./dom/jsx-runtime";
import {Preset} from "./preset";
import {PresetInputType} from "./preset-input-type";
import {PresetInput} from "./preset-input";
import {TransferListViewModel} from "./transfer-list-view-model";
import {TransferListUpdate} from "./transfer-list-update";

function getFormData(): PresetInput[] {
  const searchContainer: HTMLElement = document.getElementById("ctl00_cphContent_pnlTL");
  const presetData: PresetInput[] = [];
  const inputs = searchContainer.getElementsByTagName("input");
  const selects = searchContainer.getElementsByTagName("select");

  for (const input of inputs) {
    if( !input.id || !Object.values(PresetInputType).includes(input.type as PresetInputType) ) {
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

    presetData.push(presetInput);
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

    presetData.push(presetInput);
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

  for (const input of preset.data) {
    const inputElement = document.getElementById(input.id) as HTMLInputElement;

    if (!!input) {
      if (input.inputType === PresetInputType.CheckBox) {
        inputElement.checked = input.value;
      } else {
        inputElement.value = input.value;
      }
    }
  }

  toggleMinMaxDisabledState();
}

function toggleMinMaxDisabledState() {
  for(let i = 1; i <= 8; i++) {
    const skillElement = document.getElementById(`ctl00_cphContent_ddlSkill${i}`) as HTMLSelectElement;
    const skillMin = document.getElementById(`ctl00_cphContent_ddlSkill${i}Min`) as HTMLSelectElement;
    const skillMax = document.getElementById(`ctl00_cphContent_ddlSkill${i}Max`) as HTMLSelectElement;

    if( !!skillElement.value && skillElement.value !== "0" ) {
      skillMin.disabled = false;
      skillMax.disabled = false;
    } else {
      skillMin.disabled = true;
      skillMax.disabled = true;
    }
  }
}

const createControls = (searchNames) =>
  <div id="transfer-search-container" className={["boxcontent"]}>
    <div>
      <select id="currentPresetSelect">
        <option value="...">...</option>
        {searchNames.map(name =>
          <option value={name}>{name}</option>
        )}
      </select>
      <button
        id="deletePresetButton"
        type="button">
        Delete
      </button>
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
    if (update.presets.isUpdated) {
      const presetNames = update.presets.payload.map(preset => preset.name);

      const controlsContainer = createControls(presetNames);

      const searchPanel = document.getElementById("searchpanel");
      const existingSearchContainer = document.getElementById("transfer-search-container");

      if (!!existingSearchContainer) {
        existingSearchContainer.remove();
      }

      searchPanel.prepend(controlsContainer);

      const presetTextBox = document.getElementById('presetTextBox') as HTMLInputElement;
      const savePresetButton = document.getElementById("savePresetButton");
      savePresetButton.onclick = () => saveSearch(presetTextBox.value);

      const currentPresetSelect = document.getElementById("currentPresetSelect") as HTMLSelectElement;
      currentPresetSelect.onchange = (ev: Event) => {
        viewModel.selectPreset((ev.target as HTMLSelectElement).value);
      };

      const deleteButton = document.getElementById("deletePresetButton");
      deleteButton.onclick = () => viewModel.deletePreset(currentPresetSelect.value);
    }

    if (update.selectedPreset.isUpdated) {
      loadSearchData(update.selectedPreset.payload);
    }

  })
