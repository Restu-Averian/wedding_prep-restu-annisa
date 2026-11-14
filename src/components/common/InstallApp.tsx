import { useState, useSyncExternalStore } from "react";
import { styled } from "styled-components";
import {
  getInstallSnapshot,
  promptInstall,
  subscribeInstall,
} from "../../installApp";
import { CloseIcon, DownloadIcon, ShareIcon } from "../../asset";

const DISMISS_KEY = "pwa_install_dismissed_until";
const DISMISS_DURATION_MS = 14 * 24 * 60 * 60 * 1000; // 14 hari

function checkIsDismissed(): boolean {
  try {
    const item = localStorage.getItem(DISMISS_KEY);
    if (!item) return false;
    const expiresAt = Number(item);
    return !Number.isNaN(expiresAt) && Date.now() < expiresAt;
  } catch {
    return false;
  }
}

const InstallCard = styled.aside`
  position: relative;
  border: 1px solid #ebdcd0;
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #fbf5ee 100%);
  box-shadow: 0 4px 16px rgba(87, 67, 52, 0.05);
  padding: 16px 18px;
  color: #574334;

  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .card-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .app-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f3e8dc;
    color: #574334;
    flex-shrink: 0;
  }

  .header-content {
    flex: 1;
    min-width: 0;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #493426;
  }

  .description {
    font-size: 0.8125rem;
    color: #7d6857;
    margin-top: 3px;
    line-height: 1.4;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: #9c8a7c;
    cursor: pointer;
    flex-shrink: 0;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    &:hover {
      background: #eee0d3;
      color: #574334;
    }
  }

  .install-error {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #b43b3b;
  }
`;

const InstallCTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 42px;
  margin-top: 14px;
  padding: 10px 18px;
  border: 0;
  border-radius: 9999px;
  background: #574334;
  color: #fffdf9;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(87, 67, 52, 0.16);
  transition:
    background 0.15s ease,
    transform 0.1s ease;

  &:hover {
    background: #443327;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    width: fit-content;
  }
`;

const IOSGuideBox = styled.div`
  margin-top: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #ebdcd0;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.8125rem;
  color: #645143;

  .ios-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.45;
  }

  .step-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #eeddcf;
    color: #574334;
    font-weight: 700;
    font-size: 0.6875rem;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .step-text {
    flex: 1;

    strong {
      color: #493426;
      font-weight: 600;
    }

    svg {
      display: inline-block;
      vertical-align: -2px;
      margin: 0 2px;
    }
  }
`;

export default function InstallApp() {
  const [dismissed, setDismissed] = useState(checkIsDismissed);
  const { available, installed, ios, error } = useSyncExternalStore(
    subscribeInstall,
    getInstallSnapshot,
  );

  const handleDismiss = () => {
    try {
      localStorage.setItem(
        DISMISS_KEY,
        String(Date.now() + DISMISS_DURATION_MS),
      );
    } catch {
      // ignore storage failure
    }
    setDismissed(true);
  };

  if (dismissed || installed || (!available && !ios && !error)) return null;

  return (
    <InstallCard aria-label="Instalasi aplikasi wedding">
      <div className="card-header">
        <div className="card-header-left">
          <div className="app-icon" aria-hidden="true">
            <DownloadIcon size={20} />
          </div>

          <div className="header-content">
            <div className="title-row">
              <span className="title">Pasang Aplikasi</span>
            </div>
            <p className="description">
              Install agar ga selalu buka chrome lgi ya, Sayang
            </p>
          </div>
        </div>

        <button
          type="button"
          className="close-button"
          onClick={handleDismiss}
          aria-label="Tutup rekomendasi instalasi"
        >
          <CloseIcon size={14} />
        </button>
      </div>

      {available ? (
        <InstallCTAButton
          type="button"
          onClick={() => {
            void promptInstall();
          }}
        >
          <DownloadIcon size={16} />
          <span>Pasang ke Layar Utama</span>
        </InstallCTAButton>
      ) : ios ? (
        <IOSGuideBox>
          <div className="ios-step">
            <span className="step-badge">1</span>
            <span className="step-text">
              Ketuk tombol <strong>Bagikan</strong> (<ShareIcon size={13} />) di
              menu bar Safari bawah.
            </span>
          </div>
          <div className="ios-step">
            <span className="step-badge">2</span>
            <span className="step-text">
              Gulir ke bawah dan pilih
              <strong>Tambahkan ke Layar Utama</strong> (Add to Home Screen).
            </span>
          </div>
        </IOSGuideBox>
      ) : null}

      {error && (
        <p className="install-error" role="status">
          {error}
        </p>
      )}
    </InstallCard>
  );
}
