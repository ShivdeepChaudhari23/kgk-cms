export interface Post {
  id: number,
  title: string,
  slug: string,
  content: string,
};
  
export interface PostConfiguration {
  id: number,
  title: string,
  slug: string,
  content: string,
}
  
export const postDefaultConfig: PostConfiguration = {
  id: -Infinity,
  title: '',
  slug: '',
  content: '',
};
