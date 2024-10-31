# UmamiClient 
> Note: For self-hosted instances only.  For Umami Cloud, consider using the official [Umami API Client](https://github.com/umami-software/api-client/).

> Documentation generated with the assistance of ChatGPT. Please report any inaccuracies.

The `UmamiClient` is a JavaScript class designed to simplify interaction with the [Umami Analytics API](https://umami.is/docs/api). It provides methods for user authentication, website management, session analysis, event tracking, and data retrieval. This client streamlines the process of fetching statistics, sessions, and events from a self-hosted Umami instance for use in applications or reporting dashboards.  The class definition resides in the `umami.js` file.

This is not a published library; it's a standalone class intended for direct integration into projects. It was developed to address specific needs and provide clearer documentation compared to the existing `@umami/api-client`.

## Key Features of UmamiClient

### 1. Automatic Authentication and Token Management

- `authenticate()` initiates the login process and retrieves an authentication token.
- `#ensureValidToken()` (private method) automatically checks token validity before each API request and refreshes it if expired, eliminating manual token management.

### 2. Private Helper Methods for Code Consistency

- Private methods like `#makeAuthenticatedRequest()` and `#formatQueryParams()` handle common tasks:
    - Making authenticated requests.
    - Injecting authorization tokens into headers.
    - Formatting query parameters for clean URL construction.
- This abstraction ensures consistent request structure, headers, and error handling for improved robustness.

### 3. Modular API Endpoint Coverage

- `UmamiClient` provides methods for various Umami API endpoints, grouped by functionality:
    - **Authentication:** `authenticate()`, `verifyToken()`
    - **User Management:** `createUser()`, `getUsers()`, `getUser()`, `updateUser()`, `deleteUser()`, `getUserWebsites()`, `getUserTeams()`
    - **Team Management:** `createTeam()`, `getTeams()`, `joinTeam()`, `getTeam()`, `updateTeam()`, `deleteTeam()`, `getTeamUsers()`, `addUserToTeam()`, `getTeamUser()`, `updateTeamUserRole()`, `removeUserFromTeam()`, `getTeamWebsites()`
    - **Website Management:** `getWebsites()`, `createWebsite()`, `getWebsite()`, `updateWebsite()`, `deleteWebsite()`, `resetWebsite()`
    - **Session Analysis:** `getSessions()`, `getSessionStats()`, `getSession()`, `getSessionActivity()`, `getSessionProperties()`, `getSessionDataProperties()`, `getSessionDataValues()`
    - **Event Tracking:** `getEventsSeries()`, `getWebsiteEvents()`, `getWebsiteStats()`, `getEventDataEvents()`, `getEventDataFields()`, `getEventDataValues()`, `getEventDataStats()`, `getPageviews()`, `getMetrics()`, `sendEvent()` , `getActiveUsers()`
- This modularity simplifies using the client for specific tasks.


### 4. Flexible Query Parameter Handling

- `#formatQueryParams()` handles a wide range of query parameters, omitting undefined values for flexibility.
- This allows precise control over filtering, pagination, and sorting without manual query string formatting.

### 5. Robust Error Handling

- `#makeAuthenticatedRequest()` and `authenticate()` include error handling, throwing descriptive errors for authentication failures or network issues to aid debugging.

### 6. Frontend Compatibility

- `sendEvent()` automatically detects frontend context (e.g., `navigator.language`, `document.referrer`) for seamless event tracking in web applications.

### 7. Typed Responses with JSDoc

- Methods return specific data structures (e.g., `Session`, `SessionStats`, `PropertyCount`) or pagination information for predictable and easy-to-use responses.  These types are documented using JSDoc typedefs.

## Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [User Management](#user-management)
- [Team Management](#team-management)
- [Website Management](#website-management)
- [Session Analysis](#session-analysis)
- [Event Tracking and Data Retrieval](#event-tracking-and-data-retrieval)
- [Examples](#examples)
- [Type Definitions](#type-definitions)


## Getting Started

### Installation

Copy the `UmamiClient` class from `umami.js` into your project or include it as a module.

### Basic Setup

```javascript
import UmamiClient from './umami.js'; // Path to your umami.js file

const client = new UmamiClient({
  baseUrl: 'https://your-umami-instance.com', // Your Umami instance URL (no trailing slash)
  username: 'your-username',  // superadmin username
  password: 'your-password'   // superadmin password
});
```

## Authentication

- **`authenticate()`**:  Authenticates with the Umami API and stores the token.
- **`verifyToken()`**: Verifies the current token and returns user information.


## User Management

- **`createUser(params)`**: Creates a new user.  Requires admin privileges.
- **`getUsers()`**: Retrieves all users. Requires admin privileges.
- **`getUser(userId)`**: Retrieves a specific user by ID.
- **`updateUser(userId, params)`**: Updates a user's information.
- **`deleteUser(userId)`**: Deletes a user by ID.  Requires admin privileges.
- **`getUserWebsites(userId, params)`**: Retrieves websites associated with a user.
- **`getUserTeams(userId, params)`**: Retrieves teams associated with a user.


## Team Management

- **`createTeam(params)`**: Creates a new team.
- **`getTeams(params)`**: Retrieves all teams.
- **`joinTeam(params)`**: Joins a team using an access code.
- **`getTeam(teamId)`**: Retrieves a specific team by ID.
- **`updateTeam(teamId, params)`**: Updates a team's information.
- **`deleteTeam(teamId)`**: Deletes a team by ID.
- **`getTeamUsers(teamId, params)`**: Retrieves users belonging to a team.
- **`addUserToTeam(teamId, params)`**: Adds a user to a team.
- **`getTeamUser(teamId, userId)`**: Retrieves details of a user within a team.
- **`updateTeamUserRole(teamId, userId, params)`**: Updates a user's role within a team.
- **`removeUserFromTeam(teamId, userId)`**: Removes a user from a team.
- **`getTeamWebsites(teamId, params)`**: Retrieves websites associated with a team.

## Website Management

- **`getWebsites(params)`**: Retrieves all websites.
- **`createWebsite(params)`**: Creates a new website.
- **`getWebsite(websiteId)`**: Retrieves a specific website by ID.
- **`updateWebsite(websiteId, params)`**: Updates website information.
- **`deleteWebsite(websiteId)`**: Deletes a website by ID.
- **`resetWebsite(websiteId)`**: Resets all data for a website.


## Session Analysis

- **`getSessions(websiteId, params)`**: Retrieves sessions for a website within a time range.
- **`getSessionStats(websiteId, params)`**: Retrieves summarized session statistics for a website.
- **`getSession(websiteId, sessionId)`**: Retrieves a specific session by ID.
- **`getSessionActivity(websiteId, sessionId, params)`**: Retrieves activity details for a session.
- **`getSessionProperties(websiteId, sessionId)`**: Retrieves properties associated with a session.
- **`getSessionDataProperties(websiteId, params)`**: Retrieves session data counts by property name.
- **`getSessionDataValues(websiteId, params)`**: Retrieves session data counts for a given property.


## Event Tracking and Data Retrieval

- **`getActiveUsers(websiteId)`**:  Gets the number of active users on a website.
- **`getEventsSeries(websiteId, params)`**: Retrieves event series data for a website.
- **`getWebsiteEvents(websiteId, params)`**: Retrieves detailed event data for a website.
- **`getWebsiteStats(websiteId, params)`**: Retrieves summarized website statistics.
- **`getEventDataEvents(websiteId, params)`**: Retrieves event data summaries (names, properties, counts).
- **`getEventDataFields(websiteId, params)`**: Retrieves event data property and value counts.
- **`getEventDataValues(websiteId, params)`**: Retrieves event data counts for a specific event and property.
- **`getEventDataStats(websiteId, params)`**: Retrieves summarized event data (events, fields, records).
- **`getPageviews(websiteId, params)`**: Retrieves pageview data for a website.
- **`getMetrics(websiteId, params)`**: Retrieves various website metrics (e.g., URLs, referrers, browsers).
- **`sendEvent(payload)`**: Sends a custom event to Umami.


## Examples

### Authentication and Session Retrieval

```javascript
async function getSessions() {
  try {
    const authResponse = await client.authenticate();
    console.log("Authentication successful:", authResponse);

    const sessions = await client.getSessions('your-website-id', {
      startAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
      endAt: Date.now()
    });
    console.log("Sessions:", sessions);
  } catch (error) {
    console.error("Error:", error);
  }
}

getSessions();
```

### Sending a Custom Event

```javascript
client.sendEvent({
  website: 'your-website-id',
  name: 'product_view',
  data: { product_id: '12345' }
});
```


## Type Definitions

Refer to the JSDoc typedefs within the `umami.js` file for detailed information on the structure of objects like `User`, `GetTokenResponse`, `EventPayload`, `Session`, `SessionStats`, `SessionActivity`, `SessionProperty`, `PropertyCount`, and `PropertyValue`.  These definitions provide clear documentation of the expected data structures for requests and responses. There's an documentation generated with jsdoc2m [here](./DOCS.md)


---

For complete API details and query parameter options, refer to the official [Umami Analytics API Documentation](https://umami.is/docs/api).