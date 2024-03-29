import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useBody } from '../Body/context';
import { setId, setMaxHp } from '../../redux/mainUser';

type Props = {
  maxHealth: number;
};

export const MainUserController = ({ maxHealth }: Props) => {
  const { body } = useBody();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setId(body.label));
  }, [body, dispatch]);

  useEffect(() => {
    dispatch(setMaxHp(maxHealth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
