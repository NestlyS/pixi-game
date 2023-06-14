import React from "react";
import { GAME_SPRITESHEET_URL } from "../../constants";
import { ISpriteProps, Sprite } from "../Sprite";

export const TableSprite = React.memo(({ tableDirection, ...props }: Omit<Omit<ISpriteProps, 'textureUrl'>, 'spritesheet'> & { tableDirection: 'up' | 'down' }) => (
  <Sprite
    {...props}
    textureUrl={`table_${tableDirection}.png`}
    spritesheet={GAME_SPRITESHEET_URL}
  />
))