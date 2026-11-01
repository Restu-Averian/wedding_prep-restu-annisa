import { CategoryGrid } from "../components/home/CategoryGrid";
import { FinancialCard } from "../components/home/FinancialCard";
import { Header } from "../components/home/Header";
import { HomeDashboard } from "../styles/Home.styles";

export default function Home() {
  return (
    <HomeDashboard>
      <Header />

      <FinancialCard />

      <CategoryGrid />
    </HomeDashboard>
  );
}
