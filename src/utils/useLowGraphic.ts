import { useSelector } from 'react-redux';
import { selectAppControllerIsLowGraphicMode } from '../redux/appController/selectors';
import { FILTERS, Filters } from '../constants';
import { useMemo } from 'react';

const BANNED_FILTERS = [Filters.GODRAY_FILTER, Filters.SHADOW_FILTER];

export const useLowGraphic = (filter: Filters | Filters[]) => {
  const isLowGraphicMode = useSelector(selectAppControllerIsLowGraphicMode);

  const innerFilters = useMemo(() => (Array.isArray(filter) ? filter : [filter]), [filter]);

  return useMemo(
    () =>
      innerFilters
        .filter((innerFilter) => !(isLowGraphicMode && BANNED_FILTERS.includes(innerFilter)))
        .map((innerFilter) => FILTERS[innerFilter]),
    [innerFilters, isLowGraphicMode],
  );
};
