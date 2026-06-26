// Svelte action: reveal on scroll using IntersectionObserver.

type RevealOptions = {
	delay?: number;
	distance?: number;
	duration?: number;
	threshold?: number;
	once?: boolean;
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, distance = 40, duration = 900, threshold = 0.12, once = true } = options;

	const prefersReduced =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (prefersReduced) {
		node.classList.add('is-visible');
		return {};
	}

	node.style.setProperty('--reveal-delay', `${delay}ms`);
	node.style.setProperty('--reveal-distance', `${distance}px`);
	node.style.setProperty('--reveal-duration', `${duration}ms`);
	node.classList.add('reveal');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('is-visible');
				if (once) observer.unobserve(node);
			} else if (!once) {
				node.classList.remove('is-visible');
			}
		},
		{ threshold, rootMargin: '0px 0px -5% 0px' }
	);

	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
}
