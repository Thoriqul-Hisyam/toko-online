import Link from "next/link";
import Container from "../Container";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

const Navbar = () => {
    return (
        <div className="sticky top-0 w-full bg-white/30 backdrop-blur-md z-30 shadwo-sm">
            <div className="py-4 border-b-[0.5px] border-white/30">
                <Container>
                    <div className="flex items-center justify-between gap-3 md-gap-0">
                        <Link className={`${roboto.className} font-bold text-xl`} href="/">
                            ShyShop
                        </Link>
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <div>CartCount</div>
                            <div>UserMenu</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;