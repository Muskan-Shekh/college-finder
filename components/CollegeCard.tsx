"use client";

import React from "react";
import { College } from "../utils/type";

interface Props {
  colleges: College[];
  closeModal: () => void;
}

const CollegeCard: React.FC<Props> = ({ colleges, closeModal }) => {
  return (
    <div className="max-w-6xl relative bg-white mt-8 p-4 rounded-lg shadow-sm dark:bg-gray-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          Compare Colleges
        </h1>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <div className="w-full overflow-auto h-[35rem]">
        <table className="min-w-full text-sm text-left text-gray-800 border border-gray-300 rounded-lg table-fixed">
          <thead className="bg-gray-100 text-gray-900 uppercase top-0 z-10 text-xs">
            <tr>
              <th className="p-4">Attribute</th>
              {colleges.map((college, idx) => (
                <th key={idx} className="p-4 text-center">
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="p-4 font-semibold">Location</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.location}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Rank</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.rank}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Approval</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.approvals}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Popular Course</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.popularCourse?.name}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">GATE Cutoff</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.popularCourse?.cutoff}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Fees</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.fees?.amount}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Average Package</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.placement?.averagePackage}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Highest Package</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.placement?.highestPackage}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Placement %</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.placement?.placementPercentage}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">CD Score</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  {c?.cdScore}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold">Reviews</td>
              {colleges.map((c, i) => (
                <td key={i} className="p-4 text-center">
                  <p className="font-medium">{c?.reviews?.rating}</p>
                  <p className="text-xs text-gray-500">{c?.reviews?.tagline}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeCard;
