import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../components/css/slider.css'
import { NavLink } from 'react-router';

const Slider = () => {
    return (
        <div className="w-full h-[80vh] group relative ">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="flex flex-col md:flex-row items-center justify-between h-full w-full overflow-hidden px-8 md:px-16">
                        {/* Left Text Content */}
                        <div className="md:w-1/2 text-center md:text-left py-12 md:pl-10 space-y-6">
                            <h1 className="text-4xl md:text-6xl font-light text-gray-800 leading-tight">
                                Middle-earth <br />
                                <span className="font-bold">Adventure Box</span>
                            </h1>
                            <ul className="space-y-2 text-gray-800 text-base">
                                <li>🗺️ Includes Map of the Shire & Beyond</li>
                                <li>🧙‍♂️ Gandalf's Magical Quote Cards</li>
                                <li>💍 Collector's Mini One Ring Replica</li>
                            </ul>
                                <NavLink to='/bookshelf'><button className="bg-gray-800 text-white px-6 py-3 mt-4 hover:bg-gray-900">
                                VIEW BOOK
                            </button></NavLink>
                            
                        </div>

                        {/* Right Image */}
                        <div className="md:w-1/2 py-8 relative h-full">
                            <img
                                src="https://i.ibb.co/SDrQ3mjh/s1.jpg"
                                alt="book"
                                className="w-full h-full object-contain z-10 relative"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="flex flex-col md:flex-row items-center justify-between h-full w-full overflow-hidden px-8 md:px-16 ">
                        <div className="md:w-1/2 text-center md:text-left py-12 md:pl-10 space-y-6">
                            <h1 className="text-4xl md:text-6xl font-light text-gray-800 leading-tight">
                                Big Brother <br />
                                <span className="font-bold">Surveillance Set</span>
                            </h1>
                            <ul className="space-y-2 text-gray-800 text-base">
                                <li>📘 Dystopian Journal & Bookmark</li>
                                <li>🎥 "You Are Watched" Poster Pack</li>
                                <li>🔐 Privacy Sticker & Locking Diary</li>
                            </ul>
                            <NavLink to='/bookshelf'><button className="bg-red-800 text-white px-6 py-3 mt-4 hover:bg-red-900">
                                VIEW BOOK
                            </button></NavLink>
                            
                        </div>

                        <div className="md:w-1/2 py-8 h-full relative">
                            <img
                                src="https://i.ibb.co/twkLJwxD/s2.jpg"
                                alt="coffee beans"
                                className="w-full h-full object-contain z-10 relative"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="flex flex-col md:flex-row items-center justify-between h-full w-full overflow-hidden px-8 md:px-16">
                        <div className="md:w-1/2 text-center md:text-left py-12 md:pl-10 space-y-6">
                            <h1 className="text-4xl md:text-6xl font-light text-gray-800 leading-tight">
                                Regency Romance <br />
                                <span className="font-bold">Collector's Crate</span>
                            </h1>
                            <ul className="space-y-2 text-gray-800 text-base">
                                <li>💌 Elegant Letter Set & Quill Pen</li>
                                <li>🎩 Mr. Darcy’s Favorite Tea Blend</li>
                                <li>📖 Limited Edition Book Cover Print</li>
                            </ul>

                            <NavLink to='/bookshelf'><button className="bg-secondary text-white px-6 py-3 mt-4 ">
                                VIEW BOOK
                            </button></NavLink>
                        </div>

                        <div className="md:w-1/2 py-8 h-full relative">
                            <img
                                src="https://i.ibb.co/sJ9J6bzF/s3.jpg"
                                alt="coffee beans"
                                className="w-full h-full object-contain z-10 relative"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;