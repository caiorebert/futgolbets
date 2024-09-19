interface Event {
    event_id: number,
    name: string,
    odds: {
        home_win: number,
        draw: number,
        away_win: number,
    },
    start_time: string,
    status: string,
    teams: {
        home: string,
        away: string,
    },
}

export default Event;