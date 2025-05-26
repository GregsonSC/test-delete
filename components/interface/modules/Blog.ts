interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  tag: string;
}

export interface BlogContent {
  quote: string;
  content1: string;
  content2: string;
}

export interface Blog {
  id: number;
  title: string;
  resume: string;
  content: BlogContent;
  topic: string;
  publicationDate: string;
  imageUrl: string;
  SubTitle: string;
  ImageSubTitle: string;
  ContentImageUrl: string;
  ImageReference: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export type { BlogPost };

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  message: string;
  errors: string[];
}
