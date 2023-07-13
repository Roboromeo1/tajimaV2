import React from 'react';
import { useGetColorSetsQuery } from '../../slices/colorSetsApiSlice';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ColorSetListScreen = () => {
  const { data: colorSets, isLoading, isError } = useGetColorSetsQuery();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching color sets.</div>;
  }

  return (
    <Container>
      <h1>Color Sets</h1>
      <Row>
        {colorSets.map(colorSet => (
          <Col sm={12} md={6} lg={4} xl={3} key={colorSet._id}>
            <Card className="my-3 p-3 rounded">
              <Card.Body>
                <Card.Title as="div">
                  <strong>{colorSet.name}</strong>
                </Card.Title>
                <Card.Text as="div">
                  <div className="my-3">
                    {colorSet.colors.map((color, index) => (
                      <p key={index}>Color {index+1}: {color}</p>
                    ))}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ColorSetListScreen;
