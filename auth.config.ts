import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
console.log('in authConfig.authorized');

			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
console.log('isLoggedIn', isLoggedIn);
console.log('isOnDashboard', isOnDashboard);

			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
console.log('not logged in and not on dashboard');

			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;