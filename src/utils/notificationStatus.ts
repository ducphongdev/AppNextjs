import { useEffect, useState } from 'react';
import moment from 'moment';
import { ICard } from '@/types/board.type';

const handleNotificationStatus = (card: ICard | null) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (moment().isAfter(moment(card?.due))) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  }, [card]);

  return isExpired;
};

export default handleNotificationStatus;
