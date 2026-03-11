import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  BrainCircuit,
  Eye,
  EyeOff,
  Lock,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export function LoginPage() {
  const { localLogin } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = localLogin(username.trim(), password);
    if (!ok) {
      setError("Invalid credentials. Access denied.");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.08 0.015 258)" }}
    >
      {/* Background hero image */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "url('/assets/generated/login-hero.dim_800x500.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px) saturate(1.4)",
        }}
      />
      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.07 0.02 258 / 0.96) 0%, oklch(0.09 0.018 270 / 0.92) 50%, oklch(0.06 0.025 250 / 0.97) 100%)",
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.74 0.19 198 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.19 198 / 0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.19 198) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, oklch(0.67 0.2 280) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card outer glow ring */}
        <div
          className="rounded-2xl p-px"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.74 0.19 198 / 0.5) 0%, oklch(0.67 0.15 185 / 0.2) 50%, oklch(0.74 0.19 198 / 0.1) 100%)",
            boxShadow:
              "0 0 60px oklch(0.74 0.19 198 / 0.12), 0 32px 80px oklch(0 0 0 / 0.7)",
          }}
        >
          <div
            className="rounded-[15px] overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.13 0.02 258 / 0.98) 0%, oklch(0.10 0.018 265 / 0.99) 100%)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
            }}
          >
            {/* Hero image strip */}
            <div className="relative h-36 overflow-hidden">
              <img
                src="/assets/generated/login-hero.dim_800x500.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
                style={{ opacity: 0.6 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, oklch(0 0 0 / 0.2) 0%, oklch(0.11 0.02 258 / 0.95) 100%)",
                }}
              />
              {/* Brand over image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "oklch(0.74 0.19 198 / 0.12)",
                    border: "1px solid oklch(0.74 0.19 198 / 0.35)",
                    boxShadow: "0 0 24px oklch(0.74 0.19 198 / 0.25)",
                  }}
                >
                  <BrainCircuit
                    className="h-8 w-8"
                    style={{
                      color: "oklch(0.74 0.19 198)",
                      filter: "drop-shadow(0 0 8px oklch(0.74 0.19 198 / 0.8))",
                    }}
                  />
                </div>
                <div className="text-center">
                  <p
                    className="font-display font-bold text-xl leading-none"
                    style={{
                      color: "oklch(0.95 0.02 210)",
                      letterSpacing: "-0.02em",
                      textShadow: "0 0 20px oklch(0.74 0.19 198 / 0.5)",
                    }}
                  >
                    The Shadow Brain
                  </p>
                  <p
                    className="text-[10px] font-mono mt-0.5 uppercase tracking-[0.22em]"
                    style={{ color: "oklch(0.74 0.19 198 / 0.8)" }}
                  >
                    Secure Access Portal
                  </p>
                </div>
              </div>
            </div>

            {/* Form area */}
            <div className="px-8 pb-8 pt-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield
                  className="h-3.5 w-3.5"
                  style={{ color: "oklch(0.74 0.19 198 / 0.6)" }}
                />
                <p
                  className="text-[11px] font-mono uppercase tracking-[0.18em]"
                  style={{ color: "oklch(0.55 0.01 240 / 0.7)" }}
                >
                  Authentication Required
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-username"
                    className="text-[11px] font-mono uppercase tracking-widest"
                    style={{ color: "oklch(0.65 0.01 240 / 0.7)" }}
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                      style={{ color: "oklch(0.74 0.19 198 / 0.5)" }}
                    />
                    <Input
                      id="login-username"
                      data-ocid="login.username_input"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter username"
                      autoComplete="username"
                      className="pl-10 h-11 font-mono text-sm"
                      style={{
                        background: "oklch(0.16 0.02 258 / 0.8)",
                        border: "1px solid oklch(0.74 0.19 198 / 0.2)",
                        color: "oklch(0.92 0.02 210)",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="text-[11px] font-mono uppercase tracking-widest"
                    style={{ color: "oklch(0.65 0.01 240 / 0.7)" }}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                      style={{ color: "oklch(0.74 0.19 198 / 0.5)" }}
                    />
                    <Input
                      id="login-password"
                      data-ocid="login.password_input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="pl-10 pr-10 h-11 font-mono text-sm"
                      style={{
                        background: "oklch(0.16 0.02 258 / 0.8)",
                        border: "1px solid oklch(0.74 0.19 198 / 0.2)",
                        color: "oklch(0.92 0.02 210)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="login.error_state"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                    style={{
                      background: "oklch(0.45 0.2 25 / 0.15)",
                      border: "1px solid oklch(0.55 0.2 25 / 0.35)",
                    }}
                  >
                    <AlertCircle
                      className="h-4 w-4 shrink-0"
                      style={{ color: "oklch(0.7 0.2 25)" }}
                    />
                    <p
                      className="text-[12px] font-mono"
                      style={{ color: "oklch(0.78 0.15 25)" }}
                    >
                      {error}
                    </p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  data-ocid="login.submit_button"
                  disabled={isLoading || !username || !password}
                  className="w-full h-11 font-mono text-[12px] tracking-[0.15em] uppercase font-semibold mt-2 transition-all duration-300"
                  style={{
                    background: isLoading
                      ? "oklch(0.74 0.19 198 / 0.08)"
                      : "oklch(0.74 0.19 198 / 0.15)",
                    border: "1px solid oklch(0.74 0.19 198 / 0.4)",
                    color: "oklch(0.74 0.19 198)",
                    boxShadow: isLoading
                      ? "none"
                      : "0 0 20px oklch(0.74 0.19 198 / 0.15)",
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 border-2 border-current border-r-transparent rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    "Access System"
                  )}
                </Button>
              </form>

              <p
                className="text-center text-[10px] font-mono mt-5"
                style={{ color: "oklch(0.4 0.01 240 / 0.6)" }}
              >
                Authorized personnel only · All access is logged
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
