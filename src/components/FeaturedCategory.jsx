import { motion } from 'framer-motion';
import { Link } from 'react-router';


const categories = [
  {
    name: 'Fantasy',
    description: 'Step into magical realms with dragons, quests, and epic tales.',
    image: 'https://i.ibb.co/svbCQP3f/bg.jpg'
  },
  {
    name: 'Fiction',
    description: 'Escape into crafted worlds full of emotion, thrill, and wonder.',
    image: 'https://i.ibb.co/svbCQP3f/bg.jpg'
  },
  {
    name: 'Non-Fiction',
    description: 'Explore real stories, memoirs, and thought-provoking insights.',
    image: 'https://i.ibb.co/svbCQP3f/bg.jpg'
  }
]
const FeaturedCategories = () => {
  return (
    <section
      className="py-16 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('https://i.ibb.co/qL4whqS7/why-img.webp')`
      }}
    >

      

      <div className='container px-4 py-14 md:py-20 mx-auto my-8'>
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
         Featured Categories
      </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative group h-100 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 brightness-[.35] group-hover:brightness-[.25]"
              style={{ backgroundImage: `url(${cat.image})` }}
            />

            {/* Overlay content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white  ">
             <div className='border border-white px-4 py-[120px]'>
                 <h3 className="text-2xl  font-extrabold mb-2">{cat.name}</h3>
              <p className="text-sm leading-relaxed">{cat.description}</p>
              <Link
                to="/bookshelf"
                className="mt-4 btn btn-sm btn-secondary hover:bg-primary hover:text-white border-none shadow"
              >
                View Books
              </Link>
             </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
