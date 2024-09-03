import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";

const MyCourses = () => {
  const { data } = useGetAllFacultyCoursesQuery(undefined)
  console.log(data)
  return (
    <div>
      
    </div>
  );
};

export default MyCourses;