/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Divider, Form, Input, Row } from "antd";
import Title from "../../../components/ui/Title";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  bloodGroupOptions,
  genderOptions,
  TResponse,
} from "../../../constants/global";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";

const CreateAdmin = () => {
  const [addAdmin] = useAddAdminMutation();
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating");
    try {
      const adminData = {
        password: "admin123",
        admin: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(adminData));
      formData.append("file", data.image);

      const res = (await addAdmin(formData)) as TResponse<any>;
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
    designation: "Admin",
    name: {
      firstName: "Jane",
      middleName: "Bee",
      lastName: "Doe",
    },
    gender: "male",
    // dateOfBirth: "1975-07-12",
    email: "abdullahalfahin183@gmail.com",
    contactNo: "+8801512345678",
    emergencyContactNo: "+8801912345678",
    bloodGroup: "B+",
    presentAddress: "Apartment 22, Road 10, Gulshan, Dhaka",
    permanentAddress: "City: Chittagong, District: Chittagong",
    profileImg: "https://i.ibb.co/vH2SNT0/Screenshot-318.png",
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
            <Title title="Create Admin" />
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

export default CreateAdmin;
