import React from 'react';
import { Container } from '@pixi/react';
import { useDispatch } from 'react-redux';
import { SKILLS_LIST, SPECIAL_SKILLS_LIST } from './typings';
import {
  USER_COOLDOWN,
  HEAL_COOLDOWN_VALUE,
} from '../../../../../../../../components/Controllable';
import { Button } from '../../../../../../../../components/ui/Button';
import { Filters } from '../../../../../../../../constants';
import { displayBlock } from '../../../../../../../../redux/textBlockController';

const PADDING_SCALE = 0.3;

const filters = [Filters.SHADOW_FILTER];

const SKILLS_URLS_MAP: Record<SKILLS_LIST | SPECIAL_SKILLS_LIST, string> = {
  [SKILLS_LIST.Attack]: 'icon_attack.png',
  [SPECIAL_SKILLS_LIST.Heal]: 'icon_heal.png',
};

const SKILLS_DESCRIPTIONS_MAP: Record<SKILLS_LIST | SPECIAL_SKILLS_LIST, string> = {
  [SKILLS_LIST.Attack]: `ЛОВКИЙ ВЗМАХ. \n\n Способность атаки. \n\n Ева ударяет горизонтально вверх перед собой, отражая снаряды. \n\n Перезарядка ${(
    USER_COOLDOWN / 1000
  ).toFixed(1)} секунд.`,
  [SPECIAL_SKILLS_LIST.Heal]: `МЫ СПРАВИМСЯ!. \n\n Способность самолечения. \n\n Ева воодушевляет себя и всех вокруг, даруя второе дыхание. Лечит 1 сердце. \n\n Перезарядка ${(
    HEAL_COOLDOWN_VALUE / 1000
  ).toFixed(0)} секунд.`,
};

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  skills: SKILLS_LIST[];
  specialSkills: SPECIAL_SKILLS_LIST[];
  spritesheetUrl: string;
};

export const SkillsPreview = React.memo(
  ({ x, y, width, height, skills, specialSkills, spritesheetUrl }: Props) => {
    const dispatch = useDispatch();

    const onClick = (text: string, _x: number, _y: number) => {
      return () =>
        dispatch(displayBlock({ text, x: x + _x + width * 1.1, y: y + _y - height * 2 }));
    };

    return (
      <Container zIndex={10} x={x} y={y}>
        {skills.map((skillName) => (
          <Button
            key={skillName}
            x={0}
            y={0}
            pixelised
            spritesheetUrl={spritesheetUrl}
            textureUrl={SKILLS_URLS_MAP[skillName]}
            height={height}
            width={width}
            filters={filters}
            onClick={
              SKILLS_DESCRIPTIONS_MAP[skillName]
                ? onClick(SKILLS_DESCRIPTIONS_MAP[skillName], 0, 0)
                : () => {}
            }
          />
        ))}
        {specialSkills.map((skillName) => (
          <Button
            key={skillName}
            x={width + width * PADDING_SCALE}
            y={0}
            pixelised
            spritesheetUrl={spritesheetUrl}
            textureUrl={SKILLS_URLS_MAP[skillName]}
            height={height}
            width={width}
            filters={filters}
            onClick={
              SKILLS_DESCRIPTIONS_MAP[skillName]
                ? onClick(SKILLS_DESCRIPTIONS_MAP[skillName], width + width * PADDING_SCALE, 0)
                : () => {}
            }
          />
        ))}
      </Container>
    );
  },
);
