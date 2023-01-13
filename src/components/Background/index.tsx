import { WORLD_HEIGHT, WORLD_WIDTH } from "../../constants"
import { Sprite } from "../Sprite"

export const Background = () => {

  return <Sprite x={0} y={0} height={WORLD_HEIGHT} width={WORLD_WIDTH} spritesheet="./sprites/backround.json" textureUrl="backgroung1.png" zIndex={0}/>
}