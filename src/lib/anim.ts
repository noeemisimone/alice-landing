// Set of original Svelte actions for editorial animations.

const reducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ───── splitReveal ─────────────────────────────────────────────
   Wraps each word of the element in a mask. Words rise from
   below a horizontal line as the element enters viewport. */
type SplitOptions = { stagger?: number; delay?: number; duration?: number };

export function splitReveal(node: HTMLElement, options: SplitOptions = {}) {
	const { stagger = 70, delay = 0, duration = 1100 } = options;

	if (reducedMotion()) {
		node.classList.add('is-visible');
		return {};
	}

	const textNodes: Text[] = [];
	const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
	let n: Node | null;
	while ((n = walker.nextNode())) textNodes.push(n as Text);

	let wordIndex = 0;
	textNodes.forEach((textNode) => {
		const parent = textNode.parentNode;
		if (!parent || !textNode.nodeValue) return;
		const tokens = textNode.nodeValue.split(/(\s+)/);
		const fragment = document.createDocumentFragment();
		tokens.forEach((token) => {
			if (!token) return;
			if (/^\s+$/.test(token)) {
				fragment.appendChild(document.createTextNode(token));
			} else {
				const outer = document.createElement('span');
				outer.className = 'word-mask';
				const inner = document.createElement('span');
				inner.className = 'word-inner';
				inner.textContent = token;
				inner.style.transitionDelay = `${delay + wordIndex * stagger}ms`;
				inner.style.transitionDuration = `${duration}ms`;
				outer.appendChild(inner);
				fragment.appendChild(outer);
				wordIndex++;
			}
		});
		parent.replaceChild(fragment, textNode);
	});

	node.classList.add('split-reveal');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('is-visible');
				observer.unobserve(node);
			}
		},
		{ threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
	);
	observer.observe(node);

	return { destroy: () => observer.disconnect() };
}

/* ───── clipReveal ──────────────────────────────────────────────
   Element unfolds from one direction using clip-path. */
type ClipOptions = {
	direction?: 'left' | 'right' | 'top' | 'bottom';
	duration?: number;
	delay?: number;
};

export function clipReveal(node: HTMLElement, options: ClipOptions = {}) {
	const { direction = 'left', duration = 1400, delay = 0 } = options;

	if (reducedMotion()) return {};

	const initialClips = {
		left: 'inset(0 100% 0 0)',
		right: 'inset(0 0 0 100%)',
		top: 'inset(100% 0 0 0)',
		bottom: 'inset(0 0 100% 0)'
	};

	const reveal = () => {
		node.style.clipPath = 'inset(0 0 0 0)';
	};

	node.style.clipPath = initialClips[direction];
	node.style.transition = `clip-path ${duration}ms cubic-bezier(0.76, 0, 0.24, 1) ${delay}ms`;

	// Safety net: dopo 3s mostriamo comunque l'elemento, anche se l'observer
	// non si è mai triggerato (es. su display:none parents, errori, ecc.)
	const safetyTimer = window.setTimeout(reveal, 3000);

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				window.clearTimeout(safetyTimer);
				reveal();
				observer.unobserve(node);
			}
		},
		{ threshold: 0.05, rootMargin: '50px' }
	);
	observer.observe(node);

	return {
		destroy: () => {
			window.clearTimeout(safetyTimer);
			observer.disconnect();
		}
	};
}

/* ───── magnet ──────────────────────────────────────────────────
   Element follows cursor slightly while hovered. */
export function magnet(node: HTMLElement, strength = 0.25) {
	if (reducedMotion()) return {};

	const onMove = (e: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const x = (e.clientX - rect.left - rect.width / 2) * strength;
		const y = (e.clientY - rect.top - rect.height / 2) * strength;
		node.style.transform = `translate(${x}px, ${y}px)`;
	};
	const onLeave = () => {
		node.style.transform = 'translate(0, 0)';
	};

	node.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
	node.style.willChange = 'transform';
	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy: () => {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
		}
	};
}

/* ───── scrollFill ──────────────────────────────────────────────
   Text fills with color from left to right as you scroll past. */
export function scrollFill(node: HTMLElement) {
	if (reducedMotion()) {
		node.style.setProperty('--fill-progress', '100%');
		return {};
	}

	node.classList.add('scroll-fill');

	let rafId = 0;
	let ticking = false;

	function update() {
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight;
		const start = vh * 0.85;
		const end = vh * 0.25;
		const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
		node.style.setProperty('--fill-progress', `${progress * 100}%`);
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			rafId = requestAnimationFrame(update);
			ticking = true;
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	update();

	return {
		destroy: () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(rafId);
		}
	};
}

/* ───── parallaxY ───────────────────────────────────────────────
   Element shifts vertically based on scroll position relative
   to its parent's center. Subtle depth effect. */
export function parallaxY(node: HTMLElement, speed = 0.15) {
	if (reducedMotion()) return {};

	let rafId = 0;
	let ticking = false;

	function update() {
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight;
		const center = rect.top + rect.height / 2 - vh / 2;
		const offset = -center * speed;
		node.style.transform = `translate3d(0, ${offset}px, 0)`;
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			rafId = requestAnimationFrame(update);
			ticking = true;
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	update();

	return {
		destroy: () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(rafId);
		}
	};
}
