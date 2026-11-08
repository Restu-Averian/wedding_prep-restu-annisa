import { styled } from "styled-components";
import { ShimmerBlock } from "../../styles/Feedback.styles";

const SkeletonCardContainer = styled.div`
  display: grid;
  gap: 20px;
  padding: 24px;
  border: 1px solid #e7d9ca;
  border-radius: 20px;
  background: #fffdf9;
  box-sizing: border-box;
  width: 100%;

  .stat-grid-skeleton {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #ede3d7;
  }

  @media (max-width: 600px) {
    .stat-grid-skeleton {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
`;

export function FinancialCardSkeleton() {
  return (
    <SkeletonCardContainer
      aria-busy="true"
      aria-label="Memuat ringkasan keuangan"
    >
      <div style={{ display: "grid", gap: "8px" }}>
        <ShimmerBlock $height="14px" $width="120px" />

        <ShimmerBlock $height="38px" $width="220px" $radius="10px" />
      </div>
      <div className="stat-grid-skeleton">
        <div>
          <ShimmerBlock
            $height="12px"
            $width="70px"
            style={{ marginBottom: "6px" }}
          />

          <ShimmerBlock $height="22px" $width="90%" $radius="6px" />
        </div>
        <div>
          <ShimmerBlock
            $height="12px"
            $width="70px"
            style={{ marginBottom: "6px" }}
          />

          <ShimmerBlock $height="22px" $width="90%" $radius="6px" />
        </div>
        <div>
          <ShimmerBlock
            $height="12px"
            $width="70px"
            style={{ marginBottom: "6px" }}
          />

          <ShimmerBlock $height="22px" $width="90%" $radius="6px" />
        </div>
      </div>
    </SkeletonCardContainer>
  );
}

const CategoryGridSkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  width: 100%;

  .category-skeleton-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 14px 16px;
    border: 1px solid #e7d9ca;
    border-radius: 16px;
    background: #fffdf9;
    min-height: 124px;
    box-sizing: border-box;
  }
`;

export function CategoryGridSkeleton() {
  return (
    <CategoryGridSkeletonContainer
      aria-busy="true"
      aria-label="Memuat kategori"
    >
      {[1, 2, 3, 4, 5].map((key) => (
        <div key={key} className="category-skeleton-item">
          <ShimmerBlock
            $width="42px"
            $height="42px"
            $radius="12px"
            style={{ marginBottom: "12px" }}
          />

          <ShimmerBlock $width="70%" $height="14px" $radius="6px" />
        </div>
      ))}
    </CategoryGridSkeletonContainer>
  );
}

export function ItemListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul
      className="item-grid"
      aria-busy="true"
      aria-label="Memuat daftar kebutuhan"
    >
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <div
            className="panel item-card item-skeleton-card"
            aria-hidden="true"
          >
            <div className="card-top">
              <div className="card-icon-wrapper" aria-hidden="true">
                <ShimmerBlock $width="100%" $height="100%" $radius="inherit" />
              </div>

              <ShimmerBlock $width="78px" $height="20px" $radius="999px" />
            </div>

            <div className="card-body">
              <ShimmerBlock
                $width="52px"
                $height="11px"
                $radius="4px"
                style={{ marginBottom: "6px" }}
              />

              <ShimmerBlock
                $width="82%"
                $height="16px"
                $radius="4px"
              />
            </div>

            <p className="price">
              <ShimmerBlock $width="55%" $height="16px" $radius="4px" />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const DetailSkeletonContainer = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;

  .detail-header-skeleton {
    padding: 24px;
    border: 1px solid #e7d9ca;
    border-radius: 20px;
    background: #fffdf9;
  }
`;

export function DetailSkeleton() {
  return (
    <DetailSkeletonContainer aria-busy="true" aria-label="Memuat kebutuhan">
      <ShimmerBlock $width="140px" $height="16px" style={{ margin: "4px 0" }} />

      <div className="detail-header-skeleton">
        <ShimmerBlock
          $width="80px"
          $height="12px"
          style={{ marginBottom: "8px" }}
        />

        <ShimmerBlock
          $width="60%"
          $height="28px"
          style={{ marginBottom: "16px" }}
        />

        <ShimmerBlock $width="40%" $height="20px" />
      </div>

      <div
        style={{
          display: "flex",
          gap: "6px",
          padding: "4px",
          background: "#f2e9df",
          borderRadius: "14px",
        }}
      >
        <ShimmerBlock $height="38px" $radius="10px" />

        <ShimmerBlock $height="38px" $radius="10px" />
      </div>

      <div
        style={{
          padding: "24px",
          border: "1px solid #e7d9ca",
          borderRadius: "18px",
          background: "#fffdf9",
        }}
      >
        <ShimmerBlock $height="100px" $radius="12px" />
      </div>
    </DetailSkeletonContainer>
  );
}
