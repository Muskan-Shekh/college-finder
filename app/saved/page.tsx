/* eslint-disable @typescript-eslint/no-explicit-any */
// app/saved/page.tsx
"use client";
import { useEffect, useState } from "react";
import { College } from "../../utils/type";
import { fetchCollegeList } from "../../utils/api";
import { slugify } from "../../utils/function";

export default function SavedCollegesPage() {
  const [saved, setSaved] = useState<number[]>([]);
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [collegeList, setCollegeList] = useState<College[]>([]);

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

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("savedColleges") || "[]");
    setSaved(ids);
    setSavedColleges(
      collegeList.filter((c, index: number) => ids.includes(index + 1))
    );
  }, [collegeList]);

  const removeCollege = (id: number) => {
    const updated = saved.filter((i) => i !== id);
    setSaved(updated);
    setSavedColleges(
      collegeList.filter((c, index: number) => updated.includes(index + 1))
    );
    localStorage.setItem("savedColleges", JSON.stringify(updated));
  };

  return (
    <section className="min-h-screen">
      <h2 className="text-xl font-bold mb-4">❤️ Saved Colleges</h2>

      {savedColleges.length === 0 ? (
        <p>No colleges saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {savedColleges.map((college, index) => (
            <li key={index} className="border p-4 rounded shadow-sm">
              <h3 className="font-semibold text-lg">
                {" "}
                <a href={`/college/${slugify(college?.name)}`}>
                  {college?.name}
                </a>
              </h3>
              <p className="text-sm text-gray-600 mb-2">{college.approvals}</p>
              <p className="text-sm text-gray-600 mb-2">{college.location}</p>
              <p>
                Fees: {college?.fees?.amount} • Description:{" "}
                {college?.fees?.description}
              </p>
              <p>
                Ranking: {college?.ranking?.agency} •{" "}
                {college?.ranking?.mainRank} • {college?.ranking?.year}
              </p>
              <button
                onClick={() => removeCollege(index + 1)}
                className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
