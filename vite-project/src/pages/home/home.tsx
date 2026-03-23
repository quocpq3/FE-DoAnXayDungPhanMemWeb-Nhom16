import { Avatar, Flex, Image, Rate, Tooltip } from "antd";
import { Typography } from "antd";
import ButtonMain from "../../components/buttons/Button";
import {
  ShoppingOutlined,
  MenuOutlined,
  AntDesignOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import buggerImg from "../../images/banner/Sizzling-Pepperoni-Pizza-Freshly-Baked-Crust-PNG.png";
import { NavLink } from "react-router-dom";

const { Title, Paragraph } = Typography;
const titleButtonCategory = [
  { id: 1, name: "Gà rán" },
  { id: 2, name: "Burger " },
  { id: 3, name: "Trà sữa" },
  { id: 4, name: "Combo" },
];
const HomePage: React.FC = () => {
  return (
    <>
      <div className="container space-evenly" style={{ paddingTop: "20px" }}>
        <Flex gap={30} vertical>
          {/* banner */}
          <Flex justify="space-evenly">
            <Flex
              gap={24}
              vertical
              style={{ maxWidth: "500px", paddingTop: "60px" }}
            >
              <Title
                level={1}
                style={{
                  fontSize: "46px",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 0,
                }}
              >
                Tất cả đồ ăn nhanh <br />
                đều có sẵn tại <span style={{ color: "#ff4d4f" }}>Foody</span>
              </Title>

              <Paragraph
                style={{
                  fontSize: "18px",
                  color: "#555",
                  lineHeight: 1.6,
                  marginTop: "16px",
                }}
              >
                Khám phá thực đơn đa dạng của chúng tôi, từ burger và gà rán đến
                combo tiết kiệm siêu. Chỉ với một lần chạm, Foody mang hương vị
                đến tận cửa nhà bạn.
              </Paragraph>
              <Flex gap={20}>
                <ButtonMain color="danger">
                  <ShoppingOutlined className="text-xl" /> Đặt hàng ngay
                </ButtonMain>
                <ButtonMain variant="outlined" color="danger">
                  <NavLink to="/menu">
                    <MenuOutlined className="mr-2" />
                    Thực đơn
                  </NavLink>
                </ButtonMain>
              </Flex>
              <Flex vertical gap={10} className="mt-4">
                <span className="font-bold text-xs">Đánh giá</span>
                <Avatar.Group
                  size="large"
                  max={{
                    count: 2,
                    style: { color: "#f56a00", backgroundColor: "#fde3cf" },
                  }}
                >
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
                  <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Avatar
                    style={{ backgroundColor: "#1677ff" }}
                    icon={<AntDesignOutlined />}
                  />
                </Avatar.Group>
                <Rate disabled defaultValue={5} />
              </Flex>
            </Flex>
            <Flex>
              <Image
                style={{ marginTop: "20px" }}
                width={700}
                src={buggerImg}
                alt="Burger"
              />
            </Flex>
          </Flex>
          {/*  */}
          <Flex justify="space-between" align="center">
            <Title level={3}>Danh mục món ăn</Title>
            <span className="font-semibold text-[#ff4d4f]">
              Xem tất cả <ArrowRightOutlined />
            </span>
          </Flex>
          <Flex>
            <ButtonMain color="danger" variant="outlined">
              Tất cả
            </ButtonMain>
            {titleButtonCategory.map((item) => (
              <ButtonMain color="default" variant="outlined" key={item.name}>
                {item.name}
              </ButtonMain>
            ))}
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default HomePage;
