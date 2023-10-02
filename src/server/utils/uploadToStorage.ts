import { type AccountSASSignatureValues, ContainerClient, BlobSASPermissions } from "@azure/storage-blob";

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  SASProtocol,
} from "@azure/storage-blob";

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const containerName = "events";

function getBlobServiceClient(serviceName:string, serviceKey:string) {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    serviceName,
    serviceKey
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${serviceName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  return blobServiceClient;
}

export async function generateSasUrl(fileName:string) {
  if (!accountName || !accountKey)
    throw new Error("Failed to initialize Azure storage");

  const blobServiceClient = getBlobServiceClient(accountName, accountKey)
  const containerClient = blobServiceClient.getContainerClient(containerName)

  const blockBlobClient = containerClient.getBlockBlobClient(fileName)

  const SIXTY_MINUTES = 1 * 60 * 1000;
  const NOW = new Date();

  const accountSasTokenUrl = await blockBlobClient.generateSasUrl({
    startsOn: NOW,
    expiresOn: new Date(new Date().valueOf() + SIXTY_MINUTES),
    permissions: BlobSASPermissions.parse("rw"), // Read only permission to the blob
    protocol: SASProtocol.HttpsAndHttp // Only allow HTTPS access to the blob
  });

  return accountSasTokenUrl;

}

