import {
  App,
  Button,
  Image,
  Popconfirm,
  Space,
  Tag,
  theme,
  Tooltip,
  type TableProps,
} from "antd";
import TableUI from "../../../components/table/TableUI";
import type { IFood } from "../../../services/apis/food/food.interface";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FireOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { deleteFood, getFoods } from "../../../services/apis/food/food.api";
import FoodModal from "./FoodModal";
import { EFormType } from "../../../config/enum";
import TableToolbar from "../../../components/table/TableToolbar";

const FoodPage = () => {
  const { message } = App.useApp();
  const [data, setData] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<IFood | undefined>();

  const fetchFood = async () => {
    setLoading(true);
    try {
      const res = await getFoods();
      setData(res);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Fetching foods...");
    fetchFood();
  }, []);

  const onDelete = async (id: number) => {
    try {
      await deleteFood(id);
      setData((prev) => prev.filter((i) => i.itemId !== id));
      message.success("Xóa thành công");
    } catch {
      message.error("Xóa thất bại");
    }
  };

  const { token } = theme.useToken();

  const columns: TableProps<IFood>["columns"] = [
    {
      title: "ID",
      dataIndex: "itemId",
      width: 70,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      width: 100,
      render: (url?: string) => (
        <Image
          src={url || "https://via.placeholder.com/60"}
          alt="food"
          preview={true}
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: 8,
            border: `1px solid ${token.colorBorder}`,
          }}
        />
      ),
    },
    {
      title: "Tên món",
      dataIndex: "itemName",
      render: (text) => (
        <span style={{ fontWeight: 600, color: token.colorText }}>{text}</span>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      render: (name: string) => (
        <Tag
          icon={<TagsOutlined />}
          style={{
            color: token.colorPrimary,
            backgroundColor: token.colorPrimaryBg,
            fontWeight: 500,
            border: "none",
          }}
        >
          {name}
        </Tag>
      ),
    },

    {
      title: "Giá gốc",
      dataIndex: "basePrice",
      render: (price: number) => (
        <span style={{ color: token.colorTextSecondary }}>
          {price.toLocaleString()} đ
        </span>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "discountPercent",
      render: (discount: number) => (
        <Tag
          icon={<FireOutlined />}
          style={{
            color: discount > 0 ? token.colorWarning : token.colorTextSecondary,
            backgroundColor:
              discount > 0 ? token.colorWarningBg : token.colorFillSecondary,
            fontWeight: 500,
            border: "none",
          }}
        >
          {discount}%
        </Tag>
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "salePrice",
      render: (price: number) => (
        <span
          style={{
            fontWeight: 700,
            color: token.colorError,
          }}
        >
          {price.toLocaleString()} đ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isAvailable",
      render: (value: boolean) => (
        <Tag
          style={{
            color: value ? token.colorSuccess : token.colorError,
            backgroundColor: value ? token.colorSuccessBg : token.colorErrorBg,
            fontWeight: 500,
          }}
          icon={value ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {value ? "Đang bán" : "Ngừng bán"}
        </Tag>
      ),
    },
    {
      title: "Loại",
      dataIndex: "isCombo",
      render: (value: boolean) => (
        <Tag
          color={value ? "#722ed1" : token.colorTextSecondary}
          style={{ fontWeight: 500 }}
        >
          {value ? "Combo" : "Món lẻ"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedFood(record);
                setIsOpenUpdateModal(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa món ăn?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.itemId)}
          >
            <Tooltip title="Xóa">
              <Button danger type="text" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <TableUI<IFood>
        columns={columns}
        data={data}
        loading={loading}
        rowKey="itemId"
        leftExtra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsOpenCreateModal(true)}
          >
            Thêm món ăn
          </Button>
        }
        rightExtra={
          // <TableToolbar
          // // onReload={fetchFood}
          // // keyword={keyword}
          // // setKeyword={setKeyword}
          // // onSearch={handleSearch}
          // />
          <h1>Quản lý món ăn</h1>
        }
      />
      <FoodModal
        formType={EFormType.UPDATE}
        food={selectedFood}
        open={isOpenUpdateModal}
        onClose={() => {
          setIsOpenUpdateModal(false);
          setSelectedFood(undefined);
        }}
        onSuccess={() => {
          setIsOpenUpdateModal(false);
          setSelectedFood(undefined);
          fetchFood();
        }}
      />
      <FoodModal
        formType={EFormType.CREATE}
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={() => {
          setIsOpenCreateModal(false);
          fetchFood();
        }}
      />
    </>
  );
};
export default FoodPage;
