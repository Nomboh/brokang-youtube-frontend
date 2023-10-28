import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useOutletContext, useSearchParams } from "react-router-dom"
import SellWrapper from "./SellWrapper"
import { useProduct } from "../productDetails/productDetail"

function EditProducts() {
	const { user } = useOutletContext()
	const [searchParams] = useSearchParams()

	const id = searchParams.get("id")

	const { product, isLoading } = useProduct(id)
	return (
		<div>
			<Header user={user} />
			<div className="">{product && <SellWrapper product={product} />}</div>
			<Footer />
		</div>
	)
}

export default EditProducts
