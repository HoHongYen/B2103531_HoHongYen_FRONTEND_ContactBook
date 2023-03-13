import { createWebHistory, createRouter } from "vue-router";
import ContactBook from '@/views/ContactBook.vue';

const routes = [
	{
		path: '/',
		name: 'contactbook',
		component: ContactBook,
	},
	{
		path: '/contacts/:id',
		name: 'contact.edit',
		component: () => import('@/views/ContactEdit.vue'),
		props: true // truyền các biến trong $route.params vào làm props
	},
	{
		path: '/contacts/add',
		name: 'contact.add',
		component: () => import('@/views/ContactAdd.vue'),
		// props: true // truyền các biến trong $route.params vào làm props
	},
	{
		path: '/favorite',
		name: 'favorite',
		component: () => import('@/views/FavoriteContact.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notfound',
		component: () => import('@/views/NotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
