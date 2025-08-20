export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-12 md:py-20">
      {children}
    </div>
  );
}