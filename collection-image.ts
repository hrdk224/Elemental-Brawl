import { mplCore } from '@metaplex-foundation/mpl-core'
import { createGenericFile, keypairIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import fs from 'fs'



const generateImgUri = async () => {
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

    const imageFile = fs.readFileSync("./img/Dragon_collection.jpg");

    const umiImageFile = createGenericFile(imageFile, 'Dragon_collection.jpeg', {
        tags: [{
            name: 'Content-Type',
            value: 'image/png'
        }]
    })
    const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
        throw new Error(err)
    })

    console.log('imageUri:' + imageUri[0])


}
generateImgUri()