export const isDev = process.env.NODE_ENV === 'development';
export const frontDomain = isDev ? 'http://localhost:3000' : 'http://120.79.38.186:3000';
