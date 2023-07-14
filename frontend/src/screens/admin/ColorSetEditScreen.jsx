import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import {
    useGetColorSetsQuery,
    useUpdateColorSetMutation,
} from '../../slices/colorSetsApiSlice';

const ColorSetEditScreen = () => {
  const { id: userId } = useParams();
  const { id: colorSetId } = useParams();

  const [name, setName] = useState('');
  const [colors, setColors] = useState([]);

  const {
    data: colorset,
    isLoading,
    refetch,
    error,
  } = useGetColorSetsQuery(colorSetId);

  const [updateColorSet, { isLoading: loadingUpdate }] =
    useUpdateColorSetMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check that every color has all the necessary properties
    for (const color of colors) {
      if (!color.name || !color.rgb.r || !color.rgb.g || !color.rgb.b) {
        toast.error('All colors must have a name and RGB values.');
        return;
      }
    }

    const colorSetData = {
      id: colorSetId,
      name,
      colors,
    };
    console.log('Sending data:', colorSetData);
    try {
      await updateColorSet(colorSetData);
      toast.success('ColourSet updated');
      refetch();
      navigate('/admin/colorsetsList');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addColorHandler = () => {
    setColors([...colors, { name: '', rgb: { r: '', g: '', b: '' } }]);
  };

  const deleteColorHandler = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (colorset && colorset.colors) {
      setName(colorset.name);
      setColors(colorset.colors);
    }
  }, [colorset]);

  return (
    <>
      <Link to='/admin/colorsetsList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit ColourSets</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>RED</th>
                  <th>GREEN</th>
                  <th>BLUE</th>
                  <th>COLOR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type='text'
                        placeholder='Enter color name'
                        value={color.name}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].name = e.target.value;
                          setColors(newColors);
                        }}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        placeholder='Enter red value'
                        value={color.rgb.r}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].rgb.r = Number(e.target.value);
                          setColors(newColors);
                        }}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        placeholder='Enter green value'
                        value={color.rgb.g}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].rgb.g = Number(e.target.value);
                          setColors(newColors);
                        }}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        placeholder='Enter blue value'
                        value={color.rgb.b}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].rgb.b = Number(e.target.value);
                          setColors(newColors);
                        }}
                      ></Form.Control>
                    </td>
                    <td style={{backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}}></td>
                    <td>
                      <Button variant='danger' onClick={() => deleteColorHandler(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button variant='primary' onClick={addColorHandler} style={{ marginTop: '1rem' }}>
              Add Color
            </Button>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ColorSetEditScreen;
