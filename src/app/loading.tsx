export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="text-center">
        <div
          className="h-8 w-8 animate-spin mx-auto mb-6 rounded-full border-2"
          style={{ borderColor: 'rgba(22,18,11,0.1)', borderTopColor: 'var(--terra)' }}
        />
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--ink-muted)' }}>
          Loading
        </p>
      </div>
    </div>
  );
}
