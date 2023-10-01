// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface PageData {
		}
	}
}

export interface Game {
	uuid: string;
	createdAt: string;
}

export interface Season {
	uuid: string;
	name: string;
	active: boolean;
	games: Game[];
}

export interface PlayerStats {
	uuid: string;
	name: string;
	position: number;
	pointsRatio: number;
	points: number;
	wins: number;
	games: number;
	attendances: Attendance[];
}

export interface SeasonTable {
	season: Season;
	playerStats: PlayerStats[];
}

export interface Attendance {
	game: Game;
	win: boolean;
}
