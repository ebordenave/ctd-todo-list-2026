export default function Spinner() {
  return (
    <div
      className="animate-spin bg-white shrink-0"
      style={{
        width: '20px',
        height: '20px',
        mask: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12a9 9 0 1 1-6.219-8.56'/></svg>\") no-repeat center",
        WebkitMask:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12a9 9 0 1 1-6.219-8.56'/></svg>\") no-repeat center",
      }}
    />
  )
}
