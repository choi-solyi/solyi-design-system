import { VApp } from 'vuetify/components/VApp'
import { createSolyiVuetify } from 'solyi-ui'

export function createStarterVuetify() {
  return createSolyiVuetify({ components: { VApp } })
}
