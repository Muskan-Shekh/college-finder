/* eslint-disable @typescript-eslint/no-explicit-any */
// app/college/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCollegeList } from '../../../utils/api';
import CollegeDetail from '../../../components/CollegeDetail';

// const mockColleges = [
//   {
//     id: 1,
//     name: 'IIT Delhi',
//     description: 'Top-ranked engineering college in India.',
//     location: 'Delhi',
//     stream: 'Engineering',
//     budget: 5,
//     cutoff: '98%',
//     placement: '28 LPA',
//     scholarships: ['Merit-based', 'Need-based'],
//     timeline: [
//       { label: 'Application Opens', date: '2025-01-15' },
//       { label: 'Last Date to Apply', date: '2025-03-30' },
//       { label: 'Exam Date', date: '2025-04-20' }
//     ],
//     reviews: [
//       { name: 'Amit', rating: 5, comment: 'Excellent faculty and placements.' },
//       { name: 'Sara', rating: 4, comment: 'Great campus and exposure.' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Delhi University',
//     description: 'Premier public university in India.',
//     location: 'Delhi',
//     stream: 'Arts',
//     budget: 2,
//     cutoff: '92%',
//     placement: '6 LPA',
//     scholarships: ['Government Scholarships'],
//     timeline: [],
//     reviews: []
//   }
// ];

export default function CollegeDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
   const [collegeList, setCollegeList] = useState([] as any);

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

  const college = collegeList.find((c:any) => c.rank === `#${id}`);

  const [reviews, setReviews] = useState(college?.reviews || []);

  const handleReviewChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setReviews((prev:any) => [...prev, form]);
    setForm({ name: '', rating: 5, comment: '' });
  };

  if (!college) return <p>College not found.</p>;

  return (
    <section className="space-y-6">
      <CollegeDetail college={college} />

      {/* <div>
        <h2 className="text-2xl font-bold">{college.name}</h2>
        <p className="text-gray-700 mb-2">{college.description}</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Location:</strong> {college.location}</li>
          <li><strong>Stream:</strong> {college.stream}</li>
          <li><strong>Budget:</strong> ₹{college.budget} Lakh</li>
          <li><strong>Cutoff:</strong> {college.cutoff}</li>
          <li><strong>Placement:</strong> {college.placement}</li>
          <li><strong>Scholarships:</strong> {college.scholarships.join(', ')}</li>
        </ul>
      </div> */}

      {/* Admission Timeline */}
      {/* {college.timeline.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">📅 Admission Timeline</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {college.timeline.map((item, idx) => (
              <li key={idx}>✅ <strong>{item.label}:</strong> {item.date}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Reviews */}
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-2">💬 Student Reviews</h3>

        <ul className="space-y-3 mb-4">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r:any, i:any) => (
            <li key={i} className="border p-3 rounded">
              <p className="font-medium">{r.name} — ⭐ {r.rating}/5</p>
              <p className="text-sm text-gray-700">{r.comment}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleReviewSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleReviewChange}
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="rating"
            value={form.rating}
            onChange={handleReviewChange}
            className="w-full border p-2 rounded"
          >
            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
            ))}
          </select>
          <textarea
            name="comment"
            placeholder="Write your review..."
            value={form.comment}
            onChange={handleReviewChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}
