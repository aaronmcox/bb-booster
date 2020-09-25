
import {h, render, Component} from "preact";
import {defaultFeatures, Features} from "../features";
import {Persistence} from "../persistence";

interface FeaturesProps {
  features: Features;
  updateFeatures: (features: Features) => void;
}

interface OptionsState {
  features: Features
}

const Features = ({ features, updateFeatures }: FeaturesProps) => (
  <div class="bbb-container">
    <h2>Features</h2>
    <div>
      <input type="checkbox"
             id="cb-next-opponent"
             checked={features.nextOpponentLinks}
             onInput={ev => {updateFeatures({...features, nextOpponentLinks: (ev.target as HTMLInputElement).checked});}}
      />
      <label for="cb-next-opponent">Next opponent links?</label>
    </div>
    <div>
      <input type="checkbox"
             id="cb-next-opponent"
             checked={features.transferListPresets}
             onInput={ev => {updateFeatures({...features, transferListPresets: (ev.target as HTMLInputElement).checked});}}
      />
      <label for="cb-next-opponent">Transfer list presets?</label>
    </div>
  </div>
);

class Options extends Component<any, OptionsState> {
  _persistence: Persistence;

  constructor() {
    super();

    this._persistence = new Persistence();

    this.state = {
      features: defaultFeatures
    };

    this.onUpdateFeatures = this.onUpdateFeatures.bind(this);
  }


  componentDidMount() {
    this._persistence.getFeatures()
      .then((features: Features) => {
        this.setState({ features });
      })
  }

  onUpdateFeatures(features: Features) {
    this._persistence.setFeatures(features)
      .then((features: Features) => {
        this.setState({ features });
      })
  }

  render() {
    return (
      <form>
        <Features
          features={this.state.features}
          updateFeatures={this.onUpdateFeatures}
        />
      </form>
    );
  }
}

const container = document.getElementById("bbb-options-container");

render((<Options />), container);
