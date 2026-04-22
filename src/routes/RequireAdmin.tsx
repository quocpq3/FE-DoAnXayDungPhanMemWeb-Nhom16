import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { isAdmin } from "../helper/auth";

type RequireAdminProps = {
  children: React.ReactNode;
};

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  if (!isAdmin()) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập vào trang này"
        extra={
          <Link to="/">
            <Button type="primary">Về trang chủ</Button>
          </Link>
        }
      />
    );
  }
  return <>{children}</>;
};

export default RequireAdmin;
