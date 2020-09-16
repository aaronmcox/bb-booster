
import {browser} from "webextension-polyfill-ts";
import { h, render } from "preact";
import {TransferSearchParameters} from "./transfer-search-parameters";
import {range} from "./range";
import {skill, Skill} from "./skill";
import {TransferListControlsComponent} from "./transfer-list-controls-component";

const skillSelector = skillNo => `select[id\$=cphContent_ddlSkill${skillNo}]`;
const skillMinSelector = skillNo => `select[id\$=cphContent_ddlSkill${skillNo}Min]`;
const skillMaxSelector = skillNo => `select[id\$=cphContent_ddlSkill${skillNo}Max]`;
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
  selectInput(experienceMinSelector).value = params.experience.minimum;
  selectInput(experienceMaxSelector).value = params.experience.maximum;
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
  selectInput(skillSelector(1)).value = params.skills[0].name;
  selectInput(skillMinSelector(1)).value = params.skills[0].limits.minimum;
  selectInput(skillMaxSelector(1)).value = params.skills[0].limits.maximum;
  selectInput(skillSelector(2)).value = params.skills[1].name;
  selectInput(skillMinSelector(2)).value = params.skills[1].limits.minimum;
  selectInput(skillMaxSelector(2)).value = params.skills[1].limits.maximum;
  selectInput(skillSelector(3)).value = params.skills[2].name;
  selectInput(skillMinSelector(3)).value = params.skills[2].limits.minimum;
  selectInput(skillMaxSelector(3)).value = params.skills[2].limits.maximum;
  selectInput(skillSelector(4)).value = params.skills[3].name;
  selectInput(skillMinSelector(4)).value = params.skills[3].limits.minimum;
  selectInput(skillMaxSelector(4)).value = params.skills[3].limits.maximum;
  selectInput(skillSelector(5)).value = params.skills[4].name;
  selectInput(skillMinSelector(5)).value = params.skills[4].limits.minimum;
  selectInput(skillMaxSelector(5)).value = params.skills[4].limits.maximum;
  selectInput(skillSelector(6)).value = params.skills[5].name;
  selectInput(skillMinSelector(6)).value = params.skills[5].limits.minimum;
  selectInput(skillMaxSelector(6)).value = params.skills[5].limits.maximum;
  selectInput(skillSelector(7)).value = params.skills[6].name;
  selectInput(skillMinSelector(7)).value = params.skills[6].limits.minimum;
  selectInput(skillMaxSelector(7)).value = params.skills[6].limits.maximum;
  selectInput(skillSelector(8)).value = params.skills[7].name;
  selectInput(skillMinSelector(8)).value = params.skills[7].limits.minimum;
  selectInput(skillMaxSelector(8)).value = params.skills[7].limits.maximum;

  toggleMinMaxDisabledState();
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

  skills[0] = skill(getValue(skillSelector(1)), getValue(skillMinSelector(1)), getValue(skillMaxSelector(1)));
  skills[1] = skill(getValue(skillSelector(2)), getValue(skillMinSelector(2)), getValue(skillMaxSelector(2)));
  skills[2] = skill(getValue(skillSelector(3)), getValue(skillMinSelector(3)), getValue(skillMaxSelector(3)));
  skills[3] = skill(getValue(skillSelector(4)), getValue(skillMinSelector(4)), getValue(skillMaxSelector(4)));
  skills[4] = skill(getValue(skillSelector(5)), getValue(skillMinSelector(5)), getValue(skillMaxSelector(5)));
  skills[5] = skill(getValue(skillSelector(6)), getValue(skillMinSelector(6)), getValue(skillMaxSelector(6)));
  skills[6] = skill(getValue(skillSelector(7)), getValue(skillMinSelector(7)), getValue(skillMaxSelector(7)));
  skills[7] = skill(getValue(skillSelector(8)), getValue(skillMinSelector(8)), getValue(skillMaxSelector(8)));

  return skills;
}

function toggleMinMaxDisabledState() {
  for(let i = 1; i <= 8; i++) {
    const skillElement = selectInput(skillSelector(i));
    const skillMin = selectInput(skillMinSelector(i));
    const skillMax = selectInput(skillMaxSelector(i));

    if( !!skillElement.value && skillElement.value !== "0" ) {
      skillMin.disabled = false;
      skillMax.disabled = false;
    } else {
      skillMin.disabled = true;
      skillMax.disabled = true;
    }
  }
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
