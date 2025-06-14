import { Head, Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <>
            <Head title="404 - Page Not Found" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4">
                <img
                    src="/images/404.png"
                    alt="404 Illustration"
                    className="w-64 h-64 mb-6"
                />

                <h1 className="text-5xl font-bold mb-4">
                    404 - Page Not Found
                </h1>
                <p className="text-lg text-center max-w-xl mb-8">
                    Sorry, the page you are looking for could not be found. It
                    might have been removed or the link is broken.
                </p>

                <Link
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    Back to Home
                </Link>
            </div>
        </>
    );
}