import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GitBranch, Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateDecision } from "../hooks/useQueries";

interface NewDecisionModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export function NewDecisionModal({
  open,
  onClose,
  projectId,
}: NewDecisionModalProps) {
  const createDecision = useCreateDecision();
  const [title, setTitle] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [outcome, setOutcome] = useState("");
  const [tags, setTags] = useState("");
  const [importance, setImportance] = useState("3");

  const handleClose = () => {
    setTitle("");
    setReasoning("");
    setOutcome("");
    setTags("");
    setImportance("3");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !reasoning.trim()) return;

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await createDecision.mutateAsync({
        id: crypto.randomUUID(),
        projectId,
        title: title.trim(),
        reasoning: reasoning.trim(),
        outcome: outcome.trim(),
        tags: tagList,
        importance: BigInt(importance),
      });
      toast.success("Decision recorded");
      handleClose();
    } catch {
      toast.error("Failed to record decision");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        data-ocid="new_decision.modal"
        className="glass-panel border-primary/20 sm:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Record Decision
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Decision Title *
            </Label>
            <Input
              data-ocid="new_decision.title_input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chose PostgreSQL over MongoDB"
              required
              className="bg-input/50 border-border/60 focus:border-primary/60"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Reasoning * (The "Why")
            </Label>
            <Textarea
              data-ocid="new_decision.reasoning_textarea"
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="We chose X because Y... What factors drove this decision?"
              required
              rows={4}
              className="bg-input/50 border-border/60 focus:border-primary/60 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Outcome / Result
            </Label>
            <Textarea
              data-ocid="new_decision.outcome_textarea"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="What was the result? What changed?"
              rows={2}
              className="bg-input/50 border-border/60 focus:border-primary/60 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Tags
              </Label>
              <Input
                data-ocid="new_decision.tags_input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="database, backend, Q1"
                className="bg-input/50 border-border/60 focus:border-primary/60"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3" />
                Importance (1–5)
              </Label>
              <Select value={importance} onValueChange={setImportance}>
                <SelectTrigger
                  data-ocid="new_decision.importance_select"
                  className="bg-input/50 border-border/60 focus:border-primary/60"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border-primary/20">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem
                      key={n}
                      value={String(n)}
                      className="focus:bg-primary/10"
                    >
                      {"★".repeat(n)}
                      {"☆".repeat(5 - n)} —{" "}
                      {n === 1
                        ? "Low"
                        : n === 2
                          ? "Minor"
                          : n === 3
                            ? "Medium"
                            : n === 4
                              ? "High"
                              : "Critical"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              data-ocid="new_decision.cancel_button"
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                createDecision.isPending || !title.trim() || !reasoning.trim()
              }
              data-ocid="new_decision.submit_button"
              className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 hover:border-primary/60"
            >
              {createDecision.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Record Decision
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
