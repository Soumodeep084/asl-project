"use server";

import { db } from "@/lib/prisma";

export async function recordTransaction(userId, amount, method, startDate, endDate) {
    try {
        const transaction = await db.transaction.create({
            data: {
                userId,
                amount,
                method,
                startDate,
                endDate,
            },
        });
        return transaction;
    } catch (error) {
        console.error("Error recording transaction:", error);
        throw new Error("Transaction recording failed");
    }
}
export async function getUserTransactions(userId) {
    try {
        const transactions = await db.transaction.findMany({
            where: { userId },
        });
        return transactions;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Could not fetch transactions");
    }
}


export async function getLatestTransaction(userId) {
    try {
        const transaction = await db.transaction.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return transaction;
    } catch (error) {
        console.error("Error fetching latest transaction:", error);
        throw new Error("Could not fetch latest transaction");
    }
}
export async function isSubscriptionActive(userId) {
    try {
        const latestTransaction = await getLatestTransaction(userId);
        if (!latestTransaction) return false;
        const currentDate = new Date();
        const subscriptionEndDate = new Date(latestTransaction.endDate);
        return subscriptionEndDate > currentDate;
    } catch (error) {
        console.error("Error checking subscription status:", error);
        throw new Error("Could not check subscription status");
    }
}

export async function getSubscriptionDetails(userId) {
    try {
        const latestTransaction = await getLatestTransaction(userId);
        if (!latestTransaction) return null;

        const isActive = await isSubscriptionActive(userId);
        return {
            isActive,
            startDate: latestTransaction.startDate,
            endDate: latestTransaction.endDate,
        };
    } catch (error) {
        console.error("Error fetching subscription details:", error);
        throw new Error("Could not fetch subscription details");
    }
}

export async function cancelSubscription(userId) {
    try {
        const latestTransaction = await getLatestTransaction(userId);
        if (!latestTransaction) {
            throw new Error("No active subscription found");
        }
        await db.transaction.update({
            where: { id: latestTransaction.id },
            data: { endDate: new Date() },
        });
        return true;
    } catch (error) {
        console.error("Error cancelling subscription:", error);
        throw new Error("Could not cancel subscription");
    }
}