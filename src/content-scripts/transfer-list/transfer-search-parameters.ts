
import { Range } from "./range";
import {Skill} from "./skill";

export interface TransferSearchParameters {
  skills: Skill[],
  age: Range,
  salary: Range,
  currentBid: Range,
  height: Range,
  potential: Range,
  experience: Range,
  gameShape: Range,
  nationality: string,
  injury: string,
  isOnNT: boolean,
  guardSkillPoints: Range,
  bigMenSkillPoints: Range,
  totalSkillPoints: Range,
  bestPosition1: string,
  bestPosition2: string
  sortBy: string
}
