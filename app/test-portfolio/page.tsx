import { MainLayout } from "@/presentation/templates/main-layout";
import TestPortfolioLayout from "./ui/TestPortfolioLayout";

export default function TestPortfolioPage() {
  return (
    <MainLayout showFooter={false}>
      <TestPortfolioLayout />
    </MainLayout>
  );
}
