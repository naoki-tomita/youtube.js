\c youtube;

INSERT INTO author (id, created_at, login_id, password)
VALUES
  ('ad769913-7a8d-451e-bc13-ff8e9dbb1ac5', LOCALTIMESTAMP, 'id0', 'passoword'),
  ('eda2715b-ce33-4d9d-a62d-7d29260a0485', LOCALTIMESTAMP, 'id1', 'passoword'),
  ('0146c9f5-526c-45f9-88e2-26d430b7c1b4', LOCALTIMESTAMP, 'id2', 'passoword'),
  ('2488ca22-e2a5-4e79-9eeb-cd92671820a3', LOCALTIMESTAMP, 'id3', 'passoword');

INSERT INTO i18n_author (author_id, language, name, description)
VALUES
  ('ad769913-7a8d-451e-bc13-ff8e9dbb1ac5', 'ja-JP', '上田次郎', '日本科学技術大学 教授'),
  ('eda2715b-ce33-4d9d-a62d-7d29260a0485', 'ja-JP', '山田奈緒子', 'マジシャン'),
  ('0146c9f5-526c-45f9-88e2-26d430b7c1b4', 'ja-JP', '矢部謙三', '警部補'),
  ('0146c9f5-526c-45f9-88e2-26d430b7c1b4', 'en-US', 'Kenzo Yabe', null),
  ('0146c9f5-526c-45f9-88e2-26d430b7c1b4', 'zh-CN', '矢部健三', '助理檢查員'),
  ('2488ca22-e2a5-4e79-9eeb-cd92671820a3', 'ja-JP', '秋葉原人', null),
  ('2488ca22-e2a5-4e79-9eeb-cd92671820a3', 'en-US', 'Harando Akiba', 'Otaku');

INSERT INTO video (id, author_id, created_at, file_path)
VALUES
  ('42ce273c-bd8c-4e3d-90f8-3a6f67cdca93', 'ad769913-7a8d-451e-bc13-ff8e9dbb1ac5', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/1.MOV'),
  ('944f44da-7f16-414a-b63d-1c0490d9f5eb', 'eda2715b-ce33-4d9d-a62d-7d29260a0485', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/2.MOV'),
  ('e7c8bc6c-d9de-4291-a443-c9ae73a96f1d', '0146c9f5-526c-45f9-88e2-26d430b7c1b4', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/3.MOV'),
  ('af63ff9b-37b5-4863-8f68-17c69a04f419', 'eda2715b-ce33-4d9d-a62d-7d29260a0485', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/4.MOV'),
  ('7b17f81d-7fb0-46cb-8c49-a452ff83bfba', 'ad769913-7a8d-451e-bc13-ff8e9dbb1ac5', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/5.MOV'),
  ('de0e32a5-f71c-4aa7-8d3c-6d7e4a27f1f1', '2488ca22-e2a5-4e79-9eeb-cd92671820a3', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/6.mp4'),
  ('f8ffc727-e51d-44dc-b3ea-538ab872dd8d', '2488ca22-e2a5-4e79-9eeb-cd92671820a3', LOCALTIMESTAMP, '/Users/naoki.tomita/Desktop/movies/7.MOV');

INSERT INTO i18n_video (video_id, language, title, description)
VALUES
  ('42ce273c-bd8c-4e3d-90f8-3a6f67cdca93', 'ja-JP', '動画作ってみた', '動画作ってみました。'),
  ('42ce273c-bd8c-4e3d-90f8-3a6f67cdca93', 'en-US', 'Create movie', 'Try to create movie.'),
  ('944f44da-7f16-414a-b63d-1c0490d9f5eb', 'ja-JP', '料理作ってみた', null),
  ('944f44da-7f16-414a-b63d-1c0490d9f5eb', 'en-US', 'Try to cook', 'This is a pen.'),
  ('944f44da-7f16-414a-b63d-1c0490d9f5eb', 'zh-CN', '我嘗試做飯', null),
  ('e7c8bc6c-d9de-4291-a443-c9ae73a96f1d', 'ja-JP', '車買ってみた', 'ランボルギーニです'),
  ('af63ff9b-37b5-4863-8f68-17c69a04f419', 'ja-JP', '本読んでみた', '読書'),
  ('af63ff9b-37b5-4863-8f68-17c69a04f419', 'en-US', 'Try to read book', null),
  ('7b17f81d-7fb0-46cb-8c49-a452ff83bfba', 'en-US', 'Try to play music', null),
  ('de0e32a5-f71c-4aa7-8d3c-6d7e4a27f1f1', 'ja-JP', '寝てみた', '寝るの好き'),
  ('f8ffc727-e51d-44dc-b3ea-538ab872dd8d', 'ja-JP', '死んでみた', '地獄八景亡者戯');
