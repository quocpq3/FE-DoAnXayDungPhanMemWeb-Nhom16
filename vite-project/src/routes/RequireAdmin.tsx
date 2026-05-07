import { App, Button, Result } from "antd";
import { Link, Navigate } from "react-router-dom";
import { isAdmin } from "../helper/auth";
import { useEffect, useRef, useState } from "react";

type RequireAdminProps = {
  children: React.ReactNode;
};

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  const { message } = App.useApp();

  const [redirect, setRedirect] = useState(false);

  const showedMessage = useRef(false);

  useEffect(() => {
    if (!token && !showedMessage.current) {
      showedMessage.current = true;

      message.error("Bạn cần đăng nhập để truy cập trang admin");

      setTimeout(() => {
        setRedirect(true);
      }, 500);
    }
  }, [token, message]);

  // Chưa đăng nhập
  if (!token && redirect) {
    return <Navigate to="/" replace />;
  }

  // Không phải admin
  if (token && !isAdmin()) {
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

  // Chờ redirect
  if (!token) return null;

  return <>{children}</>;
};

export default RequireAdmin;