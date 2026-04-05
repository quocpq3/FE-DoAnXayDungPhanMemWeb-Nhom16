import { Form, Input, Button, Space } from "antd";
import {
  RedoOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface Props {
  onReset?: () => void;
  onReload?: () => void;
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}
const TableToolbar = ({
  onReset,
  onReload,
  keyword,
  setKeyword,
  onSearch,
}: Props) => {
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };
  return (
    <>
      {" "}
      <Form form={form} layout="inline">
        {/* <Form form={form} layout="inline" onFinish={handleSearch}> */}
        <Form.Item name="keyword">
          <Input
            placeholder="Tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={onSearch}
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              icon={<SearchOutlined />}
              onClick={onSearch}
              type="primary"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>

            <Button icon={<RedoOutlined />} onClick={handleReset}>
              Reset
            </Button>

            <Button icon={<ReloadOutlined />} onClick={onReload}>
              Reload
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default TableToolbar;
