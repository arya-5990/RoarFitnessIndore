
import React from "react";
import Section from "./reusable/Section";
import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
import { blogPosts } from "../constants";

const BlogCard = ({ post }) => (
    <div className="flex flex-col gap-4 rounded-xl bg-greyLight p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-md">
                {post.category}
            </div>
        </div>

        <div className="flex flex-col flex-1 gap-3">
            <div className="flex items-center gap-2 text-xs text-greyText">
                <span>{post.date}</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>5 min read</span>
            </div>

            <h3 className="text-xl font-bold font-gagalin leading-tight group-hover:text-primary transition-colors">
                {post.title}
            </h3>

            <p className="text-sm text-greyText line-clamp-2">
                Discover the expert strategies and tips to achieve your fitness goals effectively with our comprehensive guide.
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                <button className="text-sm font-bold text-primary group-hover:text-white transition-colors flex items-center gap-2">
                    Read Article
                    <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    </div>
);

const Blogs = () => {
    const [visibleCount, setVisibleCount] = React.useState(6);

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
                <div className="space-y-4 text-center xl:space-y-6">
                    <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl font-gagalin">
                        Latest <span className="text-primary">Articles</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm lg:text-base text-greyText">
                        Stay informed with the latest insights on training, nutrition, and wellness from our expert team.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {blogPosts.slice(0, visibleCount).map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {visibleCount < blogPosts.length && (
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
