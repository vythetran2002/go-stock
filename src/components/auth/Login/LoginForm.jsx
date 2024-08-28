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
import { LoginSchema } from "@/schema/auth";
import { signInWithEmail } from "@/components/services/auth/signIn";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LoginFailToastContainer = (props) => {
  const { message } = props;
  return (
    <>
      <p className="text-center">{message}</p>
    </>
  );
};

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    toast.promise(signInWithEmail(data.email, data.password), {
      loading: () => {
        setIsLoading(true);
        return "Loading ...";
      },
      success: (message) => {
        setIsLoading(false);
        Cookies.set("token", message.accessToken);
        router.push("/dashboard");
        return "Login successfully";
      },
      error: (message) => {
        setIsLoading(false);
        if (message.code == "auth/invalid-credential") {
          return (
            <LoginFailToastContainer message="User not found. Please check your email and try again." />
          );
        } else
          return (
            <LoginFailToastContainer message="An error occurred. Please try again." />
          );
      },
    });
    // const user = await signInWithEmail(data.email, data.password);
    // console.log(user);
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
        {isLoading ? (
          <Button type="submit" className="w-full mt-3" disabled>
            Loading
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-3">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
}
