import classNames from "classnames";
import React, { Children, forwardRef, memo } from "react";

interface IStackProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  divider?: JSX.Element;
  reversed?: boolean;
  direction?: "row" | "column";
  align?: "center" | "start" | "end";
  justify?: "space-between" | "space-around" | "space-evenly" | "center" | "start";
  space?: number;
  paddingY?: number;
  paddingX?: number;
}

const Stack = forwardRef<HTMLDivElement, IStackProps>(
  ({ space, children, ...props }, ref) => {
    const dir = props.direction;
    const classes = classNames("grid", props.className, {
      "grid-flow-row": dir == "column",
      "grid-flow-col": dir == "row",
    });

    return (
      <div
        ref={ref}
        onClick={props.onClick}
        className={classes}
        style={{
          padding: `${props.paddingY ?? 0}px ${props.paddingX ?? 0}px`,
          gap: space ?? 0,
          alignItems: props.direction == "row" && props.align ? props.align : "none",
          justifyItems: props.direction == "column" && props.align ? props.align : "none",
          justifyContent: props.justify,
        }}
      >
        {props.reversed
          ? Children.toArray(children)
              .reverse()
              .map((child, index) =>
                props.divider ? (
                  <React.Fragment key={index}>
                    {child}
                    {index < Children.count(children) - 1 && props.divider}
                  </React.Fragment>
                ) : (
                  child
                )
              )
          : Children.map(children, (child, index) =>
              props.divider ? (
                <React.Fragment key={index}>
                  {child}
                  {index < Children.count(children) - 1 && props.divider}
                </React.Fragment>
              ) : (
                child
              )
            )}
      </div>
    );
  }
);

export default memo(Stack);
