<template>
  <div>
    <div class="video">
      <video width="520" :src="`http://localhost:8081/v1/videos/${store.id}`" controls />
      <div>Title: {{ store.videoDetail.title }}</div>
      <div>Description: {{ store.videoDetail.description }}</div>
      <div>Author: {{ store.videoDetail.author.name }}</div>
    </div>
    <div>
      <VideoList :videos="store.recommendVideos" />
    </div>
  </div>
</template>

<script>
import { store, setId } from "../Store";
import VideoList from "./VideoList";

export default ({
  name: 'Video',
  components: {
    VideoList,
  },
  setup() {
    return { store, setId };
  }
});
</script>

<style scoped>
.video {
  padding: 16px;
}
</style>
