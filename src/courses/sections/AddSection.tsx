import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from 'src/services/BackendService';

const AddSection = () => {
  const { courseId } = useParams();
  const [name, setName] = useState('');
  const [order, setOrder] = useState(1);
  const [maxOrder, setMaxOrder] = useState(0); // Keep track of the maximum order
  // const navigate = useNavigate();

  // Fetch the maximum order when the component mounts
  useEffect(() => {
    fetch(`http://localhost:8080/sections/course/${courseId}/max-order`)
      .then((response) => response.json())
      .then((data) => setMaxOrder(data.maxOrder || 0))
      .catch((error) => console.error('Error fetching max order:', error));
  }, [courseId]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (order <= maxOrder) {
      toast.error('Order must be greater than the current maximum order.');
      return;
    }
    fetch(`http://localhost:8080/sections/course/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        name: name,
        sectionOrder: order,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Section added successfully.');
          setName(''); // Clear name field after successful addition
          setOrder(maxOrder + 1); // Increment order by 1
          setMaxOrder(maxOrder + 1); // Update maxOrder
        } else {
          return response.json().then((data) => {
            throw new Error(data.error || 'Error while adding section.');
          });
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Error while adding section. Please try again.');
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
      <h1>Add Section</h1>
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
          value={name}
          label="Name"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          type="number"
          value={order}
          label="Order"
          name="order"
          onChange={(event) => setOrder(parseInt(event.target.value))}
          inputProps={{ min: 1 }}
        />

        <Button variant="outlined" type="submit">
          Add Section
        </Button>
      </form>
    </div>
  );
};

export default AddSection;
