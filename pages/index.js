import { useState, useEffect } from 'react';

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/getUsers');
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    
  );
}