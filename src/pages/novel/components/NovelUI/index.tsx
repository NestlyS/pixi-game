import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Text } from '@pixi/react';
import { Container as PIXI_Container } from 'pixi.js';

import { NovelCharacter } from '../NovelCharacter';
import { useScreenWidth } from '../../../../utils/useScreenWidth';
import { useScreenHeight } from '../../../../utils/useScreenHeight';
import { Sprite } from '../../../../components/Sprite';
import { NovelTextBlock } from '../NovelTextBlock';
import { GLOBAL_HIT_AREA, JUMP_KEY_CODE_1, NORMAL_NOVEL_FONT } from '../../../../constants';
import { useSelector } from 'react-redux';
import {
  selectNovelControllerActiveCharacterName,
  selectNovelControllerBackground,
  selectNovelControllerCharacterName,
  selectNovelControllerCharacterTextureName,
  selectNovelControllerEffect,
  selectNovelControllerLastPage,
  selectNovelControllerSound,
} from '../../../../redux/novelPage/selectors';
import { SignalList, emitSignal } from '../../../../utils/signaller/emitSignal';
import { Sounds } from '../../../../utils/soundController';
import { useBackgroundMusic } from '../../../../utils/useBackgroundMusic';
import { selectAppControllerIsMusicEnabled } from '../../../../redux/appController/selectors';
import { useControlKey2 } from '../../../../utils/useControlKey';
import { ButtonMusicControl } from '../../../game/components/UI/components/InGameUI/components/Controls/components/ButtonMusicControl';
import { ButtonSoundControl } from '../../../game/components/UI/components/InGameUI/components/Controls/components/ButtonSoundControl';
import { CharNames, CharSides, NOVEL_EFFECTS } from '../../../../redux/novelPage/typings';
import { ease } from 'pixi-ease';

type Props = {
  text: string;
  spritesheet: string;
  isActive?: boolean;
  onPageEnd?: () => void;
  onEnd?: () => void;
};

const CODE_TO_NAME_MAP = {
  [CharNames.Mary]: 'Мери',
  [CharNames.Eva]: 'Ева',
  [CharNames.Gnida]: 'Герман',
  [CharNames.GnidaHide]: 'Незнакомец',
  [CharNames.Ernest]: 'Эрнест',
  [CharNames.Milen]: 'Милен',
  [CharNames.MilenHide]: 'Милый незнакомец',
};

const BACKGROUND_SPRITESHEET_URL = './sprites/backround.json';

const SKIP_TEXTURE = 'Пропуск';

export const NovelUI = React.memo(
  ({ spritesheet, text, isActive = true, onPageEnd, onEnd }: Props) => {
    const width = useScreenWidth();
    const height = useScreenHeight();
    const isMusicOn = useSelector(selectAppControllerIsMusicEnabled);

    const isLastPage = useSelector(selectNovelControllerLastPage);

    const backgroundTexture = useSelector(selectNovelControllerBackground);
    const backgroundMusicURL = useSelector(selectNovelControllerSound);
    const pageEffect = useSelector(selectNovelControllerEffect);

    const activeName = useSelector(selectNovelControllerActiveCharacterName);
    const leftCharName = useSelector(selectNovelControllerCharacterName(CharSides.Left));
    const rightCharName = useSelector(selectNovelControllerCharacterName(CharSides.Right));
    const leftPoseTexture = useSelector(
      selectNovelControllerCharacterTextureName(CharSides.Left, 'pose'),
    );
    const leftFaceTexture = useSelector(
      selectNovelControllerCharacterTextureName(CharSides.Left, 'face'),
    );
    const rightPoseTexture = useSelector(
      selectNovelControllerCharacterTextureName(CharSides.Right, 'pose'),
    );
    const rightFaceTexture = useSelector(
      selectNovelControllerCharacterTextureName(CharSides.Right, 'face'),
    );
    const pageReadRef = useRef(false);
    const leftCharContainer = useRef<PIXI_Container | null>(null);

    const [innerText, setInnerText] = useState('');
    if (innerText !== text && isActive) {
      setInnerText(text);
    }

    useBackgroundMusic(backgroundMusicURL, !isMusicOn);

    const onTextShowEnd = useCallback(() => {
      pageReadRef.current = true;
    }, []);

    // Инициализация диалогов или триггер окончания показа цепочки
    useEffect(() => {
      if (isLastPage) onEnd?.();
    }, [isLastPage, onEnd]);

    const cb = useCallback(() => {
      if (!pageReadRef.current) {
        emitSignal(SignalList.lazyBoxSkip);
        return;
      }

      pageReadRef.current = false;
      onPageEnd?.();
    }, [onPageEnd]);

    useEffect(() => {
      if (pageEffect === NOVEL_EFFECTS.Shaking && leftCharContainer.current) {
        ease.add(leftCharContainer.current, { shake: 20 }, { duration: 230 });
      }
    }, [pageEffect]);

    useControlKey2(JUMP_KEY_CODE_1, cb);

    if (!innerText) return null;

    return (
      <>
        <Container ref={leftCharContainer} onpointertap={cb} interactive hitArea={GLOBAL_HIT_AREA}>
          {backgroundTexture && (
            <Sprite
              x={0}
              y={0}
              height={height}
              width={width}
              spritesheet={BACKGROUND_SPRITESHEET_URL}
              textureUrl={backgroundTexture}
              zIndex={0}
              pixelised
            />
          )}
          {leftCharName && leftFaceTexture && leftPoseTexture && (
            <Container>
              <NovelCharacter
                spritesheet={spritesheet}
                faceTextureName={leftFaceTexture}
                poseTextureName={leftPoseTexture}
                x={width * 0.1}
                y={0}
                charName={leftCharName}
                isActive={leftCharName === activeName}
              />
            </Container>
          )}
          {rightCharName && rightFaceTexture && rightPoseTexture && (
            <NovelCharacter
              reverted
              spritesheet={spritesheet}
              faceTextureName={rightFaceTexture}
              poseTextureName={rightPoseTexture}
              x={width * 0.87}
              y={0}
              isActive={rightCharName === activeName}
              charName={rightCharName}
            />
          )}
          <NovelTextBlock
            x={width / 4}
            y={height / 1.5}
            name={activeName ? CODE_TO_NAME_MAP[activeName] : ''}
            text={innerText}
            key={innerText}
            onEnd={onTextShowEnd}
            onNextPage={onPageEnd}
          />
        </Container>
        <Text
          x={width * 0.78}
          y={height * 0.9}
          text={SKIP_TEXTURE}
          style={NORMAL_NOVEL_FONT}
          interactive
          onpointerdown={onEnd}
        />
        <ButtonSoundControl
          width={width * 0.05}
          height={width * 0.05}
          x={width * 0.025}
          y={height * 0.05}
          noBackground
        />
        <ButtonMusicControl
          width={width * 0.05}
          height={width * 0.05}
          x={width * 0.1}
          y={height * 0.045}
          noBackground
        />
      </>
    );
  },
);
