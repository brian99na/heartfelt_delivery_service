"use server"

import { User } from "@/app/utils/types";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createMessage = async (data: User): Promise<null | string> => {
    if (!data) {
        throw new Error('No data was provided')
    }

    const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 200) {
        throw new Error("Failed to create user");
    }

    if (response) {
        const data = await response.json();
        return data.user._id
    }

    return null
}

export const fetchUserData = async (userId: string): Promise<User> => {
    try {
        const response = await fetch(`http://localhost:3000/api/users?userId=${userId}`, {
            headers: {
                Accept: "application/json",
                method: "GET",
            },
        });
        if (response) {
            const data = await response.json();
            return data
        } else {
            throw new Error('no response')
        }
    } catch (error) {
        console.log('testing', error)
        revalidatePath('/')
        redirect('/')
    }
};

export const redirectToBuildPage = async () => {
    revalidatePath('/', 'page')
    redirect('/')
}