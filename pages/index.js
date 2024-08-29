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
    <div>
      <h1>김성환안천재</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}-{user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}