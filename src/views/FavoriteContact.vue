<template>
	<div class="page row">
		<div class="col-md-10">
			<InputSearch v-model="searchText" />
		</div>
		<div class="mt-3 col-md-6">
			<h4>
				Các danh bạ yêu thích
				<i class="fas fa-heart"></i>
			</h4>
			<ContactList
				v-if="filteredContactsCount > 0"
				:contacts="filteredContacts"
				v-model:activeIndex="activeIndex"
			/>
			<p v-else>Không có liên hệ nào.</p>

			<div class="mt-3 row justify-content-around align-items-center">
				<button
					class="left btn btn-sm btn-primary"
					@click="refreshList()"
				>
					<i class="fas fa-smile"></i> Làm mới
				</button>

				<button
					class=" right btn btn-sm btn-success"
					@click="goToAddContact"
				>
					<i class="fas fa-plus"></i> Thêm mới
				</button>

			</div>
			<div class="mt-3 row justify-content-around align-items-center">
				<button
					class="full-width btn btn-sm btn-danger"
					@click="removeAllFavoriteContacts"
				>
				<i class="fas fa-exclamation"></i>&nbsp;Xóa tất cả liên hệ yêu thích
				</button>
			</div>
			<p class="message">{{ message }}</p>
		</div>
		<div class="mt-3 col-md-6">
			<div v-if="activeContact">
				<h4>
					Chi tiết Liên hệ
					<i class="fas fa-address-card"></i>
				</h4>
				<ContactCard :contact="activeContact"/>
				<router-link
					:to="{
						name: 'contact.edit',
						params: { id: activeContact._id },
					}"
				>
					<span class="mt-2 badge badge-warning">
						<i class="fas fa-edit"></i> Hiệu chỉnh
					</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import ContactList from '@/components/ContactList.vue';
import ContactService from '@/services/contact.service';

export default {
	components: {
		ContactCard,
		InputSearch,
		ContactList,
	},
	data() {
		return {
			contacts: [],
			activeIndex: -1,
			searchText: "",
			message: "",
		};
	},
	watch: {
		// Giám sát các thay đổi của biến searchText.
		// Bỏ chọn phần tử đang được chọn trong danh sách.
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		// Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
		contactFavoriteStrings() {
			return this.contacts.map((contact) => {
				const { name, email, address, phone } = contact;
				return [name, email, address, phone].join("");
			});
		},
		// Trả về các contact có chứa thông tin cần tìm kiếm.
		filteredContacts() {
			if (!this.searchText) return this.contacts;
			return this.contacts.filter((_contact, index) =>
				this.contactFavoriteStrings[index].toLowerCase().includes(this.searchText)
			);
		},
		activeContact() {
			if (this.activeIndex < 0) return null;
			return this.filteredContacts[this.activeIndex];
		},
		filteredContactsCount() {
			return this.filteredContacts.length;
		},
	},
	methods: {
		async retrieveFavoriteContacts() {
			try {
				this.contacts = await ContactService.getAllFavorite();
			} catch (error) {
				console.log(error);
			}
		},

		refreshList() {
			this.retrieveFavoriteContacts();
			this.activeIndex = -1;
		},

		async removeAllFavoriteContacts() {
			if (confirm("Bạn muốn xóa tất cả liên hệ yêu thích?")) {
				try {
					// await ContactService.deleteAll();
					for (let i=0; i<this.filteredContactsCount; i++) {
						let id = this.filteredContacts[i]._id;
						await ContactService.delete(id);
						this.message = 'Xoá các liên hệ yêu thích thành công.';
					}
					this.refreshList();
				} catch (error) {
					console.log(error);
				}
			}
		},

		goToAddContact() {
			this.$router.push({ name: "contact.add" });
		},
	},
	mounted() {
		this.refreshList();
	},
}
</script>

<style scoped>
.page {
	text-align: left;
	max-width: 750px;
}
.full-width {
	width: 90%;
}

.left {
	left: -6%;
}

.right {
	right: -6%;
}

.fa-heart {
	color: red;
}
</style>