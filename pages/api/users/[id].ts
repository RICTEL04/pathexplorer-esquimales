import { NextApiRequest, NextApiResponse } from "next";
import { updateUser, deleteUser, getUsers } from "../../../app/lib/users";

// This API route handles user-related operations for a specific user by ID
// This API supports GET, PUT, and DELETE methods
// Example: /api/users/1 will return user with ID 1
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = parseInt(req.query.id as string, 10);

        if (req.method === "GET") {
            // Fetch a specific user by ID
            const users = await getUsers(1); // Reuse getUsers with a limit of 1
            const user = users.find((u: { ID_Usuario: number }) => u.ID_Usuario === id); // Find the user by ID

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json(user);
        }

        if (req.method === "PUT") {
            // Update a specific user by ID
            const { username, password } = req.body;
            const updatedUser = await updateUser(id, username, password); // Update user
            return res.status(200).json(updatedUser);
        }

        if (req.method === "DELETE") {
            // Delete a specific user by ID
            const deletedUser = await deleteUser(id); // Delete user
            return res.status(200).json(deletedUser);
        }

        // Set the Allow header to indicate allowed methods
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error("Error in /api/users/[id]:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}