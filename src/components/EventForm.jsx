import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const EMPTY_EVENT = {
  name: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

/* Shared form for creating and editing an event. */
function EventForm({ initialValues = {}, onSubmit, submitLabel }) {
  const [form, setForm] = useState({ ...EMPTY_EVENT, ...initialValues });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Give the event a name.";
    if (!form.date) nextErrors.date = "Choose a date.";
    if (!form.time) nextErrors.time = "Choose a time.";
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(form);
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="eventName">
        <Form.Label>Event name</Form.Label>
        <Form.Control
          name="name"
          value={form.name}
          onChange={handleChange}
          isInvalid={Boolean(errors.name)}
          placeholder="Design review with the team"
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          isInvalid={Boolean(errors.date)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.date}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventTime">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          isInvalid={Boolean(errors.time)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.time}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Conference room, park, or a video call link"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="eventDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional notes about this event"
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        {submitLabel}
      </Button>
    </Form>
  );
}

export default EventForm;
