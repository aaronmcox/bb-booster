import {Preset} from "./preset";
import {Observable, ReplaySubject, BehaviorSubject} from "rxjs";
import StorageArea = browser.storage.StorageArea;

export const presetsStorageName: string = "transfer-search-presets";

export class TransferSearchViewModel {
  private _presets: ReplaySubject<Preset[]> = new ReplaySubject<Preset[]>(1);
  private _selectedPreset: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(undefined);

  constructor(
    private _storage: StorageArea
  ) {
    this.retrievePresets()
      .then(presets => {
        this._presets.next(presets);
      })
  }

  presets: Observable<Preset[]> = this._presets;
  selectedPreset: Observable<Preset> = this._selectedPreset;

  savePreset(preset: Preset) {
    this.retrievePresets()
      .then((presets: Preset[]) => {
        const matchedPresetIndex = presets.findIndex(thisPreset => thisPreset.name === preset.name);

        if( matchedPresetIndex === -1 ) {
          presets.push(preset);
        } else {
          presets[matchedPresetIndex] = preset;
        }

        return presets;
      })
      .then((presets: Preset[]) =>
        this._storage.set({
          [presetsStorageName]: JSON.stringify(presets)
        }))
      .then(() => {
        this._selectedPreset.next(preset);
      })
      .catch(err => {
        console.debug(err);
      })
  }

  deletePreset(preset: Preset): Promise<boolean> {
    throw new Error("deletePreset is not implemented");
  }

  selectPreset(presetName: string) {
    this.retrievePresets()
      .then((presets: Preset[]) => {
        const matched = presets.find(preset => preset.name === presetName);

        if( !!matched ) {
          this._selectedPreset.next(matched);
        } else {
          this._selectedPreset.next(undefined);
        }
      })
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