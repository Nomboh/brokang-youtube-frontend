import React from "react"
import Header from "../../components/Header"
import { useUser } from "../../app/hooks/loadUser"
import AddAddress from "./AddAddress"
import Footer from "../../components/Footer"
import { MdDelete } from "react-icons/md"
import { useRemoveAddress } from "./address"

function Address() {
	const { user } = useUser()

	const { isRemovingAddress, removeAddress } = useRemoveAddress()

	console.log(user)

	const handleDeletAddress = (addressId) => {
		removeAddress(addressId)
	}
	return (
		<div>
			<Header user={user} />

			<div className=" section">
				<div className=" flex px-2 justify-between items-center">
					<h1 className=" text-2xl font-semibold"> My Address</h1>
					<button
						onClick={() => document.getElementById("address_modal").showModal()}
						className=" btn btn-neutral">
						Add Address
					</button>
				</div>

				{/* render table */}
				{user?.address.length > 0 ? (
					<table className=" table mt-10">
						<tbody>
							{user.address.map((address) => (
								<tr key={address._id}>
									<th>{address.addressType}</th>
									<td>{address.address}</td>
									<td>
										<button
											disabled={isRemovingAddress}
											onClick={() => handleDeletAddress(address._id)}
											className=" btn btn-outline btn-sm">
											<MdDelete size={23} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className=" flex flex-col items-center justify-center">
						<h1 className=" text-4xl font-semibold text-gray-400">
							No Address Found
						</h1>
					</div>
				)}
			</div>
			<AddAddress user={user} />
			<Footer />
		</div>
	)
}

export default Address
