import React, { useCallback, useState } from 'react';
import { Text } from '@pixi/react';

import { NovelCharacter } from '../NovelElement';
import { useScreenWidth } from '../../../utils/useScreenWidth';
import { useScreenHeight } from '../../../utils/useScreenHeight';
import { Sprite } from '../../Sprite';
import { NovelTextBlock } from '../NovelTextBlock';
import { NORMAL_NOVEL_FONT } from '../../../constants';

type DialogElement<T = string> = {
  active: T;
  state: string;
  text: string;
};

export type ScriptType<T = string> = {
  leftPerson: T;
  rightPerson: T;
  background: string;
  dialog: DialogElement<T>[];
};

type Props = {
  spritesheet: string;
  script: ScriptType;
};

const EVA_IDLE = 'eva_smile';
const MERI_IDLE = 'mary_idle';
const BACKGROUND_SPRITESHEET_URL = './sprites/backround.json';
const BACKGROUND_TEXTURE = 'backgroung2.png';

const SKIP_TEXTURE = 'Пропустить';
const JOKE_TEXT =
  'ВЫ БЫЛИ ВЗЛОМАНЫ. СОГЛАСНО ЗАКОНУ 228 УК РФ ВЫ ОБЯЗАНЫ ОТКРЫТЬ ДВЕРЬ И ЖДАТЬ ПРИХОДА СОТРУДНИКОВ ИЛИ ЖЕ НЕОБХОДИМО ПЕРЕЙТИ ПО ССЫЛКЕ ЧТОБЫ СТАНЦЕВАТЬ ДЖИГУ';

export const NovelUI = React.memo(({ spritesheet, script }: Props) => {
  const width = useScreenWidth();
  const height = useScreenHeight();
  const [phase] = useState(0);

  console.log(script);

  const onSkip = useCallback(() => alert(new Array(20).fill(JOKE_TEXT).join('')), []);

  const firstCharTexture =
    script.dialog[phase].active === 'eva'
      ? `${script.leftPerson}_${script.dialog[phase].state}`
      : EVA_IDLE;
  const secondCharTexture =
    script.dialog[phase].active === 'mary'
      ? `${script.rightPerson}_${script.dialog[phase].state}`
      : MERI_IDLE;
  const text = script.dialog[phase].text;
  const name = script.dialog[phase].active === 'eva' ? 'Ева' : 'Мери';

  return (
    <>
      <Sprite
        x={0}
        y={height / 6}
        height={height}
        width={width}
        spritesheet={BACKGROUND_SPRITESHEET_URL}
        textureUrl={BACKGROUND_TEXTURE}
        zIndex={0}
        pixelised
      />
      <NovelCharacter
        spritesheet={spritesheet}
        textureName={firstCharTexture}
        x={-(width / 5)}
        y={0}
      />
      <NovelCharacter
        reverted
        spritesheet={spritesheet}
        textureName={secondCharTexture}
        x={width * 1.4}
        y={0}
      />
      <NovelTextBlock x={width / 4} y={height / 1.5} name={name} text={text} />
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
