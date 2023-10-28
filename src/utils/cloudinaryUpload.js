import { Cloudinary } from "@cloudinary/url-gen"
import { Resize } from "@cloudinary/url-gen/actions"

const cld = new Cloudinary({
	cloud: {
		cloudName: "queentech",
	},
})

export const cloudinaryUpload = async (uploadOptions) => {
	const { files, uploadPreset, width, height } = uploadOptions
	const newImages = files.map((file) => {
		const formData = new FormData()

		formData.append("file", file)
		formData.append("upload_preset", uploadPreset)

		return { formData }
	})

	const imgObj = await Promise.all(
		newImages?.map(async (img) => {
			const response = await fetch(
				"https://api.cloudinary.com/v1_1/queentech/image/upload",
				{
					method: "POST",
					body: img.formData,
				}
			)

			const data = await response.json()

			return cld
				.image(data.public_id)
				.resize(Resize.scale().width(width).height(height))
				.quality("auto")
				.format("auto")
				.toURL()
		})
	)

	return imgObj
}
