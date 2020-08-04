import { Language } from "../Language";

interface HasLanguage {
  language: string;
}

export function languageSort(language: Language) {
  return function(left: HasLanguage, right: HasLanguage): number {
    if (left.language === language.code) {
      return 1;
    } else if (right.language === language.code) {
      return -1;
    } else if (left.language === Language.enUS.code) {
      return 1;
    } else if (right.language === Language.enUS.code) {
      return -1;
    }
    return 1;
  }
}

export function mergeItemsGroupById<T extends {
  id: string;
  language: string;
}>(rows: T[], language: Language) {
  return rows
    .sort(languageSort(language))
    .reduce<{[key: string]: T}>((prev, curr) => {
      prev[curr.id] = { ...prev[curr.id], ...curr };
      return prev;
    }, {});
}
