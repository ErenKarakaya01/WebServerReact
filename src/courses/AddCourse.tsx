import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken, getId } from 'src/services/BackendService';

interface Course {
  title: string;
  description: string;
}

export function AddCourse() {
  const { adminId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8080/courses', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        authors: [parseInt(adminId!)],
        sections: [],
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          navigate('/admin/courses');
          toast.success('Course created successfully.');
        } else {
          toast.error('Error while creating course. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Error while creating course. Please try again.');
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
          Create
        </Button>
      </form>
    </div>
  );
}

export default AddCourse;
