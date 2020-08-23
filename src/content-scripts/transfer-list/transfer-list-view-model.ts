import {Preset} from "../../preset";
import {Observable, ReplaySubject} from "rxjs";
import StorageArea = browser.storage.StorageArea;
import {TransferListUpdate} from "./transfer-list-update";
import {unchanged, updated} from "../../update";

export const presetsStorageName: string = "transfer-search-presets";

export class TransferListViewModel {
  private _selectedPreset: Preset;
  private _presets: Preset[];
  private _updates: ReplaySubject<TransferListUpdate> = new ReplaySubject<TransferListUpdate>(1);

  constructor(
    private _storage: StorageArea
  ) {
    this.retrievePresets()
      .then(presets => {
        this._presets = presets;

        this._updates.next({
          presets: updated(this._presets),
          selectedPreset: updated(this._selectedPreset)
        })
      })
  }

  updates: Observable<TransferListUpdate> = this._updates;

  savePreset(preset: Preset): Promise<void> {
    return this.retrievePresets()
      .then((presets: Preset[]) => {
        const matchedPresetIndex = presets.findIndex(thisPreset => thisPreset.name === preset.name);

        if( matchedPresetIndex === -1 ) {
          presets.push(preset);
        } else {
          presets[matchedPresetIndex] = preset;
        }

        this._storage.set({
          [presetsStorageName]: JSON.stringify(presets)
        })

        this._presets = presets;
        this._selectedPreset = preset;

        this._updates.next({
          selectedPreset: updated(this._selectedPreset),
          presets: updated(this._presets)
        });
      })
      .catch(err => {
        console.debug(err);
      })
  }

  deletePreset(presetName: string): Promise<void> {
    return this.retrievePresets()
      .then((presets: Preset[]) => {
        const presetIndex = presets.findIndex(thisPreset => thisPreset.name === presetName);

        if( presetIndex === -1 ) {
          return;
        }

        presets.splice(presetIndex, 1);

        this._storage.set({
          [presetsStorageName]: JSON.stringify(presets)
        })

        this._presets = presets;
        this._selectedPreset = undefined;

        this._updates.next({
          presets: updated(this._presets),
          selectedPreset: updated(this._selectedPreset)
        });
      })
      .catch(err => {
        console.debug(err);
      });
  }

  selectPreset(presetName: string) {
    const matched = this._presets.find(preset => preset.name === presetName);

    this._selectedPreset = !!matched ? matched : undefined;

    this._updates.next({
      presets: unchanged(this._presets),
      selectedPreset: updated(this._selectedPreset)
    });
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
