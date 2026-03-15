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
  receipt: File | null;
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
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'file';
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
  @keyframes popup-in {
    from { opacity:0; transform: scale(0.88) translateY(24px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  @keyframes overlay-in {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes check-draw {
    from { stroke-dashoffset: 80; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-8px); }
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
  .link-input-card.invalid-link { border-color: rgba(239,68,68,0.5) !important; }
  .link-error-msg {
    font-size: 0.7rem; color: #f87171; margin-top: 0.4rem;
    display: flex; align-items: center; gap: 5px;
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

  .form-input {
    width: 100%; padding: 0.65rem 0.9rem;
    background: rgba(6,12,26,0.8);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 10px;
    color: #e2e8f0; font-family: 'Trebuchet MS', sans-serif; font-size: 0.875rem;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .form-input:focus {
    border-color: rgba(99,102,241,0.6);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }
  .form-input::placeholder { color: #475569; }

  .select-wrapper { position: relative; width: 100%; }
  .select-wrapper::after {
    content: '';
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #6366f1;
    pointer-events: none;
  }
  .form-select {
    width: 100%; padding: 0.65rem 2.2rem 0.65rem 0.9rem;
    background: rgba(6,12,26,0.9);
    border: 1px solid rgba(99,102,241,0.35);
    border-radius: 10px;
    color: #e2e8f0; font-family: 'Trebuchet MS', sans-serif; font-size: 0.875rem;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none; cursor: pointer;
  }
  .form-select:focus {
    border-color: rgba(99,102,241,0.7);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }
  .form-select option { background: #0e1630; color: #e2e8f0; }
  .form-select option[value=''] { color: #64748b; }

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

  /* ─────────────────────────────────────────
     SUCCESS POPUP — fully responsive
  ───────────────────────────────────────── */
  .popup-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(4, 8, 20, 0.88);
    backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    animation: overlay-in 0.3s ease both;
  }

  .popup-card {
    background: linear-gradient(145deg, #0d1835, #0a122a);
    border: 1px solid rgba(99,102,241,0.35);
    border-radius: 24px;
    /* clamp: 1.25rem on tiny screens → 2.5rem on desktop */
    padding: clamp(1.5rem, 6vw, 2.5rem) clamp(1.25rem, 5vw, 2rem);
    max-width: 440px;
    width: 100%;
    text-align: center;
    position: relative; overflow: hidden;
    animation: popup-in 0.45s cubic-bezier(.34,1.56,.64,1) both;
    box-shadow: 0 0 80px rgba(99,102,241,0.18), 0 24px 56px rgba(0,0,0,0.55);
    box-sizing: border-box;
  }

  /* top shimmer line */
  .popup-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #6366f1, #38bdf8, transparent);
  }
  /* inner glow */
  .popup-card::after {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 65%);
  }

  /* check icon */
  .popup-icon-wrap {
    width: clamp(56px, 16vw, 72px);
    height: clamp(56px, 16vw, 72px);
    margin: 0 auto 1.25rem;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.08));
    border: 2px solid rgba(52,211,153,0.38);
    display: flex; align-items: center; justify-content: center;
    animation: float 3s ease-in-out infinite;
    box-shadow: 0 0 28px rgba(52,211,153,0.14);
    flex-shrink: 0;
  }
  .popup-icon-wrap svg {
    width: clamp(28px, 8vw, 36px);
    height: clamp(28px, 8vw, 36px);
  }
  .popup-check-circle {
    stroke: #34d399; stroke-width: 3; fill: none;
    stroke-dasharray: 80; stroke-dashoffset: 0;
    animation: check-draw 0.6s 0.2s cubic-bezier(.22,1,.36,1) both;
  }

  /* title */
  .popup-title {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: clamp(1.15rem, 5vw, 1.5rem);
    font-weight: 900;
    background: linear-gradient(90deg, #6ee7b7, #34d399, #67e8f9);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }

  /* body text */
  .popup-body {
    color: #94a3b8;
    font-size: clamp(0.8rem, 3.5vw, 0.9rem);
    line-height: 1.7;
    margin-bottom: 0.5rem;
  }

  /* ── email block: stack label + address vertically so nothing overflows ── */
  .popup-email-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    background: rgba(56,189,248,0.07);
    border: 1px solid rgba(56,189,248,0.22);
    border-radius: 14px;
    padding: 12px 16px;
    margin: 0.9rem 0 1.25rem;
    width: 100%;
    box-sizing: border-box;
  }
  .popup-email-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; color: #38bdf8;
    font-family: 'Trebuchet MS', sans-serif;
    white-space: nowrap;
  }
  .popup-email-label span { font-size: 0.9rem; }
  /* address wraps naturally and never overflows */
  .popup-email-address {
    font-size: clamp(0.75rem, 3.2vw, 0.88rem);
    font-weight: 700; color: #67e8f9;
    word-break: break-all;
    text-align: center;
    line-height: 1.45;
    font-family: 'Trebuchet MS', sans-serif;
  }

  .popup-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.28), transparent);
    margin: 1rem 0;
  }

  .popup-note {
    font-size: clamp(0.7rem, 2.8vw, 0.78rem);
    color: #64748b; line-height: 1.65;
  }

  /* full-width button on mobile */
  .popup-close-btn {
    display: block;
    width: 100%;
    margin-top: 1.4rem;
    padding: 0.85rem 0;
    border-radius: 14px;
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    border: none; color: #fff;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: clamp(0.78rem, 3vw, 0.85rem);
    font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .popup-close-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 0 28px rgba(99,102,241,0.45);
  }
  .popup-close-btn:active { transform: scale(0.98); }
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
      { value: '', label: '— Select Gender —' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  { name: 'instituteName', label: 'Institute Name', type: 'text', required: true },
  {
    name: 'type', label: 'Participant Type', type: 'select', required: true,
    options: [
      { value: '', label: '— Select Participant Type —' },
      { value: 'student', label: 'Student' },
    ],
  },
  { name: 'course', label: 'Course', type: 'text', required: true },
  { name: 'courseSpecialization', label: 'Course Specialization', type: 'text', required: true },
  { name: 'graduationYear', label: 'Graduation Year', type: 'number', required: true },
];

const initialFormData: FormData = {
  firstName: '', lastName: '', email: '', mobile: '', gender: '',
  instituteName: '', type: '', course: '', courseSpecialization: '',
  graduationYear: '', receipt: null,
};

const ALLOWED_LINK_PATTERNS = [
  /^https:\/\/(drive|docs)\.google\.com\//i,
  /^https:\/\/onedrive\.live\.com\//i,
  /^https:\/\/1drv\.ms\//i,
  /^https:\/\/youtu\.be\//i,
  /^https:\/\/(www\.)?youtube\.com\//i,
  /^https:\/\/[a-z0-9-]+\.sharepoint\.com\//i,
];

const isValidDriveLink = (url: string): boolean =>
  Boolean(url.trim()) && ALLOWED_LINK_PATTERNS.some((p) => p.test(url.trim()));

// ─── Component ────────────────────────────────────────────────────────────────

const RegistrationForm: React.FC = () => {
  const [leaderData, setLeaderData] = useState<FormData>(initialFormData);
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teamName, setTeamName] = useState<string>('');
  const [teamMembersData, setTeamMembersData] = useState<FormData[]>([{ ...initialFormData }]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', text: '' });
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');

  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview>({
    leader: null,
    members: Array(3).fill(null),
    paymentScreenshot: null,
  });

  const [pptLink, setPptLink] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [pptLinkError, setPptLinkError] = useState<string>('');
  const [videoLinkError, setVideoLinkError] = useState<string>('');

  const fail = (msg: string): false => {
    setSubmitMessage({ type: 'error', text: msg });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile: string) => /^\d{10}$/.test(mobile);
  const validateGraduationYear = (year: string) => {
    const y = parseInt(year, 10);
    return !isNaN(y) && y >= 2024 && y <= 2035;
  };

  const validateForm = (): boolean => {
    if (!teamName.trim()) return fail('Please enter a team name.');
    if (!leaderData.firstName.trim()) return fail("Please enter the team leader's first name.");
    if (!leaderData.lastName.trim()) return fail("Please enter the team leader's last name.");
    if (!validateEmail(leaderData.email)) return fail('Please enter a valid email for the team leader.');
    if (!validateMobile(leaderData.mobile)) return fail('Please enter a valid 10-digit mobile number for the team leader.');
    if (!leaderData.gender) return fail('Please select a gender for the team leader.');
    if (!leaderData.instituteName.trim()) return fail("Please enter the team leader's institute name.");
    if (!leaderData.type) return fail('Please select a participant type for the team leader.');
    if (!leaderData.course.trim()) return fail("Please enter the team leader's course.");
    if (!leaderData.courseSpecialization.trim()) return fail("Please enter the team leader's course specialization.");
    if (!validateGraduationYear(leaderData.graduationYear)) return fail('Please enter a valid graduation year (2024–2035) for the team leader.');

    for (let i = 0; i < teamMembersData.length; i++) {
      const m = teamMembersData[i];
      const label = `team member ${i + 2}`;
      if (!m.firstName.trim()) return fail(`Please enter first name for ${label}.`);
      if (!m.lastName.trim()) return fail(`Please enter last name for ${label}.`);
      if (!validateEmail(m.email)) return fail(`Valid email required for ${label}.`);
      if (!validateMobile(m.mobile)) return fail(`Valid 10-digit mobile required for ${label}.`);
      if (!m.gender) return fail(`Please select a gender for ${label}.`);
      if (!m.instituteName.trim()) return fail(`Please enter institute name for ${label}.`);
      if (!m.type) return fail(`Please select a participant type for ${label}.`);
      if (!m.course.trim()) return fail(`Please enter course for ${label}.`);
      if (!m.courseSpecialization.trim()) return fail(`Please enter course specialization for ${label}.`);
      if (!validateGraduationYear(m.graduationYear)) return fail(`Valid graduation year required for ${label}.`);
    }

    if (!paymentFile) return fail('Please upload the payment screenshot.');
    if (!pptLink.trim()) return fail('Please provide your PPT Drive link.');
    if (!isValidDriveLink(pptLink)) {
      setPptLinkError('Only Google Drive, OneDrive, or SharePoint links are accepted.');
      return fail('PPT link must be a valid Google Drive, OneDrive, or SharePoint URL.');
    }
    if (!videoLink.trim()) return fail('Please provide your Video Presentation link.');
    if (!isValidDriveLink(videoLink)) {
      setVideoLinkError('Only Google Drive, YouTube (unlisted), or OneDrive links are accepted.');
      return fail('Video link must be a valid Google Drive, YouTube, or OneDrive URL.');
    }
    return true;
  };

  const handlePaymentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPaymentFile(file);
    setFilePreview((prev) => ({ ...prev, paymentScreenshot: URL.createObjectURL(file) }));
  };

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeaderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLeaderData((prev) => ({ ...prev, receipt: file }));
    setFilePreview((prev) => ({ ...prev, leader: URL.createObjectURL(file) }));
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value, 10);
    setTeamSize(size);
    setTeamMembersData(Array(size - 1).fill(null).map(() => ({ ...initialFormData })));
    setFilePreview((prev) => ({ ...prev, members: Array(size - 1).fill(null) }));
  };

  const handleTeamMemberChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeamMembersData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleTeamMemberFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPptLinkError('');
    setVideoLinkError('');
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const paymentScreenshotUrl = await uploadToCloudinary(paymentFile!);
      const leaderReceiptUrl = leaderData.receipt instanceof File ? await uploadToCloudinary(leaderData.receipt) : '';
      const memberReceiptUrls: string[] = [];
      for (const member of teamMembersData) {
        memberReceiptUrls.push(member.receipt instanceof File ? await uploadToCloudinary(member.receipt) : '');
      }

      const payload = {
        teamName, teamSize,
        leader: { ...leaderData, receipt: leaderReceiptUrl },
        teamMembers: teamMembersData.map((m, i) => ({ ...m, receipt: memberReceiptUrls[i] })),
        paymentScreenshot: paymentScreenshotUrl,
        pptLink, videoLink,
        registrationStatus: 'pending',
      };

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

      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName, teamSize,
          leader: { ...leaderData, receipt: leaderReceiptUrl },
          teamMembers: teamMembersData.map((m, i) => ({ ...m, receipt: memberReceiptUrls[i] })),
        }),
      }).catch((err) => console.error('Email send failed:', err));

      setRegisteredEmail(leaderData.email);
      setTeamName('');
      setLeaderData(initialFormData);
      setTeamMembersData([{ ...initialFormData }]);
      setPaymentFile(null);
      setPptLink('');
      setVideoLink('');
      setFilePreview({ leader: null, members: Array(3).fill(null), paymentScreenshot: null });
      setShowSuccessPopup(true);

    } catch (error) {
      const err = error as Error;
      setSubmitMessage({ type: 'error', text: err.message || 'There was an error submitting your registration. Please try again.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormField = (
    field: FormField,
    value: string | File | null,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    previewSrc?: string | null,
    index: number | null = null,
  ): React.ReactElement => {
    const id = index !== null ? `${field.name}-${index}` : field.name;

    if (field.type === 'select') {
      return (
        <div className="select-wrapper">
          <select id={id} name={field.name} value={value as string} onChange={handleChange} required={field.required} className="form-select">
            {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      );
    }

    if (field.type === 'file') {
      return (
        <div className="file-upload-container">
          <input id={id} type="file" name={field.name} onChange={handleFileChange as React.ChangeEventHandler<HTMLInputElement>} accept={field.accept} className="file-input" />
          {previewSrc && <img src={previewSrc} alt="Receipt Preview" className="preview-image" />}
          {value instanceof File && <span className="upload-status">📎 {(value as File).name} selected</span>}
        </div>
      );
    }

    return (
      <input id={id} type={field.type} name={field.name} value={value as string} onChange={handleChange} required={field.required} className="form-input" placeholder={field.label} />
    );
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── Success Popup ── */}
      {showSuccessPopup && (
        <div className="popup-overlay" onClick={() => setShowSuccessPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>

            {/* Check icon */}
            <div className="popup-icon-wrap">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" stroke="#34d399" strokeWidth="2.5" opacity="0.4" />
                <polyline className="popup-check-circle" points="12,22 19,30 32,14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="popup-title">Registration Successful! 🎉</div>

            <p className="popup-body">
              Your team has been registered for{' '}
              <strong style={{ color: '#c4b5fd' }}>Ignition HackVerse 2026</strong>.
              Your registration is currently{' '}
              <strong style={{ color: '#fbbf24' }}>pending verification</strong>.
            </p>

            {/* Email block — stacked, never overflows */}
            <div className="popup-email-block">
              <div className="popup-email-label">
                <span>✉️</span> Confirmation email sent to
              </div>
              <div className="popup-email-address">{registeredEmail}</div>
            </div>

            <div className="popup-divider" />

            <p className="popup-note">
              Please check your inbox (and spam folder) for the confirmation email.
              Our team will review your submission and update you shortly.
              If you have any queries, feel free to reach out to the organizers.
            </p>

            <button className="popup-close-btn" onClick={() => setShowSuccessPopup(false)}>
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      <div className="rform-container">
        <div className="rform-orb-1" />
        <div className="rform-orb-2" />

        <div className="rform-inner">
          <div className="rform-header">
            <div className="rform-header-badge">
              <span className="dot" />
              Ignition HackVerse 2026
            </div>
            <h1>Team Registration</h1>
            <p style={{ fontFamily: 'Trebuchet MS, sans-serif', color: 'cyan', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              Register your team for the upcoming hackathon event!
            </p>
          </div>

          {submitMessage.text && (
            <div className={`rform-alert ${submitMessage.type}`}>{submitMessage.text}</div>
          )}
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
                  <div className="select-wrapper">
                    <select id="teamSize" value={teamSize} onChange={handleTeamSizeChange} className="form-select">
                      <option value={2}>2 Members</option>
                      <option value={3}>3 Members</option>
                      <option value={4}>4 Members</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="teamName">Team Name<span className="required">*</span></label>
                  <input id="teamName" type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="form-input" placeholder="Enter your team name" />
                </div>
              </div>
            </div>

            {/* Project Submission */}
            <div className="rform-section project-section">
              <h2>Project Submission</h2>
              <div className="selection-criteria">
                <h3>Selection Criteria</h3>
                <p>In case of excessive registrations, an elimination round will be conducted. Please share your project presentation and video walkthrough. Selection will be based on:</p>
                <ul>
                  <li><strong>Clarity and Understanding</strong></li>
                  <li><strong>Feasibility of Solution</strong></li>
                  <li><strong>Innovation and Creativity</strong></li>
                  <li><strong>Technical Depth</strong> (how much you know about the technology required)</li>
                  <li><strong>Impact and Usefulness</strong> of the solution</li>
                  <li><strong>Scalability and Future Scope</strong></li>
                  <li><strong>Presentation and Structure</strong></li>
                </ul>
                <p><strong>Note:</strong> The first round is purely for screening purposes. Your main problem statement for the hackathon will be different and provided 16 hours before the event.</p>
                <p><strong>If you are not selected for Round 2, 50% of your amount will be refunded.</strong></p>
                <p>Ensure both Drive links are publicly accessible (view access for anyone with the link).</p>
              </div>

              <div className="link-input-group">
                <div className={`link-input-card${pptLinkError ? ' invalid-link' : ''}`}>
                  <div className="link-card-header">
                    <div className="link-card-icon ppt-icon">📊</div>
                    <div>
                      <div className="link-card-label ppt-label">PPT Drive Link</div>
                      <div className="link-card-sublabel">Google Drive / OneDrive / Slides</div>
                    </div>
                  </div>
                  <input type="url" value={pptLink} onChange={(e) => { setPptLink(e.target.value); if (pptLinkError && isValidDriveLink(e.target.value)) setPptLinkError(''); }} onBlur={() => { if (pptLink && !isValidDriveLink(pptLink)) setPptLinkError('Only Google Drive, OneDrive, or SharePoint links accepted.'); else setPptLinkError(''); }} className="link-input-field" placeholder="https://drive.google.com/..." />
                  {pptLinkError ? <div className="link-error-msg">⚠ {pptLinkError}</div> : <div className="link-hint"><div className="link-hint-dot" />Share your project presentation slides</div>}
                </div>

                <div className={`link-input-card video-card${videoLinkError ? ' invalid-link' : ''}`}>
                  <div className="link-card-header">
                    <div className="link-card-icon video-icon">🎬</div>
                    <div>
                      <div className="link-card-label video-label">Video Presentation Link</div>
                      <div className="link-card-sublabel">Google Drive / YouTube (unlisted)</div>
                    </div>
                  </div>
                  <input type="url" value={videoLink} onChange={(e) => { setVideoLink(e.target.value); if (videoLinkError && isValidDriveLink(e.target.value)) setVideoLinkError(''); }} onBlur={() => { if (videoLink && !isValidDriveLink(videoLink)) setVideoLinkError('Only Google Drive, YouTube, or OneDrive links accepted.'); else setVideoLinkError(''); }} className="link-input-field video-field" placeholder="https://drive.google.com/..." />
                  {videoLinkError ? <div className="link-error-msg">⚠ {videoLinkError}</div> : <div className="link-hint"><div className="link-hint-dot blue" />Share your recorded video walkthrough</div>}
                </div>
              </div>
            </div>

            {/* Leader Info */}
            <div className="rform-section">
              <h2>Team Leader Information</h2>
              <div className="form-row">
                {formFields.map((field) => (
                  <div className="form-group" key={field.name} style={field.type === 'file' ? { gridColumn: 'span 2' } : undefined}>
                    <label htmlFor={field.name}>{field.label}{field.required && <span className="required">*</span>}</label>
                    {field.type === 'file'
                      ? renderFormField(field, leaderData.receipt, handleLeaderChange, handleLeaderFileChange, filePreview.leader)
                      : renderFormField(field, leaderData[field.name] as string, handleLeaderChange)
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            {teamMembersData.map((member, index) => (
              <div key={index} className="rform-section">
                <h2>Team Member {index + 2} Information</h2>
                <div className="form-row">
                  {formFields.map((field) => (
                    <div className="form-group" key={`${field.name}-${index}`} style={field.type === 'file' ? { gridColumn: 'span 2' } : undefined}>
                      <label htmlFor={`${field.name}-${index}`}>{field.label}{field.required && <span className="required">*</span>}</label>
                      {field.type === 'file'
                        ? renderFormField(field, member.receipt, (e) => handleTeamMemberChange(index, e), (e) => handleTeamMemberFileChange(index, e), filePreview.members[index], index)
                        : renderFormField(field, member[field.name] as string, (e) => handleTeamMemberChange(index, e), undefined, undefined, index)
                      }
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Payment */}
            <div className="rform-section payment-section">
              <h2>Payment Information</h2>
              <div className="payment-layout">
                <div className="qr-block">
                  <img src="/payment_qr.png" alt="Payment QR Code" className="payment-qr" />
                  <div className="payment-info">Scan QR code to pay</div>
                  <div className="payment-fee">₹599 per team</div>
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div className="form-group">
                    <label htmlFor="paymentScreenshot">Upload Payment Screenshot<span className="required">*</span></label>
                    <div className="file-upload-container">
                      <input id="paymentScreenshot" type="file" onChange={handlePaymentFileChange} accept="image/*" className="file-input" />
                      {filePreview.paymentScreenshot && <img src={filePreview.paymentScreenshot} alt="Payment Screenshot" className="preview-image" />}
                      {paymentFile && <span className="upload-status">📎 {paymentFile.name} selected</span>}
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