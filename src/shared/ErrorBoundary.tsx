import React from 'react'

type ErrorBoundaryState = { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Unhandled error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="motion-card rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-card">
          <h2 className="text-xl font-semibold text-ink">Something went wrong.</h2>
          <p className="mt-2 text-sm text-ink/70">
            Try refreshing the page. If the issue persists, the app may need attention.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
