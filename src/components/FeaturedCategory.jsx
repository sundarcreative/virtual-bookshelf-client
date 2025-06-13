import { motion } from 'framer-motion';
import { Link } from 'react-router';

const categories = [
  {
    name: 'Fiction',
    description: 'Stories born from imagination, emotion, and creativity.',
    image: 'https://cdn.pixabay.com/photo/2020/03/19/14/07/books-4940482_960_720.jpg'
  },
  {
    name: 'Non-Fiction',
    description: 'Based on facts, reality, and inspiring true events.',
    image: 'https://cdn.pixabay.com/photo/2015/06/24/15/45/book-820272_960_720.jpg'
  },
  {
    name: 'Fantasy',
    description: 'Enter magical worlds with dragons, spells, and adventure.',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/12/54/book-1869981_960_720.jpg'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="container mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">🎯 Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="card bg-base-100 shadow-xl overflow-hidden"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <figure className="h-48 overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full object-cover h-full" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{cat.name}</h3>
              <p>{cat.description}</p>
              <div className="card-actions justify-end mt-4">
                <Link to="/bookshelf" className="btn btn-sm btn-primary">Browse {cat.name}</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
