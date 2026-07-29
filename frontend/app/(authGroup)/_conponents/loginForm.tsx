"use client";

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false
  );

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="space-y-5 p-6">
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

        

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Signing in..." : "Login"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
          >
            Create account
          </Link>
        </div>
      </Card>
    </form>
  );
};

export default LoginForm;