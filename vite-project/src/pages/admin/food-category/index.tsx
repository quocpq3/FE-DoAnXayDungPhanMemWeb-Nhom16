import { ProTable, type ProTableProps } from "@ant-design/pro-components";
const FoodCateGoryPage: React.FC = <T extends Record<string, any>>(
  props: ProTableProps<T>,
) => {
  return (
    <ProTable
      {...props}
      search={{
        labelWidth: "auto",
        ...props.search,
      }}
      options={{
        fullScreen: true,
        reload: true,
        setting: true,
        density: false,
        ...props.options,
      }}
      pagination={
        props.pagination === false
          ? false
          : {
              showSizeChanger: true,
              defaultPageSize: 10,
              ...props.pagination,
            }
      }
      scroll={{ y: "auto", ...props.scroll }}
    />
  );
};

export default FoodCateGoryPage;
