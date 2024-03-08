import { useEffect, useState } from "react";
import { useApiGet } from "../services/apiService";
import { Link } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {
        // Fetch all categories from the API
        try {
            const res = await useApiGet('/additional/category')

            setCategories(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div className="categories shadow-sm">
            <div className="group-categories ">
                <ul className="flex gap-4 text-sm sm:pl-0 pl-4 text-primary">
                {categories.map((category) => 
                    <li key={category.id} className="mb-5 mr-0 hover:underline">
                    <Link to={`${category.id}`}>{category.name}</Link>
                    </li>
                )}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
