import { useState } from "react";
import { Button, Flex, Popconfirm, Space, Tag, Tooltip } from "antd";
import TableUI from "../../../components/table/TableUI";
import type { ICategory } from "../../../services/apis/categories/categories.interface";
import {
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
import StatsCard from "../../../components/card/StatsCard";
import { useFood } from "../../../context/FoodContext";

const FoodCategoryPage = () => {
  const { message } = App.useApp();
  const { foods, categories, refresh, loading } = useFood();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState<ICategory[] | null>(null);

  const data = searchData ?? categories;

  const onDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      await refresh();
      message.success("Xóa thành công");
    } catch {
      message.error("Xóa thất bại");
    }
  };

  const handleSearch = async () => {
    const keywordTrim = keyword.trim();

    if (!keywordTrim) {
      setSearchData(null);
      return;
    }

    try {
      const res = await searchCategory(keywordTrim);
      setSearchData(res);
    } catch {
      message.error("Tìm kiếm thất bại");
    }
  };

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Danh mục",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>
            {record.categoryName}
          </div>
          {/* 
          <div style={{ fontSize: 12, color: "#888" }}>
            ID: {record.categoryId}
          </div> */}
        </div>
      ),
    },
    {
      title: "Slug",
      align: "center",
      render: (_, record) => (
        <Tag color="gray">{record.slug}</Tag>
      ),
    },

    {
      title: "Mô tả",
      render: (_, record) => (
        <span style={{ color: "#888" }}>
          {record.description
            ? record.description.length > 60
              ? record.description.slice(0, 60) + "..."
              : record.description
            : "—"}
        </span>
      ),
    },

    {
      title: "Ngày tạo",
      align: "center",
      render: (_, record) => (
        <span style={{ fontSize: 12 }}>
          {record.createdAt
            ? new Date(record.createdAt).toLocaleDateString("vi-VN")
            : "—"}
        </span>
      ),
    },

    {
      title: "Hành động",
      width: 100,
      align: "center",
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
            title="Xóa loại món?"
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
                foods.some((f) => f.categoryId === cat.categoryId),
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
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={handleSearch}
              onReload={() => {
                setSearchData(null);
                refresh();
              }}
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
        onSuccess={refresh}
      />

      <CategotyModalForm
        formType={EFormType.CREATE}
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={refresh}
      />
    </>
  );
};

export default FoodCategoryPage;
