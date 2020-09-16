
import {range, Range} from "./range";

export interface Skill  {
  name: string,
  limits: Range
}

export function skill(name: string, minimum: string, maximum: string): Skill {
  return {
    name,
    limits: range(minimum, maximum)
  };
}
