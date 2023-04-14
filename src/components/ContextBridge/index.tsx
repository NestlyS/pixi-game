import { Context } from "react";

type Props = {
  children: React.ReactNode;
  context: Context<any>;
  render: (node: React.ReactNode) => React.ReactNode;
}

export const ContextBridge = ({ children, context: Context, render }: Props) => {
  return (
    <Context.Consumer>
      {(value) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  );
};