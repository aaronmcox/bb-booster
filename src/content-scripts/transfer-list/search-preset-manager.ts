
import {browser} from "webextension-polyfill-ts";
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {take} from "rxjs/operators";
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

  savePreset(preset: Preset<TransferSearchParameters>): Promise<[Preset<TransferSearchParameters>, Preset<TransferSearchParameters>[]]> {
    const response = new Subject<[Preset<TransferSearchParameters>, Preset<TransferSearchParameters>[]]>();

    this._presets
      .pipe(take(1))
      .subscribe((presets: Preset<TransferSearchParameters>[]) => {
        const presetIndex = presets.findIndex(current => current.name === preset.name);

        if( presetIndex === -1 ) {
          presets.push(preset);
        } else {
          presets[presetIndex] = preset;
        }

        this._presets.next(presets);
        response.next([preset, presets]);
        response.complete();
      });

    return response;
  }

  deletePreset(preset: Preset<TransferSearchParameters>): Observable<Preset<TransferSearchParameters>[]> {
    const response = new Subject<Preset<TransferSearchParameters>[]>();

    this._presets
      .pipe(take(1))
      .subscribe((presets: Preset<TransferSearchParameters>[]) => {
        const presetIndex = presets.findIndex(currentPreset => currentPreset.name === preset.name);

        if( presetIndex !== -1 ) {
          presets.splice(presetIndex, 1);
          this._presets.next(presets);
        }

        response.next(presets);
        response.complete();
      });

    return response;
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