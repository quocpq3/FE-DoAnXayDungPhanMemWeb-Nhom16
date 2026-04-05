import { Table, Card } from "antd";
import type { TableProps } from "antd";
import type { ReactNode } from "react";

interface Props<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  loading: boolean;
  rowKey: string;

  leftExtra?: ReactNode;
  rightExtra?: ReactNode;
}

const TableUI = <T extends object>({
  columns,
  data,
  loading,
  rowKey,
  leftExtra,
  rightExtra,
}: Props<T>) => {
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
        <div>{leftExtra}</div>
        <div>{rightExtra}</div>
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
