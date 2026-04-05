import {
  Avatar,
  Button,
  Card,
  Flex,
  Image,
  Pagination,
  Rate,
  Tooltip,
} from "antd";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  const filterFoods = selectedCategory
    ? foodItems.filter((item) => item.categoryName === selectedCategory)
    : foodItems;
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFoods = filterFoods.slice(startIndex, startIndex + pageSize);

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
            <NavLink to="/menu">
              <span className="font-semibold text-[#ff4d4f]">
                Xem tất cả <ArrowRightOutlined />
              </span>
            </NavLink>
          </Flex>
          <Flex gap={20}>
            <ButtonMain
              icon={<AppstoreOutlined />}
              color="danger"
              variant={selectedCategory === null ? "solid" : "outlined"}
              onClick={() => setSelectedCategory(null)}
            >
              Tất cả
            </ButtonMain>
            {category.map((item) => (
              <ButtonMain
                color="danger"
                variant={
                  selectedCategory === item.categoryName ? "solid" : "outlined"
                }
                key={item.categoryName}
                onClick={() => setSelectedCategory(item.categoryName)}
              >
                {item.categoryName}
              </ButtonMain>
            ))}
          </Flex>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {paginatedFoods.map((item) => (
              <Card
                key={item.itemId}
                loading={loading}
                hoverable
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                }}
                bodyStyle={{
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
                cover={
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      draggable={false}
                      style={{
                        height: 160,
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      className="food-img"
                    />
                    {item.discountPercent > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          background: "linear-gradient(135deg,#ff4d4f,#ff7875)",
                          color: "#fff",
                          padding: "4px 8px",
                          fontSize: 12,
                          borderRadius: 8,
                          fontWeight: 600,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
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
                    color: "#1f1f1f",
                    lineHeight: 1.4,
                    minHeight: 42,
                  }}
                >
                  {item.itemName}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#8c8c8c",
                    marginTop: 4,
                    minHeight: 40,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </div>
                <Flex
                  justify="space-between"
                  align="flex-end"
                  style={{ marginTop: "auto" }}
                >
                  <div
                    style={{
                      minHeight: 38,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#bfbfbf",
                        textDecoration: "line-through",
                        height: 16,
                        visibility:
                          item.discountPercent > 0 ? "visible" : "hidden",
                      }}
                    >
                      {item.basePrice.toLocaleString()} đ
                    </div>

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
          <Flex justify="center" style={{ marginTop: 24 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filterFoods.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default HomePage;
