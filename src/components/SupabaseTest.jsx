import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...')
  const [details, setDetails] = useState(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Check if Supabase client is initialized
        if (!supabase) {
          setStatus('❌ Supabase client not initialized')
          return
        }

        // Test 2: Try to get the current session (tests auth connection)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          setStatus('❌ Connection failed')
          setDetails(sessionError.message)
          return
        }

        // Test 3: Try a simple database query (will work even with empty tables)
        const { error: dbError } = await supabase.from('products').select('count', { count: 'exact', head: true })
        
        // If products table doesn't exist, that's okay - connection still works
        const dbStatus = dbError ? 
          (dbError.code === '42P01' ? '⚠️ Connected (products table not created yet)' : `⚠️ DB: ${dbError.message}`) 
          : '✅ Database connected'

        setStatus('✅ Supabase connected successfully!')
        setDetails({
          url: import.meta.env.VITE_SUPABASE_URL,
          session: sessionData.session ? 'User logged in' : 'No active session',
          database: dbStatus
        })

      } catch (err) {
        setStatus('❌ Connection error')
        setDetails(err.message)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Supabase Connection Test</h1>
        
        <div className={`text-lg font-semibold mb-4 text-center ${
          status.includes('✅') ? 'text-green-600' : 
          status.includes('❌') ? 'text-red-600' : 
          status.includes('⚠️') ? 'text-yellow-600' : 'text-blue-600'
        }`}>
          {status}
        </div>

        {details && (
          <div className="bg-gray-50 rounded p-4 text-sm">
            {typeof details === 'string' ? (
              <p className="text-red-600">{details}</p>
            ) : (
              <div className="space-y-2">
                <p><strong>URL:</strong> {details.url}</p>
                <p><strong>Session:</strong> {details.session}</p>
                <p><strong>Database:</strong> {details.database}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
