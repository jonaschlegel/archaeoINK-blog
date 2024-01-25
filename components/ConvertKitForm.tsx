'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import NewsletterButton from './NewsletterButton'

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email.').required('Email address is required.'),
})

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export default function ConvertKitForm() {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function onSubmit(values: { email: string }) {
    try {
      console.log('Sending values:', values)

      const response = await fetch('/api/newsletter-subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccess(true)
        reset()
      } else {
        setServerError(data.message || 'An error occurred')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setServerError('An error occurred during submission.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <div className=" text-gray-900 dark:text-gray-100">
        Want to stay updated on the latest well designed archaeological illustrations, illustrations
        techniques and softwares, then join the archaeoINK newsletter and unsubmit at any time.
      </div>

      <div className="mt-6 flex">
        <input
          {...register('email')}
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          className="min-w-0 flex-auto appearance-none  bg-transparent px-3 py-[calc(theme(spacing.2)-1px)] text-gray-600 dark:text-gray-400"
        />

        <NewsletterButton
          type="submit"
          className="ml-4 flex  bg-primary-600 text-gray-900 hover:bg-primary-700 dark:text-gray-100 dark:hover:bg-primary-400"
        >
          {isSubmitting ? 'Joining...' : 'Join'}
        </NewsletterButton>
      </div>
    </form>
  )
}
