import { Table, Card, Form, Input, Button, Space } from "antd";
import type { TableProps } from "antd";
import type { ReactNode } from "react";

interface Props<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  loading: boolean;
  rowKey: string;
  extra?: ReactNode;

  // onSearch?: (values: any) => void;
  onReset?: () => void;
  onReload?: () => void;
}

const TableUI = <T extends object>({
  columns,
  data,
  loading,
  rowKey,
  // onSearch,
  onReset,
  onReload,
  extra,
}: Props<T>) => {
  const [form] = Form.useForm();

  // const handleSearch = (values: any) => {
  //   onSearch?.(values);
  // };

  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div>{extra}</div>
        <Form form={form} layout="inline">
          {/* <Form form={form} layout="inline" onFinish={handleSearch}> */}
          <Form.Item name="keyword">
            <Input placeholder="Tìm kiếm..." allowClear />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>

              <Button onClick={handleReset}>Reset</Button>

              <Button onClick={onReload}>Reload</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </Card>
  );
};

export default TableUI;
