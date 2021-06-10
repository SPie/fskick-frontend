export interface Game {
    uuid: string
}
export interface Season {
    uuid: string
    name: string
    active: boolean
    games: Game[]
}