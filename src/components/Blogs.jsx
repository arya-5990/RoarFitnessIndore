
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Section from "./reusable/Section";
import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { arrowRightPrimary, calendar, postCategory, heroImg } from "../assets";

const BlogCard = ({ post }) => {
    // Check multiple possible keys for the image
    const displayImage = post.image || post.imageUrl || post.img || heroImg;

    // Format date if it's a Firestore timestamp or date string
    const formattedDate = post.date?.seconds
        ? new Date(post.date.seconds * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        : post.date || "Recently Added";

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 h-full">
            {/* Image Section - Top */}
            <div className="relative w-full aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                    src={displayImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.backgroundColor = '#1D1D1D';
                    }}
                />
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    {post.category && (
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-primary rounded-md">
                            {post.category}
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section - Bottom */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-greyText mb-3">
                    <div className="flex items-center gap-1.5">
                        <img src={calendar} alt="" className="w-4 h-4 opacity-70" />
                        <span>{formattedDate}</span>
                    </div>
                    {post.readingTime && (
                        <span>• {post.readingTime} read</span>
                    )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-gagalin text-white leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.content || post.description || "No description available."}
                </p>

                <div className="mt-auto pt-4 border-t border-white/10">
                    <Link
                        to={`/blogs/${post.id}`}
                        className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-white transition-colors uppercase tracking-widest"
                    >
                        Read Article
                        <img
                            src={arrowRightPrimary}
                            alt=""
                            className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:brightness-0 group-hover:invert"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetching from "blogs" collection
                const q = query(collection(db, "blogs")); // You might want to add orderBy('date', 'desc') if the field exists
                const querySnapshot = await getDocs(q);
                const fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort locally if needed or just use fetched order
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    return (
        <Section className="min-h-screen pt-24 pb-12">
            <motion.div
                variants={revealVar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container space-y-12 xl:space-y-16"
            >
                <div className="space-y-4 text-center xl:space-y-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl font-gagalin">
                        Latest <span className="text-primary">Articles</span>
                    </h1>
                    <p className="text-base lg:text-lg text-greyText leading-relaxed">
                        Stay informed with the latest insights on training, nutrition, and wellness from our expert team.
                        Level up your knowledge and your gains.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(0, visibleCount).map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-greyText">
                        <p className="text-xl">No articles found just yet.</p>
                        <p className="text-sm mt-2">Check back soon for updates!</p>
                    </div>
                )}

                {!loading && visibleCount < posts.length && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={handleLoadMore}
                            className="rounded-full bg-transparent border-2 border-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                            Load More Articles
                        </button>
                    </div>
                )}
            </motion.div>
        </Section>
    );
};

export default Blogs;
