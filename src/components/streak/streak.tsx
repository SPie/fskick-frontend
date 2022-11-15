import {Attendance} from '../../api/types';

interface StreakProps {
  attendances: Attendance[];
}

const Streak = ({attendances}: StreakProps) => {
  return (
    <div className="my-5 flex space-x-4 mx-auto">
      {
        attendances.map((attendance) => {
            return <span
              key={attendance.game.uuid}
              className={`${attendance.win ? 'border-green bg-green ' : 'border-red bg-red '}border-1 inline-block rounded-full w-8 h-8`}
            />;
          })
      }
    </div>
  )
};

export default Streak