import { named, binding } from "automated-omusubi";
import { DBDriver } from "../drivers/DBDriver";
import { Language } from "../Language";
import { mergeItemsGroupById } from "./Util";

@named
export class VideoGateway {
  @binding
  driver!: DBDriver
  async list(language: Language = Language.enUS) {
    const result = await this.driver.allVideos();
    const keys = new Set(result.rows.map(it => it.id))
    const mergedResult = mergeItemsGroupById(result.rows, language);
    return [...keys]
      .map(it => mergedResult[it])
      .map(it => ({
        id: it.id,
        title: it.title,
        filePath: it.file_path,
        description: it.description,
        createdAt: it.created_at,
        authorId: it.author_id,
      }));
  }

  async findByAuthorId(authorId: string, language: Language = Language.enUS) {
    const result = await this.driver.findVideosByAuthorId(authorId);
    const keys = new Set(result.rows.map(it => it.id))
    const mergedResult = mergeItemsGroupById(result.rows, language);
    return [...keys]
      .map(it => mergedResult[it])
      .map(it => ({
        id: it.id,
        title: it.title,
        filePath: it.file_path,
        description: it.description,
        createdAt: it.created_at,
        authorId: it.author_id,
      }));
  }

  async findBy(id: string, language: Language) {
    const result = await this.driver.findVideoBy(id);
    const merged = mergeItemsGroupById(result.rows, language);
    if (Object.keys(merged).length === 0) {
      return null;
    }
    const it = merged[id];
    return {
      id: it.id,
      title: it.title,
      filePath: it.file_path,
      description: it.description,
      createdAt: it.created_at,
      authorId: it.author_id,
    }
  }
}
