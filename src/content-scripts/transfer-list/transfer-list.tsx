
// import {el} from "../../dom/jsx-runtime";
import { h, render, Component } from "preact";
import {Preset} from "../../preset";
import {PresetInputType} from "../../preset-input-type";
import {PresetInput} from "../../preset-input";
import {TransferListViewModel} from "./transfer-list-view-model";
import {TransferListUpdate} from "./transfer-list-update";
import {browser} from "webextension-polyfill-ts";
import {TransferSearchParameters} from "./transfer-search-parameters";
import {range} from "./range";
import {skill, Skill} from "./skill";
import {TransferListControlsProps} from "./transfer-list-controls-props";
import {SelectData} from "../../common/select-data";

const skill1Selector = "select[id$=cphContent_ddlSkill1]";
const skill2Selector = "select[id$=cphContent_ddlSkill2]";
const skill3Selector = "select[id$=cphContent_ddlSkill3]";
const skill4Selector = "select[id$=cphContent_ddlSkill4]";
const skill5Selector = "select[id$=cphContent_ddlSkill5]";
const skill6Selector = "select[id$=cphContent_ddlSkill6]";
const skill7Selector = "select[id$=cphContent_ddlSkill7]";
const skill8Selector = "select[id$=cphContent_ddlSkill8]";
const skill1MinSelector = "select[id$=cphContent_ddlSkill1Min]";
const skill2MinSelector = "select[id$=cphContent_ddlSkill2Min]";
const skill3MinSelector = "select[id$=cphContent_ddlSkill3Min]";
const skill4MinSelector = "select[id$=cphContent_ddlSkill4Min]";
const skill5MinSelector = "select[id$=cphContent_ddlSkill5Min]";
const skill6MinSelector = "select[id$=cphContent_ddlSkill6Min]";
const skill7MinSelector = "select[id$=cphContent_ddlSkill7Min]";
const skill8MinSelector = "select[id$=cphContent_ddlSkill8Min]";
const skill1MaxSelector = "select[id$=cphContent_ddlSkill1Max]";
const skill2MaxSelector = "select[id$=cphContent_ddlSkill2Max]";
const skill3MaxSelector = "select[id$=cphContent_ddlSkill3Max]";
const skill4MaxSelector = "select[id$=cphContent_ddlSkill4Max]";
const skill5MaxSelector = "select[id$=cphContent_ddlSkill5Max]";
const skill6MaxSelector = "select[id$=cphContent_ddlSkill6Max]";
const skill7MaxSelector = "select[id$=cphContent_ddlSkill7Max]";
const skill8MaxSelector = "select[id$=cphContent_ddlSkill8Max]";
const ageMinSelector = "input[id$=cphContent_tbMinAge]";
const ageMaxSelector = "input[id$=cphContent_tbMaxAge]";
const salaryMinSelector = "input[id$=cphContent_tbMinSalary]";
const salaryMaxSelector = "input[id$=cphContent_tbMaxSalary]";
const currentBidMinSelector = "input[id$=cphContent_tbMinCurrentBid]";
const currentBidMaxSelector = "input[id$=cphContent_tbMaxCurrentBid]";
const heightMinSelector = "select[id$=cphContent_ddlHeightMin]";
const heightMaxSelector = "select[id$=cphContent_ddlHeightMax]";
const potentialMinSelector = "select[id$=cphContent_ddlPotentialMin]";
const potentialMaxSelector = "select[id$=cphContent_ddlPotentialMax]";
const experienceMinSelector = "select[id$=cphContent_ddlExperienceMin]";
const experienceMaxSelector = "select[id$=cphContent_ddlExperienceMax]";
const gameShapeMinSelector = "select[id$=cphContent_ddlGameShapeMin]";
const gameShapeMaxSelector = "select[id$=cphContent_ddlGameShapeMax]";
const nationalitySelector = "select[id$=cphContent_ddlCountry]";
const injurySelector = "select[id$=cphContent_ddlInjury1]";
const isOnNtSelector = "input[id$=cphContent_cbIsOnNT]";
const guardSkillPointsMinSelector = "input[id$=cphContent_tbGuardSkillPoints]";
const guardSkillPointsMaxSelector = "input[id$=cphContent_tbMaxGuardSkillPoints]";
const bigMenSkillPointsMinSelector = "input[id$=cphContent_tbForwardSkillPoints]";
const bigMenSkillPointsMaxSelector = "input[id$=cphContent_tbMaxForwardSkillPoints]";
const totalSkillPointsMinSelector = "input[id$=cphContent_tbTotalSkillPoints]";
const totalSkillPointsMaxSelector = "input[id$=cphContent_tbMaxTotalSkillPoints]";
const bestPosition1Selector = "select[id$=cphContent_ddlBestposition]";
const bestPosition2Selector = "select[id$=cphContent_ddlBestposition2]";
const sortBySelector = "select[id$=cphContent_ddlsortBy]";

