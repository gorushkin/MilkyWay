import { Role } from '../store';

export const getRouteInfo = (level: Role, role: Role): boolean => {
  if (level === Role.Guest) return true;
  if (level === Role.User) return role === Role.User || role === Role.Admin;
  if (level === Role.Admin) return role === Role.Admin;
  return false;
};
