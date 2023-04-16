import { Assets } from 'pixi.js';
import { useCallback, useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { useGlobalCheck } from '../../utils/useControlKey';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import { NovelUI, ScriptType } from '../../components/novel/NovelUI';

export const NOVEL_SPRITESHEET_URL = './novel/novel.json';
export const NOVEL_SCRIPT_URL = './novel/script.json';

export const Novel = () => {
  const [script, setScript] = useState<ScriptType | null>(null);
  useGlobalCheck();

  useLayoutEffect(() => {
    const cb = async () => {
      await Assets.loadBundle('novel-screen');
      console.log(Assets.cache.has(NOVEL_SCRIPT_URL));
      const _script = Assets.cache.has(NOVEL_SCRIPT_URL)
        ? Assets.cache.get<ScriptType>(NOVEL_SCRIPT_URL)
        : await Assets.load<ScriptType>(NOVEL_SCRIPT_URL);

      setScript(_script);
    };

    cb();
  }, []);

  const cb = useCallback(() => {
    flushSync(() => setScript(null));
    setTimeout(() => flushSync(() => setScript(Assets.cache.get<ScriptType>(NOVEL_SCRIPT_URL))));
  }, []);
  useCatchSignal(SignalList.Reset, cb);

  if (!script) return null;

  return <NovelUI script={script} spritesheet={NOVEL_SPRITESHEET_URL} />;
};
