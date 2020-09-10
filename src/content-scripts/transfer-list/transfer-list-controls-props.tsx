import {TransferSearchParameters} from "./transfer-search-parameters";


export interface TransferListControlsProps {
  search: () => void,
  getSearchParamsFromDOM: () => TransferSearchParameters,
  loadSearchParamsIntoDOM: (params: TransferSearchParameters) => void,
}
