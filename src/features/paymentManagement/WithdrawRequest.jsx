import React from "react"
import { IoMdCloseCircle } from "react-icons/io"

function WithdrawRequest({
	withdrawRef,
	withdrawalAccounts,
	marskAccountNumber,
	user,
	setPaymentInfo,
	setWithdrawalAmount,
	withdrawalAmount,
	handleWithdrawalRequest,
}) {
	return (
		<dialog ref={withdrawRef} id="withdrawal_modal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">
					Withdraw Request ({user?.availableBalance.toFixed(2)})
				</h3>
				<IoMdCloseCircle
					onClick={() => withdrawRef.current?.close()}
					className={` cursor-pointer text-gray-700 absolute top-3 right-3`}
					size={25}
				/>

				<div className=" w-full flex flex-col gap-4 mt-6">
					<select
						onChange={(e) => setPaymentInfo(e.target.value)}
						className="select select-bordered w-full max-w-xs">
						<option defaultValue={""}>Select an account</option>
						{withdrawalAccounts.map((account) => (
							<option value={JSON.stringify(account)} key={account._id}>
								{account.bankName} - {marskAccountNumber(account.accountNumber)}
							</option>
						))}
					</select>
					<div className=" w-full flex flex-col gap-1  ">
						<label className=" text-left" htmlFor="withdrawalAmount">
							Withdrawal Amount
						</label>
						<input
							type="number"
							defaultValue={withdrawalAmount}
							className="input input-bordered max-w-xs"
							onChange={(e) => setWithdrawalAmount(+e.target.value)}
						/>
					</div>
					<button
						onClick={handleWithdrawalRequest}
						type="submit"
						className="btn btn-neutral w-36">
						send
					</button>
				</div>
			</div>
		</dialog>
	)
}

export default WithdrawRequest
