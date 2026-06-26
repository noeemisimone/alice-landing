// Svelte action per gli slider orizzontali su mobile.
// Problema: un contenitore con overflow-x:auto può "catturare" il gesto verticale
// del dito, bloccando lo scroll della pagina. Qui riconosciamo la direzione del
// gesto: se è verticale disabilitiamo al volo lo scroll orizzontale (overflow-x:hidden),
// così il tocco scorre la PAGINA; se è orizzontale lasciamo scorrere lo slider.
export function hscroll(node: HTMLElement) {
	let startX = 0;
	let startY = 0;
	let decided = false;

	const onStart = (e: TouchEvent) => {
		const t = e.touches[0];
		startX = t.clientX;
		startY = t.clientY;
		decided = false;
	};

	const onMove = (e: TouchEvent) => {
		if (decided) return;
		const t = e.touches[0];
		const dx = Math.abs(t.clientX - startX);
		const dy = Math.abs(t.clientY - startY);
		// aspetta un movimento minimo prima di decidere la direzione
		if (dx < 8 && dy < 8) return;
		decided = true;
		// gesto verticale → libera la pagina disattivando lo scroll orizzontale
		if (dy > dx) node.style.overflowX = 'hidden';
	};

	const reset = () => {
		node.style.overflowX = '';
		decided = false;
	};

	node.addEventListener('touchstart', onStart, { passive: true });
	node.addEventListener('touchmove', onMove, { passive: true });
	node.addEventListener('touchend', reset, { passive: true });
	node.addEventListener('touchcancel', reset, { passive: true });

	return {
		destroy() {
			node.removeEventListener('touchstart', onStart);
			node.removeEventListener('touchmove', onMove);
			node.removeEventListener('touchend', reset);
			node.removeEventListener('touchcancel', reset);
		}
	};
}
