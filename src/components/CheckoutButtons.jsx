"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ userId, plan, currency }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/create-checkout-sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, plan, currency }),
            });
            if (!res.ok) {
                throw new Error("Failed to initialize checkout. Try Again and be in the network area.");
            }
            const data = await res.json();
            if (!data?.id) {
                throw new Error("No session returned");
            }
            const stripe = await stripePromise;
            const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.id });
            if (stripeError) throw stripeError;
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-[#063731] via-[#107b6f] to-[#3DDC97] text-white hover:from-[#085046] hover:via-[#0c6a60] hover:to-[#36c285] transition-all shadow-md hover:shadow-lg group"
            >
                {loading ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <span className="tracking-wide">Start Now</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </Button>
            {error && (
                <p className="mt-2 text-xs bg-red-500 text-center p-3 rounded-md text-white">
                    {error}
                </p>
            )}
        </div>
    );
}
