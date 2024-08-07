import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import Title from "../../../components/ui/Title";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types/userManagement.type";
import { Link } from "react-router-dom";
import BlockModal from "../../../components/ui/BlockModal";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [page, setPage] = useState(1);
  const { data: student, isFetching } = useGetAllStudentsQuery([
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

  const handleBlock = (id: string) => {
    setSelectedStudentId(id);
    setIsModalOpen(true);
  };

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
      title: "Roll No.",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Roll No.",
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
            <Button onClick={() => handleBlock(`${item.key}`)}>block</Button>
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
      <Title title="Students" />
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
      {isModalOpen && (
        <BlockModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          id={selectedStudentId}
          title="Are You Sure You Want to Block This Student?"
        />
      )}
    </div>
  );
};

export default StudentData;
