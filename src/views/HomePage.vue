<template>
  <div>
    <h1 class="text-md">USER:</h1>
    <ul class="list-decimal pl-8">
      <li v-for="(item, key) in Object.keys(items)" :key="key"> {{ item }}</li>
    </ul>

    <br>

    <h1 class="text-md">VIDEO:</h1>
    <ul class="list-decimal pl-8">
      <li v-for="(item, key) in items['TershiXia']['videos']" :key="key">
        {{ item.url }}
      </li>
    </ul>
    <br>
    {{ items['TershiXia'] }}
    <br>
    {{ Object.keys(items) }}
    <!-- <br>
    <button @click="addVideos('TershiXia', 'hi')">新增影片</button>
    <br>
    <button @click="removeVideos('TershiXia', -1)">刪除</button> -->
    <br>
    <button
    @click="set(
  {
    'TershiXia': {
      'username': 'TershiXia',
      'age': 20,
      'videos': [
        {
          'title': 'video1',
          'provider': {
            'name': 'Marry',
            'email': 'test@abc.com'
          },
          'url': 'https://www.youtube.com/watch?v=1'
        },
        {
          'title': 'video2',
          'provider': {
            'name': 'Marry',
            'email': 'test@abc.com'
          },
          'url': 'https://www.youtube.com/watch?v=2'
        }
      ]
    },
    'Andy': {
      'username': 'Andy',
      'age': 18,
      'videos': [
        {
          'title': 'video1',
          'provider': {
            'name': 'Marry',
            'email': 'test@abc.com'
          },
          'url': 'https://www.youtube.com/watch?v=1'
        },
        {
          'title': 'video2',
          'provider': {
            'name': 'Marry',
            'email': 'test@abc.com'
          },
          'url': 'https://www.youtube.com/watch?v=2'
        }
      ]
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

    // remove videos from video index
    // removeVideos(username, index) {
    //   const data = this.get()
    //   data[username].videos.splice(index, 1)
    //   set(dbRef(getDatabase(), 'user'), data)
    // }
  },
  firebase: {
    items: dbRef(getDatabase(), 'user')
  }
}
</script>
<style>

</style>
