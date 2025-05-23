import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type Props = {
    status: string | null;
    canResetPassword: boolean;
};

type LoginFormData = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<LoginFormData>({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-sm text-gray-500">
                        Enter your email below to login to your account
                    </p>
                </div>

                <div className="grid gap-4">
                    {/* Email */}
                    <div className="grid gap-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="grid ">
                        <div className="flex items-center">
                            <InputLabel htmlFor="password" value="Password" />
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="ml-auto text-sm text-gray-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData("remember", e.target.checked)}
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                    </div>

                    {/* Login Button */}
                    <PrimaryButton
                        type="submit"
                        className="w-full text-center bg-green-700"
                        disabled={processing}
                    >
                        Login
                    </PrimaryButton>

                    {/* Divider */}
                    <div className="relative text-center text-sm">
                        <span className="relative z-10 bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                        <div className="absolute inset-0 top-1/2 border-t border-gray-300"></div>
                    </div>

                    {/* Social Login (example: Google) */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="currentColor"
                        >
                            <path d="M12 .297c-6.63 0-12 5.373..." />
                        </svg>
                        Login with Google
                    </button>
                </div>

                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="register" className="underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
