import { Stage, _ReactPixi } from '@pixi/react'
import { ReactReduxContext } from 'react-redux';
import React from 'react'
import { ContextBridge } from '../ContextBridge';

type Props = {
  children: React.ReactNode;
} & _ReactPixi.IStage;

export const ReduxStage = ({ children, ...props }: Props) => {
  return (
    <ContextBridge
      context={ReactReduxContext}
      render={(children) => <Stage {...props}>{children}</Stage>}
    >
      {children}
    </ContextBridge>
  );
};
