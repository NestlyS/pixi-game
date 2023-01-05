import { Application, LoaderResource } from "pixi.js";

const LOAD_TIMEOUT = 5000;

type UrlQueueMap = Map<string, ((value: LoaderResource['data']) => void)[]>;

// Мапка с парами Url -> функции ресолва (если один и тот же урл запрошен одновременно)
const urlQueue:UrlQueueMap = new Map();

const initQueuer = () => {
  let isQueueActive = false;

  return (app: Application) => {
    if (isQueueActive) {
      return;
    }

    isQueueActive = true;

    app.loader.onComplete.once(() => {
      urlQueue.forEach((_, _url) => app.loader.add(_url));

      app.loader.load((_, resources) => {
        Object.entries(resources).forEach(([url, data]) => {
          urlQueue.get(url)?.forEach(fn => fn(data.data));
          urlQueue.delete(url);
        });
      });

      isQueueActive = false;
    })
  }
}

const activateQueuer = initQueuer();

const pushToQueue = <T extends LoaderResource['data'] = LoaderResource['data']>(map: UrlQueueMap, url: string, resolve: (value: T) => void) => {
  if (urlQueue.has(url)) {
    return urlQueue.set(url, [...(urlQueue.get(url) as ((value: T) => void)[]), resolve]);
  }

  urlQueue.set(url, [resolve]);
}

export const loadData = <T extends LoaderResource['data'] = LoaderResource['data']>(url: string, app: Application) => {
  if (app.loader.resources?.[url]?.data) {
    return app.loader.resources[url].data as T;
  }

  if (app.loader.loading) {
    activateQueuer(app);

    return new Promise<T>((resolve, reject) => {
      pushToQueue(urlQueue, url, (value) => resolve(value))

      setTimeout(() => {
        reject(`Expired on Timeout in ${LOAD_TIMEOUT / 1000} s`);
      }, LOAD_TIMEOUT);
    });
  }


  return new Promise<T>(resolve => app.loader.add(url).load((_, resources) => {
    resolve(resources[url].data);
  }));
}
