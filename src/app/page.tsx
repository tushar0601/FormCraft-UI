export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-semibold mb-2">FormCraft</h1>
        <p className="text-muted-foreground mb-4">
          Build and share forms in minutes.
        </p>
        <a
          href="/login"
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-accent"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
