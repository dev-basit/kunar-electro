import data from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

interface InterfaceProductDetailsProps {
  params: { slug: string };
}

export default function ProductDetails({ params }: InterfaceProductDetailsProps) {
  const product = data.products.find((item) => item.slug === params.slug);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="my-2">
        <Link href="/">&lt;- Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 md:mr-5">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              Reviews: {product.rating} of {product.numReviews}
            </li>
            <li> Brand: {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card  bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-primary w-full" type="button">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
