"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-dark-300 p-6 text-center text-white">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="max-w-md text-light-700">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-md bg-green-500 px-4 py-2 font-medium text-dark-300 hover:bg-green-400"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
