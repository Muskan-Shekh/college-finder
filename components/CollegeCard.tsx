'use client';
import { useEffect, useState } from 'react';

interface CollegeCardProps {
  college: {
    id: number;
    name: string;
    location: string;
    stream: string;
    budget: number;
    cutoff: string;
    placement: string;
  };
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
    setSavedIds(saved);
  }, []);

  const isSaved = savedIds.includes(college.id);

  const toggleSave = () => {
    let updated;
    if (isSaved) {
      updated = savedIds.filter(id => id !== college.id);
    } else {
      updated = [...savedIds, college.id];
    }
    setSavedIds(updated);
    localStorage.setItem('savedColleges', JSON.stringify(updated));
  };

  return (
    <div className={`border p-4 rounded shadow ${isSaved ? 'border-red-400' : ''}`}>
      <h3 className="text-lg font-semibold">{college.name}</h3>
      <p className="text-sm text-gray-600">
        {college.location} • {college.stream}
      </p>
      <p>
        Budget: ₹{college.budget} L • Cutoff: {college.cutoff} • Placement: {college.placement}
      </p>
      <button
        onClick={toggleSave}
        className={`mt-2 px-3 py-1 text-sm rounded ${
          isSaved ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {isSaved ? '❤️ Saved' : '♡ Save'}
      </button>
    </div>
  );
}
