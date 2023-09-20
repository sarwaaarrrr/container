import { DAT } from "../dat";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await DAT();
      res.status(200).json({ message: "DAT function executed successfully" });
    } catch (error) {
      console.error("Error in DAT function:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
