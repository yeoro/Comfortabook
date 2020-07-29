import * as React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  width?: boolean;
  onClick?(): void;
}

const CustomBtn: React.FC<ButtonProps> = (props) => {
  const { to, children, width, onClick } = props;
  const isLink = !!to;

  const renderButton = () => {
    return <button onClick={onClick}>{children}</button>;
  };

  const renderLink = () => {
    if (!to) {
      return <div></div>;
    }

    return (
      <Link
        style={{
          ...buttonStyle(!!width),
          textDecoration: "none",
        }}
        to={to}
      >
        {children}
      </Link>
    );
  };

  return isLink ? renderLink() : renderButton();
};

const buttonStyle = (width: boolean) => {
  return {
    display: "inline-block",
    borderRadius: "4px",
    margin: "0 10px 10px 0",
    padding: "8px 16px",
    width: width ? "90%" : "auto",
    overflow: "visible",
    background: "#ba68c8",
    color: "white",
  };
};

export default CustomBtn;
