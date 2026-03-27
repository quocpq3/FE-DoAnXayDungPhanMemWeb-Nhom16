import { Table, Card } from "antd";
import type { TableProps } from "antd";

interface Props<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  loading: boolean;
  rowKey: string;
}

const TableUI = <T extends object>({
  columns,
  data,
  loading,
  rowKey,
}: Props<T>) => {
  return (
    <Card>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </Card>
  );
};

export default TableUI;
