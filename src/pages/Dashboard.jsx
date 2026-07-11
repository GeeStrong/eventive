import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";
import { useApp } from "../context/AppContext";
import EventCard from "../components/EventCard";
import { sortByDateTime } from "../utils/dateHelpers";

/* Dashboard page: lists the signed-in user's events, sorted by date. */
function Dashboard() {
  const { currentUser, events, deleteEvent } = useApp();
  const sortedEvents = sortByDateTime(events);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="h3 mb-0">Welcome, {currentUser.name}</h1>
        <Button as={Link} to="/add-event" variant="primary">
          + Add event
        </Button>
      </div>

      {sortedEvents.length === 0 ? (
        <p className="text-muted">
          You don't have any events yet. Select "Add event" to create one.
        </p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {sortedEvents.map((event) => (
            <Col key={event.id}>
              <EventCard event={event} onDelete={deleteEvent} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
