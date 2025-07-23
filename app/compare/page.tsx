/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import CollegeCard from "../../components/CollegeCard";
import { College } from "../../utils/type";
import { fetchCollegeList } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";

const CompareCollegesPage = () => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [collegeList, setCollegeList] = useState<College[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const data: any = await fetchCollegeList();
        setCollegeList(data);
      } catch {
        console.log("ERROR in fetching college list");
      }
    };
    loadColleges();
  }, []);

  useEffect(() => {}, [collegeList]);

  const toggleCollege = (college: College) => {
    const exists = selectedColleges.find((c) => c.name === college.name);
    if (exists) {
      setSelectedColleges((prev) =>
        prev.filter((c) => c.name !== college.name)
      );
    } else if (selectedColleges.length < 4) {
      setSelectedColleges((prev) => [...prev, college]);
    } else {
      toast.warn("You can not select more than 4 colleges!");
    }
  };

  const isSelected = (college: College) =>
    selectedColleges.some((c) => c.name === college.name);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Select Colleges to Compare
      </h1>

      <div className="text-center mb-6">
        <button
          disabled={selectedColleges.length < 2}
          onClick={() => {
            setShowComparison(true);
            setIsOpen(true);
          }}
          className={`px-6 py-2 text-white rounded-md ${
            selectedColleges.length < 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Compare Selected ({selectedColleges.length})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {collegeList.map((college, idx) => (
          <div
            key={idx}
            className={`border rounded p-4 shadow-sm hover:shadow-md transition ${
              isSelected(college)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {college.name}
                </h2>
                <p className="text-sm text-gray-500">{college.location}</p>
              </div>
              <input
                type="checkbox"
                checked={isSelected(college)}
                onChange={() => toggleCollege(college)}
                className="w-5 h-5 text-blue-600"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Rank: {college.rank}</p>
          </div>
        ))}
      </div>

      {showComparison && selectedColleges.length >= 2 && isOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full transition-opacity duration-300 backdrop-blur-sm"
        >
          <CollegeCard
            colleges={selectedColleges}
            closeModal={() => setShowComparison(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CompareCollegesPage;
