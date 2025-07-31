export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const ALLOWED_SEARCH_PARAM_NAMES = [
  'text',
  'author',
  'category',
  'limit',
  'offset',
];
