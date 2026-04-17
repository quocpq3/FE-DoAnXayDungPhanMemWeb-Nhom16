import { Avatar, Button, Flex, Rate, Tooltip } from "antd";
import { Typography } from "antd";
import ButtonMain from "../../components/buttons/Button";
import {
  ShoppingOutlined,
  MenuOutlined,
  AntDesignOutlined,
  UserOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import buggerImg from "../../images/banner/Sizzling-Pepperoni-Pizza-Freshly-Baked-Crust-PNG.png";
import { NavLink } from "react-router-dom";
import FoodCard from "../../components/card/FoodCard";
import { useFood } from "../../context/FoodContext";
import React, { useState } from "react";
import { filterFoods } from "../../utils/filterFood";
import Typewriter from "typewriter-effect";

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { foods, categories, loading } = useFood();
  const filteredFoods = filterFoods(foods, selectedCategory);
  const displayedFoods = filteredFoods.slice(0, 10);

  return (
    <>
      <div
        className="container py-12 space-evenly"
        style={{ paddingTop: "20px" }}
      >
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
                <span>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          `Tất cả đồ ăn nhanh <br/> đều có sẵn tại <span style="color:#ff4d4f">Foody</span>`,
                        )
                        .start();
                    }}
                    options={{
                      delay: 40,
                      cursor: "|",
                    }}
                  />
                </span>
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
              <img
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
            {categories.map((item) => (
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
            {displayedFoods.map((item) => (
              <FoodCard key={item.itemId} item={item} loading={loading} />
            ))}
          </div>
          {filteredFoods.length > 10 && (
            <Flex justify="center" style={{ marginTop: 24 }}>
              <NavLink to="/menu">
                <Button type="primary" danger size="large">
                  Xem thêm <ArrowRightOutlined />
                </Button>
              </NavLink>
            </Flex>
          )}
        </Flex>
      </div>
    </>
  );
};

export default HomePage;
