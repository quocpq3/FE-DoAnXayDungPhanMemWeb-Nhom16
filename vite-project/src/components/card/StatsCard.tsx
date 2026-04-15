import { Card, Typography } from "antd";
import type { ReactNode } from "react";

const { Text, Title } = Typography;

type Variant = "primary" | "success" | "warning" | "danger" | "purple";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
  variant?: Variant;
}

const variantMap = {
  primary: {
    color: "#1677ff",
    bgColor: "#E6F4FF",
  },
  success: {
    color: "#52c41a",
    bgColor: "#F6FFED",
  },
  warning: {
    color: "#fa8c16",
    bgColor: "#FFF7E6",
  },
  danger: {
    color: "#ff4d4f",
    bgColor: "#FFF1F0",
  },
  purple: {
    color: "#722ed1",
    bgColor: "#F9F0FF",
  },
};

const StatsCard: React.FC<Props> = ({
  title,
  value,
  icon,
  variant = "primary",
}) => {
  const { color, bgColor } = variantMap[variant];

  return (
    <Card
      style={{
        flex: 1,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s",
        cursor: "pointer",
      }}
      hoverable
      bodyStyle={{ padding: 20 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Text type="secondary">{title}</Text>
          <Title level={3} style={{ margin: 0 }}>
            {value}
          </Title>
        </div>

        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 22, color }}>{icon}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
