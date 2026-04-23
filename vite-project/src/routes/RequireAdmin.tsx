import { Button, Result } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import { isAdmin } from "../helper/auth";

type RequireAdminProps = {
  children: React.ReactNode;
};

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Chưa đăng nhập thì chuyển về trang login.
  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Đăng nhập nhưng không phải admin thì hiển thị 403.
  if (!isAdmin()) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập vào trang này."
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
