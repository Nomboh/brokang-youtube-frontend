import { FiCamera } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState } from "react"
import Dropzone from "react-dropzone"
import { Cloudinary } from "@cloudinary/url-gen"
import { Resize } from "@cloudinary/url-gen/actions"
import { useMutation } from "@tanstack/react-query"
import agent from "../../app/agent"
import toast from "react-hot-toast"

const SellImages = ({ register, setValue }) => {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "queentech",
		},
	})

	const [images, setImages] = useState([])

	const dragEnd = (data) => {
		const { destination, source } = data

		if (!destination) return

		const newImgArray = [...images]
		const removedImg = newImgArray.splice(source.index, 1)
		newImgArray.splice(destination.index, 0, removedImg[0])
		setImages(newImgArray)
		setValue(
			"images",
			newImgArray.map((img) => img.url)
		)
	}

	const onDrop = async (files) => {
		const newImages = files.map((file) => {
			const formData = new FormData()
			formData.append("file", file)
			formData.append("upload_preset", "uploads")
			return { formData }
		})

		const imagObj = await Promise.all(
			newImages.map(async (img) => {
				const response = await fetch(
					"https://api.cloudinary.com/v1_1/queentech/image/upload",
					{
						method: "POST",
						body: img.formData,
					}
				)

				const data = await response.json()

				return {
					publicId: data.public_id,
					url: cld
						.image(data.public_id)
						.resize(Resize.scale().width(500).height(500))
						.quality("auto")
						.format("auto")
						.toURL(),
				}
			})
		)

		setImages((prev) => [...prev, ...imagObj])
	}

	const deleteImg = async (publicId) => {
		try {
			return await agent.Product.deleteCloudinaryImg({ publicId })
		} catch (error) {
			throw error
		}
	}

	const { mutate } = useMutation({
		mutationFn: (publicId) => deleteImg(publicId),

		onSuccess: (data) => {
			console.log(data)
			toast.success(data.message)
		},
	})

	const handleImageDelete = (e, publicId) => {
		e.preventDefault()
		mutate(publicId, {
			onSuccess: () => {
				const filterImages = images.filter((img) => img.publicId !== publicId)

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
									<p className=" text-slate-200 text-center">
										You can drop item here
									</p>
								) : (
									<p className=" text-slate-400 text-center">
										Add Images or drop here
									</p>
								)}
							</label>
							<input {...getInputProps()} multiple type="file" id="images" />
						</div>
					)}
				</Dropzone>
				<DragDropContext onDragEnd={dragEnd}>
					<ImageWrapper
						images={images}
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
						register={register}
						images={images}
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
			{images?.map((item, index) => (
				<Draggable index={index} key={index} draggableId={`image-${index}`}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.dragHandleProps}
							{...provided.draggableProps}
							className={`w-28 h-28 800px:w-36 800px:h-36 relative border-2 rounded-md border-base-300 ${
								snapshot.isDragging ? " border-primary border-4" : ""
							}`}>
							<img
								className="h-full w-full rounded-md"
								src={item.url}
								alt={item.url}
							/>

							<label htmlFor={`image-${index}`}>
								<AiFillCloseCircle
									className="absolute top-1 cursor-pointer right-1"
									size={30}
									onClick={(e) => handleImageDelete(e, item.publicId)}
								/>

								<input
									id={`image-${index}`}
									value={item.url}
									type="checkbox"
									checked={true}
									{...register("images", {
										required: "images is required",
									})}
									hidden
								/>
							</label>

							{index === 0 && (
								<div className=" p-2 w-2/3 absolute top-1/2 right-1/2 left-1/2 -translate-x-1/2 bottom-0 badge badge-primary ">
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
