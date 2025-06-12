// import { error } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ params }) => {
//   console.log(params);

//   const blogArticles = [
//     { id: '0', text: 'This is the first blog article.' },
//     { id: '1', text: 'This is the second blog article.' }
//   ];

//   const foundArticle = blogArticles.find((article) => article.id === params.articleId);

//   if (foundArticle) {
//     return { blogPost: foundArticle.text };
//   }

//   throw error(404, 'Article not found');
// };
