<template>
  <div>
    <div class="video">
      <h2>{{ store.videoDetail.title }}</h2>
      <video width="520" :src="`http://localhost:8081/v1/videos/${store.id}`" controls />
      <div class="description">{{ store.videoDetail.description }}</div>
      <div class="author">by {{ store.videoDetail.author.name }}</div>
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

video {
  margin-bottom: 12px;
}

.description {
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
</style>
