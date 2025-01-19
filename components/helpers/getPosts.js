import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getPosts = ({subject}) => {
  const files = fs.readdirSync(path.join("public/notes"));
  const allPostsData = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const fileContents = fs.readFileSync(
      path.join(`public/notes/${slug}.mdx`),
      "utf8"
    );
    const { data } = matter(fileContents);
    return {
      slug,
      data,
    };
  });
  const filteredPosts = allPostsData.filter((post) => post.data.subject == subject);
  return filteredPosts;
};

export default getPosts;