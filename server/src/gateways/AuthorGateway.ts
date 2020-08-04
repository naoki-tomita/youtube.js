import { named, binding } from "automated-omusubi";
import { DBDriver } from "../drivers/DBDriver";
import { languageSort, mergeItemsGroupById } from "./Util";
import { Language } from "../Language";

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
        .reduce<typeof rows[0]>((p, c) => ({ ...p, ...c }), {} as any)
    return {
      id,
      name,
      description,
      createdAt: created_at
    }
  }
}
