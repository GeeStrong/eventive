import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import {
  formatDisplayDate,
  formatDisplayTime,
  isUpcoming,
} from "../utils/dateHelpers";

/* Displays a single event with its details and edit/delete actions. */
function EventCard({ event, onDelete }) {
  function handleDelete() {
    if (window.confirm(`Remove "${event.name}" from your agenda?`)) {
      onDelete(event.id);
    }
  }

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{event.name}</Card.Title>
          {!isUpcoming(event) && <Badge bg="secondary">Past</Badge>}
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          {formatDisplayDate(event.date)} · {formatDisplayTime(event.time)}
        </Card.Subtitle>
        {event.location && (
          <Card.Text className="mb-1">📍 {event.location}</Card.Text>
        )}
        {event.description && (
          <Card.Text className="text-muted">{event.description}</Card.Text>
        )}
        <div className="mt-auto d-flex gap-2 pt-2">
          <Button
            as={Link}
            to={`/edit-event/${event.id}`}
            variant="outline-primary"
            size="sm"
          >
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
