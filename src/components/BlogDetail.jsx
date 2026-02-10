import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Section from "./reusable/Section";
import { motion } from "motion/react";
import { arrowLeftWhite, calendar, postCategory, heroImg } from "../assets";

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, "blogs", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-grey">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-grey px-4 text-center">
                <h2 className="text-2xl font-bold text-white">Post not found</h2>
                <Link to="/blogs" className="text-primary hover:underline">Back to Blogs</Link>
            </div>
        );
    }

    // Format date
    const formattedDate = post.date?.seconds
        ? new Date(post.date.seconds * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        : post.date || "Recently Added";

    const displayImage = post.image || post.imageUrl || post.img || heroImg;

    return (
        <Section className="min-h-screen pt-24 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container max-w-4xl"
            >
                {/* Back Button */}
                <Link to="/blogs" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-greyText transition-colors hover:text-white">
                    <img src={arrowLeftWhite} alt="back" className="h-4 w-4" />
                    Back to Articles
                </Link>

                {/* Header Section */}
                <div className="mb-10 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium uppercase tracking-wider text-greyText">
                        {post.category && (
                            <span className="flex items-center gap-1.5 text-primary">
                                <img src={postCategory} alt="" className="h-4 w-4" />
                                {post.category}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <img src={calendar} alt="" className="h-4 w-4 opacity-70" />
                            {formattedDate}
                        </span>
                        {post.readingTime && (
                            <span className="text-white/40">• {post.readingTime} read</span>
                        )}
                    </div>

                    <h1 className="font-gagalin text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>
                </div>

                {/* Main Image */}
                <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                    <img
                        src={displayImage}
                        alt={post.title}
                        className="h-full w-full object-cover max-h-[500px]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.backgroundColor = '#1D1D1D';
                        }}
                    />
                </div>

                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-300">
                        {post.content}
                    </div>
                </article>

                {/* Bottom Navigation */}
                <div className="mt-16 border-t border-white/10 pt-8">
                    <Link to="/blogs" className="text-secondary hover:text-white transition-colors">
                        &larr; Read more articles
                    </Link>
                </div>
            </motion.div>
        </Section>
    );
};

export default BlogDetail;
