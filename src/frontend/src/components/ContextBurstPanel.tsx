import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { useGetHighImpactDecisions } from "../hooks/useQueries";

interface ContextBurstPanelProps {
  projectId: string;
  visible: boolean;
  positionClass?: string;
}

export function ContextBurstPanel({
  projectId,
  visible,
  positionClass = "top-full left-0 mt-2",
}: ContextBurstPanelProps) {
  const { incognito } = useAppContext();
  const { data: decisions, isLoading } = useGetHighImpactDecisions(projectId);

  if (!visible || incognito) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.96 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`absolute ${positionClass} z-50 w-80`}
        onClick={(e) => e.stopPropagation()}
        data-ocid="context_burst.panel"
      >
        {/* Outer glow ring */}
        <div
          className="rounded-2xl p-px"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.74 0.19 198 / 0.45) 0%, oklch(0.67 0.15 185 / 0.25) 50%, oklch(0.74 0.19 198 / 0.1) 100%)",
            boxShadow:
              "0 0 32px oklch(0.74 0.19 198 / 0.15), 0 16px 48px oklch(0 0 0 / 0.6)",
          }}
        >
          <div
            className="rounded-[15px] p-4 overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.17 0.02 258 / 0.97) 0%, oklch(0.13 0.015 262 / 0.99) 100%)",
              backdropFilter: "blur(32px) saturate(160%)",
              WebkitBackdropFilter: "blur(32px) saturate(160%)",
            }}
          >
            {/* Subtle inner highlight */}
            <div
              className="absolute inset-x-0 top-0 h-px rounded-t-[15px] opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.12), transparent)",
              }}
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="flex items-center justify-center h-6 w-6 rounded-md flex-shrink-0"
                style={{
                  background: "oklch(0.74 0.19 198 / 0.15)",
                  border: "1px solid oklch(0.74 0.19 198 / 0.3)",
                  boxShadow: "0 0 8px oklch(0.74 0.19 198 / 0.2)",
                }}
              >
                <Zap
                  className="h-3.5 w-3.5"
                  style={{
                    color: "oklch(0.74 0.19 198)",
                    filter: "drop-shadow(0 0 4px oklch(0.74 0.19 198 / 0.7))",
                  }}
                  strokeWidth={2}
                />
              </div>
              <span
                className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold"
                style={{ color: "oklch(0.74 0.19 198)" }}
              >
                Context Burst
              </span>
              <div className="ml-auto flex items-center gap-1">
                <TrendingUp
                  className="h-3 w-3 text-muted-foreground/50"
                  strokeWidth={2}
                />
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground font-mono mb-3.5 uppercase tracking-[0.14em]">
              High-Impact Decisions
            </p>

            {isLoading ? (
              <div className="space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-12 w-full skeleton-shimmer rounded-lg"
                  />
                ))}
              </div>
            ) : !decisions || decisions.length === 0 ? (
              <div
                className="py-4 text-center rounded-lg"
                style={{
                  background: "oklch(0.74 0.19 198 / 0.03)",
                  border: "1px dashed oklch(0.74 0.19 198 / 0.15)",
                }}
              >
                <p className="text-muted-foreground text-xs italic">
                  No decisions recorded yet.
                </p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                {decisions.slice(0, 3).map((d, idx) => (
                  <li
                    key={d.id}
                    className="flex gap-2.5 group/item"
                    data-ocid={`context_burst.item.${idx + 1}`}
                  >
                    {/* Numbered badge */}
                    <span className="burst-number flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold text-foreground/95 line-clamp-1 leading-snug">
                        {d.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                        {d.reasoning}
                      </p>
                      {d.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {d.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[9px] py-0 h-[18px] px-1.5 font-mono"
                              style={{
                                borderColor: "oklch(0.74 0.19 198 / 0.22)",
                                color: "oklch(0.74 0.19 198 / 0.75)",
                                background: "oklch(0.74 0.19 198 / 0.06)",
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
