/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CollegeList from "../components/CollegeList";
import axios from "axios";

export default function HomePage() {
   const [collegeList, setCollegeList] = useState([] as any);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollegeListData = async () => {
      try {
        const response = await axios.get('https://finder-backend-7hnq.onrender.com/api/colleges', {
          headers: { 'Cache-Control': 'no-store' }
        });
        setCollegeList(response.data);
      } catch (err) {
        console.error('Failed to fetch college data:', err);
        // setError('Failed to fetch college data');
      }
    };

    fetchCollegeListData();
  }, []);
  useEffect(()=>{
  console.log("college list",collegeList)
  },[collegeList])
  const router = useRouter();
  const [formData, setFormData] = useState({
    collegeName: "",
    budget: "",
    stream: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/results?${query}`);
  };

  return (
    <section className="min-h-screen">

      <h2 className="text-xl font-semibold mb-4">Find Your Ideal College</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">College Name</label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Budget (in Lakh)
          </label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stream</label>
          <input
            type="text"
            name="stream"
            value={formData.stream}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search Colleges
          </button>
        </div>
      </form>

      <Link
        href={"/compare"}
        type="button"
        className="cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Compare Colleges
      </Link>
      <CollegeList/>
    </section>
  );
}
