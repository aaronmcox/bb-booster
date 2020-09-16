import {Preset} from "../../preset";
import {TransferSearchParameters} from "./transfer-search-parameters";

export interface TransferListControlsState {
  presets: Preset<TransferSearchParameters>[],
  newPresetName: string,
  selectedPreset: Preset<TransferSearchParameters>,
  useStoredMaxLimits: boolean
}