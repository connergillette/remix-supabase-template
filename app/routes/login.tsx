import type { ActionFunction } from '@remix-run/node'
import { Form, useActionData, useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react'

export const action : ActionFunction = async ({ request }) => {
  const data = await request.formData()

  return { email: data.get('email'), password: data.get('password') }
}

export default function Login() {
  const data = useActionData()
  const { supabase } = useOutletContext()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async() => {
      const response = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (response.error) {
        setError('Invalid email or password.')
      } else {
        window.location.href = '/'
      }
    })()
    setIsLoading(false)
  }, [data, supabase])

  return (
    <div className="flex flex-col max-md:w-10/12 w-8/12 mx-auto my-10">
      <Form method="post" onSubmit={() => setIsLoading(true)}>
        <div className="max-w-[600px] mx-auto flex flex-col gap-10">
          <span className={`text-red-400 text-center ${error ? 'opacity-100' : 'opacity-0'} transition`}>{error}</span>
          <h1 className="text-4xl">Log in</h1>
          <div className="flex flex-col gap-2">
            <span>Email</span>
            <input name="email" className="h-10 px-4 py-2 bg-gray-100 rounded-md" required></input>
          </div>
          <div className="flex flex-col gap-2">
            <span>Password</span>
            <input name="password" type="password" className="h-10 px-4 py-2 bg-gray-100 rounded-md" required></input>
          </div>
          <div className="max-w-4xl">
            <button type="submit" className={`px-4 py-2 rounded-md bg-gray-600 text-white ${isLoading ? 'opacity-40' : ''}`} disabled={isLoading}>Log in</button>
          </div>
        </div>
      </Form>
    </div>
  )
}
