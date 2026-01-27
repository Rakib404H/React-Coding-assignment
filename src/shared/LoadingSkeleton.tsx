export function LoadingSkeleton({
  rows = 6,
  className = ''
}: {
  rows?: number
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-12 w-full rounded-2xl"
        />
      ))}
    </div>
  )
}
