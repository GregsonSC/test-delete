import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, Blog } from "@/components/interface/modules/Blog";

export const BlogViewModel = () => {
  const { fetchData } = useFetch();
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { response, status, errorLogs } = await fetchData<ApiResponse<Blog>>(
        endpoints.blog.getPosts,
        "get"
      );
      if (status === 200 && response && response.success) {
        setPosts(response.data);
      } else {
        const errorMessage =
          errorLogs?.message ||
          response?.message ||
          `Failed to fetch blog posts (Status: ${status})`;
        setError(errorMessage);
        setPosts([]);
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred while fetching blog posts.";
      setError(errorMessage);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
  };
};

export default BlogViewModel;
