<template>
  <ul>
    <li v-for="video in videos" :key="video.id">
      <a :href="`#${video.id}`">
        <img width="200" :src="`http://localhost:8081/v1/thumbnails/${video.id}`" />
        <div class="info">
          <p>{{ video.title }}</p>
          <p>by {{ video.author.name }}</p>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import { setId } from "../Store";
import noThumbnail from "../images/no-thumbnail.png";

export default ({
  props: ["videos"],
  setup() {
    return {
      onSelect: setId,
      noThumbnail,
    };
  }
});
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  padding: 20px;
  cursor: pointer;
}

li:hover {
  background-color: #eee;
}

a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.info {
  margin-left: 20px;
}

.info > p {
  margin: 0;
  padding: 0;
}
</style>
