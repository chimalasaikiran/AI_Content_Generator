import { ContentType, ContentOption } from './types';

export const CONTENT_OPTIONS: ContentOption[] = [
  {
    id: ContentType.SOCIAL_MEDIA,
    label: 'Social Media Caption',
    description: 'Engaging captions for Instagram, Twitter, or LinkedIn posts.',
    iconName: 'share-2'
  },
  {
    id: ContentType.BLOG_IDEA,
    label: 'Blog Idea & Outline',
    description: 'Creative topics and structured outlines for your next article.',
    iconName: 'file-text'
  },
  {
    id: ContentType.PRODUCT_DESC,
    label: 'Product Description',
    description: 'Persuasive copy to highlight features and benefits.',
    iconName: 'shopping-bag'
  },
  {
    id: ContentType.EMAIL_TEMPLATE,
    label: 'Email Template',
    description: 'Professional email drafts for newsletters or outreach.',
    iconName: 'mail'
  }
];

export const MAX_CHAR_LIMIT = 500;
export const MAX_HISTORY_ITEMS = 5;