import AppShell from "@/components/layout/AppShell";
import { incidentsMockData } from "@/data/incidents";

export default function HomePage() {
  return <AppShell initialIncidents={incidentsMockData} />;
}
