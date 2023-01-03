<template>
  <div>
    <h1 class="text-3xl pb-2">{{ t('Settings.ChangeLog.title')}}</h1>
    <hr class="pb-3">
    <transition-group
      appear
      @before-enter="(el) => {
        el.style.opacity = 0
        el.style.transform = 'translateY(30px)'
      }"
      @enter="(el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: el.dataset.index * 0.2
        })
      }">
      <ul
        v-for="(item, key) in log"
        :key="item.version"
        :data-index="key"
        class="list-disc list-inside pb-5"
      >
        <a
          :id="`v`+item.version"
          class="text-2xl">
          v{{ item.version }} <span class="text-xs align-top">{{ item.date }}</span>
        </a>

        <transition-group
          appear
          @before-enter="(el) => {
            el.style.opacity = 0
            el.style.transform = 'translate(80px, 30px)'
          }"
          @enter="(el) => {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              delay: el.dataset.index * 0.05
            })
          }">
          <li
            v-for="(item2, key2) in item.content"
            :key="key2"
            :data-index="key2"
          >
            {{ item2 }}
          </li>
        </transition-group>

      </ul>
    </transition-group>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n'
import log from '@/config/changeLog.json'
import GSAP from 'gsap'

export default {
  setup() {
    const { t, locale } = useI18n()
    return {
      t,
      locale
    }
  },
  data() {
    return {
      gsap: GSAP,
      log
    }
  },
  mounted() {
    // when page is loaded
    this.$Progress.finish()
  }
}
</script>
