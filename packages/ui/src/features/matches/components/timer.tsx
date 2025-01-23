import { MatchStateDto } from '@hemager/api-types';
import { Duration, intervalToDuration } from 'date-fns';
import { FC, useEffect, useRef, useState } from 'react';

import { convertDurationToString, statesToDuration } from '../helpers';

type Props = {
  states?: MatchStateDto[];
};

export const Timer: FC<Props> = ({ states }) => {
  const [duration, setDuration] = useState<Duration>({});
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (states?.length) {
      timerInterval.current = setInterval(() => {
        setDuration(statesToDuration(states ?? []));
      }, 1000);
    }

    return () => {
      timerInterval.current && clearInterval(timerInterval.current);
    };
  }, [states]);

  if (!states) {
    return null;
  }

  const time = convertDurationToString(duration);

  return <p className="text-2xl">{time}</p>;
};
