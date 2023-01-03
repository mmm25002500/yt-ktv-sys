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

    <div v-if="toast.open" id="toast-default" class="absolute top-0 right-0 flex items-center p-4 w-full max-w-xs text-gray-500 border-2 border-green-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Fire icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">{{ t(toast.msg) }}</div>
      <button @click="toast.open = false" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
          <span class="sr-only">Close</span>
          <font-awesome-icon :icon="['fas', 'x']" class="relative left-1 w-3 h-3 self-center" ></font-awesome-icon>
      </button>
    </div>

    <!-- <div>
      <div v-if="toast.open" class="absolute top-0 right-0 max-w-xs bg-green-100 border border-green-200 text-sm text-green-500 rounded-md shadow-md" role="alert">
        <div class="flex p-4">
          {{ t(toast.msg) }}

          <div class="ml-auto">
            <button type="button" @click="toast.open = false" class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-green-400 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-100 focus:ring-green-400 transition-all text-sm">
              <span class="sr-only">Close</span>
              <font-awesome-icon :icon="['fas', 'x']" class="w-3 h-3" ></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>
    </div> -->
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
      log: '',
      username: '',
      email: '',
      link: '',
      video_info: {},
      yt_username: '',
      agree: false,
      toast: {
        open: false,
        msg: 'OrderPage.form.toast.success'
      }
    }
  },
  methods: {
    // 設定資料庫
    set(item) {
      set(dbRef(getDatabase(), 'user'), item)
        .then(() => {
          this.toast.open = true
          this.toast.msg = 'OrderPage.form.toast.success'
          console.log('資料寫入成功')
        }).catch((error) => {
          this.toast.open = true
          this.toast.msg = 'OrderPage.form.toast.error'
          console.error('資料寫入失敗:', error)
        })
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
