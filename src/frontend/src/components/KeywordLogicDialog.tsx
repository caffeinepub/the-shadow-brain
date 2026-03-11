import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Clock, Star, Tag, X } from "lucide-react";
import { motion } from "motion/react";
import type { Decision } from "../backend.d";
import type { SeedDecision } from "../data/seedData";

type AnyDecision = Decision | SeedDecision;

function StarRating({ value }: { value: bigint }) {
  const num = Number(value);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= num ? "fill-current" : "opacity-25"}`}
          style={{ color: "oklch(0.82 0.18 80)" }}
        />
      ))}
      <span
        className="ml-1 text-[11px] font-mono"
        style={{ color: "oklch(0.82 0.18 80 / 0.8)" }}
      >
        {num}/5
      </span>
    </div>
  );
}

interface KeywordLogicDialogProps {
  tag: string | null;
  decisions: AnyDecision[];
  onClose: () => void;
}

export function KeywordLogicDialog({
  tag,
  decisions,
  onClose,
}: KeywordLogicDialogProps) {
  if (!tag) return null;
  const tagDecisions = decisions.filter((d) => d.tags.includes(tag));

  return (
    <Dialog
      open={!!tag}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        data-ocid="keyword_dialog.panel"
        className="max-w-3xl w-full p-0 overflow-hidden"
        style={{
          background: "oklch(0.10 0.018 260 / 0.98)",
          border: "1px solid oklch(0.74 0.19 198 / 0.25)",
          backdropFilter: "blur(40px)",
          boxShadow:
            "0 0 80px oklch(0.74 0.19 198 / 0.08), 0 32px 80px oklch(0 0 0 / 0.7)",
          maxHeight: "85vh",
        }}
      >
        {/* Image banner */}
        <div className="relative h-28 overflow-hidden">
          <img
            src="/assets/generated/feature-keyword-pulse.dim_600x400.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.45, filter: "saturate(1.3)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0 0 0 / 0.1) 0%, oklch(0.10 0.018 260 / 0.9) 100%)",
            }}
          />
          <div className="absolute inset-0 flex items-end pb-4 px-6">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "oklch(0.74 0.19 198 / 0.15)",
                  border: "1px solid oklch(0.74 0.19 198 / 0.35)",
                  boxShadow: "0 0 12px oklch(0.74 0.19 198 / 0.3)",
                }}
              >
                <Tag
                  className="h-4 w-4"
                  style={{
                    color: "oklch(0.74 0.19 198)",
                    filter: "drop-shadow(0 0 4px oklch(0.74 0.19 198 / 0.8))",
                  }}
                />
              </div>
              <div>
                <DialogHeader className="p-0">
                  <DialogTitle
                    className="font-mono text-lg font-bold leading-none"
                    style={{ color: "oklch(0.74 0.19 198)" }}
                  >
                    #{tag}
                  </DialogTitle>
                </DialogHeader>
                <p
                  className="text-[11px] font-mono mt-0.5"
                  style={{ color: "oklch(0.65 0.01 240 / 0.7)" }}
                >
                  {tagDecisions.length} decision
                  {tagDecisions.length !== 1 ? "s" : ""} in logic history
                </p>
              </div>
            </div>
          </div>
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            data-ocid="keyword_dialog.close_button"
            className="absolute top-3 right-3 p-1.5 rounded-lg transition-all"
            style={{
              background: "oklch(0.18 0.02 258 / 0.8)",
              border: "1px solid oklch(0.74 0.19 198 / 0.2)",
              color: "oklch(0.7 0.01 240)",
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Decisions list */}
        <ScrollArea className="max-h-[calc(85vh-7rem)]">
          <div className="p-6 space-y-5">
            {tagDecisions.length === 0 ? (
              <div className="py-12 text-center">
                <BookOpen
                  className="h-10 w-10 mx-auto mb-3"
                  style={{ color: "oklch(0.74 0.19 198 / 0.3)" }}
                />
                <p
                  className="font-mono text-sm"
                  style={{ color: "oklch(0.55 0.01 240 / 0.7)" }}
                >
                  No decisions recorded for this keyword yet.
                </p>
              </div>
            ) : (
              tagDecisions.map((decision, idx) => (
                <motion.div
                  key={decision.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  data-ocid={`keyword_dialog.decision.item.${idx + 1}`}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.15 0.02 258 / 0.9) 0%, oklch(0.13 0.018 265 / 0.95) 100%)",
                    border: "1px solid oklch(0.74 0.19 198 / 0.15)",
                  }}
                >
                  {/* Decision header */}
                  <div
                    className="px-5 py-4"
                    style={{
                      borderBottom: "1px solid oklch(0.74 0.19 198 / 0.1)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div
                        className="flex items-center justify-center h-6 w-6 rounded-md shrink-0 font-mono text-[11px] font-bold"
                        style={{
                          background: "oklch(0.74 0.19 198 / 0.12)",
                          border: "1px solid oklch(0.74 0.19 198 / 0.3)",
                          color: "oklch(0.74 0.19 198)",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <h3
                        className="flex-1 font-display font-semibold text-base leading-snug"
                        style={{ color: "oklch(0.92 0.02 210)" }}
                      >
                        {decision.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 ml-9">
                      <StarRating value={decision.importance} />
                      <div className="flex gap-1 flex-wrap">
                        {decision.tags.map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className={`text-[10px] py-0 h-5 font-mono ${
                              t === tag
                                ? "border-primary/60 text-primary bg-primary/12"
                                : "border-primary/15 text-primary/50"
                            }`}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="px-5 py-4 space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div
                          className="h-1 w-4 rounded-full"
                          style={{ background: "oklch(0.74 0.19 198 / 0.6)" }}
                        />
                        <span
                          className="text-[10px] font-mono uppercase tracking-[0.18em] font-semibold"
                          style={{ color: "oklch(0.74 0.19 198 / 0.7)" }}
                        >
                          Reasoning
                        </span>
                      </div>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{ color: "oklch(0.82 0.015 240 / 0.9)" }}
                      >
                        {decision.reasoning}
                      </p>
                    </div>

                    {decision.outcome && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <div
                            className="h-1 w-4 rounded-full"
                            style={{ background: "oklch(0.65 0.18 150 / 0.6)" }}
                          />
                          <span
                            className="text-[10px] font-mono uppercase tracking-[0.18em] font-semibold"
                            style={{ color: "oklch(0.65 0.18 150 / 0.8)" }}
                          >
                            Outcome
                          </span>
                        </div>
                        <div
                          className="rounded-lg px-4 py-3"
                          style={{
                            background: "oklch(0.65 0.18 150 / 0.06)",
                            border: "1px solid oklch(0.65 0.18 150 / 0.2)",
                          }}
                        >
                          <p
                            className="text-[13px] leading-relaxed"
                            style={{ color: "oklch(0.78 0.12 150 / 0.9)" }}
                          >
                            {decision.outcome}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 pt-1">
                      <Clock
                        className="h-3 w-3"
                        style={{ color: "oklch(0.5 0.01 240 / 0.6)" }}
                      />
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "oklch(0.5 0.01 240 / 0.6)" }}
                      >
                        {new Date(
                          Number(decision.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
