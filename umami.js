/**
 * @typedef {Object} User
 * @property {string} id - The user's unique identifier
 * @property {string} username - The user's username
 * @property {string} role - The user's role
 * @property {Date} createdAt - When the user was created
 * @property {boolean} isAdmin - Whether the user has admin privileges
 */

/**
 * @typedef {Object} GetTokenResponse
 * @property {string} token - Authentication token
 * @property {User} user - User information
 */

/**
 * @typedef {Object} EventPayload
 * @property {string} hostname - Name of host
 * @property {string} language - Language of visitor (e.g., "en-US")
 * @property {string} referrer - Referrer URL
 * @property {string} screen - Screen resolution (e.g., "1920x1080")
 * @property {string} title - Page title
 * @property {string} url - Page URL
 * @property {string} website - Website ID
 * @property {string} name - Name of the event
 * @property {Object} [data] - Optional additional data for the event
 */

/**
 * @typedef {Object} Session
 * @property {string} id - Session ID
 * @property {string} websiteId - Website ID
 * @property {string} hostname - Hostname
 * @property {string} browser - Browser name
 * @property {string} os - Operating system
 * @property {string} device - Device type
 * @property {string} screen - Screen resolution
 * @property {string} language - Language code
 * @property {string} country - Country code
 * @property {string} subdivision1 - Region/state code
 * @property {string} city - City name
 * @property {string} firstAt - First activity timestamp
 * @property {string} lastAt - Last activity timestamp
 * @property {number} visits - Number of visits
 * @property {number} views - Number of page views
 * @property {string} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} SessionStats
 * @property {{ value: number }} pageviews - Pages hits
 * @property {{ value: number }} visitors - Number of unique visitors
 * @property {{ value: number }} visits - Number of sessions
 * @property {{ value: number }} countries - Number of unique countries
 * @property {{ value: number }} events - Number of custom events
 */

/**
 * @typedef {Object} SessionActivity
 * @property {string} createdAt - Activity timestamp
 * @property {string} urlPath - URL path
 * @property {string} urlQuery - URL query parameters
 * @property {string} referrerDomain - Referrer domain
 * @property {string} eventId - Event ID
 * @property {number} eventType - Event type
 * @property {string} eventName - Event name
 * @property {string} visitId - Visit ID
 */

/**
 * @typedef {Object} SessionProperty
 * @property {string} websiteId - Website ID
 * @property {string} sessionId - Session ID
 * @property {string} dataKey - Property key
 * @property {number} dataType - Data type
 * @property {string|null} stringValue - String value
 * @property {number|null} numberValue - Number value
 * @property {string|null} dateValue - Date value
 * @property {string} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} PropertyCount
 * @property {string} propertyName - Name of the property
 * @property {number} total - Total count
 */

/**
 * @typedef {Object} PropertyValue
 * @property {string} value - Property value
 * @property {number} total - Total count
 */

class UmamiClient {
    /**
     * Creates a new UmamiClient instance
     * @param {Object} config - Configuration options
     * @param {string} config.baseUrl - Base URL for the Umami API
     * @param {string} config.username - Umami username
     * @param {string} config.password - Umami password
     */
    constructor({ baseUrl, username, password }) {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
        this.token = null;
        this.tokenExpiry = null;
    }

    /**
     * Makes an authenticated API request
     * @private
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<any>} - API response
     */
    async #makeAuthenticatedRequest(endpoint, options = {}) {
        await this.#ensureValidToken();

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Ensures a valid authentication token exists, obtaining a new one if necessary
     * @private
     */
    async #ensureValidToken() {
        const tokenLifespan = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const isTokenExpired = !this.tokenExpiry || Date.now() > this.tokenExpiry;

