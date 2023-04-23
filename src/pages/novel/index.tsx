import { Assets } from 'pixi.js';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flushSync } from 'react-dom';

import { useGlobalCheck } from '../../utils/useControlKey';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import { NovelUI } from '../../components/novel/NovelUI';
import { ScriptType } from '../../redux/novelPage/typings';
import { selectNovelControllerScript } from '../../redux/novelPage/selectors';
import { setScript } from '../../redux/novelPage';

export const NOVEL_SPRITESHEET_URL = './novel/novel.json';
export const NOVEL_SCRIPT_URL = './novel/script.json';

export const Novel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const script = useSelector(selectNovelControllerScript);
  const dispatch = useDispatch();

  useGlobalCheck();

  useLayoutEffect(() => {
    const cb = async () => {
      await Assets.loadBundle('novel-screen');
      console.log(Assets.cache.has(NOVEL_SCRIPT_URL));
      const _script = Assets.cache.has(NOVEL_SCRIPT_URL)
        ? Assets.cache.get<ScriptType[]>(NOVEL_SCRIPT_URL)
        : await Assets.load<ScriptType[]>(NOVEL_SCRIPT_URL);

      dispatch(setScript(_script));
      setIsLoaded(true);
    };

    cb();
  }, []);

  const cb = useCallback(() => {
    flushSync(() => setIsLoaded(false));
    setTimeout(() => setIsLoaded(true));
  }, []);
  useCatchSignal(SignalList.Reset, cb);

  if (!isLoaded || !script) return null;

  return <NovelUI script={script} spritesheet={NOVEL_SPRITESHEET_URL} />;
};
