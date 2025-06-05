import React from "react";
import { svgMap, SVGName } from "./svgMap";

export interface SVGIconProps extends React.HTMLAttributes<SVGElement> {
  name: SVGName;
  strokeWidth?: number;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  name,
  className,
  strokeWidth,
  ...otherProps
}) => {
  const SVGComponent = svgMap[name];

  if (!SVGComponent) {
    return null; // Handle missing SVGs gracefully
  }

  return (
    <SVGComponent
      {...otherProps}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
};

export default SVGIcon;
