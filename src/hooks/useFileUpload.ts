import { ContainerClient } from "@azure/storage-blob";
import { useSession } from "next-auth/react";
import path from "path";
import { useRef } from "react";
import { api } from "~/server/utils/api";

export function useFileUpload(): [ (file: File) => Promise<string>] {
    const { data: session } = useSession();
    const sasUri = api.events.getSasUri.useQuery().data;
    const createImage = api.images.create.useMutation();
    async function uploadFile(file: File) {
        if (!sasUri || !session?.user.id) {
            throw new Error("invalid SAS uri");
        }

        const container = new ContainerClient(sasUri);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };

        const blockBlobClient = container.getBlockBlobClient(
            `events_dsa${new Date().getTime()}.${path.extname(file.name)}`,
        );

        await blockBlobClient.uploadData(file, options);
        createImage.mutate({
            url: blockBlobClient.url,
            userId: session?.user.id,
        });

        return blockBlobClient.url;
    }

    return [ uploadFile];
}
