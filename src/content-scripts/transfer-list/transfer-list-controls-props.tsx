import {TransferSearchParameters} from "./transfer-search-parameters";
import {SearchPresetManager} from "./search-preset-manager";


export interface TransferListControlsProps {
  search: () => void,
  getSearchParamsFromDOM: () => TransferSearchParameters,
  loadSearchParamsIntoDOM: (params: TransferSearchParameters) => void
}
