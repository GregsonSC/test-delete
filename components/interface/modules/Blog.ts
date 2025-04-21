interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  tag: string;
}

interface Blog {
  id: number;
  title: string;
  resume: string;
  content: string;
  topic: string;
  publicationDate: string;
  imageUrl: string;
  createdAt: string;
  udpatedAt: string;
}

export type { BlogPost, Blog };

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  message: string;
  errors: string[];
}
