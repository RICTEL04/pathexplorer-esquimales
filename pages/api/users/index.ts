import { NextApiRequest, NextApiResponse } from "next";
import { getUsers, createUser } from "../../../app/lib/users";

// This API route handles user-related operations with limits on the number of users returned
// This API supports GET and POST methods
// Example: /api/users?limit=5 will return 5 users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            // Fetch all users with an optional limit
            // 10 is the default limit if none is provided
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const users = await getUsers(limit);
            return res.status(200).json(users);
        }

        if (req.method === "POST") {
            // Create a new user
            const { username, password } = req.body;
            const newUser = await createUser(username, password);
            return res.status(201).json(newUser);
        }

        // Set the Allow header to indicate allowed methods
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error("Error in /api/users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}