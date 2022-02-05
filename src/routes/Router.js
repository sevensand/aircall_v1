import {
  ActivityFeed,
  Archive
} from "../pages";

export const PublicPages = [
  { path: "/", exact: true, component: ActivityFeed },
  { path: "/archive", exact: true, component: Archive },
];
