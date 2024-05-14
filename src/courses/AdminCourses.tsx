import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from 'src/app/Layout';
import { getAuthToken, getId } from 'src/services/BackendService';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  sections: number[];
}

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/courses/user/${getId()}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        toast.error('Error while fetching courses.');
      })
      .then((data) => {
        console.log(data);
        if (data !== undefined) {
          setCourses(data);
        }
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          setCourses(courses.filter((course) => course.id !== id));
          toast.success('Course deleted successfully.');
        } else {
          toast.error('Error while deleting course.');
        }
      })
      .catch((error) => {
        toast.error('Error while deleting course.');
      });
  };

  return (
    <Layout>
      <Button
        color="success"
        variant="contained"
        href={`/admin/add-course/${getId()}`}
      >
        Add Course
      </Button>
      {courses.map((course) => (
        <Accordion
          key={course.id}
          style={{
            width: '100%',
          }}
        >
          <AccordionSummary
            aria-controls={`panel${course.id}-content`}
            id={`panel${course.id}-header`}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>Title: {course.title}</div>

                <div>Description: {course.description}</div>

                <div>Category: {course.category}</div>
              </div>

              <div>
                <Button
                  color="warning"
                  variant="contained"
                  href={`/admin/update-course/${course.id}`}
                >
                  Update
                </Button>

                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>{'sections'}</AccordionDetails>
        </Accordion>
      ))}
    </Layout>
  );
};

export default AdminCourses;