        if (!this.token || isTokenExpired) {
            await this.authenticate();
        }
    }

    /**
     * Formats query parameters for URL
     * @private
     * @param {Object} params - Query parameters
     * @returns {string} - Formatted query string
     */
    #formatQueryParams(params) {
        return Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    /**
     * Authenticates with the Umami API
     * @returns {Promise<GetTokenResponse>} Authentication response
     * @throws {Error} If authentication fails
     */
    async authenticate() {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password,
            }),
        });

        if (response.status === 401) {
            throw new Error('Authentication failed: Incorrect username or password');
        }

        if (!response.ok) {
            throw new Error(`Authentication failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        this.token = data.token;
        this.tokenExpiry = Date.now() + (24 * 60 * 60 * 1000); // Set expiry to 24 hours from now
        return data;
    }

    /**
     * Verifies the current authentication token
     * @returns {Promise<User>} User information if token is valid
     */
    async verifyToken() {
        return this.#makeAuthenticatedRequest('/api/auth/verify');
    }

    /**
     * Creates a new user.
     * @param {Object} params - Parameters for creating a user.
     * @param {string} params.username - The user's username.
     * @param {string} params.password - The user's password.
     * @param {string} params.role - The user's role, either 'admin' or 'user'.
     * @returns {Promise<{ id: string, username: string, role: string, createdAt: string }>} Created user details.
     */
    async createUser(params) {
        return this.#makeAuthenticatedRequest(`/api/users`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Returns all users. Admin access is required.
     * @returns {Promise<Array<{ id: string, username: string, role: string, createdAt: string }>>} List of users.
     */
    async getUsers() {
        return this.#makeAuthenticatedRequest(`/api/admin/users`);
    }

    /**
     * Gets details of a specific user by ID.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<{ id: string, username: string, role: string }>} User details.
     */
    async getUser(userId) {
        return this.#makeAuthenticatedRequest(`/api/users/${userId}`);
    }

    /**
     * Updates details of a user.
     * @param {string} userId - The ID of the user.
     * @param {Object} params - Update parameters.
     * @param {string} [params.username] - The user's new username (optional).
     * @param {string} [params.password] - The user's new password (optional).
     * @param {string} [params.role] - The user's role, either 'admin' or 'user' (optional).
     * @returns {Promise<{ id: string, username: string, role: string, createdAt: string }>} Updated user details.
     */
    async updateUser(userId, params) {
        return this.#makeAuthenticatedRequest(`/api/users/${userId}`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Deletes a user.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<string>} Confirmation message.
     */
    async deleteUser(userId) {
        return this.#makeAuthenticatedRequest(`/api/users/${userId}`, {
            method: 'DELETE',
        });
    }


    /**
     * Gets all websites that belong to a user.
     * @param {string} userId - The ID of the user.
     * @param {Object} [params] - Query parameters.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results per page (optional).
     * @param {string} [params.orderBy='name'] - Order by column name (optional).
     * @returns {Promise<Array<{ id: string, userId: string, domain: string, name: string, shareId: string | null, createdAt: string, updatedAt: string | null, deletedAt: string | null, resetAt: string | null }>>} List of websites belonging to the user.
     */
    async getUserWebsites(userId, params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/users/${userId}/websites?${queryString}`);
    }

    /**
     * Gets all teams that belong to a user.
     * @param {string} userId - The ID of the user.
     * @param {Object} [params] - Query parameters.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results per page (optional).
     * @param {string} [params.orderBy='name'] - Order by column name (optional).
     * @returns {Promise<Array<{ id: string, name: string, createdAt: string, updatedAt: string | null, deletedAt: string | null }>>} List of teams belonging to the user.
     */
    async getUserTeams(userId, params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/users/${userId}/teams?${queryString}`);
    }

    /**
     * Creates a new team.
     * @param {Object} params - Parameters for creating a team.
     * @param {string} params.name - The team's name.
     * @returns {Promise<{ accessCode: string, createdAt: string, id: string, name: string, updatedAt: string | null }>} Created team details.
     */
    async createTeam(params) {
        return this.#makeAuthenticatedRequest(`/api/teams`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }


    /**
     * Returns all teams.
     * @param {Object} params - Query parameters.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results per page (optional).
     * @param {string} [params.orderBy='name'] - Order by column name (optional).
     * @returns {Promise<Array>} List of all teams with team user information.
     */
    async getTeams(params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/teams?${queryString}`);
    }

    /**
     * Joins a team using an access code.
     * @param {Object} params - Parameters for joining a team.
     * @param {string} params.accessCode - The team's access code.
     * @returns {Promise<Object>} Joined team details.
     */
    async joinTeam(params) {
        return this.#makeAuthenticatedRequest(`/api/teams/join`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Gets details of a specific team.
     * @param {string} teamId - The ID of the team.
     * @returns {Promise<Object>} Team details.
     */
    async getTeam(teamId) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}`);
    }

    /**
     * Updates team details.
     * @param {string} teamId - The ID of the team.
     * @param {Object} params - Update parameters.
     * @param {string} [params.name] - The team's name (optional).
     * @param {string} [params.accessCode] - The team's access code (optional).
     * @returns {Promise<Object>} Updated team details.
     */
    async updateTeam(teamId, params) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Deletes a team.
     * @param {string} teamId - The ID of the team.
     * @returns {Promise<string>} Confirmation message.
     */
    async deleteTeam(teamId) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}`, {
            method: 'DELETE',
        });
    }

    /**
     * Gets all users that belong to a team.
     * @param {string} teamId - The ID of the team.
     * @param {Object} [params] - Query parameters.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results per page (optional).
     * @param {string} [params.orderBy='name'] - Order by column name (optional).
     * @returns {Promise<Array>} List of team users.
     */
    async getTeamUsers(teamId, params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}/users?${queryString}`);
    }

    /**
     * Adds a user to a team.
     * @param {string} teamId - The ID of the team.
     * @param {Object} params - Parameters for adding a user to the team.
     * @param {string} params.userId - The user's ID.
     * @param {string} params.role - The role to assign (e.g., 'member' or 'view-only').
     * @returns {Promise<Object>} Added team user details.
     */
    async addUserToTeam(teamId, params) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}/users`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Gets details of a user in a team.
     * @param {string} teamId - The ID of the team.
     * @param {string} userId - The user's ID.
     * @returns {Promise<Object>} Team user details.
     */
    async getTeamUser(teamId, userId) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}/users/${userId}`);
    }

    /**
     * Updates a user's role in a team.
     * @param {string} teamId - The ID of the team.
     * @param {string} userId - The user's ID.
     * @param {Object} params - Parameters for updating user role.
     * @param {string} params.role - The new role (e.g., 'member' or 'view-only').
     * @returns {Promise<string>} Confirmation message.
     */
    async updateTeamUserRole(teamId, userId, params) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}/users/${userId}`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Removes a user from a team.
     * @param {string} teamId - The ID of the team.
     * @param {string} userId - The user's ID.
     * @returns {Promise<string>} Confirmation message.
     */
    async removeUserFromTeam(teamId, userId) {
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}/users/${userId}`, {
            method: 'DELETE',
        });
    }

    /**
     * Returns all tracked websites.
     * @param {Object} [params] - Query parameters.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results per page (optional).
     * @param {string} [params.orderBy='name'] - Order by column name (optional).
     * @returns {Promise<Array<{ id: string, name: string, domain: string, shareId: string | null, resetAt: string | null, createdAt: string, updatedAt: string | null, deletedAt: string | null }>>} List of websites.
     */
    async getWebsites(params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites?${queryString}`);
    }

    /**
     * Creates a new website.
     * @param {Object} params - Website parameters.
     * @param {string} params.domain - The full domain of the tracked website.
     * @param {string} params.name - The name of the website in Umami.
     * @param {string} [params.shareId] - A unique string to enable a share URL (optional).
     * @param {string} [params.teamId] - The ID of the team the website will be created under (optional).
     * @returns {Promise<{ id: number, websiteUuid: string, websiteId: number, name: string, domain: string, shareId: string | null, createdAt: string }>} Details of the created website.
     */
    async createWebsite(params) {
        return this.#makeAuthenticatedRequest(`/api/websites`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Gets details of a specific website by ID.
     * @param {string} websiteId - The ID of the website.
     * @returns {Promise<{ id: string, name: string, domain: string, shareId: string | null, resetAt: string | null, userId: string, createdAt: string, updatedAt: string | null, deletedAt: string | null }>} Website details.
     */
    async getWebsite(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}`);
    }

    /**
     * Updates details of a website.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Update parameters.
     * @param {string} [params.name] - The name of the website in Umami (optional).
     * @param {string} [params.domain] - The full domain of the tracked website (optional).
     * @param {string} [params.shareId] - A unique string to enable a share URL or null to unshare (optional).
     * @returns {Promise<{ id: string, name: string, domain: string, shareId: string | null, resetAt: string | null, userId: string, createdAt: string, updatedAt: string | null, deletedAt: string | null }>} Updated website details.
     */
    async updateWebsite(websiteId, params) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Deletes a website.
     * @param {string} websiteId - The ID of the website.
     * @returns {Promise<string>} Confirmation message.
     */
    async deleteWebsite(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}`, {
            method: 'DELETE',
        });
    }

    /**
     * Resets a website by removing all data related to it.
     * @param {string} websiteId - The ID of the website.
     * @returns {Promise<string>} Confirmation message.
     */
    async resetWebsite(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/reset`, {
            method: 'POST',
        });
    }

    /**
     * Gets all websites that belong to a team.
     * @param {string} teamId - The ID of the team.
     * @param {Object} [params] - Query parameters.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results per page (optional).
     * @param {string} [params.orderBy='name'] - Order by column name (optional).
     * @returns {Promise<Array>} List of team websites.
     */
    async getTeamWebsites(teamId, params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/teams/${teamId}/websites?${queryString}`);
    }

    /**
   * Gets website session details within a given time range
   * @param {string} websiteId - Website ID
   * @param {Object} params - Query parameters
   * @param {number} params.startAt - Timestamp (in ms) of starting date
   * @param {number} params.endAt - Timestamp (in ms) of end date
   * @param {string} [params.query] - Search text
   * @param {number} [params.page=1] - Page number
   * @param {number} [params.pageSize] - Results per page
   * @param {string} [params.orderBy] - Order by column name
   * @returns {Promise<{ data: Session[], count: number, page: number, pageSize: number }>}
   */
    async getSessions(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/sessions?${queryString}`);
    }

    /**
   * Gets summarized website session statistics
   * @param {string} websiteId - Website ID
   * @param {Object} params - Query parameters
   * @param {number} params.startAt - Timestamp (in ms) of starting date
   * @param {number} params.endAt - Timestamp (in ms) of end date
   * @param {string} [params.url] - Filter by URL
   * @param {string} [params.referrer] - Filter by referrer
   * @param {string} [params.title] - Filter by page title
   * @param {string} [params.query] - Filter by query
   * @param {string} [params.event] - Filter by event name
   * @param {string} [params.host] - Filter by hostname
   * @param {string} [params.os] - Filter by operating system
   * @param {string} [params.browser] - Filter by browser
   * @param {string} [params.device] - Filter by device
   * @param {string} [params.country] - Filter by country
   * @param {string} [params.region] - Filter by region
   * @param {string} [params.city] - Filter by city
   * @returns {Promise<SessionStats>}
   */
    async getSessionStats(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/sessions/stats?${queryString}`);
    }


    /**
   * Gets session details for an individual session
   * @param {string} websiteId - Website ID
   * @param {string} sessionId - Session ID
   * @returns {Promise<Session>}
   */
    async getSession(websiteId, sessionId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/sessions/${sessionId}`);
    }


    /**
   * Gets session activity for an individual session
   * @param {string} websiteId - Website ID
   * @param {string} sessionId - Session ID
   * @param {Object} params - Query parameters
   * @param {number} params.startAt - Timestamp (in ms) of starting date
   * @param {number} params.endAt - Timestamp (in ms) of end date
   * @returns {Promise<SessionActivity[]>}
   */
    async getSessionActivity(websiteId, sessionId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/sessions/${sessionId}/activity?${queryString}`);
    }

    /**
   * Gets session properties for an individual session
   * @param {string} websiteId - Website ID
   * @param {string} sessionId - Session ID
   * @returns {Promise<SessionProperty[]>}
   */
    async getSessionProperties(websiteId, sessionId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/sessions/${sessionId}/properties`);
    }

    /**
   * Gets session data counts by property name
   * @param {string} websiteId - Website ID
   * @param {Object} params - Query parameters
   * @param {number} params.startAt - Timestamp (in ms) of starting date
   * @param {number} params.endAt - Timestamp (in ms) of end date
   * @returns {Promise<PropertyCount[]>}
   */
    async getSessionDataProperties(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/session-data/properties?${queryString}`);
    }

    /**
   * Gets session data counts for a given property
   * @param {string} websiteId - Website ID
   * @param {Object} params - Query parameters
   * @param {number} params.startAt - Timestamp (in ms) of starting date
   * @param {number} params.endAt - Timestamp (in ms) of end date
   * @param {string} params.propertyName - Property name
   * @returns {Promise<PropertyValue[]>}
   */
    async getSessionDataValues(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/session-data/values?${queryString}`);
    }


    /**
     * Gets all tracked websites
     * @param {Object} [params] - Query parameters
     * @param {string} [params.query] - Search text
     * @param {number} [params.page=1] - Page number
     * @param {number} [params.pageSize] - Results per page
     * @param {string} [params.orderBy='name'] - Order by column name
     * @returns {Promise<Array>} List of websites
     */
    async getWebsites(params = {}) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites?${queryString}`);
    }

    /**
     * Creates a new website
     * @param {Object} params - Website parameters
     * @param {string} params.domain - The full domain of the tracked website
     * @param {string} params.name - The name of the website in Umami
     * @param {string} [params.shareId] - A unique string to enable a share url
     * @param {string} [params.teamId] - The ID of the team the website will be created under
     * @returns {Promise<Object>} Created website details
     */
    async createWebsite(params) {
        return this.#makeAuthenticatedRequest('/api/websites', {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Gets a website by ID
     * @param {string} websiteId - Website ID
     * @returns {Promise<Object>} Website details
     */
    async getWebsite(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}`);
    }

    /**
     * Updates a website
     * @param {string} websiteId - Website ID
     * @param {Object} params - Update parameters
     * @param {string} [params.name] - The name of the website in Umami
     * @param {string} [params.domain] - The full domain of the tracked website
     * @param {string} [params.shareId] - A unique string to enable a share url
     * @returns {Promise<Object>} Updated website details
     */
    async updateWebsite(websiteId, params) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}`, {
            method: 'POST',
            body: JSON.stringify(params),
        });
    }

    /**
     * Deletes a website
     * @param {string} websiteId - Website ID
     * @returns {Promise<string>} Confirmation message
     */
    async deleteWebsite(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}`, {
            method: 'DELETE',
        });
    }

    /**
     * Resets a website by removing all data
     * @param {string} websiteId - Website ID
     * @returns {Promise<string>} Confirmation message
     */
    async resetWebsite(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/reset`, {
            method: 'POST',
        });
    }

    /**
     * Gets the number of active users on a website
     * @param {string} websiteId - Website ID
     * @returns {Promise<Object>} Active users count
     */
    async getActiveUsers(websiteId) {
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/active`);
    }

    /**
     * Gets events within a given time range
     * @param {string} websiteId - Website ID
     * @param {Object} params - Query parameters
     * @param {number} params.startAt - Timestamp (in ms) of starting date
     * @param {number} params.endAt - Timestamp (in ms) of end date
     * @param {string} params.unit - Time unit (year | month | hour | day)
     * @param {string} params.timezone - Timezone (ex. America/Los_Angeles)
     * @param {string} [params.url] - Filter by URL
     * @param {string} [params.referrer] - Filter by referrer
     * @param {string} [params.title] - Filter by page title
     * @param {string} [params.host] - Filter by hostname
     * @param {string} [params.os] - Filter by operating system
     * @param {string} [params.browser] - Filter by browser
     * @param {string} [params.device] - Filter by device
     * @param {string} [params.country] - Filter by country
     * @param {string} [params.region] - Filter by region
     * @param {string} [params.city] - Filter by city
     * @returns {Promise<Array>} Event series data
     */
    async getEventsSeries(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/events/series?${queryString}`);
    }

    /**
     * Gets website event details within a given time range.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Query parameters.
     * @param {number} params.startAt - Timestamp (in ms) of the starting date.
     * @param {number} params.endAt - Timestamp (in ms) of the end date.
     * @param {string} [params.query] - Search text (optional).
     * @param {number} [params.page=1] - Page number (optional).
     * @param {number} [params.pageSize] - Number of results to return (optional).
     * @param {string} [params.orderBy] - Order by column name (optional).
     * @returns {Promise<{ data: Array, count: number, page: number, pageSize: number }>} Event data response.
     */
    async getWebsiteEvents(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/events?${queryString}`);
    }

    /**
     * Gets summarized website statistics.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Query parameters.
     * @param {number} params.startAt - Timestamp (in ms) of starting date.
     * @param {number} params.endAt - Timestamp (in ms) of end date.
     * @param {string} [params.url] - Filter by URL (optional).
     * @param {string} [params.referrer] - Filter by referrer (optional).
     * @param {string} [params.title] - Filter by page title (optional).
     * @param {string} [params.query] - Filter by query (optional).
     * @param {string} [params.event] - Filter by event name (optional).
     * @param {string} [params.host] - Filter by hostname (optional).
     * @param {string} [params.os] - Filter by operating system (optional).
     * @param {string} [params.browser] - Filter by browser (optional).
     * @param {string} [params.device] - Filter by device (e.g., Mobile, optional).
     * @param {string} [params.country] - Filter by country (optional).
     * @param {string} [params.region] - Filter by region/state/province (optional).
     * @param {string} [params.city] - Filter by city (optional).
     * @returns {Promise<{ pageviews: { value: number, prev: number }, visitors: { value: number, prev: number }, visits: { value: number, prev: number }, bounces: { value: number, prev: number }, totaltime: { value: number, prev: number } }>} Summarized website statistics.
     */
    async getWebsiteStats(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/stats?${queryString}`);
    }


    /**
     * Gets event data names, properties, and counts.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Query parameters.
     * @param {number} params.startAt - Timestamp (in ms) of the starting date.
     * @param {number} params.endAt - Timestamp (in ms) of the end date.
     * @param {string} [params.event] - Event name filter (optional).
     * @returns {Promise<Array<{ eventName: string, propertyName: string, dataType: number, total: number }>>} Event data summary.
     */
    async getEventDataEvents(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/event-data/events?${queryString}`);
    }

    /**
     * Gets event data property and value counts within a given time range.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Query parameters.
     * @param {number} params.startAt - Timestamp (in ms) of the starting date.
     * @param {number} params.endAt - Timestamp (in ms) of the end date.
     * @returns {Promise<Array<{ propertyName: string, dataType: number, value: string, total: number }>>} Event data fields.
     */
    async getEventDataFields(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/event-data/fields?${queryString}`);
    }

    /**
     * Gets event data counts for a given event and property.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Query parameters.
     * @param {number} params.startAt - Timestamp (in ms) of the starting date.
     * @param {number} params.endAt - Timestamp (in ms) of the end date.
     * @param {string} params.eventName - The name of the event.
     * @param {string} params.propertyName - The property name.
     * @returns {Promise<Array<{ value: string, total: number }>>} Event data values.
     */
    async getEventDataValues(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/event-data/values?${queryString}`);
    }


    /**
     * Gets summarized website events, fields, and records within a given time range.
     * @param {string} websiteId - The ID of the website.
     * @param {Object} params - Query parameters.
     * @param {number} params.startAt - Timestamp (in ms) of the starting date.
     * @param {number} params.endAt - Timestamp (in ms) of the end date.
     * @returns {Promise<Array<{ events: number, fields: number, records: number }>>} Summary of events, fields, and records.
     */
    async getEventDataStats(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/event-data/stats?${queryString}`);
    }





    /**
     * Gets pageviews within a given time range
     * @param {string} websiteId - Website ID
     * @param {Object} params - Query parameters
     * @param {number} params.startAt - Timestamp (in ms) of starting date
     * @param {number} params.endAt - Timestamp (in ms) of end date
     * @param {string} params.unit - Time unit (year | month | hour | day)
     * @param {string} params.timezone - Timezone (ex. America/Los_Angeles)
     * @param {string} [params.url] - Filter by URL
     * @param {string} [params.referrer] - Filter by referrer
     * @param {string} [params.title] - Filter by page title
     * @param {string} [params.host] - Filter by hostname
     * @param {string} [params.os] - Filter by operating system
     * @param {string} [params.browser] - Filter by browser
     * @param {string} [params.device] - Filter by device
     * @param {string} [params.country] - Filter by country
     * @param {string} [params.region] - Filter by region
     * @param {string} [params.city] - Filter by city
     * @returns {Promise<Object>} Pageview data
     */
    async getPageviews(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/pageviews?${queryString}`);
    }

    /**
     * Gets metrics for a given time range
     * @param {string} websiteId - Website ID
     * @param {Object} params - Query parameters
     * @param {number} params.startAt - Timestamp (in ms) of starting date
     * @param {number} params.endAt - Timestamp (in ms) of end date
     * @param {string} params.type - Metrics type (url | referrer | browser | os | device | country | event)
     * @param {string} [params.url] - Filter by URL
     * @param {string} [params.referrer] - Filter by referrer
     * @param {string} [params.title] - Filter by page title
     * @param {string} [params.query] - Filter by query
     * @param {string} [params.host] - Filter by hostname
     * @param {string} [params.os] - Filter by operating system
     * @param {string} [params.browser] - Filter by browser
     * @param {string} [params.device] - Filter by device
     * @param {string} [params.country] - Filter by country
     * @param {string} [params.region] - Filter by region
     * @param {string} [params.city] - Filter by city
     * @param {string} [params.language] - Filter by language
     * @param {string} [params.event] - Filter by event
     * @param {number} [params.limit=500] - Number of events returned
     * @returns {Promise<Array>} Metrics data
     */
    async getMetrics(websiteId, params) {
        const queryString = this.#formatQueryParams(params);
        return this.#makeAuthenticatedRequest(`/api/websites/${websiteId}/metrics?${queryString}`);
    }

    /**
    * Sends an event to Umami
    * @param {EventPayload} payload - Event data
    * @returns {Promise<void>}
    */
    async sendEvent(payload) {
        // No authentication needed for /api/send
        const response = await fetch(`${this.baseUrl}/api/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': navigator.userAgent, // Required for event registration
            },
            body: JSON.stringify({
                payload: {
                    hostname: payload.hostname || window.location.hostname,
                    language: payload.language || navigator.language,
                    referrer: payload.referrer || document.referrer,
                    screen: payload.screen || `${window.screen.width}x${window.screen.height}`,
                    title: payload.title || document.title,
                    url: payload.url || window.location.pathname,
                    website: payload.website,
                    name: payload.name,
                    data: payload.data,
                },
                type: 'event',
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to send event: ${response.statusText}`);
        }
    }

}

export default UmamiClient;