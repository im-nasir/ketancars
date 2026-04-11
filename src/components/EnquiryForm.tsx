'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  interest: z.string().min(1, 'Please describe your interest'),
  message: z.string().min(10, 'Please provide a brief message'),
});

type FormData = z.infer<typeof schema>;

interface EnquiryFormProps {
  dark?: boolean;
  carRef?: string;
}

export default function EnquiryForm({ dark = false, carRef }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const inputBase = `w-full bg-transparent border-b py-3 text-sm tracking-wide placeholder:text-current placeholder:opacity-40 focus:outline-none transition-colors duration-200 ${
    dark
      ? 'border-white/20 text-white focus:border-white/60'
      : 'border-stone-300 text-stone-900 focus:border-stone-700'
  }`;

  const labelBase = `block text-[10px] tracking-[0.25em] uppercase mb-1 ${dark ? 'text-white/50' : 'text-stone-400'}`;
  const errorBase = `text-xs mt-1 ${dark ? 'text-red-300' : 'text-red-500'}`;

  const onSubmit = async (data: FormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, carRef }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
      reset();
    } catch {
      setServerError('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className={`font-serif text-2xl mb-3 ${dark ? 'text-white' : 'text-stone-900'}`}>
            Thank you.
          </p>
          <p className={`text-sm tracking-wider ${dark ? 'text-white/60' : 'text-stone-500'}`}>
            We will be in touch shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-lg"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelBase}>Full Name</label>
              <input {...register('name')} placeholder="Your name" className={inputBase} />
              {errors.name && <p className={errorBase}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelBase}>Email</label>
              <input {...register('email')} type="email" placeholder="your@email.com" className={inputBase} />
              {errors.email && <p className={errorBase}>{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelBase}>Phone (optional)</label>
              <input {...register('phone')} type="tel" placeholder="+44 000 000 0000" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Interest</label>
              <input {...register('interest')} placeholder="e.g. 1967 Ferrari 275 GTB" className={inputBase} />
              {errors.interest && <p className={errorBase}>{errors.interest.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelBase}>Message</label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Tell us what you're looking for…"
              className={`${inputBase} resize-none`}
            />
            {errors.message && <p className={errorBase}>{errors.message.message}</p>}
          </div>

          {serverError && <p className={errorBase}>{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 text-xs tracking-[0.3em] uppercase border px-8 py-3.5 transition-all duration-300 disabled:opacity-40 ${
              dark
                ? 'border-white text-white hover:bg-white hover:text-black'
                : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
            }`}
          >
            {isSubmitting ? 'Sending…' : 'Send Enquiry'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
