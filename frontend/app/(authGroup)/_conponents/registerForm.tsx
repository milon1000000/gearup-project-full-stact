"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router=useRouter()
  const[state,action,pending]=useActionState(registerAction,false);
  useEffect(()=>{
    if(!state) return;
    if(state.success){
      toast.success(state.message || "Register Successful");
      router.push("/login")
    }
    if(!state.success){
      toast.error(state.message || "Register failed")
    }
  },[state,router])
  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="name" type="name" placeholder="Enter Your Name" required />
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />
        {/* <Input
          name="profilePhoto"
          type="text"
          placeholder="Enter Your Profile Photo URL"
          required
        /> */}
        <Button type="submit">
          {
            pending?"Createing...":"Register"
          }
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
