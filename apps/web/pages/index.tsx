import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">PYRO — Appointments (Dev)</h1>
      <p className="mt-4">Example: Open a public form link</p>
      <ul className="mt-4 list-disc ml-6">
        <li>
          <Link href="/f/test-form">Open demo form</Link>
        </li>
      </ul>
    </main>
  );
}
