import {Preset} from "../../preset";
import {TransferSearchParameters} from "./transfer-search-parameters";

export interface SavePresetMessage {
    preset: Preset<TransferSearchParameters>,
    presets: Preset<TransferSearchParameters>[],
}