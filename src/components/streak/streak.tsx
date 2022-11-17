import {Attendance, PlayerStatsWithAttendances} from '../../api/types';

interface StreakProps {
  player: PlayerStatsWithAttendances;
}

const Streak = ({player}: StreakProps) => {
  return (

    <div className="my-5">
      <h3 className="text-left text-sm md:text-xl font-bold">Streak</h3>

      <div className="my-5 flex space-x-4">
        <div className="my-5 flex space-x-4 mx-auto">
          {
            player.attendances
              .slice(-5)
              .map((attendance: Attendance) => {
                return <span
                  key={attendance.game.uuid}
                  className={`${attendance.win ? 'border-green bg-green ' : 'border-red bg-red '}border-1 inline-block rounded-full w-8 h-8`}
                />;
              })
          }
        </div>
      </div>
    </div>
  )
};

export default Streak