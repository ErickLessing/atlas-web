import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase';
import './App.css'
async function checkConnection() {
  const { data, error } = await supabase.from('your_table').select('*');
  console.log(data, error);
}
function App() {
  const [status, setStatus] = useState('Checking connection...')

  useEffect(() => {
    checkConnection()
      .then(() => setStatus('Connected'))
      .catch(() => setStatus('Connection failed'));
  }, [])

  return (
    <>
      <div>
        <p style={{ color: 'green' }}>Connection: </p>
        <p>{status}</p>
      </div>
    </>
  )
}

export default App
