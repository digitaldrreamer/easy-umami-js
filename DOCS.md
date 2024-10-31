## Classes

<dl>
<dt><a href="#UmamiClient">UmamiClient</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#User">User</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GetTokenResponse">GetTokenResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EventPayload">EventPayload</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Session">Session</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SessionStats">SessionStats</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SessionActivity">SessionActivity</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SessionProperty">SessionProperty</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PropertyCount">PropertyCount</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PropertyValue">PropertyValue</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="UmamiClient"></a>

## UmamiClient
**Kind**: global class

* [UmamiClient](#UmamiClient)
    * [new UmamiClient(config)](#new_UmamiClient_new)
    * [.authenticate()](#UmamiClient+authenticate) ⇒ [<code>Promise.&lt;GetTokenResponse&gt;</code>](#GetTokenResponse)
    * [.verifyToken()](#UmamiClient+verifyToken) ⇒ [<code>Promise.&lt;User&gt;</code>](#User)
    * [.createUser(params)](#UmamiClient+createUser) ⇒ <code>Promise.&lt;{id: string, username: string, role: string, createdAt: string}&gt;</code>
    * [.getUsers()](#UmamiClient+getUsers) ⇒ <code>Promise.&lt;Array.&lt;{id: string, username: string, role: string, createdAt: string}&gt;&gt;</code>
    * [.getUser(userId)](#UmamiClient+getUser) ⇒ <code>Promise.&lt;{id: string, username: string, role: string}&gt;</code>
    * [.updateUser(userId, params)](#UmamiClient+updateUser) ⇒ <code>Promise.&lt;{id: string, username: string, role: string, createdAt: string}&gt;</code>
    * [.deleteUser(userId)](#UmamiClient+deleteUser) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getUserWebsites(userId, [params])](#UmamiClient+getUserWebsites) ⇒ <code>Promise.&lt;Array.&lt;{id: string, userId: string, domain: string, name: string, shareId: (string\|null), createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null), resetAt: (string\|null)}&gt;&gt;</code>
    * [.getUserTeams(userId, [params])](#UmamiClient+getUserTeams) ⇒ <code>Promise.&lt;Array.&lt;{id: string, name: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;&gt;</code>
    * [.createTeam(params)](#UmamiClient+createTeam) ⇒ <code>Promise.&lt;{accessCode: string, createdAt: string, id: string, name: string, updatedAt: (string\|null)}&gt;</code>
    * [.getTeams(params)](#UmamiClient+getTeams) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.joinTeam(params)](#UmamiClient+joinTeam) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getTeam(teamId)](#UmamiClient+getTeam) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateTeam(teamId, params)](#UmamiClient+updateTeam) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteTeam(teamId)](#UmamiClient+deleteTeam) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getTeamUsers(teamId, [params])](#UmamiClient+getTeamUsers) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.addUserToTeam(teamId, params)](#UmamiClient+addUserToTeam) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getTeamUser(teamId, userId)](#UmamiClient+getTeamUser) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateTeamUserRole(teamId, userId, params)](#UmamiClient+updateTeamUserRole) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.removeUserFromTeam(teamId, userId)](#UmamiClient+removeUserFromTeam) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getWebsites([params])](#UmamiClient+getWebsites) ⇒ <code>Promise.&lt;Array.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;&gt;</code>
    * [.createWebsite(params)](#UmamiClient+createWebsite) ⇒ <code>Promise.&lt;{id: number, websiteUuid: string, websiteId: number, name: string, domain: string, shareId: (string\|null), createdAt: string}&gt;</code>
    * [.getWebsite(websiteId)](#UmamiClient+getWebsite) ⇒ <code>Promise.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), userId: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;</code>
    * [.updateWebsite(websiteId, params)](#UmamiClient+updateWebsite) ⇒ <code>Promise.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), userId: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;</code>
    * [.deleteWebsite(websiteId)](#UmamiClient+deleteWebsite) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.resetWebsite(websiteId)](#UmamiClient+resetWebsite) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getTeamWebsites(teamId, [params])](#UmamiClient+getTeamWebsites) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getSessions(websiteId, params)](#UmamiClient+getSessions) ⇒ <code>Promise.&lt;{data: Array.&lt;Session&gt;, count: number, page: number, pageSize: number}&gt;</code>
    * [.getSessionStats(websiteId, params)](#UmamiClient+getSessionStats) ⇒ [<code>Promise.&lt;SessionStats&gt;</code>](#SessionStats)
    * [.getSession(websiteId, sessionId)](#UmamiClient+getSession) ⇒ [<code>Promise.&lt;Session&gt;</code>](#Session)
    * [.getSessionActivity(websiteId, sessionId, params)](#UmamiClient+getSessionActivity) ⇒ <code>Promise.&lt;Array.&lt;SessionActivity&gt;&gt;</code>
    * [.getSessionProperties(websiteId, sessionId)](#UmamiClient+getSessionProperties) ⇒ <code>Promise.&lt;Array.&lt;SessionProperty&gt;&gt;</code>
    * [.getSessionDataProperties(websiteId, params)](#UmamiClient+getSessionDataProperties) ⇒ <code>Promise.&lt;Array.&lt;PropertyCount&gt;&gt;</code>
    * [.getSessionDataValues(websiteId, params)](#UmamiClient+getSessionDataValues) ⇒ <code>Promise.&lt;Array.&lt;PropertyValue&gt;&gt;</code>
    * [.getWebsites([params])](#UmamiClient+getWebsites) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.createWebsite(params)](#UmamiClient+createWebsite) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getWebsite(websiteId)](#UmamiClient+getWebsite) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateWebsite(websiteId, params)](#UmamiClient+updateWebsite) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteWebsite(websiteId)](#UmamiClient+deleteWebsite) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.resetWebsite(websiteId)](#UmamiClient+resetWebsite) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getActiveUsers(websiteId)](#UmamiClient+getActiveUsers) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getEventsSeries(websiteId, params)](#UmamiClient+getEventsSeries) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getWebsiteEvents(websiteId, params)](#UmamiClient+getWebsiteEvents) ⇒ <code>Promise.&lt;{data: Array, count: number, page: number, pageSize: number}&gt;</code>
    * [.getWebsiteStats(websiteId, params)](#UmamiClient+getWebsiteStats) ⇒ <code>Promise.&lt;{pageviews: {value: number, prev: number}, visitors: {value: number, prev: number}, visits: {value: number, prev: number}, bounces: {value: number, prev: number}, totaltime: {value: number, prev: number}}&gt;</code>
    * [.getEventDataEvents(websiteId, params)](#UmamiClient+getEventDataEvents) ⇒ <code>Promise.&lt;Array.&lt;{eventName: string, propertyName: string, dataType: number, total: number}&gt;&gt;</code>
    * [.getEventDataFields(websiteId, params)](#UmamiClient+getEventDataFields) ⇒ <code>Promise.&lt;Array.&lt;{propertyName: string, dataType: number, value: string, total: number}&gt;&gt;</code>
    * [.getEventDataValues(websiteId, params)](#UmamiClient+getEventDataValues) ⇒ <code>Promise.&lt;Array.&lt;{value: string, total: number}&gt;&gt;</code>
    * [.getEventDataStats(websiteId, params)](#UmamiClient+getEventDataStats) ⇒ <code>Promise.&lt;Array.&lt;{events: number, fields: number, records: number}&gt;&gt;</code>
    * [.getPageviews(websiteId, params)](#UmamiClient+getPageviews) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getMetrics(websiteId, params)](#UmamiClient+getMetrics) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.sendEvent(payload)](#UmamiClient+sendEvent) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_UmamiClient_new"></a>

### new UmamiClient(config)
Creates a new UmamiClient instance


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Configuration options |
| config.baseUrl | <code>string</code> | Base URL for the Umami API |
| config.username | <code>string</code> | Umami username |
| config.password | <code>string</code> | Umami password |

<a name="UmamiClient+authenticate"></a>

### umamiClient.authenticate() ⇒ [<code>Promise.&lt;GetTokenResponse&gt;</code>](#GetTokenResponse)
Authenticates with the Umami API

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: [<code>Promise.&lt;GetTokenResponse&gt;</code>](#GetTokenResponse) - Authentication response
**Throws**:

- <code>Error</code> If authentication fails

<a name="UmamiClient+verifyToken"></a>

### umamiClient.verifyToken() ⇒ [<code>Promise.&lt;User&gt;</code>](#User)
Verifies the current authentication token

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: [<code>Promise.&lt;User&gt;</code>](#User) - User information if token is valid
<a name="UmamiClient+createUser"></a>

### umamiClient.createUser(params) ⇒ <code>Promise.&lt;{id: string, username: string, role: string, createdAt: string}&gt;</code>
Creates a new user.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{id: string, username: string, role: string, createdAt: string}&gt;</code> - Created user details.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for creating a user. |
| params.username | <code>string</code> | The user's username. |
| params.password | <code>string</code> | The user's password. |
| params.role | <code>string</code> | The user's role, either 'admin' or 'user'. |

<a name="UmamiClient+getUsers"></a>

### umamiClient.getUsers() ⇒ <code>Promise.&lt;Array.&lt;{id: string, username: string, role: string, createdAt: string}&gt;&gt;</code>
Returns all users. Admin access is required.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{id: string, username: string, role: string, createdAt: string}&gt;&gt;</code> - List of users.
<a name="UmamiClient+getUser"></a>

### umamiClient.getUser(userId) ⇒ <code>Promise.&lt;{id: string, username: string, role: string}&gt;</code>
Gets details of a specific user by ID.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{id: string, username: string, role: string}&gt;</code> - User details.

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user. |

<a name="UmamiClient+updateUser"></a>

### umamiClient.updateUser(userId, params) ⇒ <code>Promise.&lt;{id: string, username: string, role: string, createdAt: string}&gt;</code>
Updates details of a user.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{id: string, username: string, role: string, createdAt: string}&gt;</code> - Updated user details.

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user. |
| params | <code>Object</code> | Update parameters. |
| [params.username] | <code>string</code> | The user's new username (optional). |
| [params.password] | <code>string</code> | The user's new password (optional). |
| [params.role] | <code>string</code> | The user's role, either 'admin' or 'user' (optional). |

<a name="UmamiClient+deleteUser"></a>

### umamiClient.deleteUser(userId) ⇒ <code>Promise.&lt;string&gt;</code>
Deletes a user.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message.

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user. |

<a name="UmamiClient+getUserWebsites"></a>

### umamiClient.getUserWebsites(userId, [params]) ⇒ <code>Promise.&lt;Array.&lt;{id: string, userId: string, domain: string, name: string, shareId: (string\|null), createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null), resetAt: (string\|null)}&gt;&gt;</code>
Gets all websites that belong to a user.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{id: string, userId: string, domain: string, name: string, shareId: (string\|null), createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null), resetAt: (string\|null)}&gt;&gt;</code> - List of websites belonging to the user.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The ID of the user. |
| [params] | <code>Object</code> |  | Query parameters. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results per page (optional). |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name (optional). |

<a name="UmamiClient+getUserTeams"></a>

### umamiClient.getUserTeams(userId, [params]) ⇒ <code>Promise.&lt;Array.&lt;{id: string, name: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;&gt;</code>
Gets all teams that belong to a user.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{id: string, name: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;&gt;</code> - List of teams belonging to the user.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The ID of the user. |
| [params] | <code>Object</code> |  | Query parameters. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results per page (optional). |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name (optional). |

<a name="UmamiClient+createTeam"></a>

### umamiClient.createTeam(params) ⇒ <code>Promise.&lt;{accessCode: string, createdAt: string, id: string, name: string, updatedAt: (string\|null)}&gt;</code>
Creates a new team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{accessCode: string, createdAt: string, id: string, name: string, updatedAt: (string\|null)}&gt;</code> - Created team details.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for creating a team. |
| params.name | <code>string</code> | The team's name. |

<a name="UmamiClient+getTeams"></a>

### umamiClient.getTeams(params) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns all teams.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array&gt;</code> - List of all teams with team user information.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results per page (optional). |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name (optional). |

<a name="UmamiClient+joinTeam"></a>

### umamiClient.joinTeam(params) ⇒ <code>Promise.&lt;Object&gt;</code>
Joins a team using an access code.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Joined team details.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for joining a team. |
| params.accessCode | <code>string</code> | The team's access code. |

<a name="UmamiClient+getTeam"></a>

### umamiClient.getTeam(teamId) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets details of a specific team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Team details.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |

<a name="UmamiClient+updateTeam"></a>

### umamiClient.updateTeam(teamId, params) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates team details.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Updated team details.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |
| params | <code>Object</code> | Update parameters. |
| [params.name] | <code>string</code> | The team's name (optional). |
| [params.accessCode] | <code>string</code> | The team's access code (optional). |

<a name="UmamiClient+deleteTeam"></a>

### umamiClient.deleteTeam(teamId) ⇒ <code>Promise.&lt;string&gt;</code>
Deletes a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |

<a name="UmamiClient+getTeamUsers"></a>

### umamiClient.getTeamUsers(teamId, [params]) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets all users that belong to a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array&gt;</code> - List of team users.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| teamId | <code>string</code> |  | The ID of the team. |
| [params] | <code>Object</code> |  | Query parameters. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results per page (optional). |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name (optional). |

<a name="UmamiClient+addUserToTeam"></a>

### umamiClient.addUserToTeam(teamId, params) ⇒ <code>Promise.&lt;Object&gt;</code>
Adds a user to a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Added team user details.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |
| params | <code>Object</code> | Parameters for adding a user to the team. |
| params.userId | <code>string</code> | The user's ID. |
| params.role | <code>string</code> | The role to assign (e.g., 'member' or 'view-only'). |

<a name="UmamiClient+getTeamUser"></a>

### umamiClient.getTeamUser(teamId, userId) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets details of a user in a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Team user details.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |
| userId | <code>string</code> | The user's ID. |

<a name="UmamiClient+updateTeamUserRole"></a>

### umamiClient.updateTeamUserRole(teamId, userId, params) ⇒ <code>Promise.&lt;string&gt;</code>
Updates a user's role in a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |
| userId | <code>string</code> | The user's ID. |
| params | <code>Object</code> | Parameters for updating user role. |
| params.role | <code>string</code> | The new role (e.g., 'member' or 'view-only'). |

<a name="UmamiClient+removeUserFromTeam"></a>

### umamiClient.removeUserFromTeam(teamId, userId) ⇒ <code>Promise.&lt;string&gt;</code>
Removes a user from a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message.

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>string</code> | The ID of the team. |
| userId | <code>string</code> | The user's ID. |

<a name="UmamiClient+getWebsites"></a>

### umamiClient.getWebsites([params]) ⇒ <code>Promise.&lt;Array.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;&gt;</code>
Returns all tracked websites.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;&gt;</code> - List of websites.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [params] | <code>Object</code> |  | Query parameters. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results per page (optional). |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name (optional). |

<a name="UmamiClient+createWebsite"></a>

### umamiClient.createWebsite(params) ⇒ <code>Promise.&lt;{id: number, websiteUuid: string, websiteId: number, name: string, domain: string, shareId: (string\|null), createdAt: string}&gt;</code>
Creates a new website.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{id: number, websiteUuid: string, websiteId: number, name: string, domain: string, shareId: (string\|null), createdAt: string}&gt;</code> - Details of the created website.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Website parameters. |
| params.domain | <code>string</code> | The full domain of the tracked website. |
| params.name | <code>string</code> | The name of the website in Umami. |
| [params.shareId] | <code>string</code> | A unique string to enable a share URL (optional). |
| [params.teamId] | <code>string</code> | The ID of the team the website will be created under (optional). |

<a name="UmamiClient+getWebsite"></a>

### umamiClient.getWebsite(websiteId) ⇒ <code>Promise.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), userId: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;</code>
Gets details of a specific website by ID.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), userId: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;</code> - Website details.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |

<a name="UmamiClient+updateWebsite"></a>

### umamiClient.updateWebsite(websiteId, params) ⇒ <code>Promise.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), userId: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;</code>
Updates details of a website.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{id: string, name: string, domain: string, shareId: (string\|null), resetAt: (string\|null), userId: string, createdAt: string, updatedAt: (string\|null), deletedAt: (string\|null)}&gt;</code> - Updated website details.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |
| params | <code>Object</code> | Update parameters. |
| [params.name] | <code>string</code> | The name of the website in Umami (optional). |
| [params.domain] | <code>string</code> | The full domain of the tracked website (optional). |
| [params.shareId] | <code>string</code> | A unique string to enable a share URL or null to unshare (optional). |

<a name="UmamiClient+deleteWebsite"></a>

### umamiClient.deleteWebsite(websiteId) ⇒ <code>Promise.&lt;string&gt;</code>
Deletes a website.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |

<a name="UmamiClient+resetWebsite"></a>

### umamiClient.resetWebsite(websiteId) ⇒ <code>Promise.&lt;string&gt;</code>
Resets a website by removing all data related to it.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |

<a name="UmamiClient+getTeamWebsites"></a>

### umamiClient.getTeamWebsites(teamId, [params]) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets all websites that belong to a team.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array&gt;</code> - List of team websites.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| teamId | <code>string</code> |  | The ID of the team. |
| [params] | <code>Object</code> |  | Query parameters. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results per page (optional). |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name (optional). |

<a name="UmamiClient+getSessions"></a>

### umamiClient.getSessions(websiteId, params) ⇒ <code>Promise.&lt;{data: Array.&lt;Session&gt;, count: number, page: number, pageSize: number}&gt;</code>
Gets website session details within a given time range

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| websiteId | <code>string</code> |  | Website ID |
| params | <code>Object</code> |  | Query parameters |
| params.startAt | <code>number</code> |  | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> |  | Timestamp (in ms) of end date |
| [params.query] | <code>string</code> |  | Search text |
| [params.page] | <code>number</code> | <code>1</code> | Page number |
| [params.pageSize] | <code>number</code> |  | Results per page |
| [params.orderBy] | <code>string</code> |  | Order by column name |

<a name="UmamiClient+getSessionStats"></a>

### umamiClient.getSessionStats(websiteId, params) ⇒ [<code>Promise.&lt;SessionStats&gt;</code>](#SessionStats)
Gets summarized website session statistics

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| params | <code>Object</code> | Query parameters |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date |
| [params.url] | <code>string</code> | Filter by URL |
| [params.referrer] | <code>string</code> | Filter by referrer |
| [params.title] | <code>string</code> | Filter by page title |
| [params.query] | <code>string</code> | Filter by query |
| [params.event] | <code>string</code> | Filter by event name |
| [params.host] | <code>string</code> | Filter by hostname |
| [params.os] | <code>string</code> | Filter by operating system |
| [params.browser] | <code>string</code> | Filter by browser |
| [params.device] | <code>string</code> | Filter by device |
| [params.country] | <code>string</code> | Filter by country |
| [params.region] | <code>string</code> | Filter by region |
| [params.city] | <code>string</code> | Filter by city |

<a name="UmamiClient+getSession"></a>

### umamiClient.getSession(websiteId, sessionId) ⇒ [<code>Promise.&lt;Session&gt;</code>](#Session)
Gets session details for an individual session

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| sessionId | <code>string</code> | Session ID |

<a name="UmamiClient+getSessionActivity"></a>

### umamiClient.getSessionActivity(websiteId, sessionId, params) ⇒ <code>Promise.&lt;Array.&lt;SessionActivity&gt;&gt;</code>
Gets session activity for an individual session

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| sessionId | <code>string</code> | Session ID |
| params | <code>Object</code> | Query parameters |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date |

<a name="UmamiClient+getSessionProperties"></a>

### umamiClient.getSessionProperties(websiteId, sessionId) ⇒ <code>Promise.&lt;Array.&lt;SessionProperty&gt;&gt;</code>
Gets session properties for an individual session

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| sessionId | <code>string</code> | Session ID |

<a name="UmamiClient+getSessionDataProperties"></a>

### umamiClient.getSessionDataProperties(websiteId, params) ⇒ <code>Promise.&lt;Array.&lt;PropertyCount&gt;&gt;</code>
Gets session data counts by property name

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| params | <code>Object</code> | Query parameters |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date |

<a name="UmamiClient+getSessionDataValues"></a>

### umamiClient.getSessionDataValues(websiteId, params) ⇒ <code>Promise.&lt;Array.&lt;PropertyValue&gt;&gt;</code>
Gets session data counts for a given property

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| params | <code>Object</code> | Query parameters |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date |
| params.propertyName | <code>string</code> | Property name |

<a name="UmamiClient+getWebsites"></a>

### umamiClient.getWebsites([params]) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets all tracked websites

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array&gt;</code> - List of websites

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [params] | <code>Object</code> |  | Query parameters |
| [params.query] | <code>string</code> |  | Search text |
| [params.page] | <code>number</code> | <code>1</code> | Page number |
| [params.pageSize] | <code>number</code> |  | Results per page |
| [params.orderBy] | <code>string</code> | <code>&quot;&#x27;name&#x27;&quot;</code> | Order by column name |

<a name="UmamiClient+createWebsite"></a>

### umamiClient.createWebsite(params) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a new website

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Created website details

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Website parameters |
| params.domain | <code>string</code> | The full domain of the tracked website |
| params.name | <code>string</code> | The name of the website in Umami |
| [params.shareId] | <code>string</code> | A unique string to enable a share url |
| [params.teamId] | <code>string</code> | The ID of the team the website will be created under |

<a name="UmamiClient+getWebsite"></a>

### umamiClient.getWebsite(websiteId) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets a website by ID

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Website details

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |

<a name="UmamiClient+updateWebsite"></a>

### umamiClient.updateWebsite(websiteId, params) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates a website

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Updated website details

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| params | <code>Object</code> | Update parameters |
| [params.name] | <code>string</code> | The name of the website in Umami |
| [params.domain] | <code>string</code> | The full domain of the tracked website |
| [params.shareId] | <code>string</code> | A unique string to enable a share url |

<a name="UmamiClient+deleteWebsite"></a>

### umamiClient.deleteWebsite(websiteId) ⇒ <code>Promise.&lt;string&gt;</code>
Deletes a website

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |

<a name="UmamiClient+resetWebsite"></a>

### umamiClient.resetWebsite(websiteId) ⇒ <code>Promise.&lt;string&gt;</code>
Resets a website by removing all data

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;string&gt;</code> - Confirmation message

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |

<a name="UmamiClient+getActiveUsers"></a>

### umamiClient.getActiveUsers(websiteId) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets the number of active users on a website

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Active users count

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |

<a name="UmamiClient+getEventsSeries"></a>

### umamiClient.getEventsSeries(websiteId, params) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets events within a given time range

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array&gt;</code> - Event series data

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| params | <code>Object</code> | Query parameters |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date |
| params.unit | <code>string</code> | Time unit (year | month | hour | day) |
| params.timezone | <code>string</code> | Timezone (ex. America/Los_Angeles) |
| [params.url] | <code>string</code> | Filter by URL |
| [params.referrer] | <code>string</code> | Filter by referrer |
| [params.title] | <code>string</code> | Filter by page title |
| [params.host] | <code>string</code> | Filter by hostname |
| [params.os] | <code>string</code> | Filter by operating system |
| [params.browser] | <code>string</code> | Filter by browser |
| [params.device] | <code>string</code> | Filter by device |
| [params.country] | <code>string</code> | Filter by country |
| [params.region] | <code>string</code> | Filter by region |
| [params.city] | <code>string</code> | Filter by city |

<a name="UmamiClient+getWebsiteEvents"></a>

### umamiClient.getWebsiteEvents(websiteId, params) ⇒ <code>Promise.&lt;{data: Array, count: number, page: number, pageSize: number}&gt;</code>
Gets website event details within a given time range.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{data: Array, count: number, page: number, pageSize: number}&gt;</code> - Event data response.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| websiteId | <code>string</code> |  | The ID of the website. |
| params | <code>Object</code> |  | Query parameters. |
| params.startAt | <code>number</code> |  | Timestamp (in ms) of the starting date. |
| params.endAt | <code>number</code> |  | Timestamp (in ms) of the end date. |
| [params.query] | <code>string</code> |  | Search text (optional). |
| [params.page] | <code>number</code> | <code>1</code> | Page number (optional). |
| [params.pageSize] | <code>number</code> |  | Number of results to return (optional). |
| [params.orderBy] | <code>string</code> |  | Order by column name (optional). |

<a name="UmamiClient+getWebsiteStats"></a>

### umamiClient.getWebsiteStats(websiteId, params) ⇒ <code>Promise.&lt;{pageviews: {value: number, prev: number}, visitors: {value: number, prev: number}, visits: {value: number, prev: number}, bounces: {value: number, prev: number}, totaltime: {value: number, prev: number}}&gt;</code>
Gets summarized website statistics.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;{pageviews: {value: number, prev: number}, visitors: {value: number, prev: number}, visits: {value: number, prev: number}, bounces: {value: number, prev: number}, totaltime: {value: number, prev: number}}&gt;</code> - Summarized website statistics.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |
| params | <code>Object</code> | Query parameters. |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date. |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date. |
| [params.url] | <code>string</code> | Filter by URL (optional). |
| [params.referrer] | <code>string</code> | Filter by referrer (optional). |
| [params.title] | <code>string</code> | Filter by page title (optional). |
| [params.query] | <code>string</code> | Filter by query (optional). |
| [params.event] | <code>string</code> | Filter by event name (optional). |
| [params.host] | <code>string</code> | Filter by hostname (optional). |
| [params.os] | <code>string</code> | Filter by operating system (optional). |
| [params.browser] | <code>string</code> | Filter by browser (optional). |
| [params.device] | <code>string</code> | Filter by device (e.g., Mobile, optional). |
| [params.country] | <code>string</code> | Filter by country (optional). |
| [params.region] | <code>string</code> | Filter by region/state/province (optional). |
| [params.city] | <code>string</code> | Filter by city (optional). |

<a name="UmamiClient+getEventDataEvents"></a>

### umamiClient.getEventDataEvents(websiteId, params) ⇒ <code>Promise.&lt;Array.&lt;{eventName: string, propertyName: string, dataType: number, total: number}&gt;&gt;</code>
Gets event data names, properties, and counts.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{eventName: string, propertyName: string, dataType: number, total: number}&gt;&gt;</code> - Event data summary.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |
| params | <code>Object</code> | Query parameters. |
| params.startAt | <code>number</code> | Timestamp (in ms) of the starting date. |
| params.endAt | <code>number</code> | Timestamp (in ms) of the end date. |
| [params.event] | <code>string</code> | Event name filter (optional). |

<a name="UmamiClient+getEventDataFields"></a>

### umamiClient.getEventDataFields(websiteId, params) ⇒ <code>Promise.&lt;Array.&lt;{propertyName: string, dataType: number, value: string, total: number}&gt;&gt;</code>
Gets event data property and value counts within a given time range.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{propertyName: string, dataType: number, value: string, total: number}&gt;&gt;</code> - Event data fields.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |
| params | <code>Object</code> | Query parameters. |
| params.startAt | <code>number</code> | Timestamp (in ms) of the starting date. |
| params.endAt | <code>number</code> | Timestamp (in ms) of the end date. |

<a name="UmamiClient+getEventDataValues"></a>

### umamiClient.getEventDataValues(websiteId, params) ⇒ <code>Promise.&lt;Array.&lt;{value: string, total: number}&gt;&gt;</code>
Gets event data counts for a given event and property.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{value: string, total: number}&gt;&gt;</code> - Event data values.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |
| params | <code>Object</code> | Query parameters. |
| params.startAt | <code>number</code> | Timestamp (in ms) of the starting date. |
| params.endAt | <code>number</code> | Timestamp (in ms) of the end date. |
| params.eventName | <code>string</code> | The name of the event. |
| params.propertyName | <code>string</code> | The property name. |

<a name="UmamiClient+getEventDataStats"></a>

### umamiClient.getEventDataStats(websiteId, params) ⇒ <code>Promise.&lt;Array.&lt;{events: number, fields: number, records: number}&gt;&gt;</code>
Gets summarized website events, fields, and records within a given time range.

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array.&lt;{events: number, fields: number, records: number}&gt;&gt;</code> - Summary of events, fields, and records.

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | The ID of the website. |
| params | <code>Object</code> | Query parameters. |
| params.startAt | <code>number</code> | Timestamp (in ms) of the starting date. |
| params.endAt | <code>number</code> | Timestamp (in ms) of the end date. |

<a name="UmamiClient+getPageviews"></a>

### umamiClient.getPageviews(websiteId, params) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets pageviews within a given time range

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Object&gt;</code> - Pageview data

| Param | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| params | <code>Object</code> | Query parameters |
| params.startAt | <code>number</code> | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> | Timestamp (in ms) of end date |
| params.unit | <code>string</code> | Time unit (year | month | hour | day) |
| params.timezone | <code>string</code> | Timezone (ex. America/Los_Angeles) |
| [params.url] | <code>string</code> | Filter by URL |
| [params.referrer] | <code>string</code> | Filter by referrer |
| [params.title] | <code>string</code> | Filter by page title |
| [params.host] | <code>string</code> | Filter by hostname |
| [params.os] | <code>string</code> | Filter by operating system |
| [params.browser] | <code>string</code> | Filter by browser |
| [params.device] | <code>string</code> | Filter by device |
| [params.country] | <code>string</code> | Filter by country |
| [params.region] | <code>string</code> | Filter by region |
| [params.city] | <code>string</code> | Filter by city |

<a name="UmamiClient+getMetrics"></a>

### umamiClient.getMetrics(websiteId, params) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets metrics for a given time range

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)
**Returns**: <code>Promise.&lt;Array&gt;</code> - Metrics data

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| websiteId | <code>string</code> |  | Website ID |
| params | <code>Object</code> |  | Query parameters |
| params.startAt | <code>number</code> |  | Timestamp (in ms) of starting date |
| params.endAt | <code>number</code> |  | Timestamp (in ms) of end date |
| params.type | <code>string</code> |  | Metrics type (url | referrer | browser | os | device | country | event) |
| [params.url] | <code>string</code> |  | Filter by URL |
| [params.referrer] | <code>string</code> |  | Filter by referrer |
| [params.title] | <code>string</code> |  | Filter by page title |
| [params.query] | <code>string</code> |  | Filter by query |
| [params.host] | <code>string</code> |  | Filter by hostname |
| [params.os] | <code>string</code> |  | Filter by operating system |
| [params.browser] | <code>string</code> |  | Filter by browser |
| [params.device] | <code>string</code> |  | Filter by device |
| [params.country] | <code>string</code> |  | Filter by country |
| [params.region] | <code>string</code> |  | Filter by region |
| [params.city] | <code>string</code> |  | Filter by city |
| [params.language] | <code>string</code> |  | Filter by language |
| [params.event] | <code>string</code> |  | Filter by event |
| [params.limit] | <code>number</code> | <code>500</code> | Number of events returned |

<a name="UmamiClient+sendEvent"></a>

### umamiClient.sendEvent(payload) ⇒ <code>Promise.&lt;void&gt;</code>
Sends an event to Umami

**Kind**: instance method of [<code>UmamiClient</code>](#UmamiClient)

| Param | Type | Description |
| --- | --- | --- |
| payload | [<code>EventPayload</code>](#EventPayload) | Event data |

<a name="User"></a>

## User : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The user's unique identifier |
| username | <code>string</code> | The user's username |
| role | <code>string</code> | The user's role |
| createdAt | <code>Date</code> | When the user was created |
| isAdmin | <code>boolean</code> | Whether the user has admin privileges |

<a name="GetTokenResponse"></a>

## GetTokenResponse : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Authentication token |
| user | [<code>User</code>](#User) | User information |

<a name="EventPayload"></a>

## EventPayload : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| hostname | <code>string</code> | Name of host |
| language | <code>string</code> | Language of visitor (e.g., "en-US") |
| referrer | <code>string</code> | Referrer URL |
| screen | <code>string</code> | Screen resolution (e.g., "1920x1080") |
| title | <code>string</code> | Page title |
| url | <code>string</code> | Page URL |
| website | <code>string</code> | Website ID |
| name | <code>string</code> | Name of the event |
| [data] | <code>Object</code> | Optional additional data for the event |

<a name="Session"></a>

## Session : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Session ID |
| websiteId | <code>string</code> | Website ID |
| hostname | <code>string</code> | Hostname |
| browser | <code>string</code> | Browser name |
| os | <code>string</code> | Operating system |
| device | <code>string</code> | Device type |
| screen | <code>string</code> | Screen resolution |
| language | <code>string</code> | Language code |
| country | <code>string</code> | Country code |
| subdivision1 | <code>string</code> | Region/state code |
| city | <code>string</code> | City name |
| firstAt | <code>string</code> | First activity timestamp |
| lastAt | <code>string</code> | Last activity timestamp |
| visits | <code>number</code> | Number of visits |
| views | <code>number</code> | Number of page views |
| createdAt | <code>string</code> | Creation timestamp |

<a name="SessionStats"></a>

## SessionStats : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pageviews | <code>Object</code> | Pages hits |
| visitors | <code>Object</code> | Number of unique visitors |
| visits | <code>Object</code> | Number of sessions |
| countries | <code>Object</code> | Number of unique countries |
| events | <code>Object</code> | Number of custom events |

<a name="SessionActivity"></a>

## SessionActivity : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| createdAt | <code>string</code> | Activity timestamp |
| urlPath | <code>string</code> | URL path |
| urlQuery | <code>string</code> | URL query parameters |
| referrerDomain | <code>string</code> | Referrer domain |
| eventId | <code>string</code> | Event ID |
| eventType | <code>number</code> | Event type |
| eventName | <code>string</code> | Event name |
| visitId | <code>string</code> | Visit ID |

<a name="SessionProperty"></a>

## SessionProperty : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| websiteId | <code>string</code> | Website ID |
| sessionId | <code>string</code> | Session ID |
| dataKey | <code>string</code> | Property key |
| dataType | <code>number</code> | Data type |
| stringValue | <code>string</code> \| <code>null</code> | String value |
| numberValue | <code>number</code> \| <code>null</code> | Number value |
| dateValue | <code>string</code> \| <code>null</code> | Date value |
| createdAt | <code>string</code> | Creation timestamp |

<a name="PropertyCount"></a>

## PropertyCount : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| propertyName | <code>string</code> | Name of the property |
| total | <code>number</code> | Total count |

<a name="PropertyValue"></a>

## PropertyValue : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Property value |
| total | <code>number</code> | Total count |