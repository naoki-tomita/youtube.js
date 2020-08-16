import { named, binding } from "automated-omusubi";
import { DBDriver } from "../drivers/DBDriver";
import { languageSort, mergeItemsGroupById, merge } from "./Util";
import { Language } from "../Language";
import { timeStamp } from "console";

@named
export class AuthorGateway {
  @binding
  driver!: DBDriver
  async list(language: Language = Language.enUS) {
    const result = await this.driver.allAuthors();
    const keys = new Set(result.rows.map(it => it.id))
    const mergedResult = mergeItemsGroupById(result.rows, language);
    return [...keys]
      .map(it => mergedResult[it])
      .map(it => ({
        id: it.id,
        name: it.name,
        description: it.description,
        createdAt: it.created_at,
      }));
  }

  async findBy(id: string, language: Language = Language.enUS) {
    const { rowCount, rows } = await this.driver.findAuthorBy(id);
    if (rowCount === 0) {
      return null;
    }
    const { name, description, created_at } = rows
        .sort(languageSort(language))
        .reduce<typeof rows[0]>((p, c) => merge(p, c), {} as any)
    return {
      id,
      name,
      description,
      createdAt: created_at
    }
  }

  async create({
      id, loginId, password, name, description
    }: {
      id: string;
      loginId: string;
      password: string;
      name?: string;
      description?: string;
    },
    language: Language = Language.enUS
  ) {
    await this.driver.createAuthor(id, loginId, password, name ?? loginId, description, language.code);
    return this.findBy(id);
  }

  async findByLoginIdAndPassword(loginId: string, password: string) {
    const result = await this.driver.findAuthorByLoginIdAndPassword(loginId, password);
    return result.rowCount > 0 ? result.rows[0]: null;
  }
}
