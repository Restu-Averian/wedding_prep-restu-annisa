export type ItemRow = {
  id: string;
  name: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  estimated_amount: number;
  selected_candidate_id: string | null;
  agreed_amount: number | null;
  effective_amount: number;
  paid_amount: number;
  remaining_amount: number;
};
