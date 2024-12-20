<script lang="ts">
	import { Copyright } from "lucide-svelte";
	// Initialize current year
	const currentYear = new Date().getFullYear();
	// Footer navigation links
	const footerLinks = $state([
		{ title: "POLÍTICA DE PRIVACIDAD", href: "#privacy" },
		{ title: "TÉRMINOS Y CONDICIONES", href: "#terms" },
		{ title: "CONTACTA CON NOSOTROS", href: "#contact" },
	]);
</script>

<footer class="mt-16 w-full border-t border-black font-inter">
	<div class="container mx-auto px-4 py-4">
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
			<!-- Footer Navigation -->
			<nav>
				<ul class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
					{#each footerLinks as link}
						<li>
							<a href={link.href} class="text-xs font-medium hover:text-zinc-600 transition-colors">
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Copyright -->
			<div class="flex items-center gap-1.5 text-xs">
				<span class="flex items-center gap-1">
                    <Copyright class="w-3.5 h-3.5" /> ALL IN FUND
				</span>
				<span>{currentYear}</span>
			</div>
		</div>
	</div>
</footer>