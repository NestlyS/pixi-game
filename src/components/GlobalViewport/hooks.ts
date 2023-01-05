import { Viewport } from "pixi-viewport";
import { useCallback } from "react";
import { useControlKey } from "../../utils/useControlKey";

export const useGlobalViewportControls = (viewport: Viewport | null, extraCondition?: boolean) => {
  const DCb = useCallback(() => {
    if (!viewport || extraCondition) {
      return;
    }

    console.log(viewport.x, viewport.y)

    viewport.animate({time: 300, position: { x: 300 + viewport.center.x, y: viewport.center.y}});
  }, [extraCondition, viewport]);

  const ACb = useCallback(() => {
    if (!viewport || extraCondition) {
      return;
    }

    console.log(viewport.x, viewport.y)

    viewport.animate({time: 300, position: { x: viewport.center.x - 300, y: viewport.center.y}});
  }, [extraCondition, viewport]);

  const SCb = useCallback(() => {
    if (!viewport || extraCondition) {
      return;
    }

    console.log(viewport.x, viewport.y)

    viewport.animate({time: 300, position: { x: viewport.center.x, y: viewport.center.y + 300}});
  }, [extraCondition, viewport]);

  const WCb = useCallback(() => {
    if (!viewport || extraCondition) {
      return;
    }

    console.log(viewport.x, viewport.y)

    viewport.animate({time: 300, position: { x: viewport.center.x, y: viewport.center.y - 300}});
  }, [extraCondition, viewport]);

  useControlKey('ArrowRight', DCb);
  useControlKey('ArrowLeft', ACb);
  useControlKey('ArrowUp', WCb);
  useControlKey('ArrowDown', SCb);
}