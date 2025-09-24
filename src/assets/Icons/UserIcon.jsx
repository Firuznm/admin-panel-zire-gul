
export default function UserIcon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 21c0-2.21 3.134-4 7-4s7 1.79 7 4M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10"
      ></path>
    </svg>
  );
}
