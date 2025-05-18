import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, Blog } from "@/components/interface/modules/Blog";


export const BlogViewModel = () => {
  const { fetchData } = useFetch();
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const { response, status, errorLogs } = await fetchData(
      endpoints.blog.getPosts,
      "get"
    );
  
    if (status === 200) {
      if (response) {
        // Aquí response es Blog[]
        setPosts(response as unknown as Blog[]);
      } else {
        console.error("No hay datos:", errorLogs);
        alert("Error al cargar los posts del blog");
      }
    } else {
      console.error("HTTP error:", status, errorLogs);
      alert("Error al cargar los posts del blog");
    }
  };

  return {
    posts,
  };
};

export default BlogViewModel;
