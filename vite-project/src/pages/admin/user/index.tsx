import { useState } from "react";
import {
  deleteUser,
  searchUser,
} from "../../../services/apis/user/user.api";

import type { IUser } from "../../../services/apis/user/user.interface";

import TableUI from "../../../components/table/TableUI";
import TableToolbar from "../../../components/table/TableToolbar";
import StatsCard from "../../../components/card/StatsCard";
import UserModal from "./UserModal";

import { App, Button, Flex, Popconfirm, Space, Tag, Tooltip } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import type { TableProps } from "antd";
import { EFormType } from "../../../config/enum";

import { useUser } from "../../../context/UserRolesContext";

const UserPage = () => {
  const { message } = App.useApp();
  const { users, roles, loading, refresh } = useUser();

  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState<IUser[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();

  const onDelete = async (id: number) => {
    try {
      await deleteUser(id);
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

    setSearchLoading(true);
    try {
      const res = await searchUser(keywordTrim);
      setSearchData(res);
    } catch {
      message.error("Tìm kiếm thất bại");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleReset = () => {
    setKeyword("");
    setSearchData(null);
  };

  const handleReload = async () => {
    await refresh();
  };
  const data = searchData ?? users;
  const total = users.length;
  const visible = data.length;
  const isFiltering = !!searchData;

  const totalAdmin = data.filter((u) =>
    u.roles?.some((r) => r.includes("ADMIN")),
  ).length;

  const totalUser = data.filter((u) =>
    u.roles?.some((r) => r.includes("USER")),
  ).length;
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Tên",
      render: (_, record) => (
        <div>
          <div className="font-semibold">{record.name}</div>
          {/* <div className="text-[12px] text-[#888]" >ID: {record.id}</div> */}
        </div>
      ),
    },
    {
      title: "Liên hệ",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>{record.email || "Chưa có email"}</span>
          <span>{record.phone || "Chưa có SĐT"}</span>
        </Space>
      ),
    },
    {
      title: "Vai trò",
      render: (_, record) => (
        <>
          {record.roles?.map((role, index) => {
            const isAdmin = role === "ROLE_ADMIN";

            return (
              <Tag key={index} color={isAdmin ? "red" : "blue"}>
                {role.replace("ROLE_", "")}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedUser(record);
                setIsOpenUpdateModal(true);
              }}
            />
          </Tooltip>

          <Popconfirm title="Xóa user?" onConfirm={() => onDelete(record.id)}>
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
            title="Tổng user"
            value={data.length}
            icon={<AppstoreOutlined />}
            variant="primary"
          />
          <StatsCard
            title="Admin"
            value={totalAdmin}
            icon={<CheckCircleOutlined />}
            variant="danger"
          />
          <StatsCard
            title="User"
            value={totalUser}
            icon={<ExclamationCircleOutlined />}
            variant="success"
          />
        </Flex>
        <TableUI<IUser>
          columns={columns}
          data={data}
          loading={loading || searchLoading}
          rowKey="id"
          leftExtra={
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setIsOpenCreateModal(true)}
            >
              Thêm user
            </Button>
          }
          rightExtra={
            <Flex align="center" gap={12}>
              {isFiltering && (
                <span style={{ fontSize: 13, color: "#888" }}>
                  Hiển thị <b>{visible}</b> / <b>{total}</b> user
                </span>
              )}

              <TableToolbar
                keyword={keyword}
                setKeyword={setKeyword}
                onSearch={handleSearch}
                onReload={handleReload}
                onReset={handleReset}
              />
            </Flex>
          }
        />
      </Flex>
      <UserModal
        formType={EFormType.CREATE}
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={refresh}
        roles={roles}
      />
      <UserModal
        formType={EFormType.UPDATE}
        user={selectedUser}
        open={isOpenUpdateModal}
        onClose={() => {
          setIsOpenUpdateModal(false);
          setSelectedUser(undefined);
        }}
        onSuccess={refresh}
        roles={roles}
      />
    </>
  );
};

export default UserPage;
