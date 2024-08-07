/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import Title from "../../../components/ui/Title";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
  useGetAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TStudent } from "../../../types/userManagement.type";
import { useEffect, useState } from "react";

const StudentUpdate = () => {
  const { studentId } = useParams();
  const { data, isLoading } = useGetSingleStudentQuery(studentId);
  const [profileImg, setProfileImg] = useState<string | null>(null);

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

  const onSubmit = () => {};

  const studentData: TStudent = data?.data;

  useEffect(() => {
    if (data && data.data && data.data.profileImg) {
      setProfileImg(data.data.profileImg);
    }
  }, [data]);

  return (
    <div>
      <Title title="Update Student Data" />
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
        <Row>
          <Col span={24}>
            <PHForm onSubmit={onSubmit}>
              <Divider style={{ padding: 5 }}>Personal Info</Divider>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="name.firstName"
                    label="First Name"
                    defaultValue={studentData?.name?.firstName}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="name.middleName"
                    label="Middle Name"
                    defaultValue={studentData?.name?.middleName}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="name.lastName"
                    label="Last Name"
                    defaultValue={studentData?.name?.lastName}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    defaultValue={studentData?.gender}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHDatePicker
                    name="dateOfBirth"
                    label="Date of Birth"
                    defaultValue={studentData.dateOfBirth}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    name="bloodGroup"
                    label="Blood Group"
                    options={bloodGroupOptions}
                    defaultValue={studentData.bloodGroup}
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
                            const file = e?.target?.files?.[0];
                            if (file) {
                              onChange(file);
                              setProfileImg(URL?.createObjectURL(file));
                            }
                          }}
                        />
                      </Form.Item>
                    )}
                  />
                </Col>
                <Divider style={{ padding: 5 }}>Contact Info</Divider>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="email"
                    name="email"
                    label="Email"
                    defaultValue={studentData.email}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="contactNo"
                    label="Contact Number"
                    defaultValue={studentData.contactNo}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="emergencyContactNo"
                    label="Emergency Contact Number"
                    defaultValue={studentData.emergencyContactNo}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="presentAddress"
                    label="Present Address"
                    defaultValue={studentData.presentAddress}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="permanentAddress"
                    label="Permanent Address"
                    defaultValue={studentData.permanentAddress}
                  />
                </Col>
                <Divider style={{ padding: 5 }}>Guardian Info</Divider>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.fatherName"
                    label="Father Name"
                    defaultValue={studentData.guardian.fatherName}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.fatherOccupation"
                    label="Father Occupation"
                    defaultValue={studentData.guardian.fatherOccupation}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.fatherContactNo"
                    label="Father ContactNo."
                    defaultValue={studentData.guardian.fatherContactNo}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.motherName"
                    label="Mother Name"
                    defaultValue={studentData.guardian.motherName}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.motherOccupation"
                    label="Mother Occupation"
                    defaultValue={studentData.guardian.motherOccupation}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.motherContactNo"
                    label="Mother ContactNo."
                    defaultValue={studentData.guardian.motherContactNo}
                  />
                </Col>
                <Divider style={{ padding: 5 }}>Local Guardian Info</Divider>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="localGuardian.name"
                    label="Name"
                    defaultValue={studentData.localGuardian.name}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="localGuardian.occupation"
                    label="Occupation"
                    defaultValue={studentData.localGuardian.occupation}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="localGuardian.contactNo"
                    label="Contact Number"
                    defaultValue={studentData.localGuardian.contactNo}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="localGuardian.address"
                    label="Address"
                    defaultValue={studentData.localGuardian.address}
                  />
                </Col>
                <Divider style={{ padding: 5 }}>Academic info</Divider>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    name="admissionSemester"
                    label="Admission Semester"
                    disabled={sIsLoading}
                    options={semesterOptions}
                    defaultValue={`${studentData.admissionSemester.name} . ${studentData.admissionSemester.year}`}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    name="academicDepartment"
                    label="Academic Department"
                    options={departmentOptions}
                    disabled={dIsLoading}
                    defaultValue={studentData.academicDepartment.name}
                  />
                </Col>
              </Row>
              <div className="w-full text-center">
                <Button htmlType="submit">Submit</Button>
              </div>
            </PHForm>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default StudentUpdate;
