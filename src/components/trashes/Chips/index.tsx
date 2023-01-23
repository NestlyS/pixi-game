import React, { memo } from 'react'
import { Trash } from '../Base'

const SPRITESHEET_URL = './sprites/atlas.json';
const ANIMATION_NAME = 'chips';

type Props = {
  x: number,
  y: number,
}

export const Chips = memo(({
  x,
  y,
}: Props) => {
  return (
    <Trash x={x} y={y} spritesheetUrl={SPRITESHEET_URL} animationName={ANIMATION_NAME} type="chips" />
  )
})
