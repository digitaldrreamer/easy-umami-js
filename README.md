# UmamiClient 
> Note: For self-hosted instances only. Use the [Official Umami API Client](https://github.com/umami-software/api-client/) for umami cloud.

> Generated with ChatGPT. Forgive any mistakes.

The `UmamiClient` is a JavaScript (JsDoc) class for interacting with the [Umami Analytics API](https://umami.is/docs/api), providing easy access to user authentication, session management, analytics data, and event tracking. This client helps streamline fetching statistics, sessions, and events from Umami for use in applications or reporting. The class itself is found in the `umami.js` file.

This is not a library. It's just a simple class. I made this for a project after I felt the @umami/api-client's documentation was not clear enough, and it didn't seem to be updated, so I was unable to use it. Don't get me wrong. Umami is an incredible (and free!) tool, but I found its JavaScript client didn’t meet all my needs

The `UmamiClient` class has several well-designed features that enhance usability and reliability for interacting with the Umami API. Here are some key aspects:

### 1. **Automatic Authentication and Token Management**
   - The `UmamiClient` handles authentication seamlessly with `authenticate()` and `#ensureValidToken()` methods. Once authenticated, the client maintains the token and automatically refreshes it if expired.
   - The private method `#ensureValidToken()` checks token validity before each request, so users don’t need to manually manage token expiration.

### 2. **Private Helper Methods for Consistency**
   - Private methods like `#makeAuthenticatedRequest()` and `#formatQueryParams()` abstract common tasks, including:
     - Making authenticated API requests.
     - Handling token injection into headers.
     - Formatting query parameters for cleaner URL construction.
   - This ensures that all requests are consistent in structure, headers, and error handling, making the client robust.

### 3. **Modular API Request Handling**
   - `UmamiClient` includes several modular methods to cover most Umami API endpoints, organized by functionality. For example:
     - **Authentication** methods: `authenticate()` and `verifyToken()`.
     - **Session** management and tracking: `getSessions()`, `getSession()`, `getSessionActivity()`, and more.
     - **Website management**: `getWebsites()`, `createWebsite()`, `getWebsite()`, etc.
   - Each of these methods directly maps to a specific API endpoint, making it easy to understand and use the client for specific tasks.

### 4. **Flexible Query Parameter Support**
   - The `#formatQueryParams()` function allows users to pass a wide range of query parameters, which the client handles flexibly by omitting undefined values.
   - This design enables precise control over filtering, pagination, and sorting of data without the need to manually format query strings.

### 5. **Error Handling with Detailed Feedback**
   - The client includes error handling in its requests, especially in `#makeAuthenticatedRequest()` and `authenticate()`, where it checks for successful responses and throws descriptive errors if requests fail.
   - This helps in debugging and provides clear feedback on request issues, such as authentication failures or network issues.

### 6. **Compatibility with Frontend Usage**
   - The `sendEvent()` method includes specific frontend adjustments, like automatically detecting `navigator.language`, `document.referrer`, and `window.location`, making it ideal for single-page application (SPA) tracking and event logging in web environments.
   - This method is specifically tailored for frontend use, allowing easy tracking of events without requiring separate manual configuration for each tracked property.

### 7. **Organized Response Handling for Common Use Cases (Typed with JsDoc)**
   - The methods are designed to return specific data structures (e.g., `Session`, `SessionStats`, `PropertyCount`) or pagination information when necessary, ensuring the response formats are predictable and easy to work with.
   - This structure lets users directly access data relevant to common analytics and tracking operations without excessive processing of raw data.


## Table of Contents
- [Getting Started](#getting-started)
- [Methods Overview](#methods-overview)
  - [Authentication](#authentication)
  - [Sessions](#sessions)
  - [Website Management](#website-management)
  - [Event Tracking](#event-tracking)
- [Examples](#examples)
- [Method Reference](#method-reference)

---

## Getting Started

### Installation
Install `UmamiClient` by copying the class into your codebase or adding it as a module.

### Basic Setup
To start using the `UmamiClient`, create a new instance with your `baseUrl`, `username`, and `password`.

- Your baseUrl is `<yourUmamiInstanceUrl>/api`.
- Your username is the default (super)admin username (you first created)
- Your username is the default (super)admin password (you first created)

```javascript
import UmamiClient from './UmamiClient.js';

const client = new UmamiClient({
  baseUrl: 'https://your-umami-api.com/api',
  username: 'your-username',
  password: 'your-password'
});
```

---

## Methods Overview

### Authentication

- **[`authenticate()`](#authenticate)** - Logs in and retrieves an authentication token.
- **[`verifyToken()`](#verifytoken)** - Verifies if the current token is still valid.

### Sessions

- **[`getSessions()`](#getsessions)** - Retrieves session details within a specified time range.
- **[`getSession()`](#getsession)** - Retrieves details for an individual session.
- **[`getSessionStats()`](#getsessionstats)** - Gets summary statistics of sessions for a website.
- **[`getSessionActivity()`](#getsessionactivity)** - Gets activity details for a session.

### Website Management

- **[`getWebsites()`](#getwebsites)** - Lists tracked websites.
- **[`createWebsite()`](#createwebsite)** - Creates a new website for tracking.
- **[`getWebsite()`](#getwebsite)** - Gets website details by ID.
- **[`updateWebsite()`](#updatewebsite)** - Updates website details.
- **[`deleteWebsite()`](#deletewebsite)** - Deletes a website from Umami.
- **[`resetWebsite()`](#resetwebsite)** - Clears all data for a website.

### Event Tracking

- **[`getEventsSeries()`](#geteventsseries)** - Retrieves event series data.
- **[`sendEvent()`](#sendevent)** - Sends a new event to Umami.

---

## Examples

### Example: Authenticate and Fetch Sessions

```javascript
async function authenticateAndFetchSessions() {
  await client.authenticate();

  const sessions = await client.getSessions('website-id', {
    startAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
    endAt: Date.now(),
    page: 1,
    pageSize: 10
  });

  console.log(sessions);
}
```

### Example: Send a Custom Event

```javascript
client.sendEvent({
  hostname: 'example.com',
  language: 'en-US',
  referrer: 'https://referrer.com',
  screen: '1920x1080',
  title: 'Homepage',
  url: 'https://example.com',
  website: 'website-id',
  name: 'pageview',
  data: { customKey: 'customValue' }
});
```

---

## Method Reference

### Authentication

#### `authenticate()`

Authenticates the client with the Umami API. Stores the token internally for future requests.

```javascript
await client.authenticate();
```

#### `verifyToken()`

Verifies the current authentication token and returns user information.

```javascript
const user = await client.verifyToken();
console.log(user); // { id: '...', username: '...', role: '...', ... }
```

### Sessions

#### `getSessions(websiteId, params)`

Retrieves website session data within a specified date range.

- **Parameters**
  - `websiteId` (string): ID of the website.
  - `params` (Object): Query parameters, e.g., `{ startAt: 1622527200000, endAt: 1625136000000 }`
- **Returns**: Session data and pagination info.

```javascript
const sessions = await client.getSessions('website-id', {
  startAt: 1622527200000, // June 1, 2021
  endAt: 1625136000000    // June 30, 2021
});
console.log(sessions);
```

#### `getSession(websiteId, sessionId)`

Retrieves details for an individual session by its ID.

```javascript
const session = await client.getSession('website-id', 'session-id');
console.log(session); // { id: '...', hostname: '...', browser: '...', ... }
```

#### `getSessionStats(websiteId, params)`

Gets summarized session statistics for a website.

- **Parameters**
  - `websiteId` (string): ID of the website.
  - `params` (Object): Query parameters.
- **Returns**: An object containing session statistics.

```javascript
const stats = await client.getSessionStats('website-id', {
  startAt: Date.now() - 24 * 60 * 60 * 1000, // Last 24 hours
  endAt: Date.now()
});
console.log(stats); // { pageviews: { value: 120 }, visitors: { value: 45 }, ... }
```

#### `getSessionActivity(websiteId, sessionId, params)`

Retrieves activity details for a given session.

```javascript
const activity = await client.getSessionActivity('website-id', 'session-id', {
  startAt: Date.now() - 24 * 60 * 60 * 1000,
  endAt: Date.now()
});
console.log(activity);
```

### Website Management

#### `getWebsites(params)`

Lists websites tracked by Umami.

```javascript
const websites = await client.getWebsites({ page: 1, pageSize: 10 });
console.log(websites); // [{ id: '...', name: '...', domain: '...' }, ...]
```

#### `createWebsite(params)`

Creates a new website.

```javascript
const newWebsite = await client.createWebsite({
  name: 'My New Website',
  domain: 'newwebsite.com'
});
console.log(newWebsite);
```

#### `getWebsite(websiteId)`

Retrieves details for a website by its ID.

```javascript
const website = await client.getWebsite('website-id');
console.log(website); // { id: '...', name: '...', domain: '...' }
```

#### `updateWebsite(websiteId, params)`

Updates website information.

```javascript
const updatedWebsite = await client.updateWebsite('website-id', { name: 'Updated Website Name' });
console.log(updatedWebsite);
```

#### `deleteWebsite(websiteId)`

Deletes a website by ID.

```javascript
const response = await client.deleteWebsite('website-id');
console.log(response); // Confirmation message
```

#### `resetWebsite(websiteId)`

Resets data for a website.

```javascript
const response = await client.resetWebsite('website-id');
console.log(response); // Confirmation message
```

### Event Tracking

#### `getEventsSeries(websiteId, params)`

Retrieves events within a time range.

```javascript
const events = await client.getEventsSeries('website-id', {
  startAt: Date.now() - 24 * 60 * 60 * 1000,
  endAt: Date.now(),
  unit: 'hour',
  timezone: 'America/Los_Angeles'
});
console.log(events); // [{ time: ..., value: ... }, ...]
```

#### `sendEvent(payload)`

Sends a custom event to Umami.

```javascript
await client.sendEvent({
  hostname: 'example.com',
  language: 'en-US',
  referrer: 'https://referrer.com',
  screen: '1920x1080',
  title: 'Homepage',
  url: 'https://example.com',
  website: 'website-id',
  name: 'pageview',
  data: { customKey: 'customValue' }
});
```

---

For further details on available query parameters, see the full API documentation at [Umami Analytics](https://umami.is/docs/api). The class itself is found in the `umami.js` file.