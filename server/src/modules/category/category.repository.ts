import { BaseRepository } from "../../shared/utils/BaseRepository.js";

import { Category } from "./category.types.js";
import { CreateCategoryDto } from "./category.validation.js";

export class CategoryRepository extends BaseRepository {
  async findAll(): Promise<Category[]> {
    return this.query<Category>(
      `
            SELECT
                id,
                name,
                slug,
                created_at,
                updated_at
            FROM categories
            ORDER BY name ASC
            `,
    );
  }

  async findById(id: number): Promise<Category | null> {
    return this.queryOne<Category>(
      `
            SELECT
                id,
                name,
                slug,
                created_at,
                updated_at
            FROM categories
            WHERE id = $1
            `,
      [id],
    );
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.queryOne<Category>(
      `
            SELECT *
            FROM categories
            WHERE slug = $1
            `,
      [slug],
    );
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return (await this.queryOne<Category>(
      `
            INSERT INTO categories (name, slug)
            VALUES ($1, $2)
            RETURNING *
            `,
      [data.name, data.slug],
    ))!;
  }

  async update(
    id: number,
    data: CreateCategoryDto,
  ): Promise<Category | null> {
    return this.queryOne<Category>(
      `
        UPDATE categories
        SET
            name = $1,
            slug = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
      [
        data.name,
        data.slug,
        id,
      ],
    );
  }

  async delete(
    id: number,
  ): Promise<boolean> {
    const result = await this.db.query(
      `
        DELETE FROM categories
        WHERE id = $1
        `,
      [id],
    );

    return result.rowCount === 1;
  }
}