function select(selector: string): HTMLElement {
  return document.querySelector(selector);
}

function selectInput(selector: string): HTMLInputElement {
  return select(selector) as HTMLInputElement;
}

function getValue(selector: string): string {
  const element = selectInput(selector);

  return !!element
    ? element.value
    : "";
}

function getChecked(selector: string): boolean {
  const element = selectInput(selector);

  return !!element
    ? element.checked
    : false
}

function setFormData(params: TransferSearchParameters): void {
  selectInput(ageMinSelector).value = params.age.minimum;
  selectInput(ageMaxSelector).value = params.age.maximum;
  selectInput(bestPosition1Selector).value = params.bestPosition1;
  selectInput(bestPosition2Selector).value = params.bestPosition2;
  selectInput(bigMenSkillPointsMinSelector).value = params.bigMenSkillPoints.minimum;
  selectInput(bigMenSkillPointsMaxSelector).value = params.bigMenSkillPoints.maximum;
  selectInput(currentBidMinSelector).value = params.currentBid.minimum;
  selectInput(currentBidMaxSelector).value = params.currentBid.maximum;
  selectInput(experienceMinSelector).value = params.currentBid.minimum;
  selectInput(experienceMaxSelector).value = params.currentBid.maximum;
  selectInput(gameShapeMinSelector).value = params.gameShape.minimum;
  selectInput(gameShapeMaxSelector).value = params.gameShape.maximum;
  selectInput(guardSkillPointsMinSelector).value = params.guardSkillPoints.minimum;
  selectInput(guardSkillPointsMaxSelector).value = params.guardSkillPoints.maximum;
  selectInput(heightMinSelector).value = params.height.minimum;
  selectInput(heightMaxSelector).value = params.height.maximum;
  selectInput(injurySelector).value = params.injury;
  selectInput(isOnNtSelector).checked = params.isOnNT;
  selectInput(nationalitySelector).value = params.nationality;
  selectInput(potentialMinSelector).value = params.potential.minimum;
  selectInput(potentialMaxSelector).value = params.potential.maximum;
  selectInput(salaryMinSelector).value = params.salary.minimum;
  selectInput(salaryMaxSelector).value = params.salary.maximum;
  selectInput(sortBySelector).value = params.sortBy;
  selectInput(totalSkillPointsMinSelector).value = params.totalSkillPoints.minimum;
  selectInput(totalSkillPointsMaxSelector).value = params.totalSkillPoints.maximum;

  //skills
  selectInput(skill1Selector).value = params.skills[0].name;
  selectInput(skill1MinSelector).value = params.skills[0].limits.minimum;
  selectInput(skill1MaxSelector).value = params.skills[0].limits.maximum;
  selectInput(skill2Selector).value = params.skills[1].name;
  selectInput(skill2MinSelector).value = params.skills[1].limits.minimum;
  selectInput(skill2MaxSelector).value = params.skills[1].limits.maximum;
  selectInput(skill3Selector).value = params.skills[2].name;
  selectInput(skill3MinSelector).value = params.skills[2].limits.minimum;
  selectInput(skill3MaxSelector).value = params.skills[2].limits.maximum;
  selectInput(skill4Selector).value = params.skills[3].name;
  selectInput(skill4MinSelector).value = params.skills[3].limits.minimum;
  selectInput(skill4MaxSelector).value = params.skills[3].limits.maximum;
  selectInput(skill5Selector).value = params.skills[4].name;
  selectInput(skill5MinSelector).value = params.skills[4].limits.minimum;
  selectInput(skill5MaxSelector).value = params.skills[4].limits.maximum;
  selectInput(skill6Selector).value = params.skills[5].name;
  selectInput(skill6MinSelector).value = params.skills[5].limits.minimum;
  selectInput(skill6MaxSelector).value = params.skills[5].limits.maximum;
  selectInput(skill7Selector).value = params.skills[6].name;
  selectInput(skill7MinSelector).value = params.skills[6].limits.minimum;
  selectInput(skill7MaxSelector).value = params.skills[6].limits.maximum;
  selectInput(skill8Selector).value = params.skills[7].name;
  selectInput(skill8MinSelector).value = params.skills[7].limits.minimum;
  selectInput(skill8MaxSelector).value = params.skills[7].limits.maximum;
}


