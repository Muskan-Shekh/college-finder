/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CollegeList from "../components/CollegeList";
// import LocationAutocomplete from "../components/LocationAutocomplete";
import { fetchCollegeList } from "../utils/api";

export default function HomePage() {
  // const streams = [
  //   "Bachelor of Technology (B.Tech)",
  //   "Bachelor of Science (B.Sc)",
  //   "Bachelor of Commerce (B.Com)",
  //   "Bachelor of Arts (B.A)",
  //   "Bachelor of Business Administration (BBA)",
  //   "Bachelor of Computer Applications (BCA)",
  //   "Master of Technology (M.Tech)",
  //   "Master of Science (M.Sc)",
  //   "Master of Commerce (M.Com)",
  //   "Master of Arts (M.A)",
  //   "Master of Business Administration (MBA)",
  //   "Master of Computer Applications (MCA)",
  //   "Doctor of Philosophy (Ph.D)",
  //   "Diploma in Engineering",
  //   "Diploma in Management",
  //   "Integrated M.Sc",
  //   "Integrated M.Tech",
  // ];
  const [collegeList, setCollegeList] = useState([] as any);
  const [filteredColleges, setFilteredColleges] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const data = await fetchCollegeList();
        setCollegeList(data);
      } catch {
        console.log("ERROR in fetching college list");
      }
    };
    loadColleges();
  }, []);

  useEffect(() => {}, [collegeList]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const results = collegeList.filter((product: any) =>
      product.name.toLowerCase().includes(lowerSearch)
    );
    // console.log("results", results);
    setFilteredColleges(results);
  }, [searchTerm, collegeList]);

  // const router = useRouter();
  // const [formData, setFormData] = useState({
  //   collegeName: "",
  //   budget: "",
  //   stream: "",
  //   location: "",
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   const updatedForm = { ...formData, [name]: value };
  //   setFormData(updatedForm);

  //   // Filter college list when typing in the college name field
  //   if (name === "collegeName") {
  //     const searchText = value.toLowerCase();
  //     const matches = collegeList.filter((college: any) =>
  //       college.name.toLowerCase().includes(searchText)
  //     );
  //     setFilteredColleges(matches);
  //     setShowDropdown(searchText.length > 0 && matches.length > 0);
  //   }
  // };

  // const handleLocationSelect = (location: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     location,
  //   }));
  // };

  // const handleCollegeSelect = (collegeName: string) => {
  //   setFormData((prev) => {
  //     const selectedCollege = collegeList.find(
  //       (college: any) => college.name === collegeName
  //     );
  //     return {
  //       ...prev,
  //       collegeName,
  //       budget: selectedCollege?.fees?.amount || "", // set budget to fees amount if available
  //     };
  //   });
  //   setShowDropdown(false);
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const query = new URLSearchParams(formData).toString();
  //   router.push(`/results?${query}`);
  // };

  return (
    <section className="min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Find Your Ideal College</h2>
      {/* <form
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
            autoComplete="off"
            placeholder="Enter college"
          />
          {showDropdown && (
            <ul className="absolute z-10 bg-white border max-h-48 overflow-y-auto mt-1 rounded shadow">
              {filteredColleges.map((college: any, index: number) => (
                <li
                  key={index}
                  onClick={() => handleCollegeSelect(college.name)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {college.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Budget (in Lakh)
          </label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            readOnly
            // onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stream</label>
          <select
            name="stream"
            value={formData.stream}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="" disabled>
              -- Select a Stream --
            </option>
            {streams.map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        </div>

        <LocationAutocomplete onLocationSelect={handleLocationSelect} />
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search Colleges
          </button>
        </div>
      </form> */}
      <div className="relative mt-2 mb-8">
        <input
          type="text"
          placeholder="Search colleges and locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent placeholder:text-gray-600 text-gray-800 text-sm border border-gray-200 rounded-md pl-[4rem] py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
        />

        {searchTerm && filteredColleges.length > 0 && (
          <div className="absolute top-full left-0 w-full z-20 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto mt-1">
            {filteredColleges?.map((college: any, index: number) => (
              <a
                key={index}
                href={`/college/${index + 1}`}
                className="flex gap-3 items-start px-4 py-3 hover:bg-gray-100 border-b"
              >
                {/* <Image
                      src={`${config.apiUrl}storage/${product?.image}`} 
                      alt={product?.name}
                      className="w-12 h-16 object-cover rounded-sm"
                      width={768}
                      height={768}
                    /> */}
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">
                    {college?.name}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        )}

        <button className="absolute right-1 top-1 rounded bg-black p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="white"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <Link
        href={"/compare"}
        type="button"
        className="cursor-pointer text-white bg-gradient-to-r mt-4 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Compare Colleges
      </Link>
      <CollegeList filteredColleges={collegeList} />
    </section>
  );
}
