import { Outlet } from "react-router-dom";

// import bg from "@/assets/background/pexels-leo-shaw-713705380-33329103.jpg";

const LoginLayout = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      //   style={{
      //     // backgroundImage: `url(${bg})`,
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //   }}
    >
      <div className="w-[20wh]">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
