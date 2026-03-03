import { Button } from "antd";

interface children {
  children?: React.ReactNode;
}

const ButtonMain: React.FC<children> = ({ children }) => {
  return (
    <Button
      style={{ padding: "0 40px", fontSize: "14px", fontWeight: "semibold" }}
      size="large"
      shape="round"
      type="primary"
    >
      {children}
    </Button>
  );
};

export default ButtonMain;
