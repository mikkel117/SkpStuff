import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('server hook', event.url.pathname);

	const response = await resolve(event);

	return response;
};
