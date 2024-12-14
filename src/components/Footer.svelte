<script>
	const links = [
		{
			name: 'POLITICAS Y PRIVACIDAD',
			href: '#'
		},
		{
			name: 'TERMINOS Y CONDICIONES',
			href: '#'
		},
		{
			name: 'CONTACTOS',
			href: '#'
		}
	];
</script>

<footer class="mt-16 flex flex-col">
	<hr class="mb-16 w-full border-t border-black" />
	<h1 class="mb-16 self-center text-7xl md:text-9xl">
		all<span class=" text-orange-500">event</span>TM
	</h1>
	<div class="max-w-5xl mx-auto px-6 w-full">
        <hr class="mb-4 w-full border-t border-black" />
		<div class="mb-16 sm:flex sm:items-center sm:justify-between">
			<ul class="mb-6 flex flex-wrap items-center text-sm font-medium sm:mb-0">
				{#each links as { name, href }}
					<li>
						<a {href} class="me-4 hover:underline md:me-6">{name}</a>
					</li>
				{/each}
			</ul>
			<p>ALL IN FUND © 2024</p>
		</div>
	</div>
</footer>
