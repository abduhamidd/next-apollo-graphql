import 'dotenv/config'
import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema'
import { User } from './schemas/User';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session'
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseUrl = process.env.DATABASE_URL
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
}
const { withAuth } = createAuth({
    listKey: "User",
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: [
            'name', 'email', 'password'
        ]
    }
});
export default withAuth(config(
    //@ts-ignore
    {
        server: {
            cors: {
                //@ts-ignore
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            //@ts-ignore
            url: databaseUrl,
            async onConnect(keystone) {
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            }
        },
        lists: createSchema({
            User,
            Product,
            ProductImage,

        }),
        ui: {
            isAccessAllowed: ({ session }) => {
                return session?.data
            }
        },
        //@ts-ignore
        session: withItemData(statelessSessions(sessionConfig), {
            User: 'id'
        })
    }

))