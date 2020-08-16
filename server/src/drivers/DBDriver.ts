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

  allVideos() {
    return client.query<Video & I18nVideo>(`
      SELECT * FROM video
        INNER JOIN i18n_video
        ON video.id = i18n_video.video_id;`);
  }

  allAuthors() {
    return client.query<Author & I18nAuthor>(`
      SELECT * FROM author
        INNER JOIN i18n_author
        ON author.id = i18n_author.author_id;`);
  }

  findVideosByAuthorId(authorId: string) {
    return client.query<Video & I18nVideo>(`
      SELECT * FROM video
        INNER JOIN i18n_video
        ON video.id = i18n_video.video_id
        WHERE video.author_id = $1;`, [authorId]);
  }

  findAuthorBy(id: string) {
    return client.query<Author & I18nAuthor>(`
      SELECT * FROM author
        INNER JOIN i18n_author
        ON author.id = i18n_author.author_id
        WHERE author.id = $1`, [id]);
  }

  findVideoBy(id: string) {
    return client.query<Video & I18nVideo>(`
      SELECT * FROM video
        INNER JOIN i18n_video
        ON video.id = i18n_video.video_id
        WHERE video.id = $1`, [id]);
  }

  async createAuthor(id: string, loginId: string, password: string, name: string, description: string | undefined, language: string) {
    await client.query(`INSERT INTO author(id, created_at, login_id, password) VALUES($1, now(), $2, $3)`, [id, loginId, password]);
    await client.query(`INSERT INTO i18n_author(id, language, name, description) VALUES($1, $2, $3, $4)`, [id, language, name, description]);
  }

  findAuthorByLoginIdAndPassword(loginId: string, password: string) {
    console.log(loginId, password)
    return client.query<Author>(`
      SELECT * FROM author
        WHERE login_id = $1 AND password = $2`, [loginId, password]);
  }
}
