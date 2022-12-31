<template>
  <div>
    <h1 class="text-md">USER:</h1>
    <ul class="list-decimal pl-8" v-if="items['getData'] === 'success'">
      <li v-for="(item, key) in Object.keys(items['user'])" :key="key">
        <router-link :to="`/order/`+item">
          {{ item }}
        </router-link>
      </li>
    </ul>

    <br>

    <h1 class="text-md">VIDEO:</h1>
    <ul class="list-decimal pl-8" v-if="items['getData'] === 'success'">
      <li v-for="(item, key) in items['user']['TershiXia']['videos']" :key="key">
        {{ item['video_info']['items'][0]['snippet']['title'] }}
      </li>
    </ul>
    <br>
    <button
    @click="set(
  {
    'TershiXia': {
      'username': 'TershiXia',
      'age': 20,
      'videos': []
    },
    'Andy': {
      'username': 'Andy',
      'age': 18,
      'videos': []
    }
  }
    )">更改資料</button>
  </div>
</template>
<script>
import { ref as dbRef, getDatabase, set } from 'firebase/database'

export default {
  data() {
    return {
      items: {}
    }
  },
  methods: {
    set(item) {
      set(dbRef(getDatabase(), 'user'), item)
    },
    get() {
      return this.items
    }
  },
  mounted() {
    // when page is loaded
    this.$Progress.finish()
  },
  firebase: {
    items: dbRef(getDatabase(), '/')
  }
}
</script>
<style>

</style>
