"use server"

import { User, UserResponse } from "@/app/utils/types";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const apiUrl = process.env.API_URL

export const createMessage = async (data: User): Promise<null | string> => {
    if (!data) {
        throw new Error('No data was provided')
    }

    const response = await fetch(`${apiUrl}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(data),
    });

    if (response.status !== 200) {
        throw new Error(`Failed to create user ${response}`);
    }

    if (response) {
        const data = await response.json();
        return data.user._id
    }

    return null
}

export const fetchUserData = async (userId: string): Promise<UserResponse> => {
    try {
        const response = await fetch(`${apiUrl}/api/users?userId=${userId}`, {
            headers: {
                Accept: "application/json",
                method: "GET",
            },
            cache: "no-cache",
        });

        if (response) {
            const data = await response.json();
            return data
        } else {
            throw new Error('no response')
        }
    } catch {
        revalidatePath('/')
        redirect('/')
    }
};

export const redirectToBuildPage = async () => {
    revalidatePath('/', 'page')
    redirect('/')
}