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
                <b>Retry Behavior : </b>  
                If server fails, edit the field and resubmit.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Architecture Notes</h2>

            <ul className="list-disc pl-5 space-y-1">
              <li>Validation schema is generated dynamically from API rules.</li>
              <li>Client validation improves UX.</li>
              <li>Server validation remains the source of truth.</li>
              <li>Field errors use React Hook Form's <code>setError</code>.</li>
            </ul>
          </div>

        </section>
      </>
  )
}

export default Docs