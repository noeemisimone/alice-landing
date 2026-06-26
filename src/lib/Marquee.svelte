<script lang="ts">
	type Props = {
		items?: string[];
		speed?: number;
		dark?: boolean;
	};

	let {
		items = ['XXIV Edizione', 'Ottobre 2026', 'Roma', 'Le storie crescono'],
		speed = 50,
		dark = false
	}: Props = $props();
</script>

<div class="marquee" class:dark aria-hidden="true">
	<div class="marquee-track" style="animation-duration: {speed}s">
		{#each Array(4) as _, set (set)}
			<div class="marquee-set">
				{#each items as item, i (i)}
					<span class="marquee-item">{item}</span>
					<span class="marquee-dot">●</span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.marquee {
		width: 100%;
		overflow: hidden;
		border-top: 1px solid #0a0a0a;
		border-bottom: 1px solid #0a0a0a;
		padding: 1.25rem 0;
		background: #fff;
	}

	.marquee.dark {
		background: #0a0a0a;
		color: #fff;
		border-color: #0a0a0a;
	}

	.marquee-track {
		display: flex;
		gap: 2.5rem;
		white-space: nowrap;
		animation: marquee linear infinite;
		width: max-content;
	}

	.marquee-set {
		display: flex;
		gap: 2.5rem;
		padding-right: 2.5rem;
	}

	.marquee-item {
		font-size: clamp(1.5rem, 4vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		text-transform: uppercase;
	}

	.marquee-dot {
		font-size: clamp(0.5rem, 1vw, 0.85rem);
		align-self: center;
	}

	@keyframes marquee {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(-25%, 0, 0);
		}
	}

	.marquee:hover .marquee-track {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
