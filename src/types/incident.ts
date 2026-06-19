export type IncidentPriority = "low" | "medium" | "high";
export type IncidentStatus = "open" | "closed" | "on_pause";

export interface IncidentType {
  id: string;
  key: string;
  name: string;
  name_en: string;
}

export interface IncidentProject {
  id: string;
  name: string;
}

export interface IncidentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface IncidentMedia {
  id: string;
  type: "image" | "video" | "document";
  url: string;
}

export interface IncidentCoordinates {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  sequenceId: string;
  title: string;
  description: string;
  type: IncidentType;
  priority: IncidentPriority;
  status: IncidentStatus;
  approval: boolean;
  project: IncidentProject;
  owner: IncidentUser;
  assignees: IncidentUser[];
  observers: IncidentUser[];
  coordinates: IncidentCoordinates;
  locationDescription: string;
  dueDate: string | null;
  closingDate: string | null;
  media: IncidentMedia[];
  tags: string[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentFilters {
  status: IncidentStatus | "all";
  priority: IncidentPriority | "all";
  category: string;
  project: string;
  query: string;
}

export interface CreateIncidentInput {
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: IncidentPriority;
  locationDescription: string;
  lat?: number;
  lng?: number;
}

export interface DashboardStats {
  total: number;
  open: number;
  closed: number;
  onPause: number;
  highPriority: number;
  overdue: number;
}
