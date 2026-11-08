import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { SearchIcon } from "../asset";
import { FeedbackCard } from "../styles/Feedback.styles";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(70vh - 120px);
  padding: 24px 0;
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <FeedbackCard style={{ maxWidth: "520px" }}>
        <div className="icon-wrapper" aria-hidden="true">
          <SearchIcon size={26} />
        </div>

        <h2>Halaman Tidak Ditemukan</h2>

        <p>
          Halaman yang Anda tuju mungkin salah ketik, telah dipindahkan, atau
          belum tersedia.
        </p>

        <div className="actions">
          <Link to="/" className="primary-btn">
            Kembali ke Beranda
          </Link>

          <Link to="/rencana" className="secondary-btn">
            Buka Rencana
          </Link>
        </div>
      </FeedbackCard>
    </NotFoundContainer>
  );
}
