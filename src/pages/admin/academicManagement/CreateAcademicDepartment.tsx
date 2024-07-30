/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schema/academicManagementSchema";
import { TResponse } from "../../../constants/global";
import { toast } from "sonner";
import Title from "../../../components/ui/Title";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFaculty } = useGetAllAcademicFacultyQuery(undefined);

  const facultyOptions =
    academicFaculty?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating");
    try {
      const res = (await addAcademicDepartment(data)) as TResponse<any>;
      if (res?.data?.success === true) {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res?.error?.data?.message, {
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

  return (
    <div>
      <Title title="Create Academic Department" />
      <Row justify="center" align="middle">
        <Col span={6}>
          <PHForm
            resolver={zodResolver(academicDepartmentSchema)}
            onSubmit={onSubmit}
          >
            <PHInput type="text" name="name" label="Name" />
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={facultyOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicDepartment;
