import React from 'react';
import user from '../assets/user.svg';

import { Team } from '../hooks/useFetchMatches';

interface Match {
  awayTeam: Team;
  awayScore: number;
  homeTeam: Team;
  homeScore: number;
  points: number;
  total_kills: number;
  place: number;
  status: string;
  time: string;
  title: string;
}

interface MatchListProps {
  match: Match;
}

const InfoBoard: React.FC<MatchListProps> = ({ match }) => {
  return (
    <>
    <div className="w-full h-auto flex flex-row justify-between max-sm:flex-col gap-5">
    <div className="w-[50%] h-auto flex flex-col items-center max-md:w-full max-xs:w-full">
      <ul className="w-full flex flex-row justify-between gap-5 max-sm:gap-1">
        {match.homeTeam.players.slice(0, 3).map((player, index) => (
          <li
            key={index}
            style={{ backgroundColor: '#101318' }}
            className="w-[33%] flex flex-row items-center justify-between rounded-lg max-md:flex-col w-full">
            <div className="flex flex-row items-center justify-between max-lg:flex-col">
              <div className="flex flex-row items-center">
              <img src={user} alt="user" />
              <h3 className="text-gray-400 pl-1 text-sm max-sm:text-xs">
                {player.username.length > 8
                  ? player.username.slice(0, Math.ceil(player.username.length / 2)) +
                    '\n' +
                    player.username.slice(Math.ceil(player.username.length / 2))
                  : player.username}
              </h3>
              </div>
              <p className="text-gray-400 pl-2 text-sm max-sm:text-xs">Убийств: {player.kills}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul
        style={{ backgroundColor: '#101318' }}
        className="w-full h-15 flex mt-4 flex-row justify-between rounded-lg max-lg:mt-1">
        <li className="flex flex-row justify-center items-center max-md:w-full">
          <h3 className="text-gray-400 max-sm:text-xs">Points:</h3>
          <p className="pl-2 max-sm:text-xs">{match.homeTeam.points}</p>
        </li>
        <li className="flex flex-row justify-center items-center max-md:w-full">
          <h3 className="text-gray-400 max-sm:text-xs">Место:</h3>
          <p className="pl-2 max-sm:text-xs">{match.homeTeam.place}</p>
        </li>
        <li className="flex flex-row justify-center items-center max-md:w-full">
          <h3 className="text-gray-400 max-sm:text-xs">Всего убийств</h3>
          <p className="pl-2 max-sm:text-xs">{match.homeTeam.total_kills}</p>
        </li>
      </ul>
    </div>
        <div className="w-[50%] h-auto flex flex-col items-center max-md:w-full">
        <ul className="w-full flex flex-row justify-between gap-5 max-sm:gap-1">
          {match.awayTeam.players.slice(0, 3).map((player, index) => (
            <li
              key={index}
              style={{ backgroundColor: '#101318' }}
              className="w-[33%] flex flex-row items-center justify-between rounded-lg max-md:flex-col">
              <div className="flex flex-row items-center justify-between max-lg:flex-col">
              <div className="flex flex-row items-center">
              <img src={user} alt="user" />
              <h3 className="text-gray-400 pl-1 text-sm max-sm:text-xs">
                {player.username.length > 8
                  ? player.username.slice(0, Math.ceil(player.username.length / 2)) +
                    '\n' +
                    player.username.slice(Math.ceil(player.username.length / 2))
                  : player.username}
              </h3>
              </div>
                <p className="text-gray-400 pl-2 text-sm max-sm:text-xs">Убийств: {player.kills}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul
          style={{ backgroundColor: '#101318' }}
          className="w-full h-15 flex mt-4 flex-row justify-between rounded-lg max-lg:mt-1">
          <li className="flex flex-row justify-center items-center max-md:w-full">
            <h3 className="text-gray-400 max-sm:text-xs">Points:</h3>
            <p className="pl-2 max-sm:text-xs">{match.awayTeam.points}</p>
          </li>
          <li className="flex flex-row justify-center items-center max-md:w-full">
            <h3 className="text-gray-400 max-sm:text-xs">Место:</h3>
            <p className="pl-2 max-sm:text-xs">{match.awayTeam.place}</p>
          </li>
          <li className="flex flex-row justify-center items-center max-md:w-full">
            <h3 className="text-gray-400 max-sm:text-xs">Всего убийств</h3>
            <p className="pl-2 max-sm:text-xs">{match.awayTeam.total_kills}</p>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default InfoBoard;
