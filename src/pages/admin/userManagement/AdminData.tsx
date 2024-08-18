import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAdminQuery } from "../../../redux/features/admin/userManagement.api";
import Title from "../../../components/ui/Title";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import { TAdminData } from "../../../types/userManagement.type";

export type TTableData = Pick<TAdminData, "fullName" | "id" | "email" | "contactNo">;

const AdminData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: admin, isFetching } = useGetAllAdminQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = admin?.meta;

  const tableData = admin?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/students-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/user-data-update/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`/admin/students-data-update/${item.key}`}>
              <Button>Delete</Button>
            </Link>
          </Space>
        );
      },
      width: "10%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });

      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });

      setParams(queryParams);
    }
  };

  return (
    <div>
      <Title title="Admin" />
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        style={{ paddingTop: "30px" }}
        align="center"
        onChange={(e) => setPage(e)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default AdminData;
