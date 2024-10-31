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