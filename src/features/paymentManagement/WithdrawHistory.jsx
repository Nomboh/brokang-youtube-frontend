import React from "react"
import { IoMdCloseCircle } from "react-icons/io"

function WithdrawHistory({
	withdrawListRef,
	marskAccountNumber,
	userWithdrawal,
}) {
	return (
		<dialog ref={withdrawListRef} id="withdrawal_list_modal" className="modal ">
			<div className="modal-box">
				<h3 className="font-bold text-lg">All withdrawal</h3>
				<IoMdCloseCircle
					onClick={() => withdrawListRef.current?.close()}
					className={` cursor-pointer text-gray-700 absolute top-3 right-3`}
					size={25}
				/>

				<div className="overflow-x-auto mt-6">
					{userWithdrawal?.length > 0 ? (
						<table className="table">
							{/* head */}
							<thead>
								<tr>
									<th>amount</th>
									<th>Bank name</th>
									<th>Account number</th>
									<th>status</th>
								</tr>
							</thead>
							<tbody>
								{userWithdrawal?.map((withdrawal) => (
									<tr key={withdrawal._id}>
										<th>{withdrawal.amount}</th>
										<td>{withdrawal.paymentInfo.bankName}</td>
										<td>
											{marskAccountNumber(withdrawal.paymentInfo.accountNumber)}
										</td>
										<td>
											{withdrawal.status === "Processing" && (
												<span className={`${"badge-primary"} badge `}>
													{withdrawal.status}
												</span>
											)}

											{withdrawal.status === "Rejected" && (
												<span className={`${"badge-error"} badge `}>
													{withdrawal.status}
												</span>
											)}

											{withdrawal.status === "Completed" && (
												<span className={`${"badge-accent"} badge `}>
													{withdrawal.status}
												</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-gray-300 text-2xl">no withdrawal yet</p>
					)}
				</div>
			</div>
		</dialog>
	)
}

export default WithdrawHistory
