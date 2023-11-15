import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { productDetails } from "@/utils/productDetails";
import ListRating from "./ListRating";

interface IdParams {
    productId?: string
}

const Prodcut = ({ params }: { params: IdParams }) => {

    return (
        <div className="p-8">
            <Container>
                <ProductDetails productDetails={productDetails} />
                <div className="flex flex-col mt-20 gap-4">
                    <div className="">
                        Add Rating
                    </div>
                    <ListRating product={productDetails} />
                </div>
            </Container>
        </div>
    );
}

export default Prodcut;