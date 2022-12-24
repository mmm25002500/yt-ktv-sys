<template>
  <div>
    <div v-for="(item, key) in vid_list" :key="key">
      {{ key+1 }} - {{ item.url }}
    </div>
    hi
  </div>
</template>
<script>
export default {
  data() {
    return {
      vid_list: [
        {
          name: 'test',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          name: 'test2',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          name: 'test3',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          name: 'test4',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      ]
    }
  }
}
</script>
<style>

</style>
