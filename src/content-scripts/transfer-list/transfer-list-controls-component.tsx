
import {h, Component} from "preact";
import {TransferListControlsProps} from "./transfer-list-controls-props";
import {TransferListControlsState} from "./transfer-list-controls-state";
import {Preset} from "../../preset";
import {TransferSearchParameters} from "./transfer-search-parameters";
import {Subscription} from "rxjs";
import {SearchPresetManager} from "./search-preset-manager";
import {browser} from "webextension-polyfill-ts";

export class TransferListControlsComponent extends Component<TransferListControlsProps, TransferListControlsState> {
  private _presetManager: SearchPresetManager;
  private _presetUpdates: Subscription;

  constructor() {
    super();

    this.state = {
      newPresetName: "",
      presets: [],
      selectedPreset: undefined
    }

    this._presetManager = new SearchPresetManager(browser.storage.sync);
  }

  componentDidMount() {
    this._presetUpdates = this._presetManager.getPresets()
      .subscribe((presets: Preset<TransferSearchParameters>[]) => {
        this.setState({
          presets
        });
      });
  }

  componentWillUnmount() {
    if( !!this._presetUpdates ) {
      this._presetUpdates.unsubscribe();
    }
  }

  onDeletePreset(): void {
  }

  onSavePreset(): void {
    const newPresetName = this.state.newPresetName;
    const searchParams = this.props.getSearchParamsFromDOM();

    const preset: Preset<TransferSearchParameters> = {
      name: newPresetName,
      parameters: searchParams
    };

    this._presetManager.savePreset(preset)
      .subscribe((success: boolean) => {
        if( success ) {
          this.setState({
            newPresetName: "",
            selectedPreset: preset
          });
        }
      });
  }

  render(props: TransferListControlsProps, state: TransferListControlsState) {
    return (
      <table>
        <tr>
          <td class="bbb-table-label">
            <label>Presets:</label>
          </td>
          <td>
            <select id="bbb-currentPresetSelect" value={state.selectedPreset.name} >
              {state.presets.map(preset =>
                <option value={preset.name} selected={preset.name === state.selectedPreset.name}>{preset}</option>
              )}
              <option value="" disabled selected={state.selectedPreset.name === ""}>Load Preset...</option>
            </select>
          </td>
          <td>
            <input
              id="bbb-topSearchButton"
              class="button"
              type="button"
              value="Search"
              onClick={props.search}
            />
          </td>
          <td>
            <input
              id="bbb-deletePresetButton"
              class="button"
              type="button"
              value="Delete"
              onClick={this.onDeletePreset}
            />
          </td>
        </tr>
        <tr>
          <td class="bbb-table-label"/>
          <td>
            <input id="bbb-presetTextBox" type="text" placeholder="New Preset..." />
          </td>
          <td>
            <input
              id="bbb-savePresetButton"
              class="button"
              type="button"
              value="Save"
              onClick={this.onSavePreset}
            />
          </td>
        </tr>
      </table>);
  };
}
