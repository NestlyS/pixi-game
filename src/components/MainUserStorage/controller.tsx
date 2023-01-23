import React, { useEffect } from 'react'
import { useBody } from '../Body/context';
import { useMainUserId } from './context';

export const MainUserController = () => {
  const {
    body
  } = useBody();
  const {
    setId
  } = useMainUserId();

  useEffect(() => {
    if (!body) return;

    const id = body.label ?? body.id;
    setId(id);
  }, [body, setId])

  return null;
}
