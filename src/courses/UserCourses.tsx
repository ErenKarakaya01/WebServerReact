import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  MenuItem,
  Select,
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

const UserCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/courses?category=`, {
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

  return (
    <Layout>
      <h1>Search By Category</h1>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Category"
        onChange={async (event) => {
          setCategory(event.target.value);

          fetch(
            `http://localhost:8080/courses?category=${event.target.value}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${getAuthToken()}` },
            }
          )
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
        }}
      >
        <MenuItem value={'Software'}>Software</MenuItem>
        <MenuItem value={'Language'}>Language</MenuItem>
        <MenuItem value={'Instrument'}>Instrument</MenuItem>
      </Select>

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
            </div>
          </AccordionSummary>
          <AccordionDetails>{'sections'}</AccordionDetails>
        </Accordion>
      ))}
    </Layout>
  );
};

export default UserCourses;
