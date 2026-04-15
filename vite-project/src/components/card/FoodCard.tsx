import { Card, Button, Flex, App } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { IFood } from "../../services/apis/food/food.interface";
import { useCart } from "../../hooks/useCart";

interface Props {
  item: IFood;
  loading?: boolean;
}

const FoodCard: React.FC<Props> = ({ item, loading }) => {
  const { addToCart } = useCart();
  const { message } = App.useApp();

  const handleAddToCart = () => {
    addToCart(item, 1);
    message.success(`${item.itemName} đã được thêm vào giỏ hàng`);
  };
  return (
    <Card
      loading={loading}
      hoverable
      style={{
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        background: "#fff",
        border: "1px solid #f1f1f1",
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
          {item.isCombo && (
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "linear-gradient(135deg,#faad14,#ffc53d)",
                color: "#fff",
                padding: "4px 8px",
                fontSize: 12,
                borderRadius: 8,
                fontWeight: 600,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              Combo
            </span>
          )}
        </div>
      }
    >
      {/* NAME */}
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

      {/* DESCRIPTION */}
      <div
        style={{
          fontSize: 12,
          color: "#8c8c8c",
          marginTop: 4,
          marginBottom: 8,
          minHeight: 40,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {item.description}
      </div>

      {/* CATEGORY */}
      <div
        style={{
          fontSize: 11,
          color: "#999",
          marginBottom: 8,
        }}
      >
        {item.categoryName}
      </div>

      {/* PRICE + BUTTON */}
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginTop: "auto" }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#bfbfbf",
              textDecoration: "line-through",
              visibility: item.discountPercent > 0 ? "visible" : "hidden",
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
          disabled={!item.isAvailable}
          onClick={handleAddToCart}
        />
      </Flex>
    </Card>
  );
};

export default FoodCard;
