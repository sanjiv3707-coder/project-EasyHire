import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../services/jobService';

export default function JobCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experienceMin: '',
    experienceMax: '',
    salaryMin: '',
    salaryMax: '',
    requiredSkills: '',
    description: '',
    openings: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Parse skills
    const skills = formData.requiredSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const jobPayload = {
      ...formData,
      experienceMin: parseInt(formData.experienceMin) || 0,
      experienceMax: parseInt(formData.experienceMax) || 0,
      salaryMin: parseInt(formData.salaryMin) || 0,
      salaryMax: parseInt(formData.salaryMax) || 0,
      openings: parseInt(formData.openings) || 1,
      requiredSkills: skills,
    };

    await createJob(jobPayload);
    setLoading(false);
    navigate('/jobs');
  };

  return (
    <div className="job-create-page">
      <div className="card job-form">
        <div className="card-header">
          <h2 className="card-title">Job Details</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Job Title *</label>
              <input
                id="title"
                name="title"
                className="form-input"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
              />
            </div>

            <div className="job-form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="department">Department</label>
                <select 
                  id="department" 
                  name="department" 
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="type">Employment Type</label>
                <select 
                  id="type" 
                  name="type" 
                  className="form-select"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="job-form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru, India or Remote"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="openings">Number of Openings</label>
                <input
                  id="openings"
                  name="openings"
                  type="number"
                  min="1"
                  className="form-input"
                  value={formData.openings}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="job-form-row">
              <div className="form-group">
                <label className="form-label">Experience Required (Years)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    name="experienceMin"
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="Min"
                    value={formData.experienceMin}
                    onChange={handleChange}
                  />
                  <input
                    name="experienceMax"
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="Max"
                    value={formData.experienceMax}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Salary Range (INR)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    name="salaryMin"
                    type="number"
                    min="0"
                    step="100000"
                    className="form-input"
                    placeholder="Min"
                    value={formData.salaryMin}
                    onChange={handleChange}
                  />
                  <input
                    name="salaryMax"
                    type="number"
                    min="0"
                    step="100000"
                    className="form-input"
                    placeholder="Max"
                    value={formData.salaryMax}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="requiredSkills">Required Skills (comma separated)</label>
              <input
                id="requiredSkills"
                name="requiredSkills"
                className="form-input"
                value={formData.requiredSkills}
                onChange={handleChange}
                placeholder="e.g. React, TypeScript, Node.js"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role and responsibilities..."
              />
            </div>

            <div className="job-form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/jobs')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
