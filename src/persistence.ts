
import {browser} from "webextension-polyfill-ts";
import {Preset} from "./preset";
import {TransferSearchParameters} from "./content-scripts/transfer-list/transfer-search-parameters";
import {defaultFeatures, Features} from "./features";

const presetsStorageName: string = "transfer-search-presets";
const featuresStorageName: string = "features";

export class Persistence {
  private _storage: browser.storage.StorageArea;

  constructor() {
    this._storage = browser.storage.local;
  }

  getTransferSearchPresets(): Promise<Preset<TransferSearchParameters>[]> {
    return this.get<Preset<TransferSearchParameters>[]>(presetsStorageName, []);
  }

  setTransferSearchPresets(presets: Preset<TransferSearchParameters>[]): Promise<Preset<TransferSearchParameters>[]> {
    return this.set(presetsStorageName, presets)
      .then(() => this.getTransferSearchPresets());
  }

  getFeatures(): Promise<Features> {
    return this.get<Features>(featuresStorageName, defaultFeatures);
  }

  setFeatures(features: Features): Promise<Features> {
    return this.set(featuresStorageName, features)
      .then(() => this.getFeatures());
  }

  private set<T>(key: string, serializable: T): Promise<void> {
    const json = JSON.stringify(serializable);

    return this._storage.set({
      [key]: json
    });
  }

  private get<T>(key: string, defaultValue?: T | undefined): Promise<T> {
    return this._storage.get(key)
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

