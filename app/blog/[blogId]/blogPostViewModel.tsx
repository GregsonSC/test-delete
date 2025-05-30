import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, Blog } from "@/components/interface/modules/Blog";

export const useBlogPostViewModel = (blogId: number) => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useFetch();

  const getBlogPost = async (blogId: number) => {
    try {
      const {response, status, errorLogs} = await fetchData<ApiResponse<Blog>>(
        endpoints.blog.getPost(blogId),
        "get"
      );
      if(status === 200 && response && response.success){
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setBlog(data)
      } else {
        const errorMessage =
            errorLogs?.message ||
            response?.message ||
            `Failed to fetch blog post (Status: ${status})`;
        console.log("errorMessage", errorMessage);
        setError(errorMessage);
        setBlog([]);
      }
    } catch (err: any) {
      const errorMessage =
        err.message ||
        "An unexpected error occurred while fetching blog post.";
      setError(errorMessage);
      setBlog([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlogPost(blogId);
  }, [blogId]);

  return {
    blog,
    loading,
    error,
    getBlogPost
  }
}