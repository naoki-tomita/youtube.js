\c youtube;

CREATE TABLE author (
  id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE i18n_author (
  author_id VARCHAR(36) NOT NULL,
  language VARCHAR(5) NOT NULL,
  name TEXT,
  description TEXT,
  PRIMARY KEY (author_id, language),
  FOREIGN KEY (author_id)
    REFERENCES author (id)
);

CREATE TABLE video (
  id VARCHAR(36) NOT NULL,
  author_id VARCHAR(36) NOT NULL,
  file_path VARCHAR(512) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (author_id)
    REFERENCES author (id)
);

CREATE TABLE i18n_video (
  video_id VARCHAR(36) NOT NULL,
  language VARCHAR(5) NOT NULL,
  title TEXT,
  description TEXT,
  PRIMARY KEY (video_id, language),
  FOREIGN KEY (video_id)
    REFERENCES video (id)
);
