import { ContainerClient } from "@azure/storage-blob";
import { useSession } from "next-auth/react";
import path from "path";
import { useRef } from "react";
import { api } from "~/server/utils/api";

export function useFileUpload(): [ (file: File) => Promise<string>] {
    const { data: session } = useSession();
    const [fileName, setFileName] = useState<string | undefined>()
    const sasUri = api.events.generateSasUrl.useQuery({fileName:"something.txt"}, {enabled:!!fileName}).data
    const createImage = api.images.create.useMutation();
    
    async function uploadFile(file: File) {
        if (!sasUri || !session?.user.id) {
            throw new Error("invalid SAS uri");
        }

        const container = new ContainerClient(sasUri);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };

        const blobName = `events${new Date().getTime()}.${path.extname(file.name)}`

        const blockBlobClient = container.getBlockBlobClient(
            blobName,
        );

        const response = await blockBlobClient.uploadData(file, options);
        console.log("-------------------------------")
        console.log(response)
        createImage.mutate({
            url: process.env.AZURE_STORAGE_BASE_PATH + blobName,
            userId: session?.user.id,
        });

        return process.env.AZURE_STORAGE_BASE_PATH + blobName;
    }

    return [ uploadFile];
}
