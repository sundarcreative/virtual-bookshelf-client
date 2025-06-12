import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AuthContext } from '../provider/AuthProvider';

const COLORS = ['#4ade80', '#60a5fa', '#facc15'];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books').then(res => {
      const userBooks = res.data.filter(b => b.user_email === user.email);
      setBooks(userBooks);
    });
  }, [user.email]);

  const countByCategory = {
    Fiction: books.filter(b => b.book_category === 'Fiction').length,
    'Non-Fiction': books.filter(b => b.book_category === 'Non-Fiction').length,
    Fantasy: books.filter(b => b.book_category === 'Fantasy').length,
  };

  const chartData = Object.entries(countByCategory).map(([name, value]) => ({ name, value }));

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="avatar mb-4">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.photoURL} />
        </div>
      </div>
      <h2 className="text-2xl font-bold">{user.displayName}</h2>
      <p className="text-sm text-gray-500">{user.email}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Books by Category</h3>
        <PieChart width={300} height={300}>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Profile;
