// Version-specific copy. Only the text that changes between the default
// (medtech) framing and the dev-focused framing lives here; everything else
// in the page is shared. Kept as a plain global object (no modules) so it can
// be loaded with a simple <script defer> before main.js.
const SITE_CONTENT = {
	default: {
		title: 'Adriano Junior · R&D Specialist',
		heroHeadline: 'Software where <em>hardware</em> meets healthcare.',
		heroSub: "I'm Adriano Junior, R&D Specialist and Senior Software Engineer building X-ray imaging systems and medical device software at Alliage.",
		aboutLead: 'I turn complex technical requirements into reliable software for regulated, real-world environments. My work lives in the space between backend systems and embedded firmware: X-ray equipment, imaging pipelines, device monitoring platforms and AI-powered accessibility tools.',
	},
	dev: {
		title: 'Adriano Junior · Software Engineer',
		heroHeadline: 'Software engineer who ships <em>reliable</em> systems.',
		heroSub: "I'm Adriano Junior, Senior Software Engineer working across backend platforms, mobile and embedded systems — from Spring services to C/C++ performance work.",
		aboutLead: 'I turn complex technical requirements into reliable software. My work spans backend systems, full-stack platforms and performance-critical code: Java and Python services, Android apps, and C/C++ modules where memory and speed matter.',
	},
};
