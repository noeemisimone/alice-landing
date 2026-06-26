import type { RequestHandler } from './$types';
import { SITE_URL, STATIC_PATHS } from '$lib/seo';

// Landing: sitemap delle sole pagine presenti (home + Chi siamo).
export const prerender = true;

export const GET: RequestHandler = () => {
	const urls = STATIC_PATHS.map((path) => `${SITE_URL}${path}`);

	const body =
		'<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
		urls.map((loc) => `\t<url><loc>${loc}</loc></url>`).join('\n') +
		'\n</urlset>\n';

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
