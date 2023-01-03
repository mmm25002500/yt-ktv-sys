<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="w-full h-full">
    <div class="flex flex-no-wrap h-screen text-black">
      <!-- Sidebar starts -->
      <!-- Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] -->
      <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

      <!-- PC -->
      <div class="w-64 absolute sm:relative bg-gray-100 dark:bg-gray-900 shadow md:h-full flex-col justify-between hidden sm:flex">
          <div class="px-8">
              <!-- ICON -->
              <div class="h-16 w-full flex items-center text-black dark:text-white">
                <h1 class="text-xl">
                  {{ t('site_name') }}
                </h1>
              </div>

              <!-- Navlink -->
              <ul class="mt-12">
                  <li class="flex w-full justify-between dark:text-gray-300 cursor-pointer items-center mb-6" v-for="(item, key) in nav_list" :key="key">
                    <router-link
                      :to="item.path"
                      class="w-full items-center"
                      >
                        <!-- icon: class="icon icon-tabler icon-tabler-grid" width="18" height="18"  -->
                        <font-awesome-icon :icon="item.icon" class="text-gray-700" />
                        <span class="text-sm ml-2">{{ t(`Navbar.`+item.name) }}</span>
                        <div v-if="item.number" class="py-1 px-3 bg-gray-600 text-right float-right rounded text-gray-300 items-center justify-center text-xs">
                          {{ item.number }}
                        </div>
                      </router-link>
                  </li>
              </ul>

              <!-- search -->
              <!-- <div class="flex justify-center mt-48 mb-4 w-full">
                  <div class="relative">
                      <div class="text-gray-300 absolute ml-4 inset-0 m-auto w-4 h-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z"></path>
                              <circle cx="10" cy="10" r="7"></circle>
                              <line x1="21" y1="21" x2="15" y2="15"></line>
                          </svg>
                      </div>
                      <input class="bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-full text-sm text-gray-300 placeholder-gray-400 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" />
                  </div>
              </div> -->
          </div>

          <!-- bottom icon -->
          <div class="px-8 border-t border-gray-300 dark:border-gray-800">
            <ul class="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                <li class="cursor-pointer pt-5 pb-3" v-for="(item, key) in sidebar_bottom_icon" :key="key">
                    <a :href="item.path" target="_blank" aria-label="show notifications" class="rounded">
                      <font-awesome-icon :icon="item.icon" />
                    </a>
                </li>
                <li class="cursor-pointer pt-5 pb-3" >
                  <button @click="toggleDarkMode()" class="rounded">
                    <font-awesome-icon :icon="darkMode? ['fas', 'moon']: ['fas', 'sun']" />
                  </button>
                </li>
            </ul>
          </div>
      </div>

      <!-- mobile -->
      <div class="h-screen w-64 z-40 absolute bg-gray-100 dark:bg-gray-900 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out" id="mobile-nav" ref="sideBar">
          <button aria-label="toggle sidebar" id="openSideBar" ref="openSideBar" class="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800 text-white" @click="sidebarHandler(true)">
            <font-awesome-icon :icon="['fas', 'bars']" class="icon icon-tabler icon-tabler-adjustments" />
          </button>
          <button aria-label="Close sidebar" id="closeSideBar" ref="closeSideBar" class="hidden h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white" @click="sidebarHandler(false)">
            <font-awesome-icon :icon="['fas', 'x']" class="icon icon-tabler icon-tabler-adjustments" />
          </button>
          <div class="px-8">
              <div class="h-16 w-full flex items-center text-black dark:text-white">
                <!-- ICON -->
                <h1 class="text-xl">
                  {{ t('site_name') }}
                </h1>
              </div>
              <ul class="mt-12">

                <!-- Navlink -->
                <li class="flex w-full justify-between text-black dark:text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6" v-for="(item, key) in nav_list" :key="key">
                  <router-link
                    :to="item.path"
                    class="flex items-center"
                  >
                    <font-awesome-icon :icon="item.icon" class="text-gray-700" />
                    <span class="text-sm ml-2">{{ t(`Navbar.`+item.name) }}</span>
                  </router-link>
                  <div v-if="item.number" class="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">
                    {{ item.number }}
                  </div>
                </li>
              </ul>

              <!-- Search -->
              <!-- <div class="flex justify-center mt-48 mb-4 w-full">
                  <div class="relative">
                      <div class="text-gray-300 absolute ml-4 inset-0 m-auto w-4 h-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z"></path>
                              <circle cx="10" cy="10" r="7"></circle>
                              <line x1="21" y1="21" x2="15" y2="15"></line>
                          </svg>
                      </div>
                      <input class="bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-100  rounded w-full text-sm text-gray-300 placeholder-gray-400 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" />
                  </div>
              </div> -->
          </div>

          <!-- bottom icon -->
          <div class="px-8 border-t border-gray-300 dark:border-gray-800">
              <ul class="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  <li class="cursor-pointer pt-5 pb-3" v-for="(item, key) in sidebar_bottom_icon" :key="key">
                      <a :href="item.path"  arget="_blank" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                        <font-awesome-icon :icon="item.icon" class="icon icon-tabler icon-tabler-bell" />
                      </a>
                  </li>
                <li class="cursor-pointer pt-5 pb-3" >
                  <button @click="toggleDarkMode()" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                    <font-awesome-icon :icon="darkMode? ['fas', 'moon']: ['fas', 'sun']" />
                  </button>
                </li>
              </ul>
          </div>
      </div>
      <!-- Sidebar ends -->
      <!-- Remove class [ h-64 ] when adding a card block -->
      <div class="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
        <!-- view -->
        <section class="w-full text-black dark:text-white">
          <router-view v-slot="{ Component }">
            <transition appear
              @before-enter="
                (el) => {
                  el.style.transform = 'translateY(100px)'
                  el.style.opacity = 0
                }
              "
              @enter="
                (el, done) => {
                  gsap.to(el, {
                    opacity: 1,
                    duration: 0.5,
                    y: 0
                  })
                }"
              @leave="
                (el, done) => {
                  gsap.to(el, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: done
                  })
                }">
              <component :is="Component" />
            </transition>
          </router-view>

          <vue-progress-bar></vue-progress-bar>
        </section>
        <FooterSection></FooterSection>
      </div>
    </div>
  </div>
