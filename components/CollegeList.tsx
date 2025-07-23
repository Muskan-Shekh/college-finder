"use client";

import React, { useEffect, useState } from "react";
import { slugify } from "../utils/function";

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
interface CollegeTableProps {
  filteredColleges: College[];
}

type SortKey = "rank" | "cutoff" | "fees";
type SortOrder = "asc" | "desc";

const CollegeTable: React.FC<CollegeTableProps> = ({ filteredColleges }) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedColleges") || "[]");
    setSavedIds(saved);
  }, []);

  // Toggle save/unsave
  const toggleSave = (id: number) => {
    let updated;
    if (savedIds.includes(id)) {
      updated = savedIds.filter((savedId) => savedId !== id);
    } else {
      updated = [...savedIds, id];
    }
    setSavedIds(updated);
    localStorage.setItem("savedColleges", JSON.stringify(updated));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredColleges]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Sort logic
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    const aValue =
      sortKey === "rank"
        ? parseInt(a.rank.replace(/#/g, "")) || 0
        : sortKey === "cutoff"
        ? parseInt(a?.popularCourse?.cutoff.replace(/\D/g, "")) || 0
        : parseInt(a?.fees?.amount.replace(/[^\d]/g, "")) || 0;

    const bValue =
      sortKey === "rank"
        ? parseInt(b.rank.replace(/#/g, "")) || 0
        : sortKey === "cutoff"
        ? parseInt(b?.popularCourse?.cutoff.replace(/\D/g, "")) || 0
        : parseInt(b?.fees?.amount?.replace(/[^\d]/g, "")) || 0;

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Pagination
  const totalPages = Math.ceil(sortedColleges.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedColleges = sortedColleges.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full text-sm text-left text-gray-800 border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("rank")}
              >
                Rank {sortKey === "rank" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3">College</th>
              <th className="px-4 py-3">Location</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("cutoff")}
              >
                Course & Cutoff{" "}
                {sortKey === "cutoff" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("fees")}
              >
                Fees {sortKey === "fees" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3">Placements</th>
              <th className="px-4 py-3">Reviews</th>
              <th className="px-4 py-3">CD Score</th>
            </tr>
          </thead>
          <tbody>
            {paginatedColleges.map((college, index) => {
              const isSaved = savedIds.includes(index + 1);
              return (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{college?.rank}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-blue-600">
                      <a href={`/college/${slugify(college?.name)}`}>
                        {college?.name}
                      </a>
                    </div>
                    <div className="text-xs text-gray-500">
                      {college?.approvals}
                    </div>
                  </td>
                  <td className="px-4 py-3">{college?.location}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {college?.popularCourse?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {college?.popularCourse?.cutoff}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{college?.fees?.amount}</div>
                    <div className="text-xs text-gray-500">
                      {college?.fees?.description}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>Avg: {college?.placement?.averagePackage}</div>
                    <div>High: {college?.placement?.highestPackage}</div>
                    <div className="text-xs text-green-600">
                      {college?.placement?.placementPercentage}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{college?.reviews?.rating}</div>
                    <div className="text-xs text-gray-500">
                      {college?.reviews?.basedOn}
                    </div>
                    <div className="text-xs italic text-blue-500">
                      {college?.reviews?.tagline}
                    </div>
                  </td>
                  <td className="px-4 py-3">{college?.cdScore}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleSave(index + 1)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      {isSaved ? "❤️ Saved" : "♡ Save"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* <tbody>
          {filteredColleges?.map((college:College, index:number) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{college?.rank}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-blue-600">{college?.name}</div>
                <div className="text-xs text-gray-500">
                  {college?.approvals}
                </div>
              </td>
              <td className="px-4 py-3">{college?.location}</td>
              <td className="px-4 py-3">
                <div className="font-semibold">
                  {college?.popularCourse?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {college?.popularCourse?.cutoff}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>{college?.fees?.amount}</div>
                <div className="text-xs text-gray-500">
                  {college?.fees?.description}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>Avg: {college?.placement?.averagePackage}</div>
                <div>High: {college?.placement?.highestPackage}</div>
                <div className="text-xs text-green-600">
                  {college?.placement?.placementPercentage}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>{college?.reviews?.rating}</div>
                <div className="text-xs text-gray-500">
                  {college?.reviews?.basedOn}
                </div>
                <div className="text-xs italic text-blue-500">
                  {college?.reviews?.tagline}
                </div>
              </td>
              <td className="px-4 py-3">{college?.cdScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
    </>
  );
};

export default CollegeTable;
