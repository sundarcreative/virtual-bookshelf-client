import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AuthContext } from '../provider/AuthProvider';

const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#a78bfa'];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books').then(res => {
      const userBooks = res.data.filter(b => b.user_email === user.email);
      setBooks(userBooks);
    });
  }, [user.email]);

  // Count by category
  const categoryCounts = books.reduce((acc, book) => {
    acc[book.book_category] = (acc[book.book_category] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  // Summary info
  const totalBooks = books.length;
  const readCount = books.filter(b => b.reading_status === 'Read').length;
  const unreadCount = totalBooks - readCount;

  return (
    <div className="container mx-auto p-6 text-center">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <div className="avatar mb-4">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} />
          </div>
        </div>
        <h2 className="text-2xl font-bold">{user.displayName}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      {/* Summary Info */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Bookshelf Summary</h3>
        <div className="flex flex-wrap justify-center gap-6 text-base">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl">Total Books: {totalBooks}</div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl">Read: {readCount}</div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl">Unread: {unreadCount}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Books by Category</h3>
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Profile;
