import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import Title from "../../../components/ui/Title";
import {
  useGetAllRegisteredSemstersQuery,
  useUpdateRegisteredSemesterStatusMutation,
} from "../../../redux/features/admin/courseManagement";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const [semesterId, setSemesterId] = useState("");

  const {
    data: registeredSemesters,
    isFetching,
  } = useGetAllRegisteredSemstersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterStatusMutation();

  const tableData = registeredSemesters?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} . ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusUpdate = async ({ key }: { key: string }) => {
    const toastId = toast.loading("creating");
    const updateData = {
      id: semesterId,
      data: {
        status: key,
      },
    };

    try {
      const res = await updateSemesterStatus(updateData);

      if (res.error) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;

        if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ONGOING") {
          color = "green";
        } else if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown trigger={["click"]} menu={menuProps}>
            <Button onClick={() => setSemesterId(item?.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <div>
      <Title title="Academic Semester" />
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default RegisteredSemesters;
