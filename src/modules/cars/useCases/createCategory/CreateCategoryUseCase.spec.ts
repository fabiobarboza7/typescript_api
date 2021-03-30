import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should create a new category", async () => {
    const category = {
      name: "Test",
      description: "Test",
    };

    await createCategoryUseCase.execute(category);

    const cateoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(cateoryCreated).toHaveProperty("id");
  });

  it("should not create duplicated categories", async () => {
    expect(async () => {
      const category = {
        name: "Test",
        description: "Test",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
