import { FiCamera } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd"
import { useState } from "react"
import Dropzone from "react-dropzone"
import agent from "../../app/agent"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { cloudinaryUpload } from "../../utils/cloudinaryUpload"

const SellImages = ({ register, setValue, watchedImages }) => {
	const [images, setImages] = useState([])

	const onDragEnd = (data) => {
		const { destination, source } = data

		if (!destination) return

		const newImages = [...watchedImages]
		const removedImg = newImages.splice(source.index, 1)
		newImages.splice(destination.index, 0, removedImg[0])
		setValue(
			"images",
			newImages.map((img) => img)
		)
	}

	const onDrop = async (files) => {
		const imgObj = await cloudinaryUpload({
			files,
			uploadPreset: "uploads",
			width: 500,
			height: 500,
		})

		setValue("images", [...watchedImages, ...imgObj])
	}

	const deleteImg = async (publicId) => {
		try {
			return await agent.Product.deleteImages({ publicId })
		} catch (error) {
			throw error
		}
	}

	const { mutate } = useMutation({
		mutationFn: (publicId) => deleteImg(publicId),
		onSuccess: (data) => {
			toast.success(data.message)
		},
	})

	const handleImageDelete = (e, image) => {
		e.preventDefault()

		const splitimg = image.split("/v1")[1]
		const publicId = splitimg.split("?")[0]
		mutate(publicId, {
			onSuccess: () => {
				const filterImages = watchedImages.filter((img) => img !== image)
				setImages(filterImages)
				setValue("images", filterImages)
			},
		})
	}
	return (
		<>
			<div className=" w-full flex gap-2">
				<Dropzone noClick={true} onDrop={onDrop}>
					{({ getInputProps, getRootProps, isDragActive }) => (
						<div {...getRootProps()} className=" w-36">
							<label
								htmlFor="images"
								className=" h-36 w-36 cursor-pointer flex border-2 border-dashed border-base-300 items-center justify-center flex-col rounded-md">
								<FiCamera className=" text-slate-400" size={50} />
								{isDragActive ? (
									<p className=" text-secondary-content text-center">
										You can drop images here
									</p>
								) : (
									<p className=" text-slate-400 text-center">
										Add images or drop here
									</p>
								)}
							</label>
							<input
								className="hidden"
								{...getInputProps()}
								multiple
								type="file"
								id="images"
							/>
						</div>
					)}
				</Dropzone>
				<DragDropContext onDragEnd={onDragEnd}>
					<ImageWrapper
						images={watchedImages}
						register={register}
						handleImageDelete={handleImageDelete}
					/>
				</DragDropContext>
			</div>
			<ul className=" bg-slate-100 marker:text-gray-400 list-inside list-disc text-left w-full mt-4 p-4 rounded-lg border border-base-300">
				<li className=" text-gray-400">
					You can register by clicking or dragging the image
				</li>
				<li className=" text-gray-400">
					You can change the order of the images by dragging. Your main image
					should be the first image
				</li>
			</ul>
		</>
	)
}

const ImageWrapper = ({ images, register, handleImageDelete }) => {
	return (
		<Droppable direction="horizontal" droppableId="main_droppable">
			{(provided) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className=" w-full flex items-center flex-wrap gap-2 p-2">
					<ImagesItems
						images={images}
						register={register}
						handleImageDelete={handleImageDelete}
					/>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}

const ImagesItems = ({ images, register, handleImageDelete }) => {
	return (
		<>
			{images &&
				images?.map((item, index) => (
					<Draggable draggableId={`image-${index}`} index={index}>
						{(provided, snapshot) => (
							<div
								{...provided.dragHandleProps}
								{...provided.draggableProps}
								ref={provided.innerRef}
								key={index}
								className={`${
									snapshot.isDragging ? " border-primary border-4" : ""
								} w-28 h-28 800px:w-36 800px:h-36 relative border-2 rounded-md border-base-300`}>
								<img
									className="h-full w-full rounded-md"
									src={item}
									alt={index + "uploaded images"}
								/>

								<label htmlFor={`image-${index}`}>
									<AiFillCloseCircle
										className="absolute top-1 cursor-pointer right-1"
										size={30}
										onClick={(e) => handleImageDelete(e, item)}
									/>

									<input
										type="checkbox"
										id={`image-${index}`}
										checked={true}
										value={item}
										{...register("images", {
											required: "Atleast on image is required",
										})}
										hidden
									/>
								</label>

								{index === 0 && (
									<div className=" badge p-2 w-2/3 absolute top-1/2 right-1/2 left-1/2 -translate-x-1/2 bottom-0 badge-primary">
										{" "}
										Main Image
									</div>
								)}
							</div>
						)}
					</Draggable>
				))}
		</>
	)
}

export default SellImages
