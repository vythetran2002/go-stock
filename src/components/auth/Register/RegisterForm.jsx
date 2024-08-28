import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/auth";
import { signUpWithEmail } from "@/components/services/auth/signUp";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const RegisterFailToastContainer = (props) => {
  const router = useRouter();
  const { message } = props;
  return (
    <>
      <p className="text-center p-2">{message}</p>
    </>
  );
};

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      toast.promise(signUpWithEmail(data.email, data.password), {
        loading: "Creating your account...",
        success: (user) => {
          router.push("/auth/login");
          return "Registered successfully";
        },
        error: (error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              return (
                <RegisterFailToastContainer message="This email is already in use. Please use a different email or try logging in." />
              );

            case "auth/invalid-email":
              return (
                <RegisterFailToastContainer message="Invalid email address. Please enter a valid email." />
              );

            case "auth/weak-password":
              return (
                <RegisterFailToastContainer message="Password is too weak. Please use a stronger password." />
              );

            case "auth/operation-not-allowed":
              return (
                <RegisterFailToastContainer message="Account creation is currently disabled. Please contact support." />
              );

            default:
              return (
                <RegisterFailToastContainer message="An error occurred during sign-up. Please try again." />
              );
          }
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage isError={true} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="name" placeholder="Your name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button type="submit" className="w-full mt-3" disabled>
            Loading
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-3">
            Register
          </Button>
        )}
      </form>
    </Form>
  );
}
