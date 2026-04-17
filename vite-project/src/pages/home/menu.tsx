import { Button, Flex, Pagination, Input } from "antd";
import { Typography } from "antd";
import ButtonMain from "../../components/buttons/Button";
import FoodCard from "../../components/card/FoodCard";
import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useFood } from "../../context/FoodContext";
import { filterFoods } from "../../utils/filterFood";

const { Title, Paragraph } = Typography;

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const { foods, categories, loading } = useFood();


  const filteredFoods = filterFoods(foods, selectedCategory, searchValue);

  const pageSize = 12;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFoods = filteredFoods.slice(startIndex, startIndex + pageSize);

  const handleCategoryChange = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="">

        <div
          className="px-4 py-12 sm:px-6 lg:px-8 "
          style={{ paddingTop: "40px", paddingBottom: "40px" }}
        >
          <div className="max-w-6xl mx-auto">
            <Title
              level={1}
              style={{
                fontSize: "42px",
                fontWeight: 800,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Thực Đơn <span style={{ color: "#ff4d4f" }}>Foody</span>
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#555",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              Khám phá bộ sưu tập đầy đủ các món ăn ngon từ những đầu bếp hàng
              đầu
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Flex vertical gap={24}>
            <Flex justify="center" style={{ width: "100%" }}>
              <Input
                placeholder="Tìm kiếm món ăn..."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleSearchChange}
                size="large"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "8px",
                  borderColor: "#ddd",
                }}
              />
            </Flex>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Title
                level={4}
                style={{ marginBottom: 16, textAlign: "center" }}
              >
                Danh mục
              </Title>
              <Flex
                gap={12}
                wrap="wrap"
                justify="center"
                style={{ width: "100%" }}
              >
                <ButtonMain
                  icon={<AppstoreOutlined />}
                  color="danger"
                  variant={selectedCategory === null ? "solid" : "outlined"}
                  onClick={() => handleCategoryChange(null)}
                >
                  Tất cả
                </ButtonMain>
                {categories.map((category) => (
                  <ButtonMain
                    color="danger"
                    variant={
                      selectedCategory === category.categoryName
                        ? "solid"
                        : "outlined"
                    }
                    key={category.categoryId}
                    onClick={() => handleCategoryChange(category.categoryName)}
                  >
                    {category.categoryName}
                  </ButtonMain>
                ))}
              </Flex>
            </div>
            <div
              style={{ color: "#666", fontSize: "14px", textAlign: "center" }}
            >
              Tìm thấy{" "}
              <span style={{ fontWeight: 600 }}>{filteredFoods.length}</span>{" "}
              món ăn
            </div>
            {paginatedFoods.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 20,
                  width: "100%",
                }}
              >
                {paginatedFoods.map((item) => (
                  <FoodCard key={item.itemId} item={item} loading={loading} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                  flexDirection: "column",
                  gap: 16,
                  color: "#999",
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  Không tìm thấy món ăn nào
                </span>
                <Button onClick={() => setSearchValue("")}>Xóa tìm kiếm</Button>
              </div>
            )}
            {filteredFoods.length > pageSize && (
              <Flex justify="center" style={{ marginTop: 24 }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredFoods.length}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </Flex>
            )}
          </Flex>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
