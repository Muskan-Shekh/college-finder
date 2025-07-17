import React from "react";

interface College {
  name: string;
  location: string;
  type: string;
  graduationRate: string;
  averageCost: string;
  satRange: string;
}

const CollegeList: React.FC = () => {
  const colleges: College[] = [
    {
      name: "Ferris State University",
      location: "Big Rapids, MI",
      type: "4-year - Public - Medium - Rural",
      graduationRate: "57% graduation rate",
      averageCost: "$14K average per year after aid",
      satRange: "400–1120",
    },
    {
      name: "University of Puerto Rico: Aguadilla",
      location: "Aguadilla, PR",
      type: "4-year - Public - Small - Suburban",
      graduationRate: "42% graduation rate",
      averageCost: "$6K average per year after aid",
      satRange: "422–546",
    },
    {
      name: "California State University: Fullerton",
      location: "Fullerton, CA",
      type: "4-year - Public - Very Large - Suburban",
      graduationRate: "69% graduation rate",
      averageCost: "$8K average per year after aid",
      satRange: "860–1070",
    },
  ];

  return (
    <div className="mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">100 Colleges found</h1>
      </div>

      <div className="mb-4 flex justify-end">
        <button className="text-blue-600 font-medium">Sort by →</button>
      </div>

      <div className="space-y-6">
        {colleges.map((college, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{college.name} →</h2>
                <p className="text-gray-600">{college.location}</p>
              </div>
              <button className="text-blue-600 font-medium">Save College</button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-start">
                <span className="mr-2">①</span>
                <span>{college.type}</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">②</span>
                <span>{college.graduationRate}</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">③</span>
                <span>{college.averageCost}</span>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-gray-500">sw</span>{" "}
              <span>{college.satRange}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeList;