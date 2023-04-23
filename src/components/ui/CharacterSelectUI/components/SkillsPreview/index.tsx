import { Container } from '@pixi/react';
import { SKILLS_LIST, SPECIAL_SKILLS_LIST } from './typings';
import { SHADOW_FILTER } from '../../../../../constants';
import { Button } from '../../../Button';

const PADDING_SCALE = 0.3;

const SKILLS_URLS_MAP: Record<SKILLS_LIST | SPECIAL_SKILLS_LIST, string> = {
  [SKILLS_LIST.Attack]: 'icon_attack.png',
  [SPECIAL_SKILLS_LIST.Heal]: 'icon_heal.png',
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

export const SkillsPreview = ({
  x,
  y,
  width,
  height,
  skills,
  specialSkills,
  spritesheetUrl,
}: Props) => {
  return (
    <Container zIndex={10} x={x} y={y}>
      {skills.map((skillName) => (
        <Button
          x={0}
          y={0}
          pixelised
          spritesheetUrl={spritesheetUrl}
          textureUrl={SKILLS_URLS_MAP[skillName]}
          height={height}
          width={width}
          filters={[SHADOW_FILTER]}
        />
      ))}
      {specialSkills.map((skillName) => (
        <Button
          x={width + width * PADDING_SCALE}
          y={0}
          pixelised
          spritesheetUrl={spritesheetUrl}
          textureUrl={SKILLS_URLS_MAP[skillName]}
          height={height}
          width={width}
          filters={[SHADOW_FILTER]}
        />
      ))}
    </Container>
  );
};
