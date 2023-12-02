import React from "react"
import { IoMdCloseCircle } from "react-icons/io"

function ValidateWithdraw({
	withdrawValidateRef,
	marskAccountNumber,
	handleApprove,
	handleReject,
	updatingWithdrawal,
	withdrawals,
}) {
	return (
		<dialog
			ref={withdrawValidateRef}
			id="withdrawal_validate_modal"
			className="modal ">
			<div className="modal-box max-w-[600px]">
				<h3 className="font-bold text-lg">All withdrawal pending</h3>
				<IoMdCloseCircle
					onClick={() => withdrawValidateRef.current?.close()}
					className={` cursor-pointer text-gray-700 absolute top-3 right-3`}
					size={25}
				/>

				<div className="overflow-x-auto mt-6">
					{withdrawals?.length > 0 ? (
						<table className="table">
							{/* head */}
							<thead>
								<tr>
									<th>amount</th>
									<th>Account name</th>
									<th>Account number</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								{withdrawals?.map((withdrawal) => (
									<tr key={withdrawal._id}>
										<th>{withdrawal.amount}</th>
										<th>{withdrawal.paymentInfo.accountName}</th>
										<td>
											{marskAccountNumber(withdrawal.paymentInfo.accountNumber)}
										</td>
										<td>
											<div className="flex gap-2 items-center">
												<button
													disabled={updatingWithdrawal}
													onClick={() =>
														handleApprove(withdrawal.user?._id, withdrawal._id)
													}
													className="btn btn-sm btn-accent">
													approve
												</button>
												<button
													disabled={updatingWithdrawal}
													onClick={() =>
														handleReject(withdrawal.user?._id, withdrawal._id)
													}
													className="btn btn-sm btn-error">
													reject
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-gray-300 text-2xl">no withdrawals yet</p>
					)}
				</div>
			</div>
		</dialog>
	)
}

export default ValidateWithdraw
