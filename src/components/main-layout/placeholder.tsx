export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="grid place-items-center h-[70vh] text-center">
      <div>
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          Skeleton page — wire up functionality next.
        </p>
      </div>
    </section>
  );
}
