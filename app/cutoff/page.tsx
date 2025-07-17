/* eslint-disable @typescript-eslint/no-explicit-any */
// app/cutoff/page.tsx
'use client';
import { useState } from 'react';

const mockColleges = [
  {
    id: 1,
    name: 'IIT Delhi',
    exam: 'JEE',
    cutoff: 98,
    category: 'General',
    stream: 'Engineering',
    location: 'Delhi'
  },
  {
    id: 2,
    name: 'Delhi University',
    exam: 'CUET',
    cutoff: 92,
    category: 'General',
    stream: 'Arts',
    location: 'Delhi'
  },
  {
    id: 3,
    name: 'IIT Bombay',
    exam: 'JEE',
    cutoff: 99,
    category: 'OBC',
    stream: 'Engineering',
    location: 'Mumbai'
  },
  {
    id: 4,
    name: 'AIIMS Delhi',
    exam: 'NEET',
    cutoff: 97,
    category: 'SC',
    stream: 'Medical',
    location: 'Delhi'
  }
];

export default function CutoffPredictorPage() {
  const [formData, setFormData] = useState({
    exam: '',
    category: '',
    marks: ''
  });
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputMarks = parseFloat(formData.marks);
    const eligible = mockColleges.filter(c =>
      (!formData.exam || c.exam.toLowerCase() === formData.exam.toLowerCase()) &&
      (!formData.category || c.category.toLowerCase() === formData.category.toLowerCase()) &&
      inputMarks >= c.cutoff
    );
    setResults(eligible);
  };

  return (
    <section className='min-h-screen'>
      <h2 className="text-xl font-bold mb-4">🎯 Cutoff Predictor</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Exam</label>
          <select name="exam" value={formData.exam} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">-- Select Exam --</option>
            <option value="JEE">JEE</option>
            <option value="CUET">CUET</option>
            <option value="NEET">NEET</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">-- Select Category --</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Marks / Percentile</label>
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="md:col-span-3">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Predict Cutoff
          </button>
        </div>
      </form>

      <h3 className="text-lg font-semibold mb-2">Eligible Colleges:</h3>
      {results.length === 0 ? (
        <p>No eligible colleges found based on entered details.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((college) => (
            <li key={college.id} className="border p-4 rounded shadow-sm">
              <h4 className="font-semibold text-lg">{college.name}</h4>
              <p>Stream: {college.stream} | Location: {college.location} | Required Cutoff: {college.cutoff}%</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
