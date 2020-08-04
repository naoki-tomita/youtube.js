export class Language {
  constructor(readonly code: string) {}
  static jaJP = new Language("ja-JP");
  static enUS = new Language("en-US");
  static zhCN = new Language("zh-CN");

  static find(language: string): Language {
    return Object.keys(Language)
      .map(it => (Language as any)[it])
      .filter(isLanguage)
      .find((item) => item.code.startsWith(language)) ?? Language.enUS;
  }
}

function isLanguage(a: any): a is Language {
  return typeof a.code === "string";
}
