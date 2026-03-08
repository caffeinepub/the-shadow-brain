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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetUserProfile, useSaveUserProfile } from "../hooks/useQueries";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { data: profile } = useGetUserProfile();
  const saveProfile = useSaveUserProfile();
  const [name, setName] = useState("");

  useEffect(() => {
    if (profile?.name) setName(profile.name);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      toast.success("Profile saved");
      onClose();
    } catch {
      toast.error("Failed to save profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-ocid="profile.modal"
        className="glass-panel border-primary/20 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="profile-name"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
            >
              Display Name
            </Label>
            <Input
              id="profile-name"
              data-ocid="profile.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-input/50 border-border/60 focus:border-primary/60 font-body"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              data-ocid="profile.cancel_button"
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saveProfile.isPending}
              data-ocid="profile.submit_button"
              className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30"
            >
              {saveProfile.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
