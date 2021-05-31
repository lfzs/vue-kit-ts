import { createApp } from 'vue'
import App from '@/app.vue'
const app = createApp(App)

import router from './router'
app.use(router)
router.isReady().then(() => app.mount('body'))

import { defaultCardDeck, say } from '@/util/index'
console.log(defaultCardDeck)
say('1')
