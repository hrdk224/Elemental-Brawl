import { mplCore, create, fetchCollection } from '@metaplex-foundation/mpl-core'
import { createGenericFile, generateSigner, keypairIdentity, publicKey, uniqueBy } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import fs from 'fs'
import { base58 } from '@metaplex-foundation/umi/serializers'


const image_metadata_asset = async () => {

    // wallet setup and connection

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

    // Image URI

    const imageFile = fs.readFileSync("./img/Zynthera, The Void Wyrm.jpeg"); // add your image path here

    const umiImageFile = createGenericFile(imageFile, 'Zynthera, The Void Wyrm.jpeg', {
        tags: [{
            name: 'Content-Type',
            value: 'image/png'
        }]
    })
    const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
        throw new Error(err)
    })

    console.log('imageUri:' + imageUri[0])

    // metadata

    const metadata = {
        name: 'Zynthera, The Void Wyrm',
        description: 'Dark purple and black dragon emerging from a rift in space, stars glinting across scales, cosmic smoke around, surreal glow.',
        image: imageUri,
        attributes: [
            {
                trait_type: 'Element',
                value: 'Shadow',
            },
            {
                trait_type: 'Region',
                value: 'The Rift',
            },
            {
                trait_type: 'Trait',
                value: 'Devourer of Light',
            }
        ],
        properties: {
            files: [
                {
                    uri: imageUri,
                    type: 'image/jpeg',
                },
            ],
            category: 'image',
        },
    }
    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
        throw new Error(err)
    })
    console.log('metaDataUri: ', metadataUri);

    //    mint

    const collectionSigner = publicKey("GzRh7U2B5Cq48G4SNNvcXde1e2FZVBbYgNBCVWmbQphw")

    const collection = await fetchCollection(umi, collectionSigner)

    const assetSigner = generateSigner(umi)

    const tx = await create(umi, {
        asset: assetSigner,
        collection: collection,
        name: 'Zynthera, The Void Wyrm', //changes in name
        uri: metadataUri,

    }).sendAndConfirm(umi)

    const signature = base58.deserialize(tx.signature)[0];
    console.log('Asset created');
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log('View NFT on Metaplex Explorer')
    console.log(`https://core.metaplex.com/explorer/${assetSigner.publicKey}?env=devnet`)

}
image_metadata_asset()