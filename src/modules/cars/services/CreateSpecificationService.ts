import { ISpecificationRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationExists = this.specificationsRepository.findByName(name);

    if (specificationExists) throw new Error("Specification exists");

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
