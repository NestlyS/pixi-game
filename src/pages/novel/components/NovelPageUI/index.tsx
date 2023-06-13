import { NovelUI } from '../NovelUI';
import { ActionTypes, Dialogs } from '../../../../redux/novelPage/typings';
import { NOVEL_SPRITESHEET_URL } from '../../../../constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToDialog, goToTheNextNovelPage } from '../../../../redux/novelPage';
import { ScreenTransitionWithTextUI } from '../ScreenTransitionWithTextUI';
import {
  selectNovelControllerActionType,
  selectNovelControllerText,
} from '../../../../redux/novelPage/selectors';

const PLUG = () => {};

type Props = {
  dialog: Dialogs;
  onEnd: () => void;
};

export const NovelPageUI = ({ onEnd, dialog }: Props) => {
  const dispatch = useDispatch();

  const text = useSelector(selectNovelControllerText);
  const actionType = useSelector(selectNovelControllerActionType);
  const [screenKey, setScreenKey] = useState(0);
  const prevAction = useRef(ActionTypes.Default);

  const onPageEnd = useCallback(() => {
    dispatch(goToTheNextNovelPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(goToDialog(dialog));
  }, [dialog, dispatch]);

  useEffect(() => {
    if (
      actionType === ActionTypes.ScreenTransition &&
      prevAction.current !== ActionTypes.ScreenTransition
    ) {
      setScreenKey((val) => val + 1);
      prevAction.current = ActionTypes.ScreenTransition;
    }
  }, [actionType, text]);

  return (
    <>
      <NovelUI
        text={text}
        spritesheet={NOVEL_SPRITESHEET_URL}
        onEnd={onEnd}
        onPageEnd={actionType === ActionTypes.Default ? onPageEnd : PLUG}
        isActive={actionType === ActionTypes.Default}
      />
      <ScreenTransitionWithTextUI
        key={screenKey}
        text={text}
        onNextPage={actionType === ActionTypes.ScreenTransition ? onPageEnd : PLUG}
        isActive={actionType === ActionTypes.ScreenTransition}
      />
    </>
  );
};
