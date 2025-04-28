import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, Blog } from "@/components/interface/modules/Blog";

const BlogViewModel = () => {
  const { fetchData } = useFetch();
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await fetchData(endpoints.blog.getPosts, "get").then(
      ({ response, status, errorLogs }) => {
        console.log("errorLogs:", errorLogs);   
        const apiResponse = response as ApiResponse<Blog>;
        if (status === 200) {
          if (apiResponse.success) {
            console.log("Success:", apiResponse.data);
            setPosts(apiResponse.data);
          } else {
            console.error("Error:", apiResponse.message);
            alert("Error al cargar los posts del blog");
          }
          if (apiResponse.errors && apiResponse.errors.length > 0) {
            console.error("Validation errors:", apiResponse.errors);
            alert("Errores de validación al cargar los posts");
          }
        }
      }
    );
  };

  return {
    posts,
  };
};

export default BlogViewModel;
