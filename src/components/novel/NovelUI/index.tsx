import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Text } from '@pixi/react';

import { NovelCharacter } from '../NovelCharacter';
import { useScreenWidth } from '../../../utils/useScreenWidth';
import { useScreenHeight } from '../../../utils/useScreenHeight';
import { Sprite } from '../../Sprite';
import { NovelTextBlock } from '../NovelTextBlock';
import { NORMAL_NOVEL_FONT, Pages, SKIP_KEY_CODE } from '../../../constants';
import { ScriptType } from '../../../redux/novelPage/typings';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNovelControllerActive,
  selectNovelControllerDialogPage,
  selectNovelControllerPage,
  selectNovelControllerRestText,
  selectNovelControllerState,
  selectNovelControllerText,
} from '../../../redux/novelPage/selectors';
import { goToTheNextDialog, goToTheNextNovelPage, initDialog } from '../../../redux/novelPage';
import { setPage } from '../../../redux/appController';
import { setNovelReaded } from '../../../redux/novelPage/utils';

type Props = {
  spritesheet: string;
  script: ScriptType[];
};

const CODE_TO_NAME_MAP = {
  mary: 'Мери',
  eva: 'Ева',
};

const EVA_IDLE = 'eva_smile';
const MERI_IDLE = 'mary_idle';
const BACKGROUND_SPRITESHEET_URL = './sprites/backround.json';

const SKIP_TEXTURE = 'Пропустить';
const JOKE_TEXT =
  'ВЫ ПОЛУЧИЛИ ДОСТУП К СЕКРЕТНОЙ ИНФОРМАЦИИ ФОНДА. СОГЛАСНО ЗАКОНУ [ДАННЫЕ УДАЛЕНЫ] ВЫ ОБЯЗАНЫ ОТКРЫТЬ ДВЕРЬ И ЖДАТЬ ПРИХОДА СОТРУДНИКОВ МОГ-68 ДЛЯ ДАЛЬНЕЙШЕЙ ОБРАБОТКИ АМНЕЗИАКАМИ';

export const NovelUI = React.memo(({ spritesheet, script }: Props) => {
  const width = useScreenWidth();
  const height = useScreenHeight();
  const page = useSelector(selectNovelControllerPage);
  const dialogPage = useSelector(selectNovelControllerDialogPage);
  const text = useSelector(selectNovelControllerText);
  const restText = useSelector(selectNovelControllerRestText);
  const active = useSelector(selectNovelControllerActive);
  const state = useSelector(selectNovelControllerState);
  const dispatch = useDispatch();

  const restTextRef = useRef(restText);
  restTextRef.current = restText;

  const pageRef = useRef(page);
  pageRef.current = page;

  const onSkip = useCallback(() => alert(new Array(20).fill(JOKE_TEXT).join('')), []);

  const leftPerson = script[dialogPage].leftPerson;
  const rightPerson = script[dialogPage].rightPerson;
  const background = script[dialogPage].background;

  const isLeftActive = leftPerson === active;
  const isRightActive = rightPerson === active;

  const firstCharTexture = isLeftActive ? `${leftPerson}_${state}` : EVA_IDLE;
  const secondCharTexture = isRightActive ? `${rightPerson}_${state}` : MERI_IDLE;
  const name = Object.keys(CODE_TO_NAME_MAP).includes(active)
    ? CODE_TO_NAME_MAP[active as keyof typeof CODE_TO_NAME_MAP]
    : '';

  useEffect(() => {
    const cb = (event: KeyboardEvent) => {
      if (event.code !== SKIP_KEY_CODE) return;
      if (restTextRef.current.length) return;

      if (
        script[dialogPage].dialog.length - 1 === pageRef.current &&
        script.length - 1 === dialogPage
      ) {
        dispatch(setPage(Pages.game));
        setNovelReaded();
        return;
      }

      if (script[dialogPage].dialog.length - 1 === pageRef.current) {
        dispatch(goToTheNextDialog());
        return;
      }

      dispatch(goToTheNextNovelPage());
    };

    window.addEventListener('keydown', cb);

    return () => window.removeEventListener('keydown', cb);
  }, [script, dialogPage, dispatch]);

  useLayoutEffect(() => {
    dispatch(initDialog());
  }, [page, dialogPage, dispatch]);

  return (
    <>
      <Sprite
        x={0}
        y={height / 6}
        height={height}
        width={width}
        spritesheet={BACKGROUND_SPRITESHEET_URL}
        textureUrl={background}
        zIndex={0}
        pixelised
      />
      {leftPerson && (
        <NovelCharacter
          spritesheet={spritesheet}
          textureName={firstCharTexture}
          x={-(width / 5)}
          y={0}
          isActive={isLeftActive}
        />
      )}
      {rightPerson && (
        <NovelCharacter
          reverted
          spritesheet={spritesheet}
          textureName={secondCharTexture}
          x={width * 1.4}
          y={0}
          isActive={isRightActive}
        />
      )}
      <NovelTextBlock x={width / 4} y={height / 1.5} name={name} text={text} restText={restText} />
      <Text
        x={(width * 16) / 20}
        y={(height * 19) / 20}
        text={SKIP_TEXTURE}
        style={NORMAL_NOVEL_FONT}
        interactive
        onpointerdown={onSkip}
      />
    </>
  );
});
