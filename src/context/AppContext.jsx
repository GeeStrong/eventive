import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const USERS_KEY = "agenda_users";
const SESSION_KEY = "agenda_session";
const EVENTS_KEY = "agenda_events";

/**
 * Reads a JSON value from localStorage, falling back to a default.
 * @param {string} key The storage key.
 * @param {*} fallback The value to return if nothing is stored.
 * @returns {*} The parsed value, or the fallback.
 */
function readStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

/**
 * Provides all shared app state (the signed-in user and their events)
 * to the rest of the app through the Context API. Everything is kept
 * in sync with localStorage so data survives a page refresh.
 */
export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, []));
  const [events, setEvents] = useState(() => readStorage(EVENTS_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => {
    const username = localStorage.getItem(SESSION_KEY);
    const storedUsers = readStorage(USERS_KEY, []);
    return storedUsers.find((user) => user.username === username) || null;
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }, [events]);

  /**
   * Registers a new account and signs the user in.
   * @param {{name: string, email: string, username: string, password: string}} details
   * @returns {{success: boolean, error?: string}} The outcome.
   */
  function register({ name, email, username, password }) {
    const usernameTaken = users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
    if (usernameTaken) {
      return { success: false, error: "That username is already taken." };
    }

    const newUser = { name, email, username, password };
    setUsers((previous) => [...previous, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem(SESSION_KEY, username);
    return { success: true };
  }

  /**
   * Signs a user in with a username and password.
   * @param {{username: string, password: string}} credentials
   * @returns {{success: boolean, error?: string}} The outcome.
   */
  function login({ username, password }) {
    const match = users.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password,
    );
    if (!match) {
      return { success: false, error: "Incorrect username or password." };
    }
    setCurrentUser(match);
    localStorage.setItem(SESSION_KEY, match.username);
    return { success: true };
  }

  /** Signs the current user out. */
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  /**
   * Adds a new event for the signed-in user.
   * @param {{name: string, date: string, time: string, location: string, description: string}} details
   */
  function addEvent(details) {
    const newEvent = {
      id: Date.now().toString(),
      owner: currentUser.username,
      ...details,
    };
    setEvents((previous) => [...previous, newEvent]);
  }

  /**
   * Updates an existing event.
   * @param {string} id The id of the event to update.
   * @param {Object} updates The fields to change.
   */
  function updateEvent(id, updates) {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id ? { ...event, ...updates } : event,
      ),
    );
  }

  /**
   * Removes an event.
   * @param {string} id The id of the event to remove.
   */
  function deleteEvent(id) {
    setEvents((previous) => previous.filter((event) => event.id !== id));
  }

  const myEvents = currentUser
    ? events.filter((event) => event.owner === currentUser.username)
    : [];

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    register,
    login,
    logout,
    events: myEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook for consuming the shared AppContext.
 * @returns {Object} The current context value.
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
