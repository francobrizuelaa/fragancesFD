import type { NextConfig } from "next";

function supabaseImageRemotePattern():
  | { protocol: "https"; hostname: string; pathname: string }
  | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) return null;
  try {
    return {
      protocol: "https",
      hostname: new URL(supabaseUrl).hostname,
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [supabaseImageRemotePattern()].filter(
      (p): p is NonNullable<typeof p> => p != null
    ),
  },
};

export default nextConfig;
