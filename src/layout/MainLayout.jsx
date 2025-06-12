
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header></Header>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
        >
          <Outlet></Outlet>
        </motion.div>
      </AnimatePresence>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
