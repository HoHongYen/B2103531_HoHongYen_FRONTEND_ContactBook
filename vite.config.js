import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		port: 3001,
		proxy: {
			'/api': {
				// target: "http://localhost:3000/",
				target: "https://b2103531-ho-hong-yen-backend-contact-book.vercel.app/",
				changeOrigin: true,
				ws: true,
				onProxyReq: function (request) {
					request.setHeader("origin", "https://b2103531-ho-hong-yen-backend-contact-book.vercel.app/");
				},
			},
		}
	},
})
