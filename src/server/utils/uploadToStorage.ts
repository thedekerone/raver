import { type AccountSASSignatureValues, ContainerClient } from "@azure/storage-blob";

import {
  BlobServiceClient,
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  AccountSASServices,
  AccountSASResourceTypes,
  StorageSharedKeyCredential,
  SASProtocol,
} from "@azure/storage-blob";

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const containerName = "events";

function createAccountSas() {
  if (!accountName || !accountKey)
    throw new Error("Failed to initialize Azure storage");

  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey,
  );

  const sasOptions:AccountSASSignatureValues = {
    ipRange: {start: '89.27.127.154'},
    services: AccountSASServices.parse("btfq").toString(),
    resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
    permissions: AccountSASPermissions.parse("rwdlacupi"),
    protocol: SASProtocol.HttpsAndHttp,
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 10 * 60 * 1000),
  };

  const sasToken = generateAccountSASQueryParameters(
    sasOptions,
    sharedKeyCredential,
  ).toString();

  console.log(`sasToken = ${sasToken}`);

  return sasToken.startsWith("?") ? sasToken : `?${sasToken}`;
}

export function getSasUri() {
  const sasToken = createAccountSas();

  return `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
}
