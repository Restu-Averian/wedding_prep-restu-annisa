import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/planning/Header";
import Filter from "../../components/planning/Filter";
import List from "../../components/planning/List";
import ItemDrawer from "../../components/planning/ItemDrawer";
import { StatusFeedback } from "../../components/common/StatusFeedback";
import { ItemListSkeleton } from "../../components/common/Skeletons";
import { useApi } from "../../api/client";
import type { Category, WeddingItem } from "../../context/planning/types";
import { PlanningPage } from "../../styles/Planning.styles";

export default function Planning() {
  const [params, setParams] = useSearchParams();

  const [adding, setAdding] = useState(false);

  const categories = useApi<Category[]>("/categories");

  const category = categories.data?.find(
    (entry) => entry.slug === params.get("kategori"),
  );

  const search = params.get("q") ?? "";

  const query = new URLSearchParams({
    q: search,
    selection: params.get("selection") ?? "all",
  });

  if (params.get("kategori")) {
    query.set("category", params.get("kategori")!);
  }

  const items = useApi<WeddingItem[]>(`/items?${query}`);

  function updateFilter(key: string, value: string) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }

  return (
    <PlanningPage>
      <Header
        onAdd={() => setAdding(true)}
        canAdd={Boolean(categories.data)}
      />
      <Filter
        search={search}
        selection={params.get("selection") ?? "all"}
        selectedCategoryId={category?.id}
        onUpdateFilter={updateFilter}
        categoryList={categories.data ?? []}
      />
      {(items.loading || categories.loading) && <ItemListSkeleton count={6} />}

      {categories.error && (
        <StatusFeedback
          type="error"
          title="Gagal Memuat Kategori"
          message={categories.error}
          onRetry={categories.retry}
        />
      )}

      {items.error && (
        <StatusFeedback
          type="error"
          title="Gagal Memuat Kebutuhan"
          message={items.error}
          onRetry={items.retry}
        />
      )}

      {!items.loading && items.data && (
        <List items={items.data} queryString={params.toString()} />
      )}

      {adding && categories.data && (
        <ItemDrawer
          categories={categories.data}
          categoryId={category?.id}
          onClose={() => setAdding(false)}
          onSaved={items.retry}
        />
      )}
    </PlanningPage>
  );
}
