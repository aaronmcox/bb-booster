
import {h, render} from "preact";

const optionsComponent = () => (
  <form>
    <div class="bbb-container">
      <div>
        <input type="checkbox" id="cb-next-opponent"/>
        <label for="cb-next-opponent">Enable next-opponent links?</label>
      </div>
    </div>
  </form>
);

const container = document.getElementById("bbb-options-container");

render(optionsComponent(), container);