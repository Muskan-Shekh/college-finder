// app/placements/page.tsx
'use client';
import { useState } from 'react';

const mockPlacements = [
  {
    college: 'IIT Delhi',
    stream: 'Engineering',
    averageCTC: '22 LPA',
    highestCTC: '55 LPA',
    placementRate: '94%',
    topCompanies: ['Google', 'Amazon', 'Microsoft']
  },
  {
    college: 'Delhi University',
    stream: 'Arts',
    averageCTC: '6 LPA',
    highestCTC: '12 LPA',
    placementRate: '75%',
    topCompanies: ['TCS', 'Wipro', 'Infosys']
  },
  {
    college: 'IIT Bombay',
    stream: 'Engineering',
    averageCTC: '23 LPA',
    highestCTC: '58 LPA',
    placementRate: '96%',
    topCompanies: ['Apple', 'Google', 'Meta']
  }
];

export default function PlacementStatsPage() {
  const [filters, setFilters] = useState({ college: '', stream: '' });
  const [results, setResults] = useState(mockPlacements);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);

    const filtered = mockPlacements.filter(p =>
      (!newFilters.college || p.college.toLowerCase().includes(newFilters.college.toLowerCase())) &&
      (!newFilters.stream || p.stream.toLowerCase().includes(newFilters.stream.toLowerCase()))
    );

    setResults(filtered);
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">📈 Placement Stats</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">College</label>
          <input
            type="text"
            name="college"
            value={filters.college}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter college name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stream</label>
          <select name="stream" value={filters.stream} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">-- All Streams --</option>
            <option value="Engineering">Engineering</option>
            <option value="Arts">Arts</option>
            <option value="Medical">Medical</option>
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <p>No placement data found for your selection.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((placement, index) => (
            <li key={index} className="border p-4 rounded shadow-sm">
              <h4 className="font-semibold text-lg">{placement.college} – {placement.stream}</h4>
              <p className="text-sm text-gray-600">Placement Rate: {placement.placementRate}</p>
              <p>Avg CTC: <strong>{placement.averageCTC}</strong> | Highest: <strong>{placement.highestCTC}</strong></p>
              <p>Top Recruiters: <span className="text-blue-700">{placement.topCompanies.join(', ')}</span></p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
