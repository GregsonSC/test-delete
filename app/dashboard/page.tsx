import DashboardPage from "../../presentation/pages/dashboard/dashboard-page";
import { MainLayout } from "@/presentation/templates/main-layout";
export default function Dashboard() {
  return (
    <MainLayout showFooter={false}>
      <DashboardPage />
    </MainLayout>
  );
}
