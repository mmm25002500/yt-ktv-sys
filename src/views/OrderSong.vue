<template>
  <div>
    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">使用者名稱</label>
          <input v-model="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="請輸入你的使用者名稱" required>
        </div>

        <div>
          <label for="yt_username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">YouTuber</label>
          <input v-model="yt_username" type="text" id="yt_username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="請輸入你的使用者名稱" required>
        </div>
      </div>

      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">電子郵件</label>
        <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your@gmail.com" required>
      </div>

      <div class="mb-6">
        <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">影片/音樂 網址</label>
        <input v-model="link" type="text" id="link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://www.youtube.com/watch?v={ID}" required>
      </div>

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input v-model="agree" id="agree" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
        </div>
        <label for="agree" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">我同意 <router-link to="/rule" class="text-blue-600 hover:underline dark:text-blue-500">社群規範和台規</router-link>。</label>
      </div>

      <button type="submit" :disabled="!agree" @click.prevent="sendData()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:dark:bg-blue-500 disabled:bg-blue-400 ">點歌</button>
    </form>
  </div>
</template>
<script>
import { ref as dbRef, getDatabase, set } from 'firebase/database'

export default {
  data() {
    return {
      items: {},
      username: '',
      email: '',
      link: '',
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
        this.set(this.addVideos(this.yt_username, this.username, this.email, 'test', this.link))
      } else {
        alert('請輸入正確的網址')
      }
    },

    // 新增影片
    addVideos(yt_username, username, user_email, yt_title, yt_url) {
      const data = this.get()
      // console.log(data)
      // 自動取得 YT 影片標題
      if (!data[yt_username].videos) {
        data[yt_username].videos = []
      }
      data[yt_username].videos.push({
        title: yt_title,
        provider: {
          name: username,
          email: user_email
        },
        url: yt_url
      })
      return data
    },

    // 得到 YouTube 影片資訊
    getYTInfo(url) {

    }
  },
  firebase: {
    items: dbRef(getDatabase(), 'user')
  }
}
</script>
<style>

</style>
