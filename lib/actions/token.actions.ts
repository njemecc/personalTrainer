import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from "@azure/storage-blob";

export function generateSasToken(blobName: string): string {
  //uzimanje env. varijabli
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME as string;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY as string;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME as string;

  if (!accountName || !accountKey) {
    throw new Error(
      "Azure Storage account name and key must be defined in the environment variables."
    );
  }

  // Koristimo StorageSharedKeyCredential
  const credential = new StorageSharedKeyCredential(accountName, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credential
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const sasOptions = {
    containerName,
    blobName,
    permissions: BlobSASPermissions.parse("r"), // Read permissions
    expiresOn: new Date(new Date().valueOf() + 60 * 10 * 1000), // 10 minuta
  };

  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    credential
  ).toString();

  // Konstrukcija SAS URL-a
  const sasUrl = `${containerClient.getBlobClient(blobName).url}?${sasToken}`;

  return sasUrl;
}
