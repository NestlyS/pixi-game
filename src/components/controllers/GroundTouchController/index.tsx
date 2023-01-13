import React, { useMemo} from 'react'
import { useBodyToBodyGroupCollisionDetect } from '../../../utils/useCompositeCollisionDetect';
import { useBody } from '../../Body/context';
import { GROUND_BODY_GROUP } from '../../../bodyGroups/ground';
import { GroundTouchContextProvider, initialState } from './context';


type Props = {
  children: React.ReactNode;
}

export const GroundTouchController = ({
  children
}: Props) => {
  const {
    body
  } = useBody();

  const [isGroundTouched] = useBodyToBodyGroupCollisionDetect({
    body,
    bodyGroup: GROUND_BODY_GROUP,
    initialState: initialState.isGroundTouched
  })

  const value = useMemo(() => ({
    isGroundTouched,
  }), [isGroundTouched]);

  // console.log('TOUCHEDGROUND', isGroundTouched)

  return <GroundTouchContextProvider value={value}>{children}</GroundTouchContextProvider>;
}
