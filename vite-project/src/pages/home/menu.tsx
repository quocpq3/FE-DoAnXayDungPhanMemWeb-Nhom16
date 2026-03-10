import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  type TableProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { UserDeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form } from "antd";
import type { UserType } from "../../types/UserType";
import type { PopconfirmProps } from "antd";
import { message } from "antd";

const MenuPage: React.FC = () => {
  const deleteUse = (id: number) => {
    fetch(
      `https://be-doanxaydungphanmemweb-nhom16-production.up.railway.app/users/${id}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.json())
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };
  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    fetch(
      "https://be-doanxaydungphanmemweb-nhom16-production.up.railway.app/users",
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.result);
      });
  }, []);
  const [messageApi, holder] = message.useMessage();
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    messageApi.success("Đã xóa thành công");
  };
  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    messageApi.error("Đã hủy xóa");
  };
  const columns: TableProps<UserType>["columns"] = [
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
      width: 300,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc muốn xóa không"
            onConfirm={() => {
              confirm();
              deleteUse(record.id);
            }}
            onCancel={cancel}
          >
            <Button danger>
              <UserDeleteOutlined />
            </Button>
          </Popconfirm>
          <a>
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-[#300px]">
      {holder}
      <Button onClick={showModal} size="large" type="primary">
        Thêm
      </Button>
      <div className="w-max">
        <Table dataSource={users} columns={columns} rowKey="id" />
      </div>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name" name="name">
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuPage;
