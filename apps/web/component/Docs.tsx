import React from 'react'

const Docs = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Validated Form— Test Guide
      </h1>

      <section className="space-y-4 text-lg">



        <h2 className="font-semibold text-lg">How To Test</h2>

        <ol className="list-decimal pl-5 space-y-4">

          <li>
            <b>Client-side Testing</b>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Submit the form with required fields empty.</li>
              <li>Enter an amount below the minimum limit.</li>
              <li>Provide an invalid email format.</li>
            </ul>
          </li>

          <li>
            <b>Server-side Testing</b>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Use the blocked email:
                <div className="bg-gray-100 p-2 mt-1 rounded w-fit">
                  test@test.com
                </div>
              </li>
              <li>Enter an amount above the maximum limit.</li>
            </ul>
          </li>

          <li>
            <b>Valid Submission</b>
            <ul className="list-disc pl-5 mt-2">
              <li>Enter a valid email and amount, then verify success.</li>
            </ul>
          </li>

          <li>
            <b>Retry Behavior</b>
            <ul className="list-disc pl-5 mt-2">
              <li>If the server fails, resubmit the form.</li>
            </ul>
          </li>
        </ol>
        <div>
          <h2 className="font-semibold text-lg">Architecture Notes</h2>

          <ul className="list-disc pl-5 space-y-1">
            <li>Before rendering the form, validation rules are fetched from the backend using a Next.js server component. This ensures the UI always reflects the latest validation contract.</li>
            <li>The received rules are used to dynamically generate a Zod schema, allowing the client validation to adapt without hardcoding rules.</li>
            <li>When a user submits the form with empty fields or invalid formats, client-side validation triggers immediately and displays errors in light red beneath the relevant fields.</li>
            <li>If the data passes client validation but fails on the server, the server errors are shown in a darker red to clearly distinguish them from client errors.</li>
            <li>- User input is preserved during failures.</li>
          </ul>
        </div>

      </section>
    </>
  )
}

export default Docs