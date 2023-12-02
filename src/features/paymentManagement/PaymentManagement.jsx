import { BsTrash } from "react-icons/bs"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { useOutletContext } from "react-router-dom"
import WithdrawRequest from "./WithdrawRequest"
import AddAccounts from "./AddAccounts.jsx"
import React, { useState } from "react"
import { BiMoneyWithdraw } from "react-icons/bi"
import { MdAccountBalanceWallet } from "react-icons/md"
import { FaHistory, FaMoneyCheckAlt } from "react-icons/fa"
import WithdrawHistory from "./WithdrawHistory.jsx"
import ValidateWithdraw from "./ValidateWithdraw.jsx"
import {
	useAddAccount,
	useCreateWithdrawal,
	useGetUserWithdrawal,
	useGetWithdrawal,
	useRemoveAccount,
	useUpdateWithdrawal,
} from "./withdrawal.js"
import toast from "react-hot-toast"

const marskAccountNumber = (accountNumber) => {
	const lastFourDigits = accountNumber.slice(-4)
	const masked = "*".repeat(accountNumber.length - 4) + lastFourDigits
	return masked
}

const PaymentManagement = () => {
	const [paymentInfo, setPaymentInfo] = useState("")
	const [withdrawalAmount, setWithdrawalAmount] = useState(0)
	const [accountName, setAccountName] = useState("")
	const [bankName, setBankName] = useState("")
	const [swiftCode, setSwiftCode] = useState("")
	const [accountNumber, setAccountNumber] = useState("")

	const withdrawRef = React.useRef(null)
	const addAccountRef = React.useRef(null)
	const withdrawListRef = React.useRef(null)
	const withdrawValidateRef = React.useRef(null)

	const { user } = useOutletContext()
	const { addAccount, isAddingAccount } = useAddAccount()
	const { removeAccount } = useRemoveAccount()
	const { createWithdrawal, isCreatingWithdrawal } = useCreateWithdrawal()
	const { updateWithdrawal, isUpdatingWithdrawal } = useUpdateWithdrawal()
	const { getWithdrawals: getUserWithdrawals } = useGetUserWithdrawal()
	const { getWithdrawals } = useGetWithdrawal()

	console.log(getUserWithdrawals)

	const withdrawalAccounts = user?.withdrawalAccounts || []
	const hasWithdrawalAccount = withdrawalAccounts.length > 0

	const handleSubmitAccount = (e) => {
		e.preventDefault()

		addAccount(
			{
				accountName,
				accountNumber,
				bankName,
				swiftCode,
			},
			{
				onSuccess: () => {
					setAccountName("")
					setAccountNumber("")
					setBankName("")
					setSwiftCode("")
					addAccountRef.current?.close()
				},
			}
		)
	}

	const handleDeletAccount = (id) => {
		removeAccount(id)
	}

	const handleWithdrawalRequest = () => {
		if (!paymentInfo) return toast.error("Select an account")
		if (withdrawalAmount > user?.availableBalance || withdrawalAmount <= 0)
			return toast.error("Invalid amount")

		const account = JSON.parse(paymentInfo)

		createWithdrawal(
			{
				amount: withdrawalAmount,
				paymentInfo: account,
			},
			{
				onSuccess: () => {
					setWithdrawalAmount(0)
					withdrawRef.current?.close()
				},
			}
		)
	}

	const handleApprove = (userId, withdrawalId) => {
		updateWithdrawal({
			data: {
				status: "Completed",
				userId,
			},
			id: withdrawalId,
		})
	}
	const handleReject = (userId, withdrawalId) => {
		updateWithdrawal({
			data: {
				status: "Rejected",
				userId,
			},
			id: withdrawalId,
		})
	}

	return (
		<>
			<Header user={user} />
			<div className=" mt-6 w-full h-full flex items-center justify-center">
				<div className="p-6  w-[500px] border-2 bg-white border-gray-200 rounded-xl">
					<div className=" flex items-center justify-between gap-4">
						<div className="h-20 text-center w-48 shadow-md rounded-md p-2 ">
							<h1 className="text-lg text-gray-500 text-center">
								Avialable amount
							</h1>
							<h1 className=" mt-2 text-2xl font-bold">
								${user?.availableBalance ? user?.availableBalance : 0}
							</h1>
						</div>

						<div className="h-20 text-center w-48 shadow-md rounded-md p-2 ">
							<h1 className="text-lg text-gray-500 text-center">
								Account balance
							</h1>
							<h1 className=" mt-2 text-2xl font-bold">
								${user?.accountBalance ? user?.accountBalance : 0}
							</h1>
						</div>
					</div>
					<br />
					<div className=" flex gap-5 flex-wrap">
						{hasWithdrawalAccount && (
							<button
								onClick={() => withdrawRef.current?.showModal()}
								className="btn btn-primary  rounded-full">
								<BiMoneyWithdraw size={23} />
								withdraw request
							</button>
						)}

						<button
							onClick={() => addAccountRef.current?.showModal()}
							className="btn btn-primary  rounded-full btn-outline">
							<MdAccountBalanceWallet size={23} />
							Add account
						</button>

						<button
							onClick={() => withdrawListRef?.current?.showModal()}
							type="button"
							className="btn btn-md btn-primary  rounded-full btn-outline">
							<FaHistory size={23} />
							Withdrawal history
						</button>
						{user?.role === "admin" && (
							<button
								onClick={() => withdrawValidateRef?.current?.showModal()}
								type="button"
								className="btn btn-md btn-primary  rounded-full btn-outline">
								<FaMoneyCheckAlt size={23} />
								Validate Withdraw
							</button>
						)}
					</div>
					<br />
					{!hasWithdrawalAccount && (
						<p className=" text-left text-gray-300 text-2xl">
							no withdrawal account, add one
						</p>
					)}

					{hasWithdrawalAccount && withdrawalAccounts.length > 0 && (
						<div className="overflow-x-auto">
							<table className="table">
								<tbody>
									{withdrawalAccounts.map((account) => (
										<tr
											key={account.id}
											className=" text-left mb-2  w-full hover:bg-base-200">
											<th>
												{account.bankName} -{" "}
												{marskAccountNumber(account.accountNumber)}
											</th>

											<th>
												<button
													onClick={() => handleDeletAccount(account._id)}
													className="btn btn-outline">
													<BsTrash size={23} />
													{""}
												</button>
											</th>
										</tr>
									))}
								</tbody>
							</table>

							<br />
							<p className=" font-bold text-gray-500 text-left">
								The withdrawal requested amount will be deposited into your
								account by the next business day.
							</p>
						</div>
					)}
				</div>

				{/* <WithdrawRequest/> */}
				<WithdrawRequest
					marskAccountNumber={marskAccountNumber}
					setPaymentInfo={setPaymentInfo}
					user={user}
					setWithdrawalAmount={setWithdrawalAmount}
					withdrawRef={withdrawRef}
					withdrawalAccounts={withdrawalAccounts}
					withdrawalAmount={withdrawalAmount}
					handleWithdrawalRequest={handleWithdrawalRequest}
				/>

				{/* <Add Accounts/> */}
				<AddAccounts
					handleSubmitAccount={handleSubmitAccount}
					addAccountRef={addAccountRef}
					isAddingAccount={isAddingAccount}
					setAccountName={setAccountName}
					setAccountNumber={setAccountNumber}
					setBankName={setBankName}
					setSwiftCode={setSwiftCode}
				/>

				{/* <Withdrawal History/> */}
				<WithdrawHistory
					marskAccountNumber={marskAccountNumber}
					withdrawListRef={withdrawListRef}
					userWithdrawal={getUserWithdrawals}
				/>

				{/* <Validate Withdraw/> */}
				<ValidateWithdraw
					handleApprove={handleApprove}
					handleReject={handleReject}
					marskAccountNumber={marskAccountNumber}
					updatingWithdrawal={false}
					withdrawValidateRef={withdrawValidateRef}
					withdrawals={getWithdrawals}
				/>
			</div>
			<Footer />
		</>
	)
}

export default PaymentManagement
