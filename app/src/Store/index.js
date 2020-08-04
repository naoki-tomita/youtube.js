import { reactive } from "vue";
import { apolloClient } from "../Client";
import { gql } from "apollo-boost";

const hash = location.hash;
const firstId = hash.replace("#", "");

export const store = reactive({
  id: firstId == "" ? null: firstId,
  videoDetail: { title: "", description: "", author: { name: "", videos: [] } },
  videos: [],
  recommendVideos: [],
});

const fetchVideos = gql`
query {
  videos {
    id
    title
    author {
      name
    }
  }
}
`;

export function updateVideos() {
  apolloClient.query({ query: fetchVideos })
    .then(it => setVideos(it.data.videos));
}

const fetchVideo = gql`
query video($id: ID!) {
  video(id: $id) {
    title
    description
    author {
      name
      videos {
        id
        title
        author {
          name
        }
      }
    }
  }
}
`;

export function updateVideoDetail(id) {
  apolloClient.query({ query: fetchVideo, variables: { id } })
    .then(it => {
      setVideoDetail(it.data.video)
      setRecommendVideos(it.data.video.author.videos)
    })
}

export function setId(id) {
  store.id = id;
  id && updateVideoDetail(id)
}
window.addEventListener("hashchange", () => setId(location.hash.replace("#", "")));


export function setVideoDetail(videoDetail) {
  store.videoDetail = videoDetail;
}

export function setVideos(videos) {
  store.videos = videos;
}

export function setRecommendVideos(videos) {
  store.recommendVideos = videos;
}
