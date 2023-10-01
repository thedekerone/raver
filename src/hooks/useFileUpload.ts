import { ContainerClient } from "@azure/storage-blob";
import { useSession } from "next-auth/react";
import path from "path";
import { useRef } from "react";
import { api } from "~/server/utils/api";

export function useFileUpload(): [string, (file: File) => Promise<string>] {
    const { data: session } = useSession();
    const imageUrl = useRef("");
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
        imageUrl.current = blockBlobClient.url
        createImage.mutate({
            url: blockBlobClient.url,
            userId: session?.user.id,
        });

        return blockBlobClient.url;
    }

    return [imageUrl.current, uploadFile];
}
