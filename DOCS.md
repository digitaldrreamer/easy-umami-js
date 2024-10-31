# UmamiClient Class Documentation

## Overview

The `UmamiClient` class provides an interface for interacting with the Umami API, enabling features such as user authentication, session tracking, website data management, and event handling. This client is primarily designed to support analytics tracking by managing and querying session details, statistics, and user interactions. 

---

## Class: `UmamiClient`

### Constructor

#### `new UmamiClient(config)`

Creates a new `UmamiClient` instance.

- **Parameters**
  - `config` (Object): Configuration options.
    - `baseUrl` (string): The base URL for the Umami API.
    - `username` (string): The Umami username.
    - `password` (string): The Umami password.

### Private Methods

#### `#makeAuthenticatedRequest(endpoint, options)`

Sends an authenticated request to the specified API endpoint.

- **Parameters**
  - `endpoint` (string): API endpoint.
  - `options` (Object): Options for the `fetch` request.
- **Returns**: `Promise<any>` - Returns the response from the API as JSON.

#### `#ensureValidToken()`

Ensures a valid authentication token is available by checking its expiration and obtaining a new one if necessary.

#### `#formatQueryParams(params)`

Formats the query parameters for URL encoding.

- **Parameters**
  - `params` (Object): Query parameters.
- **Returns**: `string` - Formatted query string.

---

### Public Methods

#### `authenticate()`

Authenticates with the Umami API and retrieves an authentication token.

- **Returns**: `Promise<GetTokenResponse>` - Authentication response containing the token and user information.
- **Throws**: `Error` - If authentication fails.

#### `verifyToken()`

Verifies the validity of the current authentication token.

- **Returns**: `Promise<User>` - User information if the token is valid.

#### `getSessions(websiteId, params)`

Retrieves website session details within a specified time range.

- **Parameters**
  - `websiteId` (string): Unique identifier of the website.
  - `params` (Object): Query parameters.
    - `startAt` (number): Start timestamp in milliseconds.
    - `endAt` (number): End timestamp in milliseconds.
    - `query` (string, optional): Search text.
    - `page` (number, optional, default=1): Page number.
    - `pageSize` (number, optional): Number of results per page.
    - `orderBy` (string, optional): Column name to sort by.
- **Returns**: `Promise<{ data: Session[], count: number, page: number, pageSize: number }>` - Session data and pagination details.

#### `getSessionStats(websiteId, params)`

Retrieves summarized session statistics.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Query parameters for filtering session stats.
- **Returns**: `Promise<SessionStats>` - Summary of session statistics.

#### `getSession(websiteId, sessionId)`

Retrieves details of an individual session.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `sessionId` (string): Session identifier.
- **Returns**: `Promise<Session>` - Session details.

#### `getSessionActivity(websiteId, sessionId, params)`

Retrieves activity logs for a specified session.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `sessionId` (string): Session identifier.
  - `params` (Object): Query parameters.
- **Returns**: `Promise<SessionActivity[]>` - Array of session activity details.

#### `getSessionProperties(websiteId, sessionId)`

Retrieves session properties for a specified session.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `sessionId` (string): Session identifier.
- **Returns**: `Promise<SessionProperty[]>` - Array of session properties.

#### `getSessionDataProperties(websiteId, params)`

Retrieves counts of session data properties by property name.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Query parameters.
- **Returns**: `Promise<PropertyCount[]>` - Array of property count data.

#### `getSessionDataValues(websiteId, params)`

Retrieves counts for session data values for a specified property.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Query parameters.
- **Returns**: `Promise<PropertyValue[]>` - Array of property value data.

#### `getWebsites(params)`

Retrieves a list of tracked websites.

- **Parameters**
  - `params` (Object, optional): Query parameters for pagination and filtering.
- **Returns**: `Promise<Array>` - Array of websites.

#### `createWebsite(params)`

Creates a new website in Umami.

- **Parameters**
  - `params` (Object): Website parameters.
- **Returns**: `Promise<Object>` - Created website details.

#### `getWebsite(websiteId)`

Retrieves details of a specified website by ID.

- **Parameters**
  - `websiteId` (string): Website identifier.
- **Returns**: `Promise<Object>` - Website details.

#### `updateWebsite(websiteId, params)`

Updates information of a specified website.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Update parameters.
- **Returns**: `Promise<Object>` - Updated website details.

#### `deleteWebsite(websiteId)`

Deletes a specified website by ID.

- **Parameters**
  - `websiteId` (string): Website identifier.
- **Returns**: `Promise<string>` - Confirmation message.

#### `resetWebsite(websiteId)`

Resets data for a specified website.

- **Parameters**
  - `websiteId` (string): Website identifier.
- **Returns**: `Promise<string>` - Confirmation message.

#### `getActiveUsers(websiteId)`

Retrieves the count of active users for a specified website.

- **Parameters**
  - `websiteId` (string): Website identifier.
- **Returns**: `Promise<Object>` - Active users count.

#### `getEventsSeries(websiteId, params)`

Retrieves events within a specified time range.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Query parameters.
- **Returns**: `Promise<Array>` - Array of event series data.

#### `getPageviews(websiteId, params)`

Retrieves pageviews within a specified time range.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Query parameters.
- **Returns**: `Promise<Object>` - Pageview data.

#### `getMetrics(websiteId, params)`

Retrieves metrics data within a specified time range.

- **Parameters**
  - `websiteId` (string): Website identifier.
  - `params` (Object): Query parameters.
- **Returns**: `Promise<Array>` - Metrics data.

#### `sendEvent(payload)`

Sends an event to the Umami API.

- **Parameters**
  - `payload` (EventPayload): Event data payload.
- **Returns**: `Promise<void>` - Confirmation of successful event dispatch.

---

### Typedefs

#### `User`
Represents a user of the Umami system.

#### `GetTokenResponse`
Response from the authentication process.

#### `EventPayload`
Event data payload sent to Umami.

#### `Session`
Detailed session data for a website visit.

#### `SessionStats`
Aggregated statistics for a session range.

#### `SessionActivity`
Represents individual activities in a session.

#### `SessionProperty`
Represents metadata for a session.

#### `PropertyCount`
Represents the count of a particular property across sessions.

#### `PropertyValue`
Represents the total occurrences of a specific property value.

---
