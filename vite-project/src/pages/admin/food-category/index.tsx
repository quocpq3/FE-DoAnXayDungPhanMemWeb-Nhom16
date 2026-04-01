import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Tag } from "antd";
import TableUI from "../../../components/table/TableUI";
import type { ICategory } from "../../../services/apis/categories/categories.interface";
import {
  getCategory,
  deleteCategory,
} from "../../../services/apis/categories/categories.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import CategotyModalForm from "./CategoryModalForm";
import { EFormType } from "../../../config/enum";
import { App } from "antd";
const FoodCategoryPage = () => {
  const { message } = App.useApp();
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const res = await getCategory();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const onDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setData((prev) => prev.filter((i) => i.categoryId !== id));
      message.success("Xóa thành công");
    } catch {
      message.error("Xóa thất bại");
    }
  };
  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "ID",
      dataIndex: "categoryId",
      width: 70,
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      render: (slug: string) => <Tag color="red">{slug}</Tag>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedCategory(record);
              setIsOpenUpdateModal(true);
            }}
          />
          <Popconfirm
            title="Xóa loại món ăn?"
            onConfirm={() => onDelete(record.categoryId)}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleReload = () => {
    fetchCategory();
  };
  return (
    <>
      <TableUI<ICategory>
        columns={columns}
        data={data}
        loading={loading}
        rowKey="categoryId"
        extra={
          <Button onClick={() => setIsOpenCreateModal(true)} type="primary">
            Thêm loại món
          </Button>
        }
        onReload={handleReload}
      />
      <CategotyModalForm
        formType={EFormType.UPDATE}
        category={selectedCategory}
        open={isOpenUpdateModal}
        onClose={() => {
          setIsOpenUpdateModal(false);
          setSelectedCategory(undefined);
        }}
        onSuccess={() => {
          setIsOpenUpdateModal(false);
          setSelectedCategory(undefined);
          fetchCategory();
        }}
      />
      <CategotyModalForm
        formType={EFormType.CREATE}
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={() => {
          setIsOpenCreateModal(false);
          fetchCategory();
        }}
      />
    </>
  );
};

export default FoodCategoryPage;
