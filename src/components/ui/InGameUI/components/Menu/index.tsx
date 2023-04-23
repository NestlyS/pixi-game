import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuWithText } from '../MenuWithText';
import { MenuButton } from '../MenuButton';
import { setPause, setPlay } from '../../../../../redux/gamePage';

export const Menu = () => {
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    setVisible((state) => {
      if (!state) dispatch(setPause());
      if (state) dispatch(setPlay());
      return !state;
    });
  }, [dispatch]);

  useEffect(() => {
    const cb = (event: KeyboardEvent) => {
      if (event.code !== 'Escape') return;
      onClick();
    };

    window.addEventListener('keydown', cb);

    return () => window.removeEventListener('keydown', cb);
  }, [onClick]);

  return (
    <>
      <MenuButton onClick={onClick} />
      {isVisible && <MenuWithText onExit={onClick} />}
    </>
  );
};
