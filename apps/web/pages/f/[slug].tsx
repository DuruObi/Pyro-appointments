import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PublicForm() {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };
  const [schema, setSchema] = useState<any>(null);
  const [values, setValues] = useState<any>({});

  useEffect(() => {
    if (!slug) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/forms/${slug}`).then((res) => {
      if (res.data?.schema) setSchema(res.data.schema);
    });
  }, [slug]);

  if (!schema) return <p className="p-8">Loading...</p>;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // minimal post
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/forms/${schema.slug}/bookings`, {
      name: values.name,
      email: values.email,
      slot: values.slot,
      data: values,
    });
    alert('Submitted — check API server logs');
  };

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-2xl font-semibold">{schema.title || 'Booking'}</h2>
      <form onSubmit={onSubmit} className="mt-4">
        <label className="block mb-2">Name</label>
        <input required onChange={(e) => setValues((p: any) => ({ ...p, name: e.target.value }))} />

        <label className="block mt-4 mb-2">Email</label>
        <input required onChange={(e) => setValues((p: any) => ({ ...p, email: e.target.value }))} />

        <label className="block mt-4 mb-2">Preferred slot (ISO date)</label>
        <input required onChange={(e) => setValues((p: any) => ({ ...p, slot: e.target.value }))} />

        <button className="mt-4" type="submit">Book</button>
      </form>
    </div>
  );
}
