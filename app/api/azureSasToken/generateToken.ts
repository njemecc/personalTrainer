import { NextApiRequest, NextApiResponse } from "next";
import { generateSasToken } from "@/lib/actions/token.actions";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    const { blobName } = req.body;

    if (!blobName) {
      return res.status(400).json({ error: "blobName is required" });
    }

    try {
      const sasUrl = generateSasToken(blobName);
      res.status(200).json({ sasUrl });
    } catch (error) {
      res.status(500).json({ error: "Error generating SAS token" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
