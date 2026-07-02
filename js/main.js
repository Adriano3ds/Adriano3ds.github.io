// Version selection. The dev-focused copy is the default on the `dev.` subdomain
// (e.g. dev.adrianojunior.com); every other host defaults to the medtech copy.
// The subdomain always wins; ?v=dev stays supported as a manual preview on hosts
// without a dev subdomain (apex, github.io, localhost). Runs first, before the
// hero animations paint (defer executes before DOMContentLoaded), so there's no
// flash of the default text. innerHTML is used because the headlines carry an
// <em>; the content is ours and fully static, so there's no XSS surface.
const host = location.hostname;
const isDevHost = host.startsWith('dev.');
const wantsDevParam = new URLSearchParams(location.search).get('v') === 'dev';
const version = isDevHost || wantsDevParam ? 'dev' : 'default';

// Hosts without a dev.<domain> sibling (github.io mirror, localhost, bare IPs)
// fall back to the ?v= preview instead of a cross-host redirect.
const canUseSubdomain = host.includes('.') && !host.endsWith('github.io') && !/^[\d.]+$/.test(host);

if (version === 'dev' && typeof SITE_CONTENT !== 'undefined') {
	const content = SITE_CONTENT.dev;
	document.title = content.title;
	document.querySelectorAll('[data-content]').forEach((el) => {
		const value = content[el.dataset.content];
		if (value !== undefined) el.innerHTML = value;
	});
}

// Footer toggle: link to the *other* version. Prefer a real host switch
// (apex <-> dev.<apex>) when the host has a dev sibling; otherwise flip the
// ?v= param on the current host (github.io mirror, localhost, previews).
const versionToggle = document.getElementById('version-toggle');
if (versionToggle) {
	if (version === 'dev') {
		versionToggle.textContent = 'Medtech view';
		versionToggle.href = isDevHost
			? `${location.protocol}//${host.replace(/^dev\./, '')}${location.pathname}`
			: location.pathname;
	} else {
		versionToggle.textContent = 'Dev view';
		versionToggle.href = canUseSubdomain
			? `${location.protocol}//dev.${host}${location.pathname}`
			: '?v=dev';
	}
}

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
	const open = navLinks.classList.toggle('open');
	navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.addEventListener('click', (event) => {
	if (event.target.tagName === 'A') {
		navLinks.classList.remove('open');
		navToggle.setAttribute('aria-expanded', 'false');
	}
});

// Scroll reveal (skipped entirely under prefers-reduced-motion:
// the .reveal styles are gated by the same media query in CSS)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
	const revealTargets = document.querySelectorAll(
		'.section-title, .about-body, .fact, .timeline-item, .stack-group, .project-row, .contact-headline, .contact-sub, .contact-email, .social-links'
	);

	revealTargets.forEach((el) => el.classList.add('reveal'));

	// Stagger siblings inside each group so they cascade in
	['.timeline-item', '.fact', '.stack-group', '.project-row'].forEach((selector) => {
		document.querySelectorAll(selector).forEach((el, i) => {
			el.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
		});
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					// Drop the stagger delay once revealed so later
					// transitions (e.g. hovers) aren't delayed too
					entry.target.addEventListener(
						'transitionend',
						() => {
							entry.target.style.transitionDelay = '';
						},
						{ once: true }
					);
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
	);

	revealTargets.forEach((el) => observer.observe(el));
}

// Scrollspy: highlight the nav link of the section in view
if ('IntersectionObserver' in window) {
	const spyTargets = new Map();

	['about', 'experience', 'projects', 'contact'].forEach((id) => {
		const section = document.getElementById(id);
		const link = navLinks.querySelector(`a[href="#${id}"]`);
		if (section && link) spyTargets.set(section, link);
	});

	const spy = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					spyTargets.forEach((link) => link.classList.remove('active'));
					spyTargets.get(entry.target).classList.add('active');
				}
			});
		},
		{ rootMargin: '-40% 0px -55% 0px' }
	);

	spyTargets.forEach((_, section) => spy.observe(section));
}

// Hero photo tilt (fine-pointer devices only; transform lands on the
// <img> so it doesn't fight the hero-in animation on the <figure>)
const heroPhoto = document.querySelector('.hero-photo');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduceMotion && finePointer && heroPhoto) {
	const heroImg = heroPhoto.querySelector('img');
	let tiltFrame = null;

	heroPhoto.addEventListener('pointermove', (event) => {
		if (tiltFrame) return;
		tiltFrame = requestAnimationFrame(() => {
			tiltFrame = null;
			const rect = heroPhoto.getBoundingClientRect();
			const x = (event.clientX - rect.left) / rect.width - 0.5;
			const y = (event.clientY - rect.top) / rect.height - 0.5;
			heroImg.style.transform =
				`perspective(600px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
		});
	});

	heroPhoto.addEventListener('pointerleave', () => {
		heroImg.style.transform = '';
	});
}
