import {
  App,
  Button,
  Flex,
  Image,
  Popconfirm,
  Space,
  Tag,
  type TableProps,
} from "antd";
import TableUI from "../../../components/table/TableUI";
import type { IFood } from "../../../services/apis/food/food.interface";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
  ExclamationCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { deleteFood, searchFood } from "../../../services/apis/food/food.api";
import FoodModal from "./FoodModal";
import { EFormType } from "../../../config/enum";
import TableToolbar from "../../../components/table/TableToolbar";
import StatsCard from "../../../components/card/StatsCard";
import { useFood } from "../../../context/FoodContext";

const FoodPage = () => {
  const { message } = App.useApp();
  const { foods, refresh, loading } = useFood();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<IFood | undefined>();
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState<IFood[] | null>(null);

  const data = searchData ?? foods;



  const onDelete = async (id: number) => {
    try {
      await deleteFood(id);
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
      const res = await searchFood(keywordTrim);
      setSearchData(res);
    } catch {
      message.error("Tìm kiếm thất bại");
    }
  };

  const columns: TableProps<IFood>["columns"] = [
    {
      title: "Món ăn",
      render: (_, record) => (
        <Flex gap={12} align="center">
          <Image
            src={record.imageUrl}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />

          <div>
            <div style={{ fontWeight: 600 }}>{record.itemName}</div>
            <div style={{ fontSize: 12, color: "#888" }}>
              {record.categoryName}
            </div>
          </div>
        </Flex>
      ),
    },

    {
      title: "Giá",
      align: "right",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 700, color: "#ff4d4f" }}>
            {record.salePrice.toLocaleString()} đ
          </div>

          {record.discountPercent > 0 && (
            <Tag color="red">-{record.discountPercent}%</Tag>
          )}
        </div>
      ),
    },

    {
      title: "Trạng thái",
      align: "center",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Tag color={record.isAvailable ? "green" : "red"}>
            {record.isAvailable ? "Đang bán" : "Ngừng bán"}
          </Tag>

          <Tag color={record.isCombo ? "purple" : "blue"}>
            {record.isCombo ? "Combo" : "Món lẻ"}
          </Tag>
        </Space>
      ),
    },

    {
      title: "Hành động",
      width: 100,
      align: "center",
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
            title="Xóa món?"
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
      <Flex vertical gap={16}>
        <Flex gap={16}>
          <StatsCard
            title="Tổng món"
            value={data.length}
            icon={<AppstoreOutlined />}
            variant="primary"
          />
          <StatsCard
            title="Đang bán"
            value={data.filter((f) => f.isAvailable).length}
            icon={<CheckCircleOutlined />}
            variant="success"
          />
          <StatsCard
            title="Ngừng bán"
            value={data.filter((f) => !f.isAvailable).length}
            icon={<ExclamationCircleOutlined />}
            variant="warning"
          />
          <StatsCard
            title="Đang giảm giá"
            value={data.filter((f) => f.discountPercent > 0).length}
            icon={<TagOutlined />}
            variant="danger"
          />
        </Flex>

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
              Thêm món
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

      <FoodModal
        formType={EFormType.UPDATE}
        food={selectedFood}
        open={isOpenUpdateModal}
        onClose={() => {
          setIsOpenUpdateModal(false);
          setSelectedFood(undefined);
        }}
        onSuccess={refresh}
      />

      <FoodModal
        formType={EFormType.CREATE}
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={refresh}
      />
    </>
  );
};

export default FoodPage;
