import { Button, Popconfirm, Space, Table, type TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { UserDeleteOutlined, EditOutlined } from "@ant-design/icons";

import type { IUser } from "../../../services/apis/user/user.interface";
import { message } from "antd";
import { deleteUser, getUsers } from "../../../services/apis/user/user.api";
import UserModalForm from "../user/UserModalForm";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const onDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      message.success("Xóa thành công");
    } catch {
      message.error("Xóa thất bại");
    }
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 340,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc muốn xóa không"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger icon={<UserDeleteOutlined />} />
          </Popconfirm>
          <Button icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-[#300px]">
      <Button
        onClick={() => setIsOpenCreateModal(true)}
        size="middle"
        type="primary"
      >
        Thêm
      </Button>
      <div className="w-max">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
      <UserModalForm
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={() => {
          setIsOpenCreateModal(false);
          fetchUsers();
        }}
      />
    </div>
  );
};

export default UserTable;