</template>
<script>
import FooterSection from '@/components/Footer.vue'
import SITECFG from './config/SITECFG.json'
import { useI18n } from 'vue-i18n'
import GSAP from 'gsap'

export default {
  name: 'App',
  setup() {
    const { t, locale } = useI18n()
    const lang = useI18n()
    return {
      t,
      locale,
      lang
    }
  },
  components: {
    FooterSection
  },
  data() {
    return {
      SITE_CONFIG: SITECFG,
      gsap: GSAP,
      darkMode: false,
      nav_list: [
        {
          name: 'HomePage',
          icon: ['fas', 'home'],
          number: 87,
          path: '/'
        },
        {
          name: 'Order',
          icon: ['fas', 'shopping-cart'],
          path: '/order/new'
        },
        {
          name: 'Rule',
          icon: ['fas', 'book'],
          path: '/rule'
        },
        {
          name: 'Settings',
          icon: ['fas', 'cog'],
          path: '/setting'
        }
      ],
      sidebar_bottom_icon: [
        {
          name: 'Github',
          icon: ['fab', 'github'],
          path: 'https://github.com/mmm25002500'
        },
        {
          name: 'Facebook',
          icon: ['fab', 'facebook'],
          path: 'https://facebook.com/TershiXia'
        },
        {
          name: 'Twitter',
          icon: ['fab', 'twitter'],
          path: 'https://twitter.com/TershiXia'
        },
        {
          name: 'Instagram',
          icon: ['fab', 'instagram'],
          path: 'https://instagram.com/TershiXia'
        }
      ]
    }
  },
  methods: {
    sidebarHandler(flag) {
      if (flag) {
        this.sideBar.style.transform = 'translateX(0px)'
        this.openSideBar.classList.add('hidden')
        this.closeSideBar.classList.remove('hidden')
      } else {
        this.sideBar.style.transform = 'translateX(-260px)'
        this.closeSideBar.classList.add('hidden')
        this.openSideBar.classList.remove('hidden')
      }
    },
    // 切換 dark mode & light mode
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
    },

    // progress bar
    start() {
      this.$Progress.start()
    },
    set(num) {
      this.$Progress.set(num)
    },
    increase(num) {
      this.$Progress.increase(num)
    },
    decrease(num) {
      this.$Progress.decrease(num)
    },
    finish() {
      this.$Progress.finish()
    },
    fail() {
      this.$Progress.fail()
    },
    test() {
      // test func
      this.$Progress.start()

      this.$http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz')
        .then((response) => {
          this.$Progress.finish()
        }, (response) => {
          this.$Progress.fail()
        })
    }
  },
  watch: {
    darkMode: function(val) {
      if (val) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    locale: function(val) {
      localStorage.setItem('locale', val)
    }
  },
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()

    // Sidebar
    this.sideBar = this.$refs.sideBar
    this.openSideBar = this.$refs.openSideBar
    this.closeSideBar = this.$refs.closeSideBar
    this.sideBar.style.transform = 'translateX(-260px)'
  },
  created() {
    if (localStorage.darkMode === 'true') {
      this.darkMode = true
    } else {
      this.darkMode = false
    }

    // progress bar of starting
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      // 自動標題(會從 router 裡面的 title 去抓)
      document.title = '點歌系統 | ' + to.name
      // next()
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
}
</script>
