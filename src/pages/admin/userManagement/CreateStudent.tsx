import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import Title from "../../../components/ui/Title";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
  TResponse,
} from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const semesterOptions =
    sData?.data?.map((item) => ({
      value: item._id,
      label: `${item.name} . ${item.year}`,
    })) || [];

  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentQuery(
    undefined,
    { skip: sIsLoading }
  );

  const departmentOptions =
    dData?.data?.map((item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating");
    try {
      const studentData = {
        password: "student123",
        student: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.image);

      const res = (await addStudent(formData)) as TResponse<any>;
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

  const studentDefaultValues = {
    name: {
      firstName: "I am",
      middleName: "Student",
      lastName: "1",
    },
    gender: "male",
    // dateOfBirth: "1995-10-26",
    email: "student2@gmail.com",
    contactNo: "+8801712345678",
    emergencyContactNo: "+8801812345679",
    bloodGroup: "A+",
    presentAddress: "123 Main Street, Dhaka, Bangladesh",
    permanentAddress: "456 City View Road, Chittagong, Bangladesh",
    guardian: {
      fatherName: "Mr. William Doe",
      fatherContactNo: "+8801987654321",
      fatherOccupation: "Software Engineer",
      motherName: "Mrs. Jane Doe",
      motherContactNo: "+8801587654322",
      motherOccupation: "Teacher",
    },
    localGuardian: {
      name: "Mr. Alex Smith",
      occupation: "Doctor",
      contactNo: "+8801687654323",
      address: "789 Hillside Lane, Sylhet, Bangladesh",
    },
    profileImg:
      "https://i.ibb.co/VWFZm8X/Whats-App-Image-2024-04-11-at-20-57-18-71e45dce.jpg",
    admissionSemester: "665a4890c435f844a09bef47",
    academicDepartment: "665abed2b385707f2d273481",
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Title title="Create Student" />
          <Divider style={{ padding: 5 }}>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Divider style={{ padding: 5 }}>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
            <Divider style={{ padding: 5 }}>Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo."
              />
            </Col>
            <Divider style={{ padding: 5 }}>Local Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
            <Divider style={{ padding: 5 }}>Academic info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                label="Admission Semester"
                disabled={sIsLoading}
                options={semesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions}
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <div className="w-full text-center">
            <Button htmlType="submit">Submit</Button>
          </div>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
