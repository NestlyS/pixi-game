import { IAppState } from '..';
import { CharSides } from './typings';
import { translateCharNameToCorrect } from './utils';

export const selectNovelController = (state: IAppState) => state.novel;

export const selectNovelControllerPage = (state: IAppState) => selectNovelController(state).page;

export const selectNovelControllerLastPage = (state: IAppState) => {
  const script = selectNovelControllerScript(state);
  const name = selectNovelControllerCurrentDialogName(state);

  if (!script || !name || !script[name]) return null;

  return selectNovelControllerPage(state) >= script[name].length;
};

export const selectNovelControllerScript = (state: IAppState) =>
  selectNovelController(state).script;

export const selectNovelControllerBackground = (state: IAppState) =>
  selectNovelController(state).background;

export const selectNovelControllerSound = (state: IAppState) => selectNovelController(state).sound;

export const selectNovelControllerEffect = (state: IAppState) =>
  selectNovelController(state).effect;

export const selectNovelControllerCurrentDialogName = (state: IAppState) =>
  selectNovelController(state).currentDialog;

export const selectNovelControllerText = (state: IAppState) => selectNovelController(state).text;

export const selectNovelControllerActionType = (state: IAppState) =>
  selectNovelController(state).actionType;

export const selectNovelControllerCharacterState = (charSide: CharSides) => (state: IAppState) => {
  if (charSide === CharSides.Left) {
    return selectNovelController(state).leftCharacter;
  }

  return selectNovelController(state).rightCharacter;
};

export const selectNovelControllerCharacterActiveState =
  (charSide: CharSides) => (state: IAppState) =>
    selectNovelControllerCharacterState(charSide)(state).isActive;

export const selectNovelControllerCharacterName = (charSide: CharSides) => (state: IAppState) =>
  selectNovelControllerCharacterState(charSide)(state).name;

export const selectNovelControllerCharacterFace = (charSide: CharSides) => (state: IAppState) =>
  selectNovelControllerCharacterState(charSide)(state).state;

export const selectNovelControllerCharacterPose = (charSide: CharSides) => (state: IAppState) =>
  selectNovelControllerCharacterState(charSide)(state).pose;

export const selectNovelControllerCharacterTextureName =
  (charSide: CharSides, textureType: 'pose' | 'face') => (state: IAppState) => {
    const charName = translateCharNameToCorrect(
      selectNovelControllerCharacterName(charSide)(state),
    );
    const name =
      textureType === 'pose'
        ? selectNovelControllerCharacterPose(charSide)(state)
        : selectNovelControllerCharacterFace(charSide)(state);
    return `${charName}_${textureType}_${name}`;
  };

export const selectNovelControllerActiveCharacterName = (state: IAppState) => {
  if (selectNovelControllerCharacterActiveState(CharSides.Right)(state)) {
    return selectNovelControllerCharacterName(CharSides.Right)(state);
  }

  if (selectNovelControllerCharacterActiveState(CharSides.Left)(state)) {
    return selectNovelControllerCharacterName(CharSides.Left)(state);
  }

  return '';
};
