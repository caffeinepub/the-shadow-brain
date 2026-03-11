import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";
import {
  BrainCircuit,
  ChevronDown,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  Shield,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetUserProfile, useIsAdmin } from "../hooks/useQueries";
import { ProfileModal } from "./ProfileModal";

export function Header() {
  const { incognito, toggleIncognito, localLogout } = useAppContext();
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: profile } = useGetUserProfile();
  const { data: isAdmin } = useIsAdmin();
  const [profileOpen, setProfileOpen] = useState(false);

  const isLoggedIn = !!identity;
  const displayName = profile?.name || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Main header bar */}
        <div
          className="glass-panel"
          style={{
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            borderBottom: "1px solid oklch(0.74 0.19 198 / 0.12)",
            borderRadius: 0,
          }}
        >
          <div className="container mx-auto flex h-[60px] items-center justify-between px-4 lg:px-6">
            {/* Logo */}
            <Link to="/" data-ocid="nav.dashboard_link">
              <motion.div
                className="flex items-center gap-3 cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Icon with layered glow */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-lg bg-primary/15 blur-lg group-hover:bg-primary/25 transition-all duration-500" />
                  <div
                    className="relative h-9 w-9 rounded-lg border border-primary/25 bg-primary/8 flex items-center justify-center group-hover:border-primary/45 transition-all duration-300"
                    style={{ background: "oklch(0.74 0.19 198 / 0.08)" }}
                  >
                    <BrainCircuit
                      className="h-5 w-5 text-primary"
                      strokeWidth={1.5}
                      style={{
                        filter:
                          "drop-shadow(0 0 6px oklch(0.74 0.19 198 / 0.6))",
                      }}
                    />
                  </div>
                </div>

                {/* Brand text */}
                <div className="flex flex-col">
                  <span
                    className="font-display font-bold text-[15px] leading-none tracking-tight text-foreground group-hover:text-glow-subtle transition-all duration-300"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    The Shadow Brain
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] uppercase mt-0.5 opacity-70">
                    Context Engine
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Right Controls */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              {/* Incognito Toggle */}
              <div
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-300"
                style={{
                  background: incognito
                    ? "oklch(0.72 0.15 65 / 0.08)"
                    : "oklch(0.74 0.19 198 / 0.05)",
                  border: `1px solid ${incognito ? "oklch(0.72 0.15 65 / 0.3)" : "oklch(0.74 0.19 198 / 0.12)"}`,
                }}
              >
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-mono tracking-wider transition-all duration-300 ${
                    incognito ? "text-amber-400" : "text-muted-foreground"
                  }`}
                >
                  {incognito ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline uppercase">
                    {incognito ? "Paused" : "Active"}
                  </span>
                </div>
                <Switch
                  checked={incognito}
                  onCheckedChange={toggleIncognito}
                  data-ocid="nav.incognito_toggle"
                  className="scale-[0.7] data-[state=checked]:bg-amber-500"
                />
              </div>

              {/* Separator */}
              <div className="h-5 w-px bg-border/50 hidden sm:block" />

              {/* Auth */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      data-ocid="nav.user_dropdown"
                      className="flex items-center gap-2 h-9 px-2.5 rounded-lg hover:bg-primary/8 border border-transparent hover:border-primary/20 transition-all duration-200"
                      style={{ background: "oklch(0.74 0.19 198 / 0.04)" }}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback
                          className="text-[10px] font-mono font-semibold border"
                          style={{
                            background: "oklch(0.74 0.19 198 / 0.15)",
                            borderColor: "oklch(0.74 0.19 198 / 0.3)",
                            color: "oklch(0.74 0.19 198)",
                          }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium text-foreground/90">
                        {displayName}
                      </span>
                      {isAdmin && (
                        <Badge
                          variant="outline"
                          className="text-[9px] py-0 px-1.5 h-4 hidden sm:flex items-center gap-0.5 font-mono"
                          style={{
                            borderColor: "oklch(0.74 0.19 198 / 0.35)",
                            color: "oklch(0.74 0.19 198)",
                            background: "oklch(0.74 0.19 198 / 0.08)",
                          }}
                        >
                          <Shield className="h-2 w-2" />
                          ADMIN
                        </Badge>
                      )}
                      <ChevronDown className="h-3 w-3 text-muted-foreground/70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="glass-panel-elevated min-w-[160px] rounded-xl p-1"
                    style={{
                      borderColor: "oklch(0.74 0.19 198 / 0.18)",
                    }}
                  >
                    <DropdownMenuItem
                      onClick={() => setProfileOpen(true)}
                      data-ocid="nav.profile_button"
                      className="cursor-pointer rounded-lg text-sm gap-2 hover:bg-primary/10 focus:bg-primary/10"
                    >
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-border/40" />
                    <DropdownMenuItem
                      onClick={() => {
                        clear();
                        localLogout();
                      }}
                      data-ocid="nav.logout_button"
                      className="cursor-pointer rounded-lg text-sm gap-2 text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={login}
                  disabled={isLoggingIn}
                  data-ocid="nav.login_button"
                  size="sm"
                  className="h-9 px-4 rounded-lg font-mono text-[11px] tracking-[0.12em] uppercase font-semibold transition-all duration-200"
                  style={{
                    background: "oklch(0.74 0.19 198 / 0.12)",
                    border: "1px solid oklch(0.74 0.19 198 / 0.35)",
                    color: "oklch(0.74 0.19 198)",
                    boxShadow: "0 0 12px oklch(0.74 0.19 198 / 0.1)",
                  }}
                >
                  {isLoggingIn ? (
                    <span className="animate-pulse">Connecting…</span>
                  ) : (
                    <>
                      <LogIn className="h-3.5 w-3.5 mr-1.5" />
                      Login
                    </>
                  )}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Gradient bottom border */}
          <div className="header-border w-full" />
        </div>

        {/* Incognito Banner */}
        <AnimatePresence>
          {incognito && (
            <motion.div
              key="incognito-banner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="incognito-banner overflow-hidden"
              style={{
                background: "oklch(0.72 0.15 65 / 0.08)",
                borderBottom: "1px solid oklch(0.72 0.15 65 / 0.25)",
              }}
            >
              <div className="container mx-auto px-4 py-1.5 flex items-center justify-center gap-2">
                <EyeOff className="h-3 w-3 text-amber-400" />
                <span className="text-amber-400/90 text-[11px] font-mono tracking-[0.15em] uppercase">
                  Incognito Mode Active — Listening Paused
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
