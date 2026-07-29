"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  const router = useRouter();

  const [state, action, pending] = useActionState(
    registerAction,
    false
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Register successful");
      router.push("/login");
    } else {
      toast.error(state.message || "Register failed");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="space-y-5 p-6">
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center gap-3 rounded-lg border p-3">
          <input
            id="provider"
            type="checkbox"
            name="isProvider"
            className="h-4 w-4 rounded border-gray-300"
          />

          <label
            htmlFor="provider"
            className="text-sm font-medium cursor-pointer"
          >
            Register as Provider
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Creating account..." : "Create Account"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
          >
            Login
          </Link>
        </div>
      </Card>
    </form>
  );
};

export default RegisterForm;