function getFormData(): TransferSearchParameters {
  return {
    age: range(getValue(ageMinSelector), getValue(ageMaxSelector)),
    bestPosition1: getValue(bestPosition1Selector) ?? "",
    bestPosition2: getValue(bestPosition2Selector) ?? "",
    bigMenSkillPoints: range(getValue(bigMenSkillPointsMinSelector), getValue(bigMenSkillPointsMaxSelector)),
    currentBid: range(getValue(currentBidMinSelector), getValue(currentBidMaxSelector)),
    experience: range(getValue(experienceMinSelector), getValue(experienceMaxSelector)),
    gameShape: range(getValue(gameShapeMinSelector), getValue(gameShapeMaxSelector)),
    guardSkillPoints: range(getValue(guardSkillPointsMinSelector), getValue(guardSkillPointsMaxSelector)),
    height: range(getValue(heightMinSelector), getValue(heightMaxSelector)),
    injury: getValue(injurySelector) ?? "",
    isOnNT: getChecked(isOnNtSelector),
    nationality: getValue(nationalitySelector) ?? "",
    potential: range(getValue(potentialMinSelector), getValue(potentialMaxSelector)),
    salary: range(getValue(salaryMinSelector), getValue(salaryMaxSelector)),
    skills: getSkillsData(),
    sortBy: getValue(sortBySelector),
    totalSkillPoints: range(getValue(totalSkillPointsMinSelector), getValue(totalSkillPointsMaxSelector))
  };
}

function getSkillsData(): Skill[] {
  const skills: Skill[] = [];

  skills[0] = skill(getValue(skill1Selector), getValue(skill1MinSelector), getValue(skill1MaxSelector));
  skills[1] = skill(getValue(skill2Selector), getValue(skill2MinSelector), getValue(skill2MaxSelector));
  skills[2] = skill(getValue(skill3Selector), getValue(skill3MinSelector), getValue(skill3MaxSelector));
  skills[3] = skill(getValue(skill4Selector), getValue(skill4MinSelector), getValue(skill4MaxSelector));
  skills[4] = skill(getValue(skill5Selector), getValue(skill5MinSelector), getValue(skill5MaxSelector));
  skills[5] = skill(getValue(skill6Selector), getValue(skill6MinSelector), getValue(skill6MaxSelector));
  skills[6] = skill(getValue(skill7Selector), getValue(skill7MinSelector), getValue(skill7MaxSelector));
  skills[7] = skill(getValue(skill8Selector), getValue(skill8MinSelector), getValue(skill8MaxSelector));

  return skills;
}

class TransferListControlsComponent extends Component<TransferListControlsProps, SelectData> {
  constructor() {
    super();

    this.state = {
      selected: "",
      options: []
    };
  }

  componentDidMount() {
  }

  render(props: TransferListControlsProps, state: SelectData) {
    return (
      <table>
        <tr>
          <td class="bbb-table-label">
            <label>Presets:</label>
          </td>
          <td>
            <select id="bbb-currentPresetSelect" >
              {state.options.map(name =>
                <option value={name} selected={name === state.selected}>{name}</option>
              )}
              <option value="" disabled selected={state.selected === ""}>Load Preset...</option>
            </select>
          </td>
          <td>
            <input
              id="bbb-topSearchButton"
              class="button"
              type="button"
              value="Search"
              onClick={props.search}
            />
          </td>
          <td>
            <input
              id="bbb-deletePresetButton"
              class="button"
              type="button"
              value="Delete"/>
          </td>
        </tr>
        <tr>
          <td class="bbb-table-label"/>
          <td>
            <input id="bbb-presetTextBox" type="text" placeholder="New Preset..." />
          </td>
          <td>
            <input
              id="bbb-savePresetButton"
              class="button"
              type="button"
              value="Save"/>
          </td>
        </tr>
      </table>);
  };
}

