// 'use client';
// import { useEffect, useState } from 'react';

// interface CollegeCardProps {
//   college: {
//     id: number;
//     name: string;
//     location: string;
//     stream: string;
//     budget: number;
//     cutoff: string;
//     placement: string;
//   };
// }

// export default function CollegeCard({ college }: CollegeCardProps) {
//   const [savedIds, setSavedIds] = useState<number[]>([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
//     setSavedIds(saved);
//   }, []);

//   const isSaved = savedIds.includes(college.id);

//   const toggleSave = () => {
//     let updated;
//     if (isSaved) {
//       updated = savedIds.filter(id => id !== college.id);
//     } else {
//       updated = [...savedIds, college.id];
//     }
//     setSavedIds(updated);
//     localStorage.setItem('savedColleges', JSON.stringify(updated));
//   };

//   return (
//     <div className={`border p-4 rounded shadow ${isSaved ? 'border-red-400' : ''}`}>
//       <h3 className="text-lg font-semibold">{college.name}</h3>
//       <p className="text-sm text-gray-600">
//         {college.location} • {college.stream}
//       </p>
//       <p>
//         Budget: ₹{college.budget} L • Cutoff: {college.cutoff} • Placement: {college.placement}
//       </p>
//       <button
//         onClick={toggleSave}
//         className={`mt-2 px-3 py-1 text-sm rounded ${
//           isSaved ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'
//         }`}
//       >
//         {isSaved ? '❤️ Saved' : '♡ Save'}
//       </button>
//     </div>
//   );
// }


'use client';

import React from 'react';
import { College } from '../utils/type'; 

interface Props {
  colleges: College[];
}

const CollegeCard: React.FC<Props> = ({ colleges }) => {
   return (
    <div className="overflow-x-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Compare Colleges</h1>
      <div className="w-full overflow-auto">
        <table className="min-w-full text-sm text-left text-gray-800 border border-gray-300 rounded-lg">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
            <tr>
              <th className="p-4">Attribute</th>
              {colleges.map((college, idx) => (
                <th key={idx} className="p-4 text-center">
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-4 font-semibold">Location</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.location}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Rank</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.rank}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Approval</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.approvals}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Popular Course</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.popularCourse?.name}</td>)}</tr>
            <tr><td className="p-4 font-semibold">GATE Cutoff</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.popularCourse?.cutoff}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Fees</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.fees?.amount}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Average Package</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.placement?.averagePackage}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Highest Package</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.placement?.highestPackage}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Placement %</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.placement?.placementPercentage}</td>)}</tr>
            <tr><td className="p-4 font-semibold">CD Score</td>{colleges.map((c, i) => <td key={i} className="p-4 text-center">{c?.cdScore}</td>)}</tr>
            <tr><td className="p-4 font-semibold">Reviews</td>{colleges.map((c, i) => (
              <td key={i} className="p-4 text-center">
                <p className="font-medium">{c?.reviews?.rating}</p>
                <p className="text-xs text-gray-500">{c?.reviews?.tagline}</p>
              </td>
            ))}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeCard;

