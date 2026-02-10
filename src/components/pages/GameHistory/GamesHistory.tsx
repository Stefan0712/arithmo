import { useEffect, useState } from "react";
import { type GameLog } from "../../../types/game";
import { db } from "../../../db/db";
import { GameHistoryItem } from "./Game";

const GamesHistory = () => {

    const [pastGames, setPastGames] = useState<GameLog[]>([]);;

    useEffect(()=>{
        const fetchGames = async () => {
            try {
                const response = await db.logs.toArray();
                if(response){
                    setPastGames(response)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchGames();
    },[]);

    return (
        <div className="w-full h-full flex flex-col gap-2 p-4">
            <h1>Past Games</h1>
            <div className="flex flex-col w-full h-full gap-2 overflow-y-auto">
                {pastGames && pastGames.length > 0 ? pastGames.map(game=><GameHistoryItem key={game._id} log={game} />) : <p>No games to show</p>}
            </div>
        </div>
    )
}

export default GamesHistory;