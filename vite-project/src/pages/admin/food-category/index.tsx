import { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Space, Tag, theme, Tooltip } from "antd";
import TableUI from "../../../components/table/TableUI";
import type { ICategory } from "../../../services/apis/categories/categories.interface";
import {
  getCategory,
  deleteCategory,
  searchCategory,
} from "../../../services/apis/categories/categories.api";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  TagOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import CategotyModalForm from "./CategoryModalForm";
import { EFormType } from "../../../config/enum";
import { App } from "antd";
import TableToolbar from "../../../components/table/TableToolbar";
import StatsCard from "@/components/card/StatsCard";
import { useFood } from "@/context/FoodContext";

const FoodCategoryPage = () => {
  const { message } = App.useApp();
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [keyword, setKeyword] = useState<string>("");
  const { foods } = useFood();

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
  const handleSearch = async () => {
    const keywordTrim = keyword.trim();

    if (!keywordTrim) {
      fetchCategory();
      return;
    }

    setLoading(true);
    try {
      const data = await searchCategory(keywordTrim);

      setData(data);

      setKeyword("");
    } catch {
      message.error("Tìm kiếm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const { token } = theme.useToken();

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "ID",
      dataIndex: "categoryId",
      width: 70,
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      render: (text) => (
        <span
          style={{
            fontWeight: 600,
            color: token.colorText,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      render: (slug: string) => (
        <Tag
          style={{
            color: token.colorError,
            backgroundColor: token.colorErrorBg,
            fontWeight: 500,
            border: "none",
          }}
        >
          {slug}
        </Tag>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text: string) => (
        <span style={{ color: token.colorTextSecondary }}>{text || "—"}</span>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date: string) => (
        <span style={{ color: token.colorTextSecondary }}>
          {date ? new Date(date).toLocaleDateString("vi-VN") : "—"}
        </span>
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
                setSelectedCategory(record);
                setIsOpenUpdateModal(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa loại món ăn?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.categoryId)}
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
      <Flex vertical gap={16}>
        <Flex gap={16}>
          <StatsCard
            title="Tổng loại món"
            value={data.length}
            icon={<AppstoreOutlined />}
            variant="primary"
          />
          <StatsCard
            title="Đang hoạt động"
            value={data.length}
            icon={<TagOutlined />}
            variant="success"
          />
          <StatsCard
            title="Ngừng hoạt động"
            value={0}
            icon={<ExclamationCircleOutlined />}
            variant="warning"
          />
          <StatsCard
            title="Đang sử dụng"
            value={
              data.filter((cat) =>
                foods.some((food) => food.categoryId === cat.categoryId),
              ).length
            }
            icon={<CheckCircleOutlined />}
            variant="danger"
          />
        </Flex>
        <TableUI<ICategory>
          columns={columns}
          data={data}
          loading={loading}
          rowKey="categoryId"
          leftExtra={
            <Button
              icon={<PlusOutlined />}
              onClick={() => setIsOpenCreateModal(true)}
              type="primary"
            >
              Thêm loại món
            </Button>
          }
          rightExtra={
            <TableToolbar
              onReload={fetchCategory}
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={handleSearch}
            />
          }
        />
      </Flex>
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
