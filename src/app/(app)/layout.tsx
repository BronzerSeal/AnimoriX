import MainHeader from "@/widgets/main-header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute left-5 right-5 top-5 z-50">
        <MainHeader />
      </div>
      {children}
    </>
  );
}
