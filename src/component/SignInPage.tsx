"use client";

import { signIn as nextAuthSignIn, signOut, useSession } from "next-auth/react";

function SignInPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        {!session ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome</h1>
            <p className="text-gray-600 mb-6">Please sign in to continue</p>
            <button
              onClick={() => nextAuthSignIn("google")}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4 border"
              />
            )}
            <h1 className="text-xl font-semibold">
              {session.user?.name || "User"}
            </h1>
            <p className="text-gray-500">{session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <SignInPage />
    </main>
  );
}
