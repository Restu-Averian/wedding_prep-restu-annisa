import type { ReactNode } from 'react'
import { InfoIcon, SearchIcon } from '../../asset'
import { FeedbackCard, InlineAlertBanner } from '../../styles/Feedback.styles'

export interface StatusFeedbackProps {
  type?: 'error' | 'empty' | 'access'
  title?: string
  message: string
  onRetry?: () => void
  action?: ReactNode
  inline?: boolean
}

export function StatusFeedback({
  type = 'error',
  title,
  message,
  onRetry,
  action,
  inline = false,
}: StatusFeedbackProps) {
  const isAlert = type === 'error' || type === 'access'

  if (inline) {
    return (
      <InlineAlertBanner role="alert">
        <div className="alert-content">
          <InfoIcon size={18} aria-hidden="true" />
          <span className="alert-text">{message}</span>
        </div>
        {onRetry && (
          <button type="button" className="retry-btn" onClick={onRetry}>
            Coba lagi
          </button>
        )}
      </InlineAlertBanner>
    )
  }

  const defaultTitle =
    type === 'access'
      ? 'Akses Terbatas'
      : type === 'error'
        ? 'Terjadi Kendala'
        : 'Tidak Ada Data'

  return (
    <FeedbackCard $tone={isAlert ? 'alert' : 'neutral'} role={isAlert ? 'alert' : 'status'}>
      <div className="icon-wrapper" aria-hidden="true">
        {type === 'empty' ? <SearchIcon size={24} /> : <InfoIcon size={24} />}
      </div>
      <h2>{title ?? defaultTitle}</h2>
      <p>{message}</p>
      {(onRetry || action) && (
        <div className="actions">
          {onRetry && (
            <button
              type="button"
              className={isAlert ? 'primary-btn' : 'secondary-btn'}
              onClick={onRetry}
            >
              Coba lagi
            </button>
          )}
          {action}
        </div>
      )}
    </FeedbackCard>
  )
}
