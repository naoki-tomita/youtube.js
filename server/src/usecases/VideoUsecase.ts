import { binding, named } from "automated-omusubi";
import { VideoGateway } from "../gateways/VideoGateway";
import { Language } from "../Language";

export class VideoUsecase {
  @binding
  videoGateway!: VideoGateway

  async list(language: Language) {
    return await this.videoGateway.list(language);
  }

  async findByAuthorId(authorId: string, language: Language) {
    return await this.videoGateway.findByAuthorId(authorId, language);
  }

  async findBy(id: string, language: Language) {
    return await this.videoGateway.findBy(id, language)
  }
}
