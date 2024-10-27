"use client";
import { toast } from "@/components/ui/use-toast";
import { credentialsLogin } from "./serverAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Loginform() {
  const router = useRouter(); // Moved useRouter here

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    if (!username || !password) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Error",
        description: "please provide all fields",
      });
     
    } else {
      const error = await credentialsLogin(username, password);

      if (!error) {
        toast({
          variant: "sucess",
          title: "Success",
          description: "Login successful",
        });
        setIsLoading(false);
        router.refresh(); // Refresh the page on successful login
      } else {
        toast({
          variant: "destructive",
          title: `${error}`,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
              name="username"
                id="username"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-b from-emerald-500 to-teal-600  transition duration-300 ease-in-out transform hover:scale-105 rounded-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
  );
}
