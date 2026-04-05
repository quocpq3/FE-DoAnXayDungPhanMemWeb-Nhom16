import { Avatar, Button, Card, Flex, Image, Rate, Tooltip } from "antd";
import { Typography } from "antd";
import ButtonMain from "../../components/buttons/Button";
import {
  ShoppingOutlined,
  MenuOutlined,
  AntDesignOutlined,
  UserOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import buggerImg from "../../images/banner/Sizzling-Pepperoni-Pizza-Freshly-Baked-Crust-PNG.png";
import { NavLink } from "react-router-dom";
import type { IFood } from "../../services/apis/food/food.interface";
import { useEffect, useState } from "react";
import { getFoods } from "../../services/apis/food/food.api";
import type { ICategory } from "../../services/apis/categories/categories.interface";
import { getCategory } from "../../services/apis/categories/categories.api";
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const [foodItems, setFoodItems] = useState<IFood[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const clampStyle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
  const fecthCategory = async () => {
    setLoading(true);
    try {
      const res = await getCategory();
      setCategory(res);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fecthCategory();
  }, []);
  const fetchFood = async () => {
    setLoading(true);
    try {
      const res = await getFoods();
      setFoodItems(res);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFood();
  }, []);
  return (
    <>
      <div className="container space-evenly" style={{ paddingTop: "20px" }}>
        <Flex gap={20} vertical>
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
                <span className="text-xs font-bold">Đánh giá</span>
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
          <Flex gap={20}>
            <ButtonMain
              icon={<AppstoreOutlined />}
              color="danger"
              variant="solid"
            >
              Tất cả
            </ButtonMain>
            {category.map((item) => (
              <ButtonMain
                color="danger"
                variant="outlined"
                key={item.categoryName}
              >
                {item.categoryName}
              </ButtonMain>
            ))}
          </Flex>
          <div className="flex flex-wrap justify-between gap-6 mt-4">
            {foodItems.slice(0, 10).map((item) => (
              //menu card
              <Card
                loading={loading}
                hoverable
                style={{
                  width: 220,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
                bodyStyle={{ padding: 12 }}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      draggable={false}
                      style={{
                        height: 160,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {item.discountPercent > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          background: "#ff4d4f",
                          color: "#fff",
                          padding: "2px 6px",
                          fontSize: 12,
                          borderRadius: 6,
                          fontWeight: 600,
                        }}
                      >
                        -{item.discountPercent}%
                      </span>
                    )}
                  </div>
                }
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 4,
                    color: "#1f1f1f",
                    lineHeight: 1.4,
                  }}
                >
                  {item.itemName}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#8c8c8c",
                    minHeight: 32,
                    ...clampStyle,
                  }}
                >
                  {item.description}
                </div>

                {/* Price + action */}
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ marginTop: 10 }}
                >
                  <div>
                    {item.discountPercent > 0 && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#bfbfbf",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.basePrice.toLocaleString()} đ
                      </div>
                    )}

                    <div
                      style={{
                        color: "#ff4d4f",
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      {item.salePrice.toLocaleString()} đ
                    </div>
                  </div>

                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                  />
                </Flex>
              </Card>
            ))}
          </div>
        </Flex>
      </div>
    </>
  );
};

export default HomePage;
