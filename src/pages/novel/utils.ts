import { Assets } from 'pixi.js';
import { NewScriptType } from '../../redux/novelPage/typings';
import { initSoundBundle } from '../../utils/soundController';

export const NEW_NOVEL_SCRIPT_URL = './novel/script_new.json';

const SCREEN_BUNDLE = 'novel-screen';

export const initNovelData = async () => {
  await Assets.loadBundle('novel-screen');
  initSoundBundle(SCREEN_BUNDLE);

  return Assets.cache.has(NEW_NOVEL_SCRIPT_URL)
    ? Assets.cache.get<NewScriptType>(NEW_NOVEL_SCRIPT_URL)
    : await Assets.load<NewScriptType>(NEW_NOVEL_SCRIPT_URL);
};
