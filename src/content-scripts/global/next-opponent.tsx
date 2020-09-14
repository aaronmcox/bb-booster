
/** @jsx el */
import {el} from "../../dom/jsx-runtime";

const links = (teamId: string) => {
  return (
    <div className={["bbb-section"]}>
      <a href={`/team/${teamId}/schedule.aspx`}>Schedule</a>
      <br/>
      <a href={`/team/${teamId}/players.aspx`}>Roster</a>
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

  priorElement.insertAdjacentElement("afterend", links(teamId));
}

const nextOpponentAnchor = document.querySelector("a[id$=bbCountdown_hlNextOpponent]") as HTMLAnchorElement;
const lineupSetCheck = document.querySelector("img[id$=bbCountdown_imgLineupIsSet]");

if ( !! nextOpponentAnchor ) {
  addTeamLinks(nextOpponentAnchor, lineupSetCheck);
}
