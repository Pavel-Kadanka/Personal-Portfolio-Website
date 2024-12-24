import { createVuetify } from 'vuetify'
import { useDisplay } from 'vuetify';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    
  })
  app.vueApp.use(vuetify)
})