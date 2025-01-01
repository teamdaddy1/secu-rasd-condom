interface FooterProps {
  hackerName: string;
}

export default function Footer({ hackerName }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/80 text-xs sm:text-sm text-red-500 p-2 text-center z-50">
      Cyber Attack Demo by {hackerName} | Just for fun and learning!
    </footer>
  )
}

