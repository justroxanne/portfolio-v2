export default function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="48"
        d="m268 112 144 144-144 144m124-144H100"
      ></path>
    </svg>
  );
}
