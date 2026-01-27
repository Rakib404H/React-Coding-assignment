export function LoadingSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-12 w-full animate-pulse rounded-2xl bg-ink/5"
        />
      ))}
    </div>
  )
}
