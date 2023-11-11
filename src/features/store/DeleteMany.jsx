import React from "react"

function DeleteMany({ checkedProducts, setIndex }) {
	const deleteRef = React.useRef()

	const handleClose = () => {
		setIndex(0)
		deleteRef.current?.close()
	}
	return (
		<dialog ref={deleteRef} id="modal_delete" className="modal">
			<div className="modal-box max-w-sm w-4/5">
				<button
					onClick={() => deleteRef.current.close()}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
					✕
				</button>
				<p className="py-4 text-xl text-center">
					Are you sure you want to delete these{" "}
					<strong>{checkedProducts.length}</strong> products
				</p>
				<div className="modal-action justify-between gap-4 w-full">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn btn-neutral w-32" onClick={handleClose}>
						Cancel
					</button>
					<button className="btn btn-error w-32">Delete</button>
				</div>
			</div>
		</dialog>
	)
}

export default DeleteMany
