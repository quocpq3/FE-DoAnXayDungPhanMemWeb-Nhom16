import { useEffect, useMemo, useState } from "react";
import { Button, Result, Select, Space, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import TableUI from "../../../components/table/TableUI";
import { getUsers, updateUserRoles } from "../../../services/apis/user/user.api";
import type { IUser } from "../../../services/apis/user/user.interface";
import { isAdmin } from "../../../helper/auth";

const ROLE_OPTIONS = [
  { label: "USER", value: "ROLE_USER" },
  { label: "ADMIN", value: "ROLE_ADMIN" },
];

const normalizeRole = (role: string): string => {
  const clean = role.replace(/^(ROLE_)+/i, "").toUpperCase();
  return `ROLE_${clean}`;
};

const normalizeRoles = (roles?: string[]) => {
  const list = (roles ?? ["ROLE_USER"]).map(normalizeRole);
  return Array.from(new Set(list));
};

const UserPage = () => {
  const admin = isAdmin();
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [roleDraft, setRoleDraft] = useState<Record<number, string[]>>({});

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      const normalizedUsers = data.map((user) => ({
        ...user,
        roles: normalizeRoles(user.roles),
      }));
      setUsers(normalizedUsers);
      const nextDraft: Record<number, string[]> = {};
      normalizedUsers.forEach((user) => {
        nextDraft[user.id] = user.roles ?? ["ROLE_USER"];
      });
      setRoleDraft(nextDraft);
    } catch (error: any) {
      messageApi.error(error?.message || "Không tải được danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!admin) return;
    loadUsers();
  }, [admin]);

  const handleUpdateRoles = async (user: IUser) => {
    if (!admin) {
      messageApi.error("Chỉ ADMIN mới có quyền chỉnh phân quyền người dùng.");
      return;
    }

    const selectedRoles = roleDraft[user.id] ?? user.roles ?? ["ROLE_USER"];
    setUpdatingId(user.id);
    try {
      const updated = await updateUserRoles(user, selectedRoles);
      const normalizedUpdated = {
        ...updated,
        roles: normalizeRoles(updated.roles ?? selectedRoles),
      };
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? normalizedUpdated : u))
      );
      setRoleDraft((prev) => ({
        ...prev,
        [user.id]: normalizeRoles(updated.roles ?? selectedRoles),
      }));
      messageApi.success(`Đã cập nhật quyền cho ${updated.name}`);
    } catch (error: any) {
      messageApi.error(error?.message || "Cập nhật quyền thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns: ColumnsType<IUser> = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 80 },
      { title: "Tên", dataIndex: "name" },
      { title: "Email", dataIndex: "email" },
      {
        title: "Quyền hiện tại",
        dataIndex: "roles",
        render: (roles?: string[]) =>
          (roles ?? ["ROLE_USER"]).map((role) => (
            <Tag key={role} color={role === "ROLE_ADMIN" ? "volcano" : "blue"}>
              {role.replace("ROLE_", "")}
            </Tag>
          )),
      },
      {
        title: "Đổi quyền",
        key: "editRole",
        render: (_, user) => (
          <Space>
            <Select
              mode="multiple"
              style={{ minWidth: 220 }}
              options={ROLE_OPTIONS}
              value={roleDraft[user.id] ?? user.roles ?? ["ROLE_USER"]}
              disabled={!admin}
              onChange={(values) =>
                setRoleDraft((prev) => ({ ...prev, [user.id]: values }))
              }
              placeholder="Chọn quyền"
            />
            <Button
              type="primary"
              disabled={!admin}
              loading={updatingId === user.id}
              onClick={() => handleUpdateRoles(user)}
            >
              Lưu
            </Button>
          </Space>
        ),
      },
    ],
    [roleDraft, updatingId]
  );

  return (
    <>
      {contextHolder}
      {!admin ? (
        <Result
          status="403"
          title="403"
          subTitle="Bạn không có quyền truy cập trang phân quyền người dùng."
        />
      ) : (
        <TableUI
          columns={columns}
          data={users}
          loading={loading}
          rowKey="id"
          leftExtra={null}
          rightExtra={null}
        />
      )}
    </>
  );
};

export default UserPage;
