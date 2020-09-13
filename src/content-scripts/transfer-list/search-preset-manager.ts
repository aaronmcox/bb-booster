
import {browser} from "webextension-polyfill-ts";
import {Observable, BehaviorSubject} from "rxjs";
import {TransferSearchParameters} from "./transfer-search-parameters";
import {Preset} from "../../preset";

const presetsStorageName: string = "transfer-search-presets";

export class SearchPresetManager {
  private _presets: BehaviorSubject<Preset<TransferSearchParameters>[]> = new BehaviorSubject([]);

  constructor(
    private _storage: browser.storage.StorageArea
  ) {
    this.retrievePresets()
      .then(presets => { this._presets.next(presets)})
  }

  getPresets(): Observable<Preset<TransferSearchParameters>[]> {
    return this._presets;
  }

  savePreset(preset: Preset<TransferSearchParameters>): void {
  }

  deletePreset(preset: Preset<TransferSearchParameters>): void {
  }

  private retrievePresets(): Promise<Preset<TransferSearchParameters>[]> {
    return this._storage.get(presetsStorageName)
      .then(results => results[presetsStorageName] ?? [], error => { console.debug(error); return [];})
      .then(presetObject => presetObject as Preset<TransferSearchParameters>[])
      .catch(error => {
        console.debug(error);
        return [];
      })
  }
}