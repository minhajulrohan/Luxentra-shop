// TestConnection.tsx
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://jcqpgntfcdqsvqafjiti.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjcXBnbnRmY2Rxc3ZxYWZqaXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzg2NjEsImV4cCI6MjA3ODAxNDY2MX0.1CZKZ8crkiF_szYZZ_gJ7fozTsBksHLwqtkF2hSl5cQ"
);

function TestConnection() {
  const [status, setStatus] = useState('Click test button');

  const testConnection = async () => {
    console.log('Testing started...');
    setStatus('Testing...');
    
    try {
      console.log('Supabase instance:', supabase);
      
      const { data, error } = await supabase.auth.getSession();
      console.log('Auth response:', { data, error });
      
      if (error) {
        console.error('Auth error:', error);
        setStatus(`Error: ${error.message}`);
      } else {
        console.log('Auth success:', data);
        setStatus('✅ Connected! Check console');
      }
    } catch (err) {
      console.error('Catch error:', err);
      setStatus(`Failed: ${err}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Supabase Test</h2>
      <p>Status: {status}</p>
      <button onClick={testConnection}>Test Connection</button>
    </div>
  );
}

export default TestConnection;