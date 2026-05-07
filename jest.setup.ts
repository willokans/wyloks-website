import '@testing-library/jest-dom';

// Next.js server internals check for globalThis.Response at module load time.
// Node 16 doesn't have it natively, so we provide a minimal stub.
// The actual NextResponse is mocked per-test in API route tests.
if (typeof global.Response === 'undefined') {
  (global as unknown as Record<string, unknown>).Response = class {};
}
