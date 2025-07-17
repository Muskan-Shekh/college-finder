/* eslint-disable @typescript-eslint/no-explicit-any */
// app/saved/page.tsx
'use client';
import { useEffect, useState } from 'react';

const mockColleges = [
  {
    id: 1,
    name: 'IIT Delhi',
    location: 'Delhi',
    stream: 'Engineering',
    budget: 5,
    cutoff: '98%',
    placement: '28 LPA'
  },
  {
    id: 2,
    name: 'Delhi University',
    location: 'Delhi',
    stream: 'Arts',
    budget: 2,
    cutoff: '92%',
    placement: '6 LPA'
  },
  {
    id: 3,
    name: 'IIT Bombay',
    location: 'Mumbai',
    stream: 'Engineering',
    budget: 6,
    cutoff: '99%',
    placement: '30 LPA'
  }
];

export default function SavedCollegesPage() {
  const [saved, setSaved] = useState<number[]>([]);
  const [savedColleges, setSavedColleges] = useState<any[]>([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('savedColleges') || '[]');
    setSaved(ids);
    setSavedColleges(mockColleges.filter(c => ids.includes(c.id)));
  }, []);

  const removeCollege = (id: number) => {
    const updated = saved.filter(i => i !== id);
    setSaved(updated);
    setSavedColleges(mockColleges.filter(c => updated.includes(c.id)));
    localStorage.setItem('savedColleges', JSON.stringify(updated));
  };

  return (
    <section className='min-h-screen'>
      <h2 className="text-xl font-bold mb-4">❤️ Saved Colleges</h2>

      {savedColleges.length === 0 ? (
        <p>No colleges saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {savedColleges.map(college => (
            <li key={college.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-semibold text-lg">{college.name}</h3>
              <p className="text-sm text-gray-600">{college.location} • {college.stream}</p>
              <p>Budget: ₹{college.budget} L • Cutoff: {college.cutoff} • Placement: {college.placement}</p>
              <button
                onClick={() => removeCollege(college.id)}
                className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
