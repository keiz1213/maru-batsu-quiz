import admin from 'firebase-admin'
import { defineConfig } from 'cypress'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config): any {
      return cypressFirebasePlugin(on, config, admin, {
        projectId: process.env.FIREBASE_PROJECT_ID
      })
    },
    baseUrl: 'http://localhost:3000'
  }
})
