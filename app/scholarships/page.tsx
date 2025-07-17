/* eslint-disable @typescript-eslint/no-explicit-any */
// app/scholarships/page.tsx
'use client';
import { useState } from 'react';

const mockScholarships = [
  {
    id: 1,
    type: 'Merit-based',
    stream: 'Engineering',
    location: 'Delhi',
    colleges: ['IIT Delhi', 'IIT Bombay']
  },
  {
    id: 2,
    type: 'Need-based',
    stream: 'Arts',
    location: 'Delhi',
    colleges: ['Delhi University']
  },
  {
    id: 3,
    type: 'Government Scholarships',
    stream: 'Medical',
    location: 'Mumbai',
    colleges: ['AIIMS Mumbai']
  }
];

export default function ScholarshipExplorerPage() {
  const [filters, setFilters] = useState({ stream: '', location: '' });
  const [results, setResults] = useState<any[]>(mockScholarships);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);

    const filtered = mockScholarships.filter(s =>
      (!newFilters.stream || s.stream.toLowerCase().includes(newFilters.stream.toLowerCase())) &&
      (!newFilters.location || s.location.toLowerCase().includes(newFilters.location.toLowerCase()))
    );

    setResults(filtered);
  };

  return (
    <section className='min-h-screen'>
      <h2 className="text-xl font-bold mb-4">🎓 Scholarship Explorer</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Stream</label>
          <select name="stream" value={filters.stream} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">-- All Streams --</option>
            <option value="Engineering">Engineering</option>
            <option value="Arts">Arts</option>
            <option value="Medical">Medical</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter city"
          />
        </div>
      </div>

      {results.length === 0 ? (
        <p>No scholarships match your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((scholarship) => (
            <li key={scholarship.id} className="border p-4 rounded shadow-sm">
              <h4 className="font-semibold text-lg">{scholarship.type}</h4>
              <p className="text-sm text-gray-600 mb-1">Stream: {scholarship.stream} • Location: {scholarship.location}</p>
              <p className="text-sm">Eligible Colleges: {scholarship.colleges.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
