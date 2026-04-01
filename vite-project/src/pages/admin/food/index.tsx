import {
  App,
  Button,
  Image,
  Popconfirm,
  Space,
  Tag,
  type TableProps,
} from "antd";
import TableUI from "../../../components/table/TableUI";
import type { IFood } from "../../../services/apis/food/food.interface";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteFood, getFoods } from "../../../services/apis/food/food.api";
import FoodModal from "./FoodModal";
import { EFormType } from "../../../config/enum";
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
      render: (url: string) => (
        <Image
          src={url}
          alt="food"
          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Tên món",
      dataIndex: "itemName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      width: 100,
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Giá gốc",
      dataIndex: "basePrice",
      render: (price: number) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Giảm giá",
      width: 100,
      dataIndex: "discountPercent",
      render: (discount: number) => (
        <Tag color={discount > 0 ? "green" : "default"}>{discount}%</Tag>
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "salePrice",
      render: (price: number) => (
        <b style={{ color: "red" }}>{price.toLocaleString()} đ</b>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isAvailable",
      render: (value: boolean) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Đang bán" : "Ngừng bán"}
        </Tag>
      ),
    },
    {
      title: "Loại",
      dataIndex: "isCombo",
      render: (value: boolean) => (
        <Tag color={value ? "purple" : "default"}>
          {value ? "Combo" : "Món lẻ"}
        </Tag>
      ),
    },
    // {
    //   title: "Ngày tạo",
    //   dataIndex: "createdAt",
    // },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedFood(record);
              setIsOpenUpdateModal(true);
            }}
          />
          <Popconfirm
            title="Xóa món ăn?"
            onConfirm={() => onDelete(record.itemId)}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
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
        extra={
          <Button type="primary" onClick={() => setIsOpenCreateModal(true)}>
            Thêm món ăn
          </Button>
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
