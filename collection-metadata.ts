import { mplCore } from '@metaplex-foundation/mpl-core'
import { keypairIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import fs from 'fs'

const createMetaData = async () => {
    const umi = createUmi('https://api.devnet.solana.com')
        .use(mplCore())
        .use(
            irysUploader({
                address: 'https://devnet.irys.xyz',
            })
        )

    const wallet = JSON.parse(fs.readFileSync("./mywallet.json", "utf8"));
    let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
    umi.use(keypairIdentity(keypair))

    const imageUri = "https://gateway.irys.xyz/7PgKbiG13WjkCCsX3WsQe8Mm3d87GQu9vXS35exnX4za";
    const metadata = {
        name: 'The Elemental Brawl',
        description: 'Three dragons are locked in a chaotic, cinematic mid-air battle, unleashing their powers',
        image: imageUri,
        properties: {
            files: [{
                uri: imageUri,
                type: 'image/jpeg',
            },
            ],
            category: 'cover_art',
        },

    }

    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
        throw new Error(err)
    })
    console.log('metaDataUri: ', metadataUri);
}
createMetaData()