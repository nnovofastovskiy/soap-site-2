import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API } from "../../../../helpers/api";
import { ICategory, IProduct } from "../../../../interfaces/catalog.interface";

const EditProducts: NextPage = (): JSX.Element => {
    const router = useRouter();
    const categoryId = router.query.categoryId;



    const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        console.log(categoryId);
        try {
            axios.get<ICategory[]>(API.collections.read)
                .then((res) => {
                    updateProducts();
                    const categories = res.data;
                    setCategories(categories);
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e);
        }
    }, []);

    const updateProducts = () => {
        try {
            axios.get<IProduct[]>(API.products.getInCollectionById + categoryId)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            editproducts
        </div>
    );
}

export default EditProducts;