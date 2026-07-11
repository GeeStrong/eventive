import { Card, Container } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router";
import { useApp } from "../context/AppContext";
import EventForm from "../components/EventForm";

/* Page for editing (or deleting) an existing event. */
function EditEvent() {
  const { eventId } = useParams();
  const { events, updateEvent, deleteEvent } = useApp();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(values) {
    updateEvent(eventId, values);
    navigate("/dashboard");
  }

  function handleDelete() {
    if (window.confirm(`Remove "${event.name}" from your agenda?`)) {
      deleteEvent(eventId);
      navigate("/dashboard");
    }
  }

  return (
    <Container className="py-4">
      <Card className="mx-auto" style={{ maxWidth: "32rem" }}>
        <Card.Body className="p-4">
          <h1 className="h3 mb-3">Edit event</h1>
          <EventForm
            initialValues={event}
            onSubmit={handleSubmit}
            submitLabel="Save changes"
          />
          <button
            type="button"
            className="btn btn-outline-danger w-100 mt-3"
            onClick={handleDelete}
          >
            Delete this event
          </button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditEvent;
