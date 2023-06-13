import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux';
import './index.css';
import { initSettings, setPage, initResolution } from './redux/appController';
import { syncSoundSettings } from './utils/soundController';
import { selectIsStartScreenSkipped } from './redux/settings/selectors';
import { initSettingsState } from './redux/settings';
import {
  selectAppControllerIsMusicEnabled,
  selectAppControllerIsSoundsEnabled,
} from './redux/appController/selectors';
import { getPageToShowAfterNovel } from './redux/appController/utils';
import { getGamePageToShowAfterNovel, syncGameFromLS } from './redux/gamePage/utils';
import { setGamePage } from './redux/gamePage';

const container = document.getElementById('root');

store.dispatch(initSettings());
store.dispatch(initResolution());
store.dispatch(initSettingsState());
if (selectIsStartScreenSkipped(store.getState())) {
  store.dispatch(setPage(getPageToShowAfterNovel()));
  store.dispatch(setGamePage(getGamePageToShowAfterNovel()));
}
store.dispatch(syncGameFromLS);
syncSoundSettings(
  selectAppControllerIsMusicEnabled(store.getState()),
  selectAppControllerIsSoundsEnabled(store.getState()),
);

if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
