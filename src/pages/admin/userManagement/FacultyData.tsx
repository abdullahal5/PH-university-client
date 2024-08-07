import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagement.api";
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { Link } from "react-router-dom";
import Title from "../../../components/ui/Title";
import { TFacultyData } from "../../../types/userManagement.type";

export type TTableData = Pick<
  TFacultyData,
  "fullName" | "id" | "email" | "contactNo"
>;

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: student, isFetching } = useGetAllFacultyQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = student?.meta;

  const tableData = student?.data?.map(
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
      title: "ID",
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
            <Link to={`/admin/students-data-update/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`/admin/students-data/${item.key}`}>
              <Button>Details</Button>
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
    <>
      <Title title="Faculty" />
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
    </>
  );
};

export default FacultyData;
