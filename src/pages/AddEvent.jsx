import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import EventForm from "../components/EventForm";

/* Page for creating a new event. */
function AddEvent() {
  const { addEvent } = useApp();
  const navigate = useNavigate();

  function handleSubmit(values) {
    addEvent(values);
    navigate("/dashboard");
  }

  return (
    <Container className="py-4">
      <Card className="mx-auto" style={{ maxWidth: "32rem" }}>
        <Card.Body className="p-4">
          <h1 className="h3 mb-3">Add event</h1>
          <EventForm onSubmit={handleSubmit} submitLabel="Add event" />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddEvent;
