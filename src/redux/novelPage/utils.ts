import { IAppState } from '..';
import { LocalStorageKeyTypes, getFromLS, setToLS } from '../../utils/localStorage';
import { isSoundNameIsInSoundsEnum } from '../../utils/soundController/utils';
import { ActionTypes, CharNames, GetDataType } from './typings';

const READ_FLAG = '1';

export const initNovelRead = () => {
  setToLS(LocalStorageKeyTypes.NovelRead, READ_FLAG);
};

export const getIsNovelReaded = () => {
  return getFromLS(LocalStorageKeyTypes.NovelRead) === READ_FLAG;
};

const getData: GetDataType = (data, deflt) => (data !== undefined ? data : deflt);

export const updateState = (state: IAppState['novel'], resetState?: boolean) => {
  if (!state.script) return;

  const page = state.script?.[state.currentDialog]?.[state.page];

  if (!page) return;

  state.text = page.text;
  if (page.sound === null || isSoundNameIsInSoundsEnum(page.sound)) {
    state.sound = getData(page.sound, state.sound);
  }
  if (!page.sound && resetState) {
    state.sound = null;
  }

  state.effect = page.effect ?? null;
  state.background = getData(page.background, resetState ? '' : state.background);
  state.actionType = getData(page.actionType, ActionTypes.Default);

  state.leftCharacter.name = getData(page.left && page.left.name, state.leftCharacter.name);

  if (page.left?.name && !isCharName(page.left.name)) {
    console.error('Несуществующее имя левого персонажа', page.left.name);
  }

  state.leftCharacter.isActive = getData(
    page.active === state.leftCharacter.name,
    state.leftCharacter.isActive,
  );
  state.leftCharacter.pose = getData(page.left?.pose, state.leftCharacter.pose);
  state.leftCharacter.state = getData(page.left?.state, state.leftCharacter.state);

  state.rightCharacter.name = getData(page.right && page.right.name, state.rightCharacter.name);

  if (page.right?.name && !isCharName(page.right.name)) {
    console.error('Несуществующее имя правого персонажа', page.right.name);
  }

  state.rightCharacter.isActive = getData(
    page.active === state.rightCharacter.name,
    state.rightCharacter.isActive,
  );
  state.rightCharacter.pose = getData(page.right?.pose, state.rightCharacter.pose);
  state.rightCharacter.state = getData(page.right?.state, state.rightCharacter.state);
};

const isCharName = (name: string | null): name is CharNames | null =>
  name === null ||
  (typeof name === 'string' && !!Object.entries(CharNames).find(([, val]) => val === name));

const FILTER_CHARS_MAP = {
  [CharNames.GnidaHide]: CharNames.Gnida,
  [CharNames.MilenHide]: CharNames.Milen,
};

export const translateCharNameToCorrect = (charName: CharNames | null) =>
  FILTER_CHARS_MAP[charName as keyof typeof FILTER_CHARS_MAP] ?? charName;
