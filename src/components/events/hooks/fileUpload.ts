import { BlockBlobClient } from "@azure/storage-blob";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/server/utils/api";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from "~/lib/firebase";

export const useFileUpload = () => {
    const { toast } = useToast();
    const [uploadedFile, setUploadedFile] = useState<File | undefined>();
    const storage = getStorage(firebase);

    const createImage = api.images.create.useMutation({
        onError: () => {
            toast({
                variant: "destructive",
                description: "Failed to create image",
            });
        },
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Image updated successfully",
            });
        },
    });

    const data = api.images.generateSasUrl.useQuery(
        { fileName: uploadedFile?.name ?? "" },
        { enabled: !!uploadedFile?.name },
    ).data;

    async function uploadFileFirebase(file: File) {
        const fileRef = ref(storage, file.name);

        try {
            const fileUploaded = await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileUploaded.ref);
            await createImage.mutateAsync({ url });

            return createImage.data;
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Failed to create image",
            });
        }
    }

    async function uploadFileAzure(file: File) {
        if (!data?.sasUrl) {
            throw new Error("Storage not found");
        }
        const blobService = new BlockBlobClient(data.sasUrl);
        try {
            const fileBuffer = await file.arrayBuffer();
            await blobService.uploadData(fileBuffer);
            await createImage.mutateAsync({ url: data.imageUrl });

            return createImage.data;
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Failed to create image",
            });
        }
    }

    return {
        uploadedFile,
        setUploadedFile,
        uploadFile: uploadFileFirebase,
        secondaryUpload: uploadFileAzure,
    };
};
