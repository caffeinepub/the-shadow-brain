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
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateProject } from "../hooks/useQueries";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  const createProject = useCreateProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleClose = () => {
    setName("");
    setDescription("");
    setTags("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await createProject.mutateAsync({
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description.trim(),
        tags: tagList,
      });
      toast.success("Project created");
      handleClose();
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        data-ocid="new_project.modal"
        className="glass-panel border-primary/20 sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-primary" />
            New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Project Name *
            </Label>
            <Input
              data-ocid="new_project.name_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Platform Migration Q1"
              required
              className="bg-input/50 border-border/60 focus:border-primary/60"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Description
            </Label>
            <Textarea
              data-ocid="new_project.description_input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={3}
              className="bg-input/50 border-border/60 focus:border-primary/60 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Tags (comma-separated)
            </Label>
            <Input
              data-ocid="new_project.tags_input"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. infrastructure, security, Q1"
              className="bg-input/50 border-border/60 focus:border-primary/60"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              data-ocid="new_project.cancel_button"
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createProject.isPending || !name.trim()}
              data-ocid="new_project.submit_button"
              className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 hover:border-primary/60"
            >
              {createProject.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
