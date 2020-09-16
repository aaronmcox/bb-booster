
import {browser} from "webextension-polyfill-ts";
import {Preset} from "./preset";
import {TransferSearchParameters} from "./content-scripts/transfer-list/transfer-search-parameters";

const presetsStorageName: string = "transfer-search-presets";

export class Persistence {
  private _storage: browser.storage.StorageArea;

  constructor() {
    this._storage = browser.storage.local;
  }

  getTransferSearchPresets(): Promise<Preset<TransferSearchParameters>[]> {
    return this.get<Preset<TransferSearchParameters>[]>(presetsStorageName, []);
  }

  saveTransferSearchPresets(presets: Preset<TransferSearchParameters>[]): Promise<Preset<TransferSearchParameters>[]> {
    return this.set(presetsStorageName, presets)
      .then(() => this.getTransferSearchPresets());
  }

  private set<T>(key: string, serializable: T): Promise<void> {
    const json = JSON.stringify(serializable);

    return this._storage.set({
      [key]: json
    });
  }

  private get<T>(key: string, defaultValue?: T | undefined): Promise<T> {
    return this._storage.get(presetsStorageName)
      .then(getResults => getResults[key])
      .then((json: string) => {
        if( json !== undefined ) {
          return JSON.parse(json) as T
        }

        return defaultValue;
      })
      .catch(error => {
        console.debug(error);

        return defaultValue;
      });
  }
}

