import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary'
import { text, relationship } from '@keystone-next/fields';
import 'dotenv/config'

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: "sickFits",
}
export const ProductImage = list({
    fields: {
        image: cloudinaryImage({
            //@ts-expect-error
            cloudinary,

            label: 'Source'
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' }),


    },
    ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product',],
        }
    }
})