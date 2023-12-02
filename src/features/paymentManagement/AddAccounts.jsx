import React from "react"
import { IoMdCloseCircle } from "react-icons/io"

function AddAccounts({
	addAccountRef,
	user,
	setAccountName,
	setBankName,
	setSwiftCode,
	setAccountNumber,
	handleSubmitAccount,
	isAddingAccount,
}) {
	return (
		<dialog ref={addAccountRef} id="addAccount_modal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Add an account</h3>
				<IoMdCloseCircle
					onClick={() => addAccountRef.current?.close()}
					className={` cursor-pointer text-gray-700 absolute top-3 right-3`}
					size={25}
				/>

				<div className="flex w-full flex-col gap-6">
					<div className="flex flex-col gap-1">
						<label className="text-left" htmlFor="accountName">
							Account Name
						</label>
						<input
							type="text"
							id="accountName"
							onChange={(e) => setAccountName(e.target.value)}
							className=" w-full input input-bordered"
							defaultValue={user?.name}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-left" htmlFor="bankName">
							Bank Name
						</label>
						<input
							type="text"
							id="bankName"
							className=" w-full input input-bordered"
							onChange={(e) => setBankName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-left" htmlFor="swiftCode">
							Swift Code
						</label>
						<input
							type="text"
							id="swiftCode"
							onChange={(e) => setSwiftCode(e.target.value)}
							className=" w-full input input-bordered"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-left" htmlFor="accountNumber">
							Account Number
						</label>
						<input
							type="text"
							onChange={(e) => setAccountNumber(e.target.value)}
							id="accountNumber"
							className=" w-full input input-bordered"
						/>
					</div>
				</div>
				<button
					disabled={isAddingAccount}
					type="submit"
					className="btn mt-6 btn-neutral"
					onClick={handleSubmitAccount}>
					Add account
				</button>
			</div>
		</dialog>
	)
}

export default AddAccounts
