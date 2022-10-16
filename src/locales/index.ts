import {createI18n} from 'vue-i18n';

import { fr } from "./fr/index.js"
import { en } from './en/index.js';

const messages = {
  en,
  fr
}

// 2. Create i18n instance with options
export const i18n = createI18n({
  locale         : 'fr',
  legacy         : false,
  fallbackLocale : 'en',
  messages,
})
