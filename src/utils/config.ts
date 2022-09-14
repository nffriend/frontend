
export const baseUrl =  process.env.NEXT_PUBLIC_NFF_ENV === 'production' ? 'https://api.nffriend.com' : 'https://demo-api.nffriend.com';

export const baseWeb = process.env.NEXT_PUBLIC_NFF_ENV === 'production' ? 'http://space.nffriend.com/' : 'http://demo.nffriend.com/'