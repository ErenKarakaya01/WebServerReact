import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken, getId } from 'src/services/BackendService';

export function UpdateCourse() {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/${courseId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        toast.error('Error while fetching course.');
      })
      .then((data) => {
        console.log(data);
        if (data !== undefined) {
          setTitle(data.title);
          setDescription(data.description);
          setSections(data.sections);

          console.log(data.title);
          console.log(data.description);
          console.log(data.sections);
        }
      });
  }, [courseId]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`http://localhost:8080/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        authors: [parseInt(getId()!)],
        sections: sections,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          navigate('/admin/courses');
          toast.success('Course updated successfully.');
        } else {
          toast.error('Error while updating course. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Error while updating course. Please try again.');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <h1>Create</h1>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: '20vh',
        }}
      >
        <TextField
          value={title}
          label="Title"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />

        <TextField
          value={description}
          label="Description"
          name="description"
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button variant="outlined" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateCourse;
