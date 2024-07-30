import Title from "../../../components/ui/Title";

const studentDummyData = {
  password: "student",
  student: {
    name: {
      firstName: "Hero",
      middleName: "of",
      lastName: "programming",
    },
    gender: "male",
    dateOfBirth: "1995-10-26",
    email: "programmingHero2@gmail.com",
    contactNo: "+8801712345678",
    emergencyContactNo: "+8801812345679",
    bloogGroup: "A+",
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
      ddress: "789 Hillside Lane, Sylhet, Bangladesh",
    },
    profileImg:
      "https://i.ibb.co/VWFZm8X/Whats-App-Image-2024-04-11-at-20-57-18-71e45dce.jpg",
    admissionSemester: "665a4890c435f844a09bef47",
    academicDepartment: "665abed2b385707f2d273481",
  },
};

const CreateStudent = () => {
  return <Title title="Create Student" />;
};

export default CreateStudent;
