import React, { useCallback } from 'react';
import { BlurFilter, Graphics as PIXI_Graphics } from 'pixi.js';
import { Container, Graphics } from '@pixi/react';
import { useSelector } from 'react-redux';

import {
  selectAppControllerHeight,
  selectAppControllerHeightScale,
  selectAppControllerWidth,
  selectAppControllerWidthScale,
} from '../../../redux/appController/selectors';
import { CharacterPreview } from './components/CharacterPreview';
import { HeartPreview } from './components/HeartPreview';
import { TrashPreview } from './components/TrashPreview';
import { SKILLS_LIST, SPECIAL_SKILLS_LIST } from './components/SkillsPreview/typings';
import { SkillsPreview } from './components/SkillsPreview';
import { COLORS } from '../../../constants';
import { Menu } from '../InGameUI/components/Menu';
import { PlayButton } from './components/PlayButton';
import { CHARACTER_TYPES, CharacterName } from './components/CharacterName';

const TEXTURE_URL = 'heart.png';
const MAIN_SPRITESHEET_URL = 'atlas.json';
const SPRITESHEET_URL = 'charPreview.json';
const MENU_SPRITESHEET_URL = 'menuAtlas';

const HEART_WIDTH = 100;
const HEART_HEIGHT = 90;
const TRASH_SIZE = 50;

type CharacterListElementType = {
  name: string;
  type: CHARACTER_TYPES;
  pictureName: string;
  hp: number;
  skills: SKILLS_LIST[];
  specialSkills: SPECIAL_SKILLS_LIST[];
};

const BLUT_FILTER = new BlurFilter(100);

const CHARACTER_LIST: CharacterListElementType[] = [
  {
    name: 'Ева',
    type: CHARACTER_TYPES.Healer,
    pictureName: 'eva_idle',
    hp: 3,
    skills: [SKILLS_LIST.Attack],
    specialSkills: [SPECIAL_SKILLS_LIST.Heal],
  },
  {
    name: 'Ева',
    type: CHARACTER_TYPES.Healer,
    pictureName: 'eva_idle',
    hp: 3,
    skills: [SKILLS_LIST.Attack],
    specialSkills: [SPECIAL_SKILLS_LIST.Heal],
  },
];

export const CharacterSelectUI = () => {
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
  const widthScale = useSelector(selectAppControllerWidthScale);
  const heightScale = useSelector(selectAppControllerHeightScale);

  const draw = useCallback(
    (graf: PIXI_Graphics) =>
      graf
        .clear()
        .beginFill(COLORS.BottleFontOutline, 0.5)
        .drawRect(width * 0.6, 0, width, height)
        .endFill(),
    [height, width],
  );

  return (
    <Container>
      <Graphics draw={draw} width={width} height={height} filters={[BLUT_FILTER]} />
      <CharacterPreview
        x={width * 1.2}
        y={0}
        textureName={CHARACTER_LIST[0].pictureName}
        spritesheet={SPRITESHEET_URL}
      />
      <CharacterName
        x={width * 0.6}
        y={height * 0.1}
        name={CHARACTER_LIST[0].name}
        type={CHARACTER_LIST[0].type}
      />
      <PlayButton />
      <HeartPreview
        x={width * 0.6}
        y={height * 0.3}
        width={HEART_WIDTH / widthScale}
        height={HEART_HEIGHT / heightScale}
        value={CHARACTER_LIST[0].hp}
        spritesheetUrl={MAIN_SPRITESHEET_URL}
        textureUrl={TEXTURE_URL}
      />
      <SkillsPreview
        x={width * 0.07}
        y={height * 0.8}
        width={HEART_WIDTH * width * 0.001}
        height={HEART_HEIGHT * width * 0.001}
        skills={CHARACTER_LIST[0].skills}
        specialSkills={CHARACTER_LIST[0].specialSkills}
        spritesheetUrl={MENU_SPRITESHEET_URL}
      />
      <TrashPreview
        x={width * 0.1}
        y={height * 0.2}
        width={TRASH_SIZE * width * 0.001}
        height={TRASH_SIZE * width * 0.001}
        spritesheetUrl={MAIN_SPRITESHEET_URL}
      />
      <Menu />
    </Container>
  );
};
