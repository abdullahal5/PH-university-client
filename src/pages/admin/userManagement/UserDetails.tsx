import { useParams } from "react-router-dom";
import Title from "../../../components/ui/Title";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Divider, Flex, Spin, Tabs, TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "Personal",
    label: "Personal",
    children: "Content of Tab Pane 1",
  },
  {
    key: "Parents",
    label: "Parents",
    children: "Content of Tab Pane 2",
  },
  {
    key: "Local Parents",
    label: "Local Parents",
    children: "Content of Tab Pane 3",
  },
  {
    key: "Admission",
    label: "Admission",
    children: "Content of Tab Pane 3",
  },
  {
    key: "Department",
    label: "Department",
    children: "Content of Tab Pane 3",
  },
  {
    key: "Faculty",
    label: "Faculty",
    children: "Content of Tab Pane 3",
  },
];

const UserDetails = () => {
  const { studentId } = useParams();
  const { data, isLoading } = useGetSingleStudentQuery(studentId);
  console.log(data?.data);

  const onChange = (key: string) => {
    console.log(key);
  };
  
  return (
    <div>
      <Title title="Student Details" />
      {isLoading ? (
        <Flex
          style={{ height: "70vh" }}
          align="center"
          justify="center"
          gap="middle"
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <div className="flex items-start gap-10">
          <div className="border w-80 rounded-md p-5">
            <div className="text-center">
              <img
                className="w-28 mx-auto rounded-full object-cover"
                src={data?.data.profileImg}
                alt=""
              />
              <h1 className="text-2xl font-semibold text-center py-3">
                {data.data.fullName}
              </h1>
              <span className="bg-sky-500 text-center text-white rounded-md px-3 py-1 text-lg">
                In Progress
              </span>
              <p className="pt-3 text-lg font-medium">
                Board Roll: {data?.data?.id}
              </p>
            </div>
            <Divider>Contact info</Divider>
            <div className="text-base space-y-3">
              <p>Email: {data?.data?.email}</p>
              <p>Phone: {data?.data?.contactNo}</p>
              <p>Blood Group: {data?.data?.bloodGroup}</p>
            </div>
          </div>
          <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <div className="border">

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
