import { ProTable } from "@ant-design/pro-components";
const FoodCateGoryPage: React.FC = () => {
  return (
    <ProTable
      search={{
        labelWidth: "auto",
      }}
      options={{
        fullScreen: true,
        reload: true,
        setting: true,
        density: false,
      }}
      scroll={{ y: "auto" }}
    />
  );
};

export default FoodCateGoryPage;
