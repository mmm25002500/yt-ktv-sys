<template>
  <div>
    <h1 class="text-3xl pb-2">{{ t('Settings.title') }}</h1>
    <hr class="pb-3">

    <transition
      appear
      @before-enter="(el) => {
        el.style.opacity = 0
        el.style.transform = 'translateX(-100px)'
      }"
      @enter="(el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1
        })
      }"
    >
      <div>
        <!-- 更新日誌 -->
        <div class="rounded-md pb-3">
          <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white align-middle">{{ t('Settings.ChangeLog.title') }}: </label>
          <button @click="$router.push('/changes')" type="button" class=" disabled:text-cyan-400 disabled:disabled:text-cyan-400 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white disabled:dark:bg-gray-200 disabled:bg-gray-200 rounded-l-md rounded-r-md border border-gray-200 hover:bg-gray-100  hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <font-awesome-icon :icon="['fas', 'list']" class="pr-1" />
            {{ t('Settings.ChangeLog.title') }}
          </button>
          <p class="pl-7 text-sm text-gray-400">{{ t('Settings.ChangeLog.description')}}</p>
        </div>

        <!-- Themes -->
        <div class="rounded-md pb-3" role="group">
          <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white align-middle">{{ t('Settings.Themes.title') }}: </label>
          <button @click="darkMode = true" :disabled="darkMode" type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 disabled:dark:bg-gray-800 disabled:bg-gray-800 dark:border-gray-600 disabled:text-cyan-400 disabled:disabled:text-cyan-400 dark:text-white  dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <font-awesome-icon :icon="['fas', 'moon']" class="pr-1" />
            {{ t('Settings.Themes.dark') }}
          </button>
          <!-- <button type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg aria-hidden="true" class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
            Settings
          </button> -->
          <button @click="darkMode = false" :disabled="!darkMode" type="button" class=" disabled:text-cyan-400 disabled:disabled:text-cyan-400 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white disabled:dark:bg-gray-200 disabled:bg-gray-200 rounded-r-md border border-gray-200 hover:bg-gray-100  hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <font-awesome-icon :icon="['fas', 'sun']" class="pr-1" />
            {{ t('Settings.Themes.light') }}
          </button>
          <p class="pl-7 text-sm text-gray-400">{{ t('Settings.Themes.description')}}</p>
        </div>

        <!-- Language -->
        <div>
          <label for="language_selector" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('Settings.language.title') }}: </label>
          <select id="language_selector" v-model="locale" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="(item, key) in lang.availableLocales"
              :key="key"
              class="text-gray-500">
              {{ item }}
            </option>
          </select>
          <p class="pl-7 text-sm text-gray-400">{{ t('Settings.language.description')}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n'
import GSAP from 'gsap'

export default {
  setup() {
    const { t, locale } = useI18n()
    const lang = useI18n()
    return {
      t,
      locale,
      lang
    }
  },
  data() {
    return {
      gsap: GSAP,
      darkMode: false
    }
  },
  methods: {
  },
  watch: {
    darkMode: function(val) {
      localStorage.setItem('darkMode', this.darkMode)
      if (val) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  },
  created() {
    if (localStorage.darkMode === 'true') {
      this.darkMode = true
    } else {
      this.darkMode = false
    }
  },
  mounted() {
    // when page is loaded
    this.$Progress.finish()
  }
}
</script>
