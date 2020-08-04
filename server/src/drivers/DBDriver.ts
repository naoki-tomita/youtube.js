import { named } from "automated-omusubi";
import { select } from "sql-query-factory";
import { Client, types } from "pg";
import { Language } from "../Language";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "youtube",
});
client.connect();

types.setTypeParser(types.builtins.TIMESTAMP, (value) => {
  return new Date(Date.parse(value));
});

interface Video {
  id: string;
  author_id: string;
  file_path: string;
  created_at: Date;
  updated_at?: Date;
}

interface I18nVideo {
  video_id: string;
  language: string;
  title?: string;
  description?: string;
}

interface Author {
  id: string;
  created_at: Date;
  updated_at?: Date;
}

interface I18nAuthor {
  author_id: string;
  language: string;
  name?: string;
  description?: string;
}

@named
export class DBDriver {

  async allVideos() {
    return await client.query<Video & I18nVideo>(`
      SELECT * FROM video
        INNER JOIN i18n_video
        ON video.id = i18n_video.video_id;`);
  }

  async allAuthors() {
    return await client.query<Author & I18nAuthor>(`
      SELECT * FROM author
        INNER JOIN i18n_author
        ON author.id = i18n_author.author_id;`);
  }

  async findVideosByAuthorId(authorId: string) {
    return await client.query<Video & I18nVideo>(`
      SELECT * FROM video
        INNER JOIN i18n_video
        ON video.id = i18n_video.video_id
        WHERE video.author_id = $1;`, [authorId]);
  }

  async findAuthorBy(id: string) {
    return await client.query<Author & I18nAuthor>(`
      SELECT * FROM author
        INNER JOIN i18n_author
        ON author.id = i18n_author.author_id
        WHERE author.id = $1`, [id]);
  }

  async findVideoBy(id: string) {
    return await client.query<Video & I18nVideo>(`
      SELECT * FROM video
        INNER JOIN i18n_video
        ON video.id = i18n_video.video_id
        WHERE video.id = $1`, [id]);
  }
}
