/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schema/academicManagementSchema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../constants/global";
import Title from "../../../components/ui/Title";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating");
    try {
      const res = (await addAcademicFaculty(data)) as TResponse<any>;
      if (res?.data?.success === true) {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error("This faculty already exist", {
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
    <>
      <Title title="Create Academic Faculty" />
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}
          >
            <PHInput type="text" label="Name" name="name" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
};

export default CreateAcademicFaculty;
