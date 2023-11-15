import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { productDetails } from "@/utils/productDetails";

interface IdParams {
    productId?: string
}

const Prodcut = ({ params }: { params: IdParams }) => {

    return (
        <div className="p-8">
            <Container>
                <ProductDetails productDetails={productDetails} />
            </Container>
        </div>
    );
}

export default Prodcut;