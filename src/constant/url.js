//role is admin
const CAPSTONE_TEAM_URL = "/capstone-team";
const CAPSTONE_COUNCIL_URL = "/capstone-council";

// role is teacher and student { has same page but student dont have teacher's feature}
const HOME_URL = "/home";
//role is guest
const LOGIN_URL = "/login";
export { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL, HOME_URL, LOGIN_URL };

const ADMIN_ROLE = [CAPSTONE_COUNCIL_URL, CAPSTONE_TEAM_URL];

const GUEST_ROLE = [LOGIN_URL];
