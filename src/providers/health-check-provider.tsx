"use client";

import { ReactNode, useEffect, useState } from "react";
import ContentsService from "@/service/content.service";
import { usePathname, useRouter } from "next/navigation";

type THealthCheckProvider = {
  children: ReactNode;
};

export const HealthCheckProvider = ({ children }: THealthCheckProvider) => {
  const pn = usePathname();
  const router = useRouter();
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      // Skip health check on maintenance page to avoid infinite loop
      if (pn === "/maintenance") {
        setIsHealthy(true);
        setIsChecking(false);
        return;
      }

      try {
        setIsChecking(true);

        // Check both APIs in parallel
        const [mainApiResult, financeApiResult] = await Promise.allSettled([
          ContentsService.healthCheck(),
          ContentsService.healthCheckKesiswaan(),
        ]);

        // Check if both APIs are healthy
        const isMainApiHealthy =
          mainApiResult?.status === "fulfilled" ||
          mainApiResult?.status.toLowerCase() === "ok";

        const isFinanceApiHealthy =
          financeApiResult?.status === "fulfilled" ||
          financeApiResult?.status.toLowerCase() === "ok";

        // If either API fails, go to maintenance
        if (isMainApiHealthy && isFinanceApiHealthy) {
          setIsHealthy(true);
        } else {
          console.error("Health check failed:", {
            mainApi: mainApiResult,
            financeApi: financeApiResult,
          });
          setIsHealthy(false);
          router.push("/maintenance");
        }
      } catch (error) {
        console.error("Health check failed:", error);
        setIsHealthy(false);
        router.push("/maintenance");
      } finally {
        setIsChecking(false);
      }
    };

    checkHealth();
  }, [router]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Memeriksa sistem...</p>
        </div>
      </div>
    );
  }

  // Only render children if healthy
  if (isHealthy) {
    return <>{children}</>;
  }

  // Return null if not healthy (router will handle redirect)
  return null;
};
