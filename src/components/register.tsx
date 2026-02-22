'use client';

import React, { useState } from 'react';
import { uploadToCloudinary } from '@/utils/cloudinaryUpload';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  instituteName: string;
  type: string;
  course: string;
  courseSpecialization: string;
  graduationYear: string;
  isAcesMember: boolean;
  receipt: File | null; // Store File, not string
}

interface FilePreview {
  leader: string | null;
  members: (string | null)[];
  paymentScreenshot: string | null;
}

interface SubmitMessage {
  type: 'success' | 'error' | '';
  text: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface FormField {
  name: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'checkbox' | 'file';
  required: boolean;
  options?: SelectOption[];
  accept?: string;
}

// ─── Inline styles ────────────────────────────────────────────────────────────

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #060c1a;
    color: #e2e8f0;
    font-family: 'Trebuchet MS', sans-serif;
  }

  @keyframes grid-drift {
    0%   { transform: translateY(0); }
    100% { transform: translateY(60px); }
  }
  @keyframes shimmer-border {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
    50%      { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
  }
  @keyframes slide-in {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes badge-pop {
    from { opacity:0; transform: scale(0.8); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .rform-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #060c1a 0%, #0a1228 50%, #07091a 100%);
    padding: 2rem 1rem 4rem;
    position: relative;
    overflow: hidden;
  }

  .rform-container::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: grid-drift 12s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  .rform-orb-1 {
    position: fixed; top: -120px; right: -120px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none; z-index: 0;
  }
  .rform-orb-2 {
    position: fixed; bottom: -150px; left: -100px;
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none; z-index: 0;
  }

  .rform-inner {
    position: relative; z-index: 1;
    max-width: 860px; margin: 0 auto;
    animation: slide-in 0.7s cubic-bezier(.22,1,.36,1) both;
  }

  .rform-header {
    text-align: center;
    padding: 2.5rem 1rem 2rem;
    margin-bottom: 2rem;
  }
  .rform-header-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 999px;
    border: 1px solid rgba(99,102,241,0.4);
    background: rgba(99,102,241,0.12); backdrop-filter: blur(8px);
    font-size: 20px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; color: cyan;
    margin-bottom: 1.2rem;
    font-family: 'Trebuchet MS', sans-serif;
    animation: badge-pop 0.5s 0.2s cubic-bezier(.34,1.56,.64,1) both;
  }
  .rform-header-badge .dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: #67e8f9; animation: pulse 2s infinite;
    
  }
  .rform-header h1 {
    font-family: 'Trebuchet MS', sans-serif;
    color:#22D3EE;
    font-size: clamp(1.8rem, 5vw, 3rem);
    font-weight: 900; letter-spacing: -0.02em; line-height: 1.1;
    background: linear-gradient(90deg, #93c5fd, #6366f1, #c4b5fd, #38bdf8);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer-border 4s linear infinite;
    margin-bottom: 0.75rem;
  }
  .rform-header p { color: #94a3b8; font-size: 1rem; }

  .rform-alert {
    padding: 1rem 1.4rem; border-radius: 12px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem; font-weight: 500;
    border: 1px solid; backdrop-filter: blur(8px);
  }
  .rform-alert.success {
    background: rgba(16,185,129,0.12);
    border-color: rgba(16,185,129,0.4); color: #6ee7b7;
  }
  .rform-alert.error {
    background: rgba(239,68,68,0.12);
    border-color: rgba(239,68,68,0.4); color: #fca5a5;
  }

  .rform-section {
    background: rgba(14,22,48,0.7);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 18px; padding: 2rem;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(12px);
    position: relative; overflow: hidden;
    transition: border-color 0.3s;
  }
  .rform-section:hover { border-color: rgba(99,102,241,0.38); }
  .rform-section::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
  }
  .rform-section h2 {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 1rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #a5b4fc; margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: 10px;
  }
  .rform-section h2::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(99,102,241,0.3), transparent);
  }

  .rform-section.project-section { border-color: rgba(56,189,248,0.25); }
  .rform-section.project-section h2 { color: #67e8f9; }
  .rform-section.project-section::before {
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent);
  }
  .rform-section.project-section:hover { border-color: rgba(56,189,248,0.42); }

  .rform-section.team-section { border-color: rgba(167,139,250,0.2); }
  .rform-section.team-section h2 { color: #c4b5fd; }
  .rform-section.team-section::before {
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent);
  }

  .rform-section.payment-section { border-color: rgba(52,211,153,0.2); }
  .rform-section.payment-section h2 { color: #6ee7b7; }
  .rform-section.payment-section::before {
    background: linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent);
  }

  .selection-criteria {
    background: rgba(6,12,26,0.6);
    border: 1px solid rgba(99,102,241,0.15);
    border-radius: 12px; padding: 1.25rem 1.4rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem; color: #94a3b8; line-height: 1.7;
  }
  .selection-criteria h3 {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 0.78rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #818cf8; margin-bottom: 0.6rem;
  }
  .selection-criteria p { margin-bottom: 0.7rem; }
  .selection-criteria ul { padding-left: 1.2rem; margin-bottom: 0.7rem; }
  .selection-criteria ul li { margin-bottom: 0.3rem; }
  .selection-criteria strong { color: #c7d2fe; }

  .link-input-group {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 0.5rem;
  }
  @media (max-width: 640px) { .link-input-group { grid-template-columns: 1fr; } }

  .link-input-card {
    background: rgba(6,12,26,0.7);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 14px; padding: 1.25rem;
    transition: border-color 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
  }
  .link-input-card:hover {
    border-color: rgba(99,102,241,0.45);
    box-shadow: 0 0 24px rgba(99,102,241,0.1);
  }
  .link-input-card.video-card { border-color: rgba(56,189,248,0.2); }
  .link-input-card.video-card:hover {
    border-color: rgba(56,189,248,0.45);
    box-shadow: 0 0 24px rgba(56,189,248,0.1);
  }

  .link-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 0.9rem; }
  .link-card-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
  }
  .link-card-icon.ppt-icon { background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.3); }
  .link-card-icon.video-icon { background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.3); }
  .link-card-label {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 0.75rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .link-card-label.ppt-label { color: #a5b4fc; }
  .link-card-label.video-label { color: #67e8f9; }
  .link-card-sublabel { font-size: 0.72rem; color: #64748b; margin-top: 1px; }

  .link-input-field {
    width: 100%; padding: 0.65rem 0.9rem;
    background: rgba(6,12,26,0.8);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 9px;
    color: #e2e8f0; font-family: 'Trebuchet MS', sans-serif; font-size: 0.85rem;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .link-input-field.video-field { border-color: rgba(56,189,248,0.25); }
  .link-input-field:focus {
    border-color: rgba(99,102,241,0.7);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }
  .link-input-field.video-field:focus {
    border-color: rgba(56,189,248,0.7);
    box-shadow: 0 0 0 3px rgba(56,189,248,0.12);
  }
  .link-input-field::placeholder { color: #475569; }

  .link-hint { display: flex; align-items: center; gap: 6px; margin-top: 0.5rem; font-size: 0.72rem; color: #475569; }
  .link-hint-dot { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }
  .link-hint-dot.blue { background: #38bdf8; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-group label { font-size: 0.8rem; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; }
  .required { color: #f87171; margin-left: 3px; }

  .form-input, .form-select {
    width: 100%; padding: 0.65rem 0.9rem;
    background: rgba(6,12,26,0.8);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 10px;
    color: #e2e8f0; font-family: 'Trebuchet MS', sans-serif; font-size: 0.875rem;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
  }
  .form-input:focus, .form-select:focus {
    border-color: rgba(99,102,241,0.6);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }
  .form-input::placeholder { color: #475569; }
  .form-select option { background: #0e1630; color: #e2e8f0; }

  .checkbox-group { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .form-checkbox { width: 18px; height: 18px; cursor: pointer; accent-color: #6366f1; }

  .file-upload-container { display: flex; flex-direction: column; gap: 0.5rem; }
  .file-input {
    width: 100%; padding: 0.5rem;
    background: rgba(6,12,26,0.8);
    border: 1px dashed rgba(99,102,241,0.3);
    border-radius: 10px;
    color: #94a3b8; font-size: 0.8rem; cursor: pointer;
    transition: border-color 0.2s;
  }
  .file-input:hover { border-color: rgba(99,102,241,0.55); }
  .preview-image {
    max-width: 160px; max-height: 120px;
    border-radius: 8px; object-fit: contain;
    border: 1px solid rgba(99,102,241,0.3);
  }

  .payment-layout { display: flex; align-items: flex-start; gap: 2rem; flex-wrap: wrap; }
  .qr-block { text-align: center; flex-shrink: 0; }
  .payment-qr {
    width: 160px; height: 160px; object-fit: cover; border-radius: 12px;
    border: 2px solid rgba(52,211,153,0.35);
    box-shadow: 0 0 30px rgba(52,211,153,0.12);
  }
  .payment-info { font-size: 0.8rem; color: #94a3b8; margin-top: 0.4rem; }
  .payment-fee { font-size: 0.95rem; font-weight: 700; color: #6ee7b7; margin-top: 0.2rem; }

  .form-actions { display: flex; justify-content: center; margin-top: 0.5rem; }
  .submit-btn {
    position: relative; overflow: hidden;
    padding: 1rem 3rem; border-radius: 14px;
    background: linear-gradient(135deg, #4f46e5, #6366f1, #818cf8);
    border: none; color: white;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    animation: pulse-glow 2.5s ease-in-out infinite;
    min-width: 220px;
  }
  .submit-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    background-size: 200% 100%;
    animation: shimmer-border 2s linear infinite;
  }
  .submit-btn:hover:not(:disabled) { transform: scale(1.04); box-shadow: 0 0 40px rgba(99,102,241,0.5); }
  .submit-btn:active:not(:disabled) { transform: scale(0.98); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .upload-status {
    font-size: 0.75rem; color: #818cf8; margin-top: 0.3rem;
    display: flex; align-items: center; gap: 6px;
  }
`;

// ─── Form fields config ───────────────────────────────────────────────────────

const formFields: FormField[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
  {
    name: 'gender', label: 'Gender', type: 'select', required: true,
    options: [
      { value: '', label: 'Select Gender' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  { name: 'instituteName', label: 'Institute Name', type: 'text', required: true },
  {
    name: 'type', label: 'Participant Type', type: 'select', required: true,
    options: [
      { value: '', label: 'Select Participant Type' },
      { value: 'student', label: 'Student' },
    ],
  },
  { name: 'course', label: 'Course', type: 'text', required: true },
  { name: 'courseSpecialization', label: 'Course Specialization', type: 'text', required: true },
  { name: 'graduationYear', label: 'Graduation Year', type: 'number', required: true },
  { name: 'receipt', label: 'Upload Receipt (ACES Members only)', type: 'file', required: false, accept: 'image/*' },
];

const initialFormData: FormData = {
  firstName: '', lastName: '', email: '', mobile: '', gender: '',
  instituteName: '', type: '', course: '', courseSpecialization: '',
  graduationYear: '', isAcesMember: false,
  receipt: null, // ✅ FIX: File | null instead of string
};

// ─── Component ────────────────────────────────────────────────────────────────

const RegistrationForm: React.FC = () => {
  const [leaderData, setLeaderData] = useState<FormData>(initialFormData);
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teamName, setTeamName] = useState<string>('');
  const [teamMembersData, setTeamMembersData] = useState<FormData[]>([{ ...initialFormData }]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', text: '' });

  // ✅ FIX: Store File objects for preview + later upload
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview>({
    leader: null,
    members: Array(3).fill(null),
    paymentScreenshot: null,
  });

  const [pptLink, setPptLink] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');

  // ── Validation helpers ──

  const fail = (msg: string): false => {
    setSubmitMessage({ type: 'error', text: msg });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ FIX: scroll on validation fail
    return false;
  };

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateMobile = (mobile: string): boolean =>
    /^\d{10}$/.test(mobile);

  const validateForm = (): boolean => {
    if (!teamName.trim()) return fail('Please enter a team name.');
    if (!leaderData.firstName.trim()) return fail('Please enter the team leader\'s first name.');
    if (!validateEmail(leaderData.email)) return fail('Please enter a valid email for the team leader.');
    if (!validateMobile(leaderData.mobile)) return fail('Please enter a valid 10-digit mobile number for the team leader.');
    if (!leaderData.gender) return fail('Please select a gender for the team leader.');
    if (!leaderData.type) return fail('Please select a participant type for the team leader.');

    for (let i = 0; i < teamMembersData.length; i++) {
      if (!teamMembersData[i].firstName.trim()) return fail(`Please enter first name for team member ${i + 2}.`);
      if (!validateEmail(teamMembersData[i].email)) return fail(`Valid email required for team member ${i + 2}.`);
      if (!validateMobile(teamMembersData[i].mobile)) return fail(`Valid 10-digit mobile required for team member ${i + 2}.`);
      if (!teamMembersData[i].gender) return fail(`Please select a gender for team member ${i + 2}.`);
      if (!teamMembersData[i].type) return fail(`Please select a participant type for team member ${i + 2}.`);
    }

    if (!paymentFile) return fail('Please upload the payment screenshot.');
    if (!pptLink.trim()) return fail('Please provide your PPT Drive link.');
    if (!videoLink.trim()) return fail('Please provide your Video Presentation Drive link.');

    return true;
  };

  // ── File change handlers (only update preview + store File) ──

  const handlePaymentFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPaymentFile(file);
    setFilePreview((prev) => ({ ...prev, paymentScreenshot: URL.createObjectURL(file) }));
  };

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setLeaderData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLeaderData((prev) => ({ ...prev, receipt: file }));
    setFilePreview((prev) => ({ ...prev, leader: URL.createObjectURL(file) }));
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const size = parseInt(e.target.value, 10);
    setTeamSize(size);
    setTeamMembersData(Array(size - 1).fill(null).map(() => ({ ...initialFormData })));
    setFilePreview((prev) => ({ ...prev, members: Array(size - 1).fill(null) }));
  };

  const handleTeamMemberChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setTeamMembersData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: type === 'checkbox' ? checked : value };
      return updated;
    });
  };

  const handleTeamMemberFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTeamMembersData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], receipt: file };
      return updated;
    });
    setFilePreview((prev) => {
      const members = [...prev.members];
      members[index] = URL.createObjectURL(file);
      return { ...prev, members };
    });
  };

  // ── Submit: upload all files to Cloudinary then POST ──

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  setSubmitMessage({ type: '', text: '' });

  try {
    // Upload payment screenshot
    const paymentScreenshotUrl = await uploadToCloudinary(paymentFile!);

    // Upload leader receipt if present
    let leaderReceiptUrl = '';
    if (leaderData.isAcesMember && leaderData.receipt instanceof File) {
      leaderReceiptUrl = await uploadToCloudinary(leaderData.receipt);
    }

    // Upload team member receipts if present
    const memberReceiptUrls: string[] = [];
    for (const member of teamMembersData) {
      if (member.isAcesMember && member.receipt instanceof File) {
        const url = await uploadToCloudinary(member.receipt);
        memberReceiptUrls.push(url);
      } else {
        memberReceiptUrls.push('');
      }
    }

    // Build clean payload
    const payload = {
      teamName,
      teamSize,
      leader: { ...leaderData, receipt: leaderReceiptUrl },
      teamMembers: teamMembersData.map((m, i) => ({ ...m, receipt: memberReceiptUrls[i] })),
      paymentScreenshot: paymentScreenshotUrl,
      pptLink,
      videoLink,
      registrationStatus: 'pending',
    };

    // Submit registration to backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const response = await fetch(`${backendUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed. Please try again.');
    }

    await response.json();

    // ✅ Send confirmation email via Next.js API route (non-blocking)
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamName,
        teamSize,
        leader: { ...leaderData, receipt: leaderReceiptUrl },
        teamMembers: teamMembersData.map((m, i) => ({ ...m, receipt: memberReceiptUrls[i] })),
      }),
    }).catch((err) => console.error('Email send failed:', err));

    // Show success message
    setSubmitMessage({
      type: 'success',
      text: 'Team registration successful! Your registration is pending verification. You will receive a confirmation email shortly.',
    });

    // Reset form
    setTeamName('');
    setLeaderData(initialFormData);
    setTeamMembersData([{ ...initialFormData }]);
    setPaymentFile(null);
    setPptLink('');
    setVideoLink('');
    setFilePreview({ leader: null, members: Array(3).fill(null), paymentScreenshot: null });

  } catch (error) {
    const err = error as Error;
    setSubmitMessage({
      type: 'error',
      text: err.message || 'There was an error submitting your registration. Please try again.',
    });
  } finally {
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
  const showReceipt = (data: FormData): boolean => data.isAcesMember;

  // ── Render field ──

  const renderFormField = (
    field: FormField,
    value: string | boolean | File | null,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    previewSrc?: string | null,
    index: number | null = null,
  ): React.ReactElement => {
    const id = index !== null ? `${field.name}-${index}` : field.name;

    if (field.type === 'select') {
      return (
        <select id={id} name={field.name} value={value as string} onChange={handleChange}
          required={field.required} className="form-select">
          {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <label className="checkbox-group">
          <input id={id} type="checkbox" name={field.name} checked={value as boolean}
            onChange={handleChange} className="form-checkbox" />
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            {value ? 'Yes, I am an ACES Member' : 'No'}
          </span>
        </label>
      );
    }

    if (field.type === 'file') {
      return (
        <div className="file-upload-container">
          <input id={id} type="file" name={field.name}
            onChange={handleFileChange as React.ChangeEventHandler<HTMLInputElement>}
            accept={field.accept} className="file-input" />
          {previewSrc && <img src={previewSrc} alt="Receipt Preview" className="preview-image" />}
          {value instanceof File && (
            <span className="upload-status">📎 {(value as File).name} selected</span>
          )}
        </div>
      );
    }

    return (
      <input id={id} type={field.type} name={field.name} value={value as string}
        onChange={handleChange} required={field.required}
        className="form-input" placeholder={field.label} />
    );
  };

  // ── JSX ──

  return (
    <>
      <style>{globalStyles}</style>
      <div className="rform-container">
        <div className="rform-orb-1" />
        <div className="rform-orb-2" />

        <div className="rform-inner">
          {/* Header */}
          <div className="rform-header">
            <div className="rform-header-badge">
              <span className="dot" />
              Ignition HackVerse 2026
            </div>
            <h1>Team Registration</h1>
            <p style={{
    fontFamily: 'Trebuchet MS, sans-serif',
    color: 'cyan',
    fontSize: '20px',
    fontWeight: 800,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
    marginBottom: '0.75rem'
  }}>Register your team for the upcoming hackathon event!</p>
          </div>

          {/* Alert */}
          {submitMessage.text && (
            <div className={`rform-alert ${submitMessage.type}`}>
              {submitMessage.text}
            </div>
          )}

          {/* Uploading indicator */}
          {isSubmitting && (
            <div className="rform-alert" style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.4)', color: '#a5b4fc' }}>
              ⏳ Uploading files and submitting registration... please wait.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Team Info */}
            <div className="rform-section team-section">
              <h2>Team Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="teamSize">Team Size (including leader)</label>
                  <select id="teamSize" value={teamSize} onChange={handleTeamSizeChange} className="form-select">
                    <option value={2}>2 Members</option>
                    <option value={3}>3 Members</option>
                    <option value={4}>4 Members</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="teamName">Team Name<span className="required">*</span></label>
                  <input id="teamName" type="text" value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="form-input" placeholder="Enter your team name" />
                </div>
              </div>
            </div>

            {/* Project Submission */}
            <div className="rform-section project-section">
              <h2>Project Submission</h2>

              <div className="selection-criteria">
                <h3 >Selection Criteria</h3>
                <p>
                  In case of excessive registrations, an elimination round will be conducted.
                  Please share your project presentation and video walkthrough. Selection will be based on:
                </p>
                <ul>
                  <li><strong>Clarity and Understanding</strong></li>
                  <li><strong>Feasibility of Solution</strong></li>
                  <li><strong>Innovation and Creativity</strong></li>
                  <li><strong>Technical Depth</strong> (how much you know about the technology required)</li>
                  <li><strong>Impact and Usefulness</strong> of the solution</li>
                  <li><strong>Scalability and Future Scope</strong></li>
                  <li><strong>Presentation and Structure</strong></li>
                </ul>
                <p>
                  <strong>Note:</strong> The first round is purely for screening purposes. Your main problem
                  statement for the hackathon will be different and provided 16 hours before the event.
                </p>
                <p><strong>If you are not selected for Round 2, 50% of your amount will be refunded.</strong></p>
                <p>Ensure both Drive links are publicly accessible (view access for anyone with the link).</p>
              </div>

              <div className="link-input-group">
                <div className="link-input-card">
                  <div className="link-card-header">
                    <div className="link-card-icon ppt-icon">📊</div>
                    <div>
                      <div className="link-card-label ppt-label">PPT Drive Link</div>
                      <div className="link-card-sublabel">Google Drive / OneDrive / Slides</div>
                    </div>
                  </div>
                  <input
                    type="url"
                    value={pptLink}
                    onChange={(e) => setPptLink(e.target.value)}
                    className="link-input-field"
                    placeholder="https://drive.google.com/..."
                  />
                  <div className="link-hint">
                    <div className="link-hint-dot" />
                    Share your project presentation slides
                  </div>
                </div>

                <div className="link-input-card video-card">
                  <div className="link-card-header">
                    <div className="link-card-icon video-icon">🎬</div>
                    <div>
                      <div className="link-card-label video-label">Video Presentation Link</div>
                      <div className="link-card-sublabel">Google Drive / YouTube (unlisted)</div>
                    </div>
                  </div>
                  <input
                    type="url"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="link-input-field video-field"
                    placeholder="https://drive.google.com/..."
                  />
                  <div className="link-hint">
                    <div className="link-hint-dot blue" />
                    Share your recorded video walkthrough
                  </div>
                </div>
              </div>
            </div>

            {/* Leader Info */}
            <div className="rform-section">
              <h2>Team Leader Information</h2>
              <div className="form-row">
                {formFields.map((field) =>
                  (!field.name.includes('receipt') || showReceipt(leaderData)) && (
                    <div
                      className="form-group"
                      key={field.name}
                      style={
                        field.type === 'checkbox' || field.type === 'file'
                          ? { gridColumn: 'span 2' }
                          : undefined
                      }
                    >
                      <label htmlFor={field.name}>
                        {field.label}{field.required && <span className="required">*</span>}
                      </label>
                      {field.type === 'file'
                        ? renderFormField(
                            field,
                            leaderData.receipt,
                            handleLeaderChange,
                            handleLeaderFileChange,
                            filePreview.leader,
                          )
                        : renderFormField(
                            field,
                            leaderData[field.name] as string | boolean,
                            handleLeaderChange,
                          )
                      }
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Team Members */}
            {teamMembersData.map((member, index) => (
              <div key={index} className="rform-section">
                <h2>Team Member {index + 2} Information</h2>
                <div className="form-row">
                  {formFields.map((field) =>
                    (!field.name.includes('receipt') || showReceipt(member)) && (
                      <div
                        className="form-group"
                        key={`${field.name}-${index}`}
                        style={
                          field.type === 'checkbox' || field.type === 'file'
                            ? { gridColumn: 'span 2' }
                            : undefined
                        }
                      >
                        <label htmlFor={`${field.name}-${index}`}>
                          {field.label}{field.required && <span className="required">*</span>}
                        </label>
                        {field.type === 'file'
                          ? renderFormField(
                              field,
                              member.receipt,
                              (e) => handleTeamMemberChange(index, e),
                              (e) => handleTeamMemberFileChange(index, e),
                              filePreview.members[index],
                              index,
                            )
                          : renderFormField(
                              field,
                              member[field.name] as string | boolean,
                              (e) => handleTeamMemberChange(index, e),
                              undefined,
                              undefined,
                              index,
                            )
                        }
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* Payment */}
            <div className="rform-section payment-section">
              <h2>Payment Information</h2>
              <div className="payment-layout">
                <div className="qr-block">
                  <img src="/payment_QR.jpg" alt="Payment QR Code" className="payment-qr" />
                  <div className="payment-info">Scan QR code to pay</div>
                  <div className="payment-fee">₹1000 per team</div>
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div className="form-group">
                    <label htmlFor="paymentScreenshot">
                      Upload Payment Screenshot<span className="required">*</span>
                    </label>
                    <div className="file-upload-container">
                      <input
                        id="paymentScreenshot"
                        type="file"
                        onChange={handlePaymentFileChange}
                        accept="image/*"
                        className="file-input"
                      />
                      {filePreview.paymentScreenshot && (
                        <img
                          src={filePreview.paymentScreenshot}
                          alt="Payment Screenshot"
                          className="preview-image"
                        />
                      )}
                      {paymentFile && (
                        <span className="upload-status">📎 {paymentFile.name} selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading & Submitting...' : 'Register Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;