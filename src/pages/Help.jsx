import { Accordion, Container } from "react-bootstrap";

const TOPICS = [
  {
    title: "Getting around",
    body: "Use the header at the top of the screen—which is always visible—to easily navigate to your Dashboard, add new events, view this Help page, or sign out.",
  },
  {
    title: "Creating an account",
    body: 'To create your account, click "Sign up" and enter your name, email, username, and password. Please ensure you provide a valid email address, as all fields are mandatory.',
  },
  {
    title: "Logging in",
    body: "Access your account by entering your username and password. This device will remember your sign-in until you log out.",
  },
  {
    title: "Adding an event",
    body: 'Click "Add Event," then enter the required event name, date, and time. You can also optionally include a location and description.',
  },
  {
    title: "Editing or deleting an event",
    body: ' Manage your events from the dashboard by choosing "Edit" to update information or "Delete" to permanently remove an item (a confirmation prompt will appear first).',
  },
  {
    title: "Tips for staying organised",
    body: "Use clear, specific event names, always add a location when you can, and delete events you no longer need to keep your dashboard tidy.",
  },
];

/* Help page: an accordion of guidance topics. */
function Help() {
  return (
    <Container className="py-4">
      <h1 className="h3 mb-3">Help</h1>
      <Accordion defaultActiveKey="0" alwaysOpen={false}>
        {TOPICS.map((topic, index) => (
          <Accordion.Item eventKey={String(index)} key={topic.title}>
            <Accordion.Header>{topic.title}</Accordion.Header>
            <Accordion.Body>{topic.body}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default Help;
