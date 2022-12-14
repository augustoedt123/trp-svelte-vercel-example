import type { User } from '$lib/types/types';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
	const jwt = event.cookies.get('jwt');
	// console.log(jwt);
	const user: User = jwt && JSON.parse(atob(jwt));
	event.locals.user = user;
	// 👆 or, if we're using HTTP headers based authentication, we could do something like this:
	// const token = event.request.headers.get('authorization')?.replace('Bearer ', '');

	return {
		user: user
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
