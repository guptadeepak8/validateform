import React from 'react'

const Docs = () => {
  return (
    <>
        <h1 className="text-2xl font-bold mb-6">
           Validated Form— Test Guide
        </h1>

        <section className="space-y-4 text-lg">
        

          <div>
            <h2 className="font-semibold text-lg">How To Test</h2>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <b>Client Validation: </b>  
                Try submitting empty fields or invalid email.
              </li>

              <li>
                <b>Server Field Error: </b>  
                Use an email like
                <div className="bg-gray-100 p-2 mt-1 rounded">
                  test@test.com
                </div>
                Server should reject it.
              </li>

              <li>
                <b>Minimum Amount Rule : </b>  
                Enter amount below the configured minimum.
              </li>
              <li>
                <b>Correct Form: </b>  
                Enter correct email & Amount , Now verify 
              </li>

              <li>
                <b>Retry Behavior : </b>  
                If server fails,  resubmit.
              </li>
            </ol>
          </div>

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