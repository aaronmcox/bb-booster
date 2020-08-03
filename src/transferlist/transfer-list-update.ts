import {Preset} from "../preset";
import {Update} from "../update";

export interface TransferListUpdate {
  selectedPreset: Update<Preset>,
  presets: Update<Preset[]>
}
