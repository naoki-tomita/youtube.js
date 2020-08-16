import { binding } from "automated-omusubi";
import { AuthorGateway } from "../gateways/AuthorGateway";
import { Language } from "../Language";

export class AuthorUsecase {
  @binding
  authorGateway!: AuthorGateway

  findBy(id: string, language: Language) {
    return this.authorGateway.findBy(id, language);
  }

  list(language: Language) {
    return this.authorGateway.list(language);
  }

  create(options: {
    loginId: string;
    password: string;
    name?: string;
    description?: string;
  }, language: Language) {
    const id = uuid();
    return this.authorGateway.create({ ...options, id }, language);
  }

  verify(loginId: string, password: string) {
    return this.authorGateway.findByLoginIdAndPassword(loginId, password);
  }
}

function uuid() {
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
          case "x":
              chars[i] = Math.floor(Math.random() * 16).toString(16);
              break;
          case "y":
              chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
              break;
      }
  }
  return chars.join("");
}
