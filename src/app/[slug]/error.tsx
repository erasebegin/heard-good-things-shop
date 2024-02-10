"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full w-full mt-20 flex justify-center">
      <div className="bg-pink-100 text-red-800 shadow-pink flex flex-col gap-5 items-center justify-center p-10 rounded-md">
        <h2 className="text-xl">Something went wrong!</h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-pink-200 rounded-md text-white p-3"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
