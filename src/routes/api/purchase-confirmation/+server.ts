import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const requestBody = await request.json();
  console.log(requestBody);

  // Business logic....

  return json({ message: 'Purchase was successful' });
}
