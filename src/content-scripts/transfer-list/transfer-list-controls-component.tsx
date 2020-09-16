
import {browser} from "webextension-polyfill-ts";
import {h, Component} from "preact";
import {TransferListControlsProps} from "./transfer-list-controls-props";
import {TransferListControlsState} from "./transfer-list-controls-state";
import {Preset} from "../../preset";
import {TransferSearchParameters} from "./transfer-search-parameters";
import {SearchPresetManager} from "./search-preset-manager";
import {Persistence} from "../../persistence";

export class TransferListControlsComponent extends Component<TransferListControlsProps, TransferListControlsState> {
  private _presetManager: SearchPresetManager;

  constructor(props) {
    super(props);

    this.state = {
      newPresetName: "",
      presets: [],
      selectedPreset: undefined
    };

    this._presetManager = new SearchPresetManager(new Persistence());

    this.onUpdateNewPresetName = this.onUpdateNewPresetName.bind(this);
    this.onSavePreset = this.onSavePreset.bind(this);
  }

  componentDidMount() {
    this._presetManager.getPresets()
      .then((presets: Preset<TransferSearchParameters>[]) => {
        this.setState({
          presets: presets
        });
      });
  }

  onDeletePreset = (): void => {
    if( !this.state.selectedPreset ) {
      return;
    }

    this._presetManager.deletePreset(this.state.selectedPreset)
      .then(updatedPresets => {
        this.setState({
          selectedPreset: undefined,
          presets: updatedPresets
        });
      })
      .catch(() => {});
  };

  onSavePreset = (): void => {
    const newPresetName = this.state.newPresetName;
    const searchParams = this.props.getSearchParamsFromDOM();

    const currentPreset: Preset<TransferSearchParameters> = {
      name: newPresetName,
      parameters: searchParams
    };

    this._presetManager.savePreset(currentPreset)
      .then(({preset, presets}) => {
        this.setState({
          newPresetName: "",
          selectedPreset: preset,
          presets
        });
      }).catch(() => {});
  };

  onSelectPreset = e => {
    this.setState(oldState => ({
      selectedPreset: oldState.presets.find(preset => preset.name === e.target.value)
    }),
    () => {
      this.props.loadSearchParamsIntoDOM((this.state.selectedPreset.parameters))
    });
  };

  onUpdateNewPresetName(e) {
    this.setState(prevState => Object.assign(prevState, {
      newPresetName: e.target.value
    }));
  }


  render(props: TransferListControlsProps, state: TransferListControlsState) {
    const selectedPresetName = !!state.selectedPreset
      ? state.selectedPreset.name
      : "";

    return (
      <table>
        <tr>
          <td class="bbb-table-label">
            <label>Presets:</label>
          </td>
          <td>
            <select id="bbb-currentPresetSelect" value={selectedPresetName} onChange={this.onSelectPreset} >
              {state.presets.map(preset =>
                <option value={preset.name} >{preset.name}</option>
              )}
              <option value="" disabled>Load Preset...</option>
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
            <input id="bbb-presetTextBox"
                   type="text"
                   placeholder="New Preset..."
                   value={state.newPresetName}
                   onInput={this.onUpdateNewPresetName}
            />
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
