import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

import it from './i18n/it.json';
import en from './i18n/en.json';

export type Locale = 'it' | 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Locale, any> = { it, en };

function getInitialLocale(): Locale {
	if (!browser) return 'it';
	try {
		const stored = localStorage.getItem('locale');
		if (stored === 'it' || stored === 'en') return stored;
	} catch {
		// localStorage might be unavailable (private browsing)
	}
	const browserLang = navigator.language?.toLowerCase() ?? '';
	if (browserLang.startsWith('en')) return 'en';
	return 'it';
}

// Server and client BOTH start in Italian, so the SSR markup matches the very
// first client render (no hydration mismatch). The visitor's real locale is
// applied AFTER mount via initLocale(), as a runtime change — that runtime
// change is what makes the {#key $locale} {@html} titles re-render in the right
// language. (Applying it at init would leave those titles stuck on the SSR
// language, since {@html} inside {#key} is not reconciled during hydration.)
export const locale = writable<Locale>('it');

if (browser) {
	let firstRun = true;
	locale.subscribe((value) => {
		document.documentElement.lang = value;
		// Skip persisting the initial 'it': it would overwrite a previously
		// saved choice before initLocale() has had the chance to read it.
		if (firstRun) {
			firstRun = false;
			return;
		}
		try {
			localStorage.setItem('locale', value);
		} catch {
			// ignore
		}
	});
}

/**
 * Apply the visitor's locale (saved choice → browser language). MUST be called
 * from onMount: applying it as a post-hydration runtime change is what forces
 * the {#key $locale} {@html} titles to switch language correctly.
 */
export function initLocale() {
	if (!browser) return;
	locale.set(getInitialLocale());
}

/** Reactive translator. Use as `$t('hero.title')` in templates. */
export const t = derived(locale, ($locale) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return <T = any>(key: string): T => {
		const dict = dictionaries[$locale];
		const value = key.split('.').reduce((obj, k) => obj?.[k], dict);
		return (value ?? key) as T;
	};
});

export function setLocale(value: Locale) {
	locale.set(value);
}
