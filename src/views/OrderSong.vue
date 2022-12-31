<template>
  <div>
    <!-- <button @click="getYTInfo('vYtyZo_Tqjs')">Get data</button>
    {{ video_info }} -->
    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">

        <!-- Username -->
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ t('OrderPage.form.username.label') }}
          </label>
          <input v-model="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="t('OrderPage.form.username.placeholder')" required>
        </div>

        <!-- YouTuber -->
        <div>
          <label for="yt_username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ t('OrderPage.form.youtuber.label') }}
          </label>
          <input v-model="yt_username" type="text" id="yt_username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="t('OrderPage.form.youtuber.placeholder')" required>
        </div>
      </div>

      <!-- Email -->
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {{ t('OrderPage.form.email.label') }}
        </label>
        <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="t('OrderPage.form.email.placeholder')" required>
      </div>

      <!-- Address -->
      <div class="mb-6">
        <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {{ t('OrderPage.form.address.label') }}
        </label>
        <input v-model="link" type="text" id="link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="t('OrderPage.form.address.placeholder')" required>
      </div>

      <!-- I agree + Community Guidelines and Terms of Service -->
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input v-model="agree" id="agree" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
        </div>
        <label for="agree" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {{ t('OrderPage.form.agree') }}
          <router-link to="/rule" class="text-blue-600 hover:underline dark:text-blue-500">
            {{ t('OrderPage.form.policy_rule') }}
          </router-link>。</label>
      </div>

      <!-- Order Song -->
      <button type="submit" :disabled="!agree" @click.prevent="sendData()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:dark:bg-blue-500 disabled:bg-blue-400 ">
        {{ t('OrderPage.form.order_song') }}
      </button>
    </form>
  </div>
</template>
<script>
import { ref as dbRef, getDatabase, set } from 'firebase/database'
import { useI18n } from 'vue-i18n'

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
      items: {},
      username: '',
      email: '',
      link: '',
      video_info: {},
      yt_username: '',
      agree: false
    }
  },
  methods: {
    // 設定資料庫
    set(item) {
      set(dbRef(getDatabase(), 'user'), item)
    },

    // 得到資料庫
    get() {
      return this.items
    },

    // 驗證表單
    varify() {
      // 驗證網址是不是有 youtube 字樣
      if (this.link.includes('youtube')) {
        return true
      } else {
        return false
      }
    },

    // 傳送資料
    sendData() {
      if (this.varify()) {
        // get Youtube video info
        fetch(this.getYTInfoURL(this.getYTID(this.link)))
          .then(res => res.json())
          .then(data => {
            // set data to local variable
            this.video_info = data

            // send data to firebase
            this.set(this.addVideos(this.yt_username, this.username, this.email, data))
          })
      } else {
        alert('請輸入正確的網址')
      }
    },

    // 新增影片
    addVideos(yt_username, username, user_email, info) {
      const data = this.get()
      // 自動取得 YT 影片標題
      if (!data[yt_username].videos) {
        data[yt_username].videos = []
      }
      data[yt_username].videos.push({
        provider: {
          name: username,
          email: user_email
        },
        video_info: info
      })
      return data
    },

    // convert youtube address to id
    getYTID(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\\&v=)([^#\\&\\?]*).*/
      const match = url.match(regExp)
      return (match && match[2].length === 11) ? match[2] : null
    },

    // 得到 YouTube 影片資訊
    getYTInfoURL(id) {
      const api_url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=' + import.meta.env.VITE_YOUTUBE_API_KEY

      return api_url
    }
  },
  created() {
    this.yt_username = this.$route.params.id === 'new' ? '' : this.$route.params.id
  },
  mounted() {
    // when page is loaded
    this.$Progress.finish()
  },
  firebase: {
    items: dbRef(getDatabase(), 'user')
  }
}
</script>
<style>

</style>
