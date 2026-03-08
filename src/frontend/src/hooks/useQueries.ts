import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContextFragment,
  Decision,
  Project,
  UserProfile,
  UserRole,
} from "../backend.d";
import { useActor } from "./useActor";

// ── Project Queries ───────────────────────────────────────────────

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProject(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Project | null>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      tags,
    }: {
      id: string;
      name: string;
      description: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProject(id, name, description, tags);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ── Decision Queries ──────────────────────────────────────────────

export function useGetProjectDecisions(projectId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Decision[]>({
    queryKey: ["decisions", projectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjectDecisions(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useGetHighImpactDecisions(projectId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Decision[]>({
    queryKey: ["high-impact-decisions", projectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHighImpactDecisions(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useGetProjectTags(projectId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["tags", projectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjectTags(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useCreateDecision() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      projectId,
      title,
      reasoning,
      outcome,
      tags,
      importance,
    }: {
      id: string;
      projectId: string;
      title: string;
      reasoning: string;
      outcome: string;
      tags: string[];
      importance: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createDecision(
        id,
        projectId,
        title,
        reasoning,
        outcome,
        tags,
        importance,
      );
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["decisions", variables.projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["high-impact-decisions", variables.projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["tags", variables.projectId],
      });
    },
  });
}

export function useDeleteDecision() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      projectId: _projectId,
    }: {
      id: string;
      projectId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteDecision(id);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["decisions", variables.projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["high-impact-decisions", variables.projectId],
      });
    },
  });
}

export function useSearchDecisions(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Decision[]>({
    queryKey: ["search-decisions", keyword],
    queryFn: async () => {
      if (!actor || !keyword) return [];
      return actor.searchDecisions(keyword);
    },
    enabled: !!actor && !isFetching && keyword.length > 0,
  });
}

// ── Context Fragment Queries ──────────────────────────────────────

export function useGetDecisionFragments(decisionId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ContextFragment[]>({
    queryKey: ["fragments", decisionId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDecisionContextFragments(decisionId);
    },
    enabled: !!actor && !isFetching && !!decisionId,
  });
}

export function useCreateFragment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      decisionId,
      projectId,
      content,
    }: {
      id: string;
      decisionId: string;
      projectId: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createContextFragment(id, decisionId, projectId, content);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["fragments", variables.decisionId],
      });
    },
  });
}

export function useDeleteFragment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      decisionId: _decisionId,
    }: {
      id: string;
      decisionId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContextFragment(id);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["fragments", variables.decisionId],
      });
    },
  });
}

// ── User Queries ──────────────────────────────────────────────────

export function useGetUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["user-role"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}
