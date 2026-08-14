async function testAuth() {
  try {
    const password = 'Password@123';
    // 1. Try to login
    console.log('Logging in...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test1@example.com',
        password
      })
    });
    
    console.log('Login Status:', loginRes.status);
    const loginData = await loginRes.json();
    console.log('Login Data:', loginData);
    
    let token = loginData?.data?.accessToken;
    
    if (loginRes.status === 404 || loginRes.status === 401) {
      console.log('Registering...');
      const regRes = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test1@example.com',
          password
        })
      });
      console.log('Register Status:', regRes.status);
      const regData = await regRes.json();
      console.log('Register Data:', regData);
      token = regData?.data?.accessToken;
    }
    
    if (!token) {
      console.log('No token obtained, cannot test /api/resume');
      return;
    }

    console.log('Token obtained:', token.slice(0, 15) + '...');

    // 2. Fetch resumes
    console.log('Fetching resumes...');
    const resumeRes = await fetch('http://localhost:5000/api/resume', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Resume Status:', resumeRes.status);
    const resumeData = await resumeRes.json();
    console.log('Resume Data:', JSON.stringify(resumeData, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();
