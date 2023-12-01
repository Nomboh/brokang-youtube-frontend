import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Link, useOutletContext } from "react-router-dom"
import {
	useGetSellerOrders,
	useGetUserOrders,
	useUpdateOrder,
} from "../payment/order"
import { GrView } from "react-icons/gr"
import toast from "react-hot-toast"

function OrderList() {
	const [tab, setTab] = React.useState(0)
	const { user } = useOutletContext()

	const { userOrders } = useGetUserOrders()
	const { sellerOrders } = useGetSellerOrders()
	const { isUpdatingOrder, updateOrderMutation } = useUpdateOrder()

	const validateOrder = (id) => {
		updateOrderMutation({ data: { status: "Delivered" }, id: id })
	}

	return (
		<div>
			<Header user={user} />
			<div className=" section">
				<div role="tablist" className=" tabs tabs-boxed max-w-xs">
					<a
						role="tab"
						onClick={() => setTab(0)}
						className={`${tab === 0 ? "tab-active" : ""} tab`}>
						{" "}
						Ordered Items
					</a>

					<a
						role="tab"
						onClick={() => setTab(1)}
						className={`${tab === 1 ? "tab-active" : ""} tab`}>
						{" "}
						Solded Items
					</a>
				</div>

				{/* user ordered items */}
				{tab === 0 && userOrders && (
					<div className=" overflow-x-hidden tab-content mt-10">
						<table className="table w-full">
							<thead>
								<tr>
									<th>Id</th>
									<th>Status</th>
									<th>Amount</th>
									<th>View</th>
								</tr>
							</thead>

							<tbody>
								{userOrders.length > 0 ? (
									userOrders.map((item) => (
										<tr key={item._id} className="hover">
											<td>{item._id.slice(0, 12)}</td>
											<td>{item.status}</td>
											<td>{item.totalPrice}</td>
											<td>
												<Link
													className=" btn btn-outline btn-accent"
													to={`/order/${item._id}`}>
													<GrView className=" cursor-pointer" size={25} />
												</Link>
											</td>
										</tr>
									))
								) : (
									<p className=" font-bold text-4xl text-left w-full my-24 text-gray-400">
										You have not order anything throw paysafe yet
									</p>
								)}
							</tbody>
						</table>
					</div>
				)}

				{/* seller solded items */}
				{tab === 1 && (
					<div className=" overflow-x-hidden tab-content mt-10">
						<div className=" overflow-x-hidden tab-content mt-10">
							<table className="table w-full">
								<thead>
									<tr>
										<th>Id</th>
										<th>Image</th>
										<th>Status</th>
										<th>Amount</th>
										<th>Validation</th>
									</tr>
								</thead>

								<tbody>
									{sellerOrders.length > 0 ? (
										sellerOrders.map((item) => (
											<tr key={item._id} className="hover">
												<td>{item._id.slice(0, 12)}</td>
												<td>
													<img
														className=" h-10 w-10 object-contain rounded-sm "
														src={item?.product.images[0]}
													/>
												</td>
												<td>{item.status}</td>
												<td>{item.totalPrice}</td>
												<td>
													{item.product.status === "sold out" &&
														item.status === "Processing" && (
															<button
																disabled={isUpdatingOrder}
																onClick={() => validateOrder(item._id)}
																className=" btn btn-outline btn-accent">
																validate
															</button>
														)}

													{item.product.status === "sold out" &&
														item.status === "Delivered" && (
															<span className=" badge badge-primary">
																validated
															</span>
														)}
												</td>
											</tr>
										))
									) : (
										<p className=" font-bold text-4xl text-left w-full my-24 text-gray-400">
											you haven't sold a product yet
										</p>
									)}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default OrderList
