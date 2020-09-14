
import {browser} from "webextension-polyfill-ts";
import {TransferSearchParameters} from "./transfer-search-parameters";
import {Preset} from "../../preset";
import {PersistentStorage} from "../../persistent-storage";

export interface SavePresetResponse {
  preset: Preset<TransferSearchParameters>,
  presets: Preset<TransferSearchParameters>[],
}

export class SearchPresetManager {

  constructor(
    private _persistence: PersistentStorage
  ) {}

  getPresets(): Promise<Preset<TransferSearchParameters>[]> {
    return this._persistence.getTransferSearchPresets();
  }

  savePreset(preset: Preset<TransferSearchParameters>): Promise<SavePresetResponse> {
    return this.getPresets()
      .then(presets => {
          const presetIndex = presets.findIndex(current => current.name === preset.name);

          if( presetIndex === -1 ) {
            presets.push(preset);
          } else {
            presets[presetIndex] = preset;
          }

          return presets;
        })
      .then(presets => this._persistence.saveTransferSearchPresets(presets))
      .then(presets => ({preset, presets}))
      .catch(error => {
        console.debug(error);
        return Promise.reject(error);
      });
  }

  deletePreset(preset: Preset<TransferSearchParameters>): Promise<Preset<TransferSearchParameters>[]> {
    return this.getPresets()
      .then((presets: Preset<TransferSearchParameters>[]) => {
        const presetIndex = presets.findIndex(currentPreset => currentPreset.name === preset.name);

        if( presetIndex !== -1 ) {
          presets.splice(presetIndex, 1);
          return [true, presets];
        }

        return [false, presets];
      })
      .then(([shouldUpdate, presets]: [boolean, Preset<TransferSearchParameters>[]]) => {
        if( !shouldUpdate ) {
          return presets;
        }

        return this._persistence.saveTransferSearchPresets(presets);
      })
      .catch(error => {
        console.debug(error);
        return Promise.reject(error);
      })
  }

}