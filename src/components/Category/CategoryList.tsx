import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { categoriesOptions } from "../../queries/categories.ts";

export const CategoryList = () => {
    const { data } = useSuspenseQuery(categoriesOptions);

    return (
        <div>
            <h1>Wyświetla listę kategorii</h1>
            <Link>Add new category</Link>
            <ul>
                {data.map((category) => (
                    <li key={category.id}>
                        <Link to="/category/$identifier"
                              params={{
                                  identifier: category.identifier,
                              }}
                        >{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};