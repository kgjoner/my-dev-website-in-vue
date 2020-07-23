<template>
	<footer class="footer">
		<span class="copyright">© 2020 Kaio Gabriel</span>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style>

.footer {
	grid-area: footer;
	background-color: #333;
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.copyright {
	color: #f2f2f2;
	margin-left: 20px;
	font-size: 0.8rem;
}

</style>
