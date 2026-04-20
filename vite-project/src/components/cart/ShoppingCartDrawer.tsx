import { Button, Drawer, Empty, Flex, Input } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useCart } from "../../hooks/useCart";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface ShoppingCartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalAmount,
    totalItems,
  } = useCart();

  return (
    <Drawer
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Giỏ hàng</span>
          {totalItems > 0 && (
            <span
              style={{
                background: "#ff4d4f",
                color: "#fff",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {totalItems}
            </span>
          )}
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      {cartItems.length === 0 ? (
        <div
          style={{
            padding: 24,
            textAlign: "center",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty description="Giỏ hàng trống" style={{ marginBottom: 0 }} />
        </div>
      ) : (
        <>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Flex vertical gap={16}>
              {cartItems.map((item) => (
                <div
                  key={item.itemId}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: 12,
                    background: "#fafafa",
                    borderRadius: 8,
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{
                          fontSize: 14,
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {item.itemName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#666",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.description}
                      </Text>
                    </div>
                    <Flex justify="space-between" align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          border: "1px solid #d9d9d9",
                          borderRadius: 4,
                        }}
                      >
                        <Button
                          type="text"
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() =>
                            updateQuantity(item.itemId, item.quantity - 1)
                          }
                          style={{ width: 24, height: 24 }}
                        />
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.itemId,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          style={{
                            width: 60,
                            textAlign: "center",
                            border: "none",
                            fontSize: 12,
                          }}
                        />
                        <Button
                          type="text"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            updateQuantity(item.itemId, item.quantity + 1)
                          }
                          style={{ width: 24, height: 24 }}
                        />
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <Text
                          style={{
                            color: "#ff4d4f",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {(item.salePrice * item.quantity).toLocaleString()} đ
                        </Text>
                      </div>

                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => removeFromCart(item.itemId)}
                        style={{ width: 24, height: 24 }}
                      />
                    </Flex>
                  </div>
                </div>
              ))}
            </Flex>
          </div>
          <div
            style={{
              padding: 16,
              background: "#fafafa",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Flex justify="space-between" style={{ marginBottom: 12 }}>
              <Text>Tạm tính:</Text>
              <Text style={{ fontSize: 14, fontWeight: 600 }}>
                {totalAmount.toLocaleString()} đ
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              style={{
                marginBottom: 12,
                paddingBottom: 12,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Text>Phí vận chuyển:</Text>
              <Text style={{ fontSize: 14 }}>Miễn phí</Text>
            </Flex>
            <Flex justify="space-between" style={{ marginBottom: 16 }}>
              <Title level={5} style={{ marginBottom: 0 }}>
                Tổng cộng:
              </Title>
              <Title level={5} style={{ color: "#ff4d4f", marginBottom: 0 }}>
                {totalAmount.toLocaleString()} đ
              </Title>
            </Flex>
            <Flex gap={12}>
              <Button onClick={clearCart} style={{ flex: 1 }}>
                Xóa tất cả
              </Button>
              <Button
                onClick={() => navigate("order-confirmation")}
                type="primary"
                danger
                size="large"
                style={{ flex: 1 }}
              >
                Thanh toán
              </Button>
            </Flex>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default ShoppingCartDrawer;
