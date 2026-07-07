const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const PERMISSIONS = {
  READ_PLAYERS: "read_players",
  WRITE_PLAYERS: "write_players",
  READ_ANALYTICS: "read_analytics",
  ACCESS_DASHBOARD: "access_dashboard",
};

const ROLE_PERMISSIONS = {
  [ROLES.USER]: [PERMISSIONS.READ_PLAYERS],
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_PLAYERS,
    PERMISSIONS.WRITE_PLAYERS,
    PERMISSIONS.READ_ANALYTICS,
    PERMISSIONS.ACCESS_DASHBOARD,
  ],
};

const hasPermission = (role, permission) => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

module.exports = {
  ROLES,
  PERMISSIONS,
  hasPermission,
};
