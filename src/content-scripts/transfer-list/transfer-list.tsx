import {el} from "../../dom/jsx-runtime";
import {Preset} from "../../preset";
import {PresetInputType} from "../../preset-input-type";
import {PresetInput} from "../../preset-input";
import {TransferListViewModel} from "./transfer-list-view-model";
import {TransferListUpdate} from "./transfer-list-update";
import {browser} from "webextension-polyfill-ts";

const skill1 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill1]");
const skill2 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill2]");
const skill3 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill3]");
const skill4 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill4]");
const skill5 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill5]");
const skill6 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill6]");
const skill7 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill7]");
const skill8 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill8]");
const skill1Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill1Min]");
const skill2Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill2Min]");
const skill3Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill3Min]");
const skill4Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill4Min]");
const skill5Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill5Min]");
const skill6Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill6Min]");
const skill7Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill7Min]");
const skill8Min = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill8Min]");
const skill1Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill1Max]");
const skill2Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill2Max]");
const skill3Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill3Max]");
const skill4Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill4Max]");
const skill5Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill5Max]");
const skill6Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill6Max]");
const skill7Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill7Max]");
const skill8Max = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlSkill8Max]");
const ageMin = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMinAge]");
const ageMax = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMaxAge]");
const salaryMin = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMinSalary]");
const salaryMax = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMaxSalary]");
const currentBidMin = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMinCurrentBid]");
const currentBidMax = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMaxCurrentBid]");
const heightMin = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlHeightMin]");
const heightMax = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlHeightMax]");
const potentialMin = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlPotentialMin]");
const potentialMax = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlPotentialMax]");
const experienceMin = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlExperienceMin]");
const experienceMax = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlExperienceMax]");
const gameShapeMin = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlGameShapeMin]");
const gameShapeMax = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlGameShapeMax]");
const nationality = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlCountry]");
const injury = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlInjury1]");
const isOnNt = (): HTMLInputElement => document.querySelector("input[id$=cphContent_cbIsOnNT]");
const guardSkillPointsMin = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbGuardSkillPoints]");
const guardSkillPointsMax = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMaxGuardSkillPoints]");
const bigMenSkillPointsMin = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbForwardSkillPoints]");
const bigMenSkillPointsMax = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMaxForwardSkillPoints]");
const totalSkillPointsMin = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbTotalSkillPoints]");
const totalSkillPointsMax = (): HTMLInputElement => document.querySelector("input[id$=cphContent_tbMaxTotalSkillPoints]");
const bestPosition1 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlBestposition]");
const bestPosition2 = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlBestposition2]");
const sortBy = (): HTMLSelectElement => document.querySelector("select[id$=cphContent_ddlsortBy]");

function getFormData(): PresetInput[] {
  const searchContainer: HTMLElement = document.querySelector("div[id$=cphContent_pnlTL]");
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

  const currentPresetSelect = document.getElementById("bbb-currentPresetSelect") as HTMLInputElement;
  currentPresetSelect.value = preset.name;

  for (const input of preset.data) {
    const inputElement = document.querySelector(`[id\$=${input.id}]`) as HTMLInputElement;

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
    const skillElement = document.querySelector(`select[id$=cphContent_ddlSkill${i}]`) as HTMLSelectElement;
    const skillMin = document.querySelector(`select[id$=cphContent_ddlSkill${i}Min]`) as HTMLSelectElement;
    const skillMax = document.querySelector(`select[id$=cphContent_ddlSkill${i}Max]`) as HTMLSelectElement;

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
  <div id="bbb-transfer-search-container" className={["bbb-section", "bbb-lighter"]}>
    <table>
      <tr>
        <td className={["bbb-table-label"]}>
          <label>Presets:</label>
        </td>
        <td>
          <select id="bbb-currentPresetSelect">
            {searchNames.map(name =>
                <option value={name}>{name}</option>
            )}
            <option value="" disabled selected>Load Preset...</option>
          </select>
        </td>
        <td>
          <input
              id="bbb-topSearchButton"
              className={["button"]}
              type="button"
              value="Search"
            />
        </td>
        <td>
          <input
              id="bbb-deletePresetButton"
              className={["button"]}
              type="button"
              value="Delete"/>
        </td>
      </tr>
      <tr>
        <td className={["bbb-table-label"]}/>
        <td>
          <input id="bbb-presetTextBox" type="text" placeholder="New Preset..." />
        </td>
        <td>
          <input
              id="bbb-savePresetButton"
              className={["button"]}
              type="button"
              value="Save"/>
        </td>
      </tr>
    </table>
  </div>;

const viewModel = new TransferListViewModel(browser.storage.local);

viewModel
  .updates
  .subscribe((update: TransferListUpdate) => {
    if (update.presets.isUpdated) {
      const presetNames = update.presets.payload.map(preset => preset.name);

      const controlsContainer = createControls(presetNames);

      const searchPanel = document.querySelector("div[id$=cphContent_pnlTL]");
      const existingSearchContainer = document.getElementById("bbb-transfer-search-container");

      if (!!existingSearchContainer) {
        existingSearchContainer.remove();
      }

      searchPanel.insertAdjacentElement("beforebegin", controlsContainer);

      const presetTextBox = document.getElementById('bbb-presetTextBox') as HTMLInputElement;
      const savePresetButton = document.getElementById("bbb-savePresetButton");
      savePresetButton.onclick = () => saveSearch(presetTextBox.value);

      const currentPresetSelect = document.getElementById("bbb-currentPresetSelect") as HTMLSelectElement;
      currentPresetSelect.onchange = (ev: Event) => {
        viewModel.selectPreset((ev.target as HTMLSelectElement).value);
      };

      const deleteButton = document.getElementById("bbb-deletePresetButton");
      deleteButton.onclick = () => viewModel.deletePreset(currentPresetSelect.value);

      const topSearchButton = document.getElementById("bbb-topSearchButton");
      const bottomSearchButton = document.querySelector("input[id$=cphContent_btnSearch]") as HTMLElement;
      topSearchButton.onclick = () => { bottomSearchButton.click(); };
    }

    if (update.selectedPreset.isUpdated) {
      loadSearchData(update.selectedPreset.payload);
    }

  });