const searchPanel = document.querySelector("div[id$=cphContent_pnlTL]");
const bottomSearchButton = document.querySelector("input[id$=cphContent_btnSearch]") as HTMLElement;

let controlsContainer = document.getElementById("bbb-transfer-search-container");

if( !controlsContainer ) {
  controlsContainer = document.createElement("div" );
  controlsContainer.id = "bbb-transfer-search-container";
  controlsContainer.className = "bbb-section bbb-lighter";

  searchPanel.insertAdjacentElement("beforebegin", controlsContainer);
}

render(
  <TransferListControlsComponent
    getSearchParamsFromDOM={getFormData}
    loadSearchParamsIntoDOM={setFormData}
    search={() => bottomSearchButton.click()}
  />,
  controlsContainer
);


//       const existingSearchContainer = document.getElementById("bbb-transfer-search-container");
//
//       if (!!existingSearchContainer) {
//         existingSearchContainer.remove();
//       }
//
//       searchPanel.insertAdjacentElement("beforebegin", controlsContainer);


// function saveSearch(name: string): void {
//   const searchData: Preset = {
//     name,
//     data: getFormData()
//   };
//
//   viewModel.savePreset(searchData)
// }
//
//
// function loadSearchData(preset: Preset): void {
//   if( !preset ) {
//     return;
//   }
//
//   const currentPresetSelect = document.getElementById("bbb-currentPresetSelect") as HTMLInputElement;
//   currentPresetSelect.value = preset.name;
//
//   for (const input of preset.data) {
//     const inputElement = document.querySelector(`[id\$=${input.id}]`) as HTMLInputElement;
//
//     if (!!input) {
//       if (input.inputType === PresetInputType.CheckBox) {
//         inputElement.checked = input.value;
//       } else {
//         inputElement.value = input.value;
//       }
//     }
//   }
//
//   toggleMinMaxDisabledState();
// }
//
// function toggleMinMaxDisabledState() {
//   for(let i = 1; i <= 8; i++) {
//     const skillElement = document.querySelector(`select[id$=cphContent_ddlSkill${i}]`) as HTMLSelectElement;
//     const skillMin = document.querySelector(`select[id$=cphContent_ddlSkill${i}Min]`) as HTMLSelectElement;
//     const skillMax = document.querySelector(`select[id$=cphContent_ddlSkill${i}Max]`) as HTMLSelectElement;
//
//     if( !!skillElement.value && skillElement.value !== "0" ) {
//       skillMin.disabled = false;
//       skillMax.disabled = false;
//     } else {
//       skillMin.disabled = true;
//       skillMax.disabled = true;
//     }
//   }
// }
//
//
// const viewModel = new TransferListViewModel(browser.storage.local);
//
// viewModel
//   .updates
//   .subscribe((update: TransferListUpdate) => {
//     if (update.presets.isUpdated) {
//       const presetNames = update.presets.payload.map(preset => preset.name);
//
//       const controlsContainer = createControls(presetNames);
//
//       const searchPanel = document.querySelector("div[id$=cphContent_pnlTL]");
//       const existingSearchContainer = document.getElementById("bbb-transfer-search-container");
//
//       if (!!existingSearchContainer) {
//         existingSearchContainer.remove();
//       }
//
//       searchPanel.insertAdjacentElement("beforebegin", controlsContainer);
//
//       const presetTextBox = document.getElementById('bbb-presetTextBox') as HTMLInputElement;
//       const savePresetButton = document.getElementById("bbb-savePresetButton");
//       savePresetButton.onclick = () => saveSearch(presetTextBox.value);
//
//       const currentPresetSelect = document.getElementById("bbb-currentPresetSelect") as HTMLSelectElement;
//       currentPresetSelect.onchange = (ev: Event) => {
//         viewModel.selectPreset((ev.target as HTMLSelectElement).value);
//       };
//
//       const deleteButton = document.getElementById("bbb-deletePresetButton");
//       deleteButton.onclick = () => viewModel.deletePreset(currentPresetSelect.value);
//
//       const topSearchButton = document.getElementById("bbb-topSearchButton");
//       const bottomSearchButton = document.querySelector("input[id$=cphContent_btnSearch]") as HTMLElement;
//       topSearchButton.onclick = () => { bottomSearchButton.click(); };
//     }
//
//     if (update.selectedPreset.isUpdated) {
//       loadSearchData(update.selectedPreset.payload);
//     }
//
//   });
