<template>
	<div v-if="contact" class="page">
		<h4>Thêm Liên hệ</h4>
		<ContactForm
			:contact="contact"
			@submit:contact="createContact"
		/>
		<p class="message">{{ message }}</p>
	</div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue';
import ContactService from '@/services/contact.service';

export default {
	components: {
		ContactForm,
	},
	props: {

	},
	data() {
		return {
			contact: null,
			message: "",
		};
	},
	methods: {

		async createContact(data) {
			try {
				await ContactService.create(data);
				this.message = 'Liên hệ được thêm thành công.';
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		// khoi tao ban dau cho cai contactForm hien len
		const newContact = {
			name: "",
			email: "",
			address: "",
			phone: "",
			Favorite: false,
		}
		this.contact = newContact;
		this.message = "";
	},
};
</script>
