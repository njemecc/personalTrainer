import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from "@clerk/nextjs/server";
import {NextRequest} from "next/server";

const f = createUploadthing();

// Funkcija za autentifikaciju korisnika
const auth = (req: NextRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new UploadThingError("Unauthorized"); // Blokira neprijavljene korisnike
  }

  return { id: userId };
};

// Definicija FileRouter-a sa proverom autentifikacije
export const ourFileRouter = {
  planIshraneUploader: f({
    "application/pdf": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
    "application/msword": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = auth(req);

      // Uključivanje informacija o korisniku kao metapodataka
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload završen za userId:", metadata.userId);
      console.log("URL fajla:", file.url);
      console.log("Key fajla:", file.key);

      // Vraćamo i key koji će biti neophodan za brisanje fajla
      return { fileUrl: file.url, fileKey: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;