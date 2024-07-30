import { Button, Table, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import Title from "../../../components/ui/Title";

type TTableData = {
  key: string;
  name: string;
  createdAt: string;
};

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: academicFaculty, isFetching } =
    useGetAllAcademicFacultyQuery(params);

  const tableData: TTableData[] =
    academicFaculty?.data?.map(({ _id, name, createdAt }) => ({
      key: _id,
      name,
      createdAt: new Date(createdAt).toLocaleDateString(),
    })) || [];

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        {
          text: "Computer Engineering",
          value: "Computer Engineering",
        },
        {
          text: "Electrical Engineering",
          value: "Electrical Engineering",
        },
        {
          text: "Civil Engineering",
          value: "Civil Engineering",
        },
      ],
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      filters: [
        {
          text: "7/18/2024",
          value: "7/18/2024",
        },
        {
          text: "8/18/2024",
          value: "8/18/2024",
        },
        {
          text: "9/18/2024",
          value: "9/18/2024",
        },
      ],
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
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

      if (filters.name) {
        filters.name.forEach((item) => {
          queryParams.push({ name: "name", value: item });
        });
      }

      if (filters.createdAt) {
        filters.createdAt.forEach((item) => {
          queryParams.push({ name: "createdAt", value: item });
        });
      }

      setParams(queryParams);
    }
  };

  return (
    <div>
      <Title title="Academic Faculty" />
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicFaculty;
