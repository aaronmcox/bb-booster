
import { el } from "../dom/jsx-runtime";

function createControls(teamId: string): HTMLElement {
  return (
    <div>
      <a href={`/team/${teamId}/schedule.aspx`}>[Schedule]</a>
      <br/>
      <a href={`/team/${teamId}/players.aspx`}>[Roster]</a>
    </div>
  );
}

function addTeamLinks(nextOpponentAnchor: HTMLAnchorElement): void {
  const teamIdRegex = /.*team\/([0-9]+).*/g;

  const matches = [...nextOpponentAnchor.href.matchAll(teamIdRegex)];

  if( matches.length === 0 ) {
    return;
  }

  const teamId = matches[0][1];

  const links = createControls(teamId);

  nextOpponentAnchor.insertAdjacentElement("afterend", links);
}

const nextOpponentAnchor = document.getElementById("ctl00_bbCountdown_hlNextOpponent") as HTMLAnchorElement;

if ( !! nextOpponentAnchor ) {
  addTeamLinks(nextOpponentAnchor);
}
