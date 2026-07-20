import {
    db,
} from "../../src/config/database.js";


let categorySequence = 0;


interface CreateCategoryFixtureOptions {
    name?:
    string;

    slug?:
    string;
}


export interface CategoryFixture {
    id:
    number;

    name:
    string;

    slug:
    string;
}


export async function createCategoryFixture(
    options:
        CreateCategoryFixtureOptions = {},
): Promise<CategoryFixture> {
    categorySequence += 1;


    const name =
        options.name ??
        `Test Category ${categorySequence}`;


    const slug =
        options.slug ??
        `test-category-${categorySequence}`;


    const result =
        await db.query<CategoryFixture>(
            `
            INSERT INTO categories (
                name,
                slug
            )
            VALUES (
                $1,
                $2
            )
            RETURNING
                id,
                name,
                slug
            `,
            [
                name,
                slug,
            ],
        );


    return result.rows[0];
}