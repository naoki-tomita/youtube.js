import { binding } from "automated-omusubi";
import { AuthorGateway } from "../gateways/AuthorGateway";
import { Language } from "../Language";

export class AuthorUsecase {
  @binding
  authorGateway!: AuthorGateway

  async findBy(id: string, language: Language) {
    return this.authorGateway.findBy(id, language);
  }

  async list(language: Language) {
    return await this.authorGateway.list(language);
  }
}
