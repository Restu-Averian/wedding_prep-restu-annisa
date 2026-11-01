import { useSearchParams } from "react-router-dom";
import { Header } from "../../components/planning/Header";
import { Filter } from "../../components/planning/Filter";
import { List } from "../../components/planning/List";
import { CATEGORIES, ITEMS } from "../../data/wedding";
import { PlanningPage } from "../../styles/Planning.styles";

export default function Planning() {
  const [params, setParams] = useSearchParams();

  const category = CATEGORIES.find(({ id }) => id === params.get("kategori"));

  const search = params.get("q") ?? "";

  const visibleItems = ITEMS.filter(
    (item) =>
      (!category || item.categoryId === category.id) &&
      item.name
        .toLocaleLowerCase("id-ID")
        .includes(search.trim().toLocaleLowerCase("id-ID")),
  );

  function updateFilter(key: string, value: string) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace: true },
    );
  }

  return (
    <PlanningPage>
      <Header />

      <Filter
        search={search}
        selectedCategoryId={category?.id}
        onUpdateFilter={updateFilter}
      />

      <List
        items={visibleItems}
        queryString={params.size ? params.toString() : ""}
      />
    </PlanningPage>
  );
}
