import { useParams } from "react-router-dom";
import Title from "../../../components/ui/Title";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Flex, Spin } from "antd";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data, isLoading } = useGetSingleStudentQuery(studentId);
  // const { profileImg } = data?.data
  console.log(data)

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
        <div>
          <img
            className="w-20 rounded-full"
            src={data?.data.profileImg}
            alt=""
          />
          <h1>{}</h1>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
