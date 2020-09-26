
/** @jsx el */
import {el} from "../../dom/jsx-runtime";
import {Persistence} from "../../persistence";
import {Features} from "../../features";

const links = (teamId: string) => {
  return (
    <div id="bbb-next-opponent-links" className={["bbb-section"]}>
      <a href={`/team/${teamId}/schedule.aspx`}>Schedule</a>
      <br/>
      <a href={`/team/${teamId}/players.aspx`}>Roster</a>
      <br/>
      <a href={`/team/${teamId}/stats.aspx`}>Stats</a>
    </div>
  );
};

function addTeamLinks(nextOpponentAnchor: HTMLAnchorElement, lineupSetCheck: Element | undefined): void {
  const teamIdRegex = /.*team\/([0-9]+).*/g;

  const matches = [...nextOpponentAnchor.href.matchAll(teamIdRegex)];

  if( matches.length === 0 ) {
    return;
  }

  const teamId = matches[0][1];

  const priorElement = lineupSetCheck ?? nextOpponentAnchor;

  const linksContainer = document.getElementById("bbb-next-opponent-links");

  if( !!linksContainer ) {
    linksContainer.remove();
  }

  priorElement.insertAdjacentElement("afterend", links(teamId));
}

const persistence = new Persistence();

persistence.getFeatures()
  .then((features: Features) => {
    if( features.nextOpponentLinks ) {
      const nextOpponentAnchor = document.querySelector("a[id$=bbCountdown_hlNextOpponent]") as HTMLAnchorElement;
      const lineupSetCheck = document.querySelector("img[id$=bbCountdown_imgLineupIsSet]");

      if ( !! nextOpponentAnchor ) {
        addTeamLinks(nextOpponentAnchor, lineupSetCheck);
      }
    }
  });


