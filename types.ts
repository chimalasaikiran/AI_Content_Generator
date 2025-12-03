export enum ContentType {
  SOCIAL_MEDIA = 'Social Media Caption',
  BLOG_IDEA = 'Blog Idea',
  PRODUCT_DESC = 'Product Description',
  EMAIL_TEMPLATE = 'Email Template'
}

export interface ContentOption {
  id: ContentType;
  label: string;
  description: string;
  iconName: string;
}

export interface GenerationHistoryItem {
  id: string;
  type: ContentType;
  prompt: string;
  result: string;
  timestamp: number;
}

export interface GeneratePayload {
  type: ContentType;
  prompt: string;
}

export interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}