export const throwEvent = <T = {}>(eventName: string, data?: T) => {
  //@ts-ignore
  if (window.dispatchEvent) {
    const event = new CustomEvent(eventName, {
      detail: data
    });
    return window.dispatchEvent(event);
  }

  const event = document.createEvent("HTMLEvents");
  event.initEvent("dataavailable", true, true);
  //@ts-ignore
  event.eventName = eventName;
  //@ts-ignore
  window.dispatchEvent(event);
}