'use client';

import React from 'react';

interface College {
  rank: string;
  name: string;
  location: string;
  fees: {
    amount: string;
    description: string;
  };
  placement: {
    averagePackage: string;
    highestPackage: string;
    placementPercentage: string;
  };
  approvals: string;
  popularCourse: {
    name: string;
    cutoff: string;
  };
  reviews: {
    rating: string;
    basedOn: string;
    tagline: string;
  };
  cdScore: string;
  ranking: {
    mainRank: string;
    agency: string;
    year: string;
  };
}

interface Props {
  college: College;
}

const CollegeDetail: React.FC<Props> = ({ college }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Header Section */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-700">{college.name}</h1>
        <p className="text-sm text-gray-600">{college.location}</p>
        <p className="text-xs text-green-600 mt-1">{college.approvals}</p>
      </div>

      {/* Grid Info Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">🏆 Rank</h2>
            <p className="text-blue-500 font-medium">{college.rank}</p>
            <p className="text-xs text-gray-500">{college.ranking.mainRank} ({college.ranking.agency})</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">📘 Popular Course</h2>
            <p className="font-medium">{college.popularCourse.name}</p>
            <p className="text-xs text-gray-500">GATE Cutoff: {college.popularCourse.cutoff}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">💵 Fees</h2>
            <p className="font-medium">{college.fees.amount}</p>
            <p className="text-xs text-gray-500">{college.fees.description}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">📈 Placement Stats</h2>
            <p>Avg Package: <span className="font-semibold">{college.placement.averagePackage}</span></p>
            <p>Highest Package: <span className="font-semibold">{college.placement.highestPackage}</span></p>
            <p className="text-xs text-green-700">{college.placement.placementPercentage}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">🌟 Reviews</h2>
            <p className="text-yellow-600 font-bold">{college.reviews.rating}</p>
            <p className="text-sm text-gray-600">{college.reviews.basedOn}</p>
            <p className="text-sm italic text-blue-500">{college.reviews.tagline}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">📊 CD Score</h2>
            <p className="font-medium">{college.cdScore}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default CollegeDetail;
