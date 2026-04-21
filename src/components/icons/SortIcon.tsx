export function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  if (!sorted)
    return (
      <svg
        className="w-3 h-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      ></svg>
    );
  return (
    <svg
      className="w-3 h-3 text-indigo-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {sorted === "asc" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      )}
    </svg>
  );
}
