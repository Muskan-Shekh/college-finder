/* eslint-disable @typescript-eslint/no-explicit-any */
// app/results/page.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCollegeList } from '../../utils/api';

export default function ResultsPage() {
  const [collegeList, setCollegeList] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const data:any = await fetchCollegeList();
        setCollegeList(data);
      } catch {
        console.log("ERROR in fetching college list");
      }
    };
    loadColleges();
  }, []);

  useEffect(() => {
  const filters = {
    collegeName: searchParams.get('collegeName')?.toLowerCase() || '',
    budget: searchParams.get('budget') || '',  // e.g. "₹ 55,388"
    stream: searchParams.get('stream')?.toLowerCase() || '',
    location: searchParams.get('location')?.toLowerCase() || '',
  };

  // Helper to parse budget string to number, e.g. "₹ 55,388" -> 55388
  // const parseBudget = (budgetStr: string) => {
  //   if (!budgetStr) return null;
  //   // Remove currency symbol, commas, spaces
  //   const num = budgetStr.replace(/[₹,\s]/g, '');
  //   return parseInt(num);
  // };

  // const filterBudgetValue = parseBudget(filters.budget);

  const filtered = collegeList.filter((college) => {
    const nameMatch = filters.collegeName
      ? college.name.toLowerCase().includes(filters.collegeName)
      : true;

    // const streamMatch = filters.stream
    //   ? college.fees?.amount?.toLowerCase().includes(filters.stream)
    //   : true;

    // const locationMatch = filters.location
    //   ? college.location?.toLowerCase().includes(filters.location)
    //   : true;

    // Parse college budget to number as well
    // const collegeBudgetNum = college.budget
    //   ? typeof college.fees?.amount === 'string'
    //     ? parseBudget(college.fees?.amount)
    //     : college.fees?.amount
    //   : null;

    // const budgetMatch = filterBudgetValue && collegeBudgetNum
    //   ? collegeBudgetNum <= filterBudgetValue
    //   : true;


    return nameMatch;
  });

  setResults(filtered);
}, [searchParams, collegeList]);

  return (
    <section className="min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      {results.length === 0 ? (
        <p>No colleges found matching your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((college, index:number) => (
            <li key={index} className="p-4 border rounded shadow-sm">
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => router.push(`/college/${index+1}`)}
              >
                {college.name}
              </h3>
              <p>Location: {college.location}</p>
              <p>Budget: {college.fees?.amount}</p>
              <p>Fees Description: {college.fees?.description}</p>
              <p>Rank: {college.rank}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
