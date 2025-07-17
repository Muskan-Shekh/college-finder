// app/results/page.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const mockColleges = [
  {
    id: 1,
    name: 'Indian Institute of Technology Delhi',
    location: 'Delhi',
    stream: 'Engineering',
    budget: '5',
    cutoff: '98%',
  },
  {
    id: 2,
    name: 'Delhi University',
    location: 'Delhi',
    stream: 'Arts',
    budget: '2',
    cutoff: '92%',
  },
];

export default function ResultsPage() {
    const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const filters = {
      collegeName: searchParams.get('collegeName'),
      budget: searchParams.get('budget'),
      stream: searchParams.get('stream'),
      location: searchParams.get('location'),
    };

    const filtered = mockColleges.filter((college) => {
      return (
        (!filters.stream || college.stream.toLowerCase().includes(filters.stream.toLowerCase())) &&
        (!filters.location || college.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.budget || parseInt(college.budget) <= parseInt(filters.budget))
      );
    });

    setResults(filtered);
  }, [searchParams]);

  return (
    <section className='min-h-screen'>
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      {results.length === 0 ? (
        <p>No colleges found matching your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((college) => (
            <li key={college.id} className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold cursor-pointer" onClick={()=>router.push(`/college/${college.id}`)}>{college.name}</h3>
              <p>Location: {college.location}</p>
              <p>Stream: {college.stream}</p>
              <p>Budget: ₹{college.budget} Lakh</p>
              <p>Cutoff: {college.cutoff}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}