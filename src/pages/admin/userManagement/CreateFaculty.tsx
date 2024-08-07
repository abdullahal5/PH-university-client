/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import Title from "../../../components/ui/Title";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import {
  bloodGroupOptions,
  genderOptions,
  TResponse,
} from "../../../constants/global";
import { toast } from "sonner";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentQuery(
    undefined,
  );

  const departmentOptions =
    dData?.data?.map((item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating");
    try {
      const adminData = {
        password: "faculty123",
        faculty: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(adminData));
      formData.append("file", data.image);

      const res = (await addFaculty(formData)) as TResponse<any>;
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

  const adminDefaultValues = {
    designation: "Faculty",
    name: {
      firstName: "John",
      middleName: "A",
      lastName: "Doe",
    },
    gender: "male",
    // password: "hello12345df",
    // dateOfBirth: "1970-01-01",
    email: "john12.doe@faculty.edu",
    contactNo: "+8801912345678",
    emergencyContactNo: "+8801812345678",
    bloodGroup: "A+",
    presentAddress: "House 12, Road 5, Dhanmondi, Dhaka",
    permanentAddress: "Village: Mymensingh, District: Mymensingh",
    profileImg: "https://www.example.com/profile.jpg",
    academicDepartment: "665abed2b385707f2d273481",
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
            <Title title="Create Faculty" />
            <Divider style={{ padding: 5 }}>Personal Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.lastName" label="Last Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                />
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
                      {profileImg && (
                        <div>
                          <img
                            src={profileImg}
                            alt="Profile"
                            style={{ width: "100px", objectFit: "cover" }}
                          />
                          <br />
                          <a
                            href={profileImg}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Current Image
                          </a>
                        </div>
                      )}
                      <Input
                        type="file"
                        {...field}
                        className="mt-1"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                            setProfileImg(URL.createObjectURL(file));
                          }
                        }}
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
              <Divider style={{ padding: 5 }}>Academic info</Divider>
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
    </div>
  );
};

export default CreateFaculty;
