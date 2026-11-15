import { styled } from "styled-components";
import { PlanningPage } from "./Planning.styles";

export const DeletePage = styled(PlanningPage)`
  .deletion-list {
    display: grid;
    gap: 12px;
  }
  .deletion-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  .deletion-row > div {
    min-width: 0;
    flex: 1 1 200px;
    overflow-wrap: anywhere;
  }
  .deletion-row h2 {
    margin: 6px 0 8px;
    font-size: 1.125rem;
  }
  .deletion-row p {
    margin: 0;
    font-size: 0.875rem;
  }
  .delete-button {
    border: 1px solid #a34031;
    background: #a34031;
    color: #fffaf2;
  }
  .delete-button:hover:not(:disabled) {
    background: #863226;
  }
`;
