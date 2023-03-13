<script>
export default {
	props: {
		contact: { type: Object, required: true },
	},
};
</script>

<template>
	<div>
		<div class="p-1">
			<strong>Tên:</strong>
			{{ contact.name }}
		</div>
		<div class="p-1">
			<strong>E-mail:</strong>
			{{ contact.email }}
		</div>
		<div class="p-1">
			<strong>Địa chỉ:</strong>
			{{ contact.address }}
		</div>
		<div class="p-1">
			<strong>Điện thoại:</strong>
			{{ contact.phone }}
		</div>
		<div class="p-1">
			<strong>Liên hệ yêu thích:&nbsp;</strong>
			<i v-if="contact.favorite" class="fas fa-heart"></i>
			<i v-else class="fas fa-exclamation"></i>
		</div>
	</div>
</template>

<style scoped>
	.fa-heart {
		color: red;
	}
	.fa-exclamation {
		color: red;
	}
</style>