<template>
  <div>
    <div class="header">
      <a href="#"><h1>Youtube</h1></a>
    </div>
    <div class="container">
      <div class="inner-container">
        <div v-if="!store.id">
          <VideoList :videos="store.videos" />
        </div>
        <div v-if="store.id" >
          <Video :id="store.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from './components/VideoList.vue'
import Video from "./components/Video.vue"
import { defineComponent } from 'vue'
import { store, setId, updateVideos, updateVideoDetail } from "./Store";

export default defineComponent({
  components: { VideoList, Video },
  setup() {
    updateVideos();
    store.id && updateVideoDetail(store.id);
    return { store, onView: setId };
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #666666;
}

.header {
  position: relative;
  padding: 0px 64px;
  height: 64px;
  border-bottom: 1px solid #cccccc;
  background-color: #ffffff;
  z-index: 1;
}

.container {
  position: relative;
}

.inner-container {
  position: relative;
  width: 720px;
  margin: auto;
  box-shadow:
    4px 0 4px 2px #ddd,
    -4px 0 4px 2px #ddd;
}
</style>
