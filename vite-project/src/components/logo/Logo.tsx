import { NavLink } from "react-router-dom";

interface LogoProps {
  collapsed?: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <>
      <NavLink style={{ color: "black", cursor: "pointer" }} to="/">
        {collapsed ? (
          <div className="text-2xl text-[#ff4d4f] font-bold">F</div>
        ) : (
          <div className="text-5xl font-bold">
            F<span className="text-[#ff4d4f]">oo</span>dy
          </div>
        )}
      </NavLink>
    </>
  );
};
export default Logo;
