import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  GitMerge,
  Loader2,
  MessageSquare,
  Plus,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Decision } from "../backend.d";
import {
  useCreateFragment,
  useDeleteDecision,
  useDeleteFragment,
  useGetDecisionFragments,
} from "../hooks/useQueries";

function formatTime(bigintTime: bigint): string {
  const ms = Number(bigintTime) / 1_000_000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StarRating({ value }: { value: bigint }) {
  const num = Number(value);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= num ? "star-filled fill-current" : "star-empty"}`}
        />
      ))}
    </div>
  );
}

function ContextFragmentItem({
  id,
  content,
  createdAt,
  decisionId,
  index,
}: {
  id: string;
  content: string;
  createdAt: bigint;
  decisionId: string;
  index: number;
}) {
  const deleteFragment = useDeleteFragment();

  const handleDelete = async () => {
    try {
      await deleteFragment.mutateAsync({ id, decisionId });
      toast.success("Fragment removed");
    } catch {
      toast.error("Failed to remove fragment");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-border/40 group"
    >
      <GitMerge className="h-3.5 w-3.5 text-primary/50 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground/90 leading-relaxed">{content}</p>
        <p className="text-[11px] text-muted-foreground font-mono mt-1">
          {formatTime(createdAt)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={deleteFragment.isPending}
        className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        {deleteFragment.isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Trash2 className="h-3 w-3" />
        )}
      </Button>
    </motion.div>
  );
}

interface DecisionCardProps {
  decision: Decision;
  index: number;
  isAdmin: boolean;
  activeTag: string | null;
}

export function DecisionCard({
  decision,
  index,
  isAdmin,
  activeTag,
}: DecisionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [fragmentContent, setFragmentContent] = useState("");
  const [addingFragment, setAddingFragment] = useState(false);

  const { data: fragments, isLoading: fragmentsLoading } =
    useGetDecisionFragments(expanded ? decision.id : "");
  const createFragment = useCreateFragment();
  const deleteDecision = useDeleteDecision();

  const isHighlighted = activeTag !== null && decision.tags.includes(activeTag);

  const handleAddFragment = async () => {
    if (!fragmentContent.trim()) return;
    try {
      await createFragment.mutateAsync({
        id: crypto.randomUUID(),
        decisionId: decision.id,
        projectId: decision.projectId,
        content: fragmentContent.trim(),
      });
      toast.success("Context fragment added");
      setFragmentContent("");
      setAddingFragment(false);
    } catch {
      toast.error("Failed to add fragment");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDecision.mutateAsync({
        id: decision.id,
        projectId: decision.projectId,
      });
      toast.success("Decision deleted");
    } catch {
      toast.error("Failed to delete decision");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className={`timeline-line pl-7 pb-6 relative ${index === 0 ? "pt-0" : "pt-2"}`}
      data-ocid={`project.decision_item.${index + 1}`}
    >
      {/* Timeline dot — glowing */}
      <div
        className={`absolute left-0 top-3.5 h-3 w-3 rounded-full -translate-x-[5px] transition-all duration-300 ${
          isHighlighted ? "scale-125" : ""
        }`}
        style={{
          background: isHighlighted
            ? "oklch(0.74 0.19 198)"
            : "oklch(0.12 0.015 258)",
          border: `2px solid ${isHighlighted ? "oklch(0.74 0.19 198)" : "oklch(0.74 0.19 198 / 0.45)"}`,
          boxShadow: isHighlighted
            ? "0 0 12px oklch(0.74 0.19 198 / 0.7), 0 0 24px oklch(0.74 0.19 198 / 0.3)"
            : "0 0 6px oklch(0.74 0.19 198 / 0.2)",
        }}
      />

      <div
        className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${
          isHighlighted ? "pulse-glow" : ""
        }`}
        style={
          isHighlighted
            ? {
                borderColor: "oklch(0.74 0.19 198 / 0.5)",
              }
            : {}
        }
      >
        {/* Decision Header */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <StarRating value={decision.importance} />
                <div className="flex gap-1 flex-wrap">
                  {decision.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-[11px] py-0.5 font-mono transition-all ${
                        activeTag === tag
                          ? "border-primary/70 text-primary bg-primary/10"
                          : "border-primary/20 text-primary/60"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <h3 className="font-display font-semibold text-base text-foreground mb-1 line-clamp-2">
                {decision.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {decision.reasoning}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {isAdmin && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      data-ocid={`decision.delete_button.${index + 1}`}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-panel border-primary/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-display">
                        Delete Decision?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        This will permanently remove this decision and all its
                        context fragments. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-border/50 hover:bg-muted/50">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive/20 border border-destructive/40 text-destructive hover:bg-destructive/30"
                      >
                        {deleteDecision.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpanded((v) => !v)}
                data-ocid={`decision.toggle.${index + 1}`}
                className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                {expanded ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(decision.createdAt)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {decision.createdBy.toString().slice(0, 12)}...
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-border/40 pt-4 space-y-4">
                {/* Full reasoning */}
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Full Reasoning
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {decision.reasoning}
                  </p>
                </div>

                {/* Outcome */}
                {decision.outcome && (
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Outcome
                    </p>
                    <div className="outcome-callout rounded-lg p-3.5">
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {decision.outcome}
                      </p>
                    </div>
                  </div>
                )}

                {/* Context Fragments */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Context Fragments
                      {fragments && (
                        <span className="text-primary ml-1">
                          ({fragments.length})
                        </span>
                      )}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAddingFragment((v) => !v)}
                      data-ocid={`decision.secondary_button.${index + 1}`}
                      className="h-6 text-[11px] text-primary hover:bg-primary/10 px-2"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>

                  {fragmentsLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full skeleton-shimmer rounded-lg" />
                      <Skeleton className="h-12 w-full skeleton-shimmer rounded-lg" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {fragments?.map((fragment, fIdx) => (
                        <ContextFragmentItem
                          key={fragment.id}
                          id={fragment.id}
                          content={fragment.content}
                          createdAt={fragment.createdAt}
                          decisionId={decision.id}
                          index={fIdx}
                        />
                      ))}
                      {(!fragments || fragments.length === 0) &&
                        !addingFragment && (
                          <p className="text-xs text-muted-foreground italic py-2">
                            No context fragments yet. Add supporting evidence,
                            notes, or quotes.
                          </p>
                        )}
                    </div>
                  )}

                  {/* Add Fragment Form */}
                  <AnimatePresence>
                    {addingFragment && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 space-y-2 overflow-hidden"
                      >
                        <Textarea
                          data-ocid="fragment.input"
                          value={fragmentContent}
                          onChange={(e) => setFragmentContent(e.target.value)}
                          placeholder="Paste a Slack message, meeting note, or supporting evidence..."
                          rows={3}
                          className="bg-input/50 border-border/60 focus:border-primary/60 resize-none text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleAddFragment}
                            disabled={
                              createFragment.isPending ||
                              !fragmentContent.trim()
                            }
                            data-ocid="fragment.submit_button"
                            className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 text-xs"
                          >
                            {createFragment.isPending ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : null}
                            Save Fragment
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setAddingFragment(false);
                              setFragmentContent("");
                            }}
                            className="text-muted-foreground text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
