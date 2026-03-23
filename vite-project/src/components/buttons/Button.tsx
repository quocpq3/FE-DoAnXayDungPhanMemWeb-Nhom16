import { Button } from "antd";
import type React from "react";
import type { ButtonProps } from "antd";

interface ButtonMainProps {
  children?: React.ReactNode;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  onClick?: ButtonProps["onClick"];
}

const ButtonMain: React.FC<ButtonMainProps> = ({
  children,
  color = "primary",
  variant = "solid",
  onClick,
}) => {
  return (
    <Button
      size="large"
      shape="round"
      variant={variant}
      color={color}
      onClick={onClick}
      style={{
        padding: "0 40px",
        fontSize: "14px",
        fontWeight: 600,
        width: "140px",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonMain;
