import {
    createCollection,
    mplCore
} from '@metaplex-foundation/mpl-core'
import { generateSigner, keypairIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'


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
const collection = generateSigner(umi);

const create_Collection = async () => {


    const metadataUri = 'https://gateway.irys.xyz/5tgMAM5NNyAPq3vb6gUZqjbjiqnMamUu3X7E32ctJwb3'
    const tx = await createCollection(umi, {
        collection,
        name: 'The Elemental Brawl',
        uri: metadataUri,
    }).sendAndConfirm(umi)

    const signature = base58.deserialize(tx.signature)[0];
    console.log('Collection created');
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log('View NFT on Metaplex Explorer')
    console.log(`https://core.metaplex.com/explorer/collection/${collection.publicKey}?env=devnet`)

}

create_Collection()