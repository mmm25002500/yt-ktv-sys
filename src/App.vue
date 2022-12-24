<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
    <!-- navbar -->
    <h1 class="inline-block text-left text-2xl" @click="$router.push('/')">YouTube 點歌系統(未完成)</h1>

    <!-- right -->
    <div class="inline absolute right-2">
      <div class="relative right-10">
        <div class="inline text-right text-2xl pr-4 hover:dark:text-gray-300" v-for="(item, key) in nav_list" :key="key">
          <router-link
            :to="item.path"
            >
            {{ item.name }}
            <!-- {{ t(`Navbar.${item.name}`) }} -->
          </router-link>
        </div>
      </div>
    </div>

    <!-- view -->
    <section class="mt-5">
      <router-view v-slot="{ Component }">
        <transition appear
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
          name: '主頁',
          path: '/'
        },
        {
          name: '點歌',
          path: '/order'
        }
      ]
    }
  },
  methods: {

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
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
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
