import React from "react"
import usePlacesAutocomplete from "use-places-autocomplete"
import { useAddAddress } from "./address"

const adddressTypes = ["home", "office", "default"]

function AddAddress({ user }) {
	const modalAddress = React.useRef(null)
	const [type, setType] = React.useState("")
	const {
		ready,
		setValue,
		value,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete()

	const { addAddress, isAddingAddress } = useAddAddress()

	const filterAddressTypes = adddressTypes.filter(
		(at) =>
			!user?.address.some(
				(userAddressType) => userAddressType.addressType === at
			)
	)

	const handleAddAddress = () => {
		addAddress({ address: value, addressType: type })
		modalAddress.current.close()
		setValue("")
		setType("")
	}

	return (
		<dialog ref={modalAddress} id="address_modal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-center text-2xl">Add New Address</h3>

				<div className="flex flex-col gap-10">
					<div className=" flex flex-col w-full gap-1">
						<label htmlFor="address">Search Address</label>
						<input
							placeholder="enter your address"
							disabled={!ready}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="input w-full input-bordered"
						/>

						{data && data.length > 0 && (
							<ul className=" p-2 shadow menu dropdown-content z-20 bg-base-100 rounded-box w-full">
								{data.map((suggestion) => {
									const {
										place_id,
										description,
										structured_formatting: { main_text, secondary_text },
									} = suggestion
									return (
										<li
											key={place_id}
											onClick={() => {
												setValue(description)
												clearSuggestions()
											}}
											className="hover:bg-slate-100 hover:text-slate-500">
											<a className=" flex flex-col">
												<span>{main_text}</span>
												<span className=" text-xs text-gray-500">
													{secondary_text}
												</span>
											</a>
										</li>
									)
								})}
							</ul>
						)}
					</div>

					<div className=" flex  flex-col w-full gap-1">
						<label htmlFor="address">Select Address Type</label>
						<select
							onChange={(e) => setType(e.target.value)}
							className="  select select-bordered ">
							<option defaultValue="">choose an address type</option>
							{filterAddressTypes?.map((type) => (
								<option defaultValue={type} key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					<button
						disabled={isAddingAddress}
						onClick={handleAddAddress}
						className=" btn btn-primary btn-outline">
						confirm
					</button>
				</div>
			</div>
		</dialog>
	)
}

export default AddAddress
