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

export const locale = writable<Locale>(getInitialLocale());

if (browser) {
	locale.subscribe((value) => {
		try {
			localStorage.setItem('locale', value);
		} catch {
			// ignore
		}
		document.documentElement.lang = value;
	});
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
