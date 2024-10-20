const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const userEndpoints = {
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    CHECK_AUTH: BASE_URL + "/user/checkAuth",
}

// GRAPH ENDPOINTS
export const graphEndpoints = {
    TEST_DATA: BASE_URL + "/graph/testData",
    GRAPH_DATA: BASE_URL + "/graph/graphdata",
    GRAPH_API: BASE_URL + "/graph/auth/graph",
}