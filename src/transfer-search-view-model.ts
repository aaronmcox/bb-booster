import {Preset} from "./preset";
import {Observable, ReplaySubject} from "rxjs";
import StorageArea = browser.storage.StorageArea;

export const presetsStorageName: string = "transfer-search-presets";

export class TransferSearchViewModel {
  private _presets: ReplaySubject<Preset[]> = new ReplaySubject<Preset[]>(1);

  constructor(
    private _storage: StorageArea
  ) {
    this.retrievePresets()
      .then(presets => {
        this._presets.next(presets);
      })
  }

  presets: Observable<Preset[]> = this._presets;

  savePreset(preset: Preset): Promise<boolean> {
    return Promise.resolve(false);
  }

  deletePreset(preset: Preset): Promise<boolean> {
    throw new Error("deletePreset is not implemented");
  }

  private retrievePresets(): Promise<Preset[]> {
    return this._storage.get(presetsStorageName)
      .then(results => results[presetsStorageName])
      .then((presetsJson: string | undefined) => {
        if (!!presetsJson) {
          return JSON.parse(presetsJson) as Preset[];
        }
        return [];
      })
      .catch(error => {
        console.debug(error);
        return [];
      });
  }

}