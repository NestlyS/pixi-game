const QUERY_START_SKIP_NAME = 'startSkip';

export const getIsSkipStartScreen = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(QUERY_START_SKIP_NAME) !== null;
  } catch (e) {
    return false;
  }
};
