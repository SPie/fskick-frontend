export interface Game {
  uuid: string;
  createdAt: string;
}

export interface SeasonTable {
  season: Season;
  playerStats: PlayerStats[];
}

export interface Season {
  uuid: string;
  name: string;
  active: boolean;
  games: Game[];
}

export interface Attendance {
  game: Game;
  win: boolean;
}

export interface PlayerStats {
  uuid: string;
  name: string;
  position: number;
  pointsRatio: number;
  points: number;
  wins: number;
  games: number;
  // attendances: Attendance[];
}
