/* eslint-disable @typescript-eslint/no-explicit-any */
// app/compare/page.tsx
'use client';
import { useState } from 'react';
import CollegeCard from '../../components/CollegeCard';
// import { useRouter } from 'next/navigation';

const mockColleges = [
  {
    id: 1,
    name: 'IIT Delhi',
    location: 'Delhi',
    stream: 'Engineering',
    budget: 5,
    cutoff: '98%',
    placement: '28 LPA',
    scholarships: ['Merit-based', 'Need-based']
  },
  {
    id: 2,
    name: 'Delhi University',
    location: 'Delhi',
    stream: 'Arts',
    budget: 2,
    cutoff: '92%',
    placement: '6 LPA',
    scholarships: ['Government Scholarships']
  },
  {
    id: 3,
    name: 'IIT Bombay',
    location: 'Mumbai',
    stream: 'Engineering',
    budget: 6,
    cutoff: '99%',
    placement: '30 LPA',
    scholarships: ['Merit-based']
  }
];

export default function ComparePage() {
  const [selected, setSelected] = useState<number[]>([]);
  // const router = useRouter();

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectedColleges = mockColleges.filter(college => selected.includes(college.id));

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/compare?ids=${selected.join(',')}`;
    navigator.clipboard.writeText(url).then(() => alert('Sharable URL copied to clipboard!'));
  };

  return (
    <section className='min-h-screen'>
      <h2 className="text-xl font-bold mb-4">Compare Colleges</h2>
      <div className="mb-4 flex gap-3">
        <button onClick={handlePrint} className="px-4 py-2 bg-green-100 text-green-800 rounded">Print</button>
        <button onClick={handleShare} className="px-4 py-2 bg-blue-100 text-blue-800 rounded">Share</button>
      </div>

      <div className="mb-6 grid md:grid-cols-2 gap-4">
        {mockColleges.map(college => (
          <div key={college.id} className={`border p-4 rounded shadow ${selected.includes(college.id) ? 'border-blue-500' : ''}`}>
            {/* <h3 className="text-lg font-semibold">{college.name}</h3>
            <p>{college.location} • {college.stream}</p> */}
            <CollegeCard college={college} />
            <button
              className="mt-2 px-4 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
              onClick={() => toggleSelect(college.id)}
            >
              {selected.includes(college.id) ? 'Remove' : 'Compare'}
            </button>
          </div>
        ))}
      </div>

      {selectedColleges.length >= 2 && (
        <div className="overflow-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Field</th>
                {selectedColleges.map(college => (
                  <th key={college.id} className="border px-4 py-2">{college.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['location', 'stream', 'budget', 'cutoff', 'placement', 'scholarships'].map((field) => (
                <tr key={field}>
                  <td className="border px-4 py-2 font-medium capitalize">{field}</td>
                  {selectedColleges.map((college:any) => (
                    <td key={college.id} className="border px-4 py-2">
                      {Array.isArray(college[field]) ? college[field].join(', ') : college[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
