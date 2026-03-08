import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Principal } from "@icp-sdk/core/principal";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Filter,
  GitBranch,
  Plus,
  Search,
  Tag,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Decision } from "../backend.d";
import { DecisionCard } from "../components/DecisionCard";
import { NewDecisionModal } from "../components/NewDecisionModal";
import { useAppContext } from "../context/AppContext";
import {
  useGetProject,
  useGetProjectDecisions,
  useGetProjectTags,
  useIsAdmin,
} from "../hooks/useQueries";

export function ProjectPage() {
  const { id } = useParams({ from: "/project/$id" });
  const { incognito } = useAppContext();
  const [newDecisionOpen, setNewDecisionOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: project, isLoading: projectLoading } = useGetProject(id);
  const { data: decisions, isLoading: decisionsLoading } =
    useGetProjectDecisions(id);
  const { data: tags } = useGetProjectTags(id);
  const { data: isAdmin } = useIsAdmin();

  const filteredDecisions = (decisions || [])
    .filter((d) => {
      if (activeTag && !d.tags.includes(activeTag)) return false;
      if (
        search &&
        !d.title.toLowerCase().includes(search.toLowerCase()) &&
        !d.reasoning.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

  const anon = {} as unknown as Principal;
  const seedDecisions: Decision[] = [
    {
      id: "sd-1",
      projectId: id,
      title: "Adopted PostgreSQL over MongoDB for primary data store",
      reasoning:
        "We chose PostgreSQL because our data has strong relational properties and we need ACID compliance for financial transactions. MongoDB's eventual consistency model introduced too many edge cases in our payment flow.",
      outcome:
        "Reduced data inconsistency errors by 94% in the first month post-migration. Query performance improved significantly with proper indexing.",
      tags: ["database", "architecture", "performance"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 20 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-2",
      projectId: id,
      title: "Implemented blue-green deployment strategy",
      reasoning:
        "We chose blue-green deployments to eliminate downtime during releases. Our SLA requires 99.9% uptime and we were experiencing 15-minute maintenance windows with our old rolling deployment approach.",
      outcome:
        "Zero-downtime deployments achieved. Rollback time reduced from 45 minutes to under 2 minutes.",
      tags: ["devops", "deployment", "reliability"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 12 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-3",
      projectId: id,
      title: "Selected React Query for server state management",
      reasoning:
        "Redux was adding unnecessary complexity for our data-fetching patterns. React Query's cache invalidation and optimistic updates fit our use-case perfectly and reduced boilerplate by 60%.",
      outcome:
        "Developer velocity improved. New feature implementation time dropped from 2 days to 4 hours on average for data-heavy screens.",
      tags: ["frontend", "architecture", "developer-experience"],
      importance: BigInt(3),
      createdAt: BigInt(Date.now() - 5 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ];

  const displayDecisions =
    !decisionsLoading && (!decisions || decisions.length === 0)
      ? filteredDecisions.length === 0 && !search && !activeTag
        ? seedDecisions
        : filteredDecisions
      : filteredDecisions;

  const allTags =
    tags && tags.length > 0
      ? tags
      : !decisionsLoading && (!decisions || decisions.length === 0)
        ? [
            "database",
            "architecture",
            "performance",
            "devops",
            "deployment",
            "reliability",
            "frontend",
            "developer-experience",
          ]
        : tags || [];

  if (projectLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-32 skeleton-shimmer mb-6 rounded" />
        <Skeleton className="h-24 w-full skeleton-shimmer rounded-xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <Skeleton className="h-64 skeleton-shimmer rounded-xl" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 skeleton-shimmer rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const displayProject = project || {
    id,
    name: "Platform Architecture Overhaul",
    description:
      "Complete re-architecture of the core platform to microservices, addressing scalability bottlenecks that emerged at 10M users.",
    tags: ["infrastructure", "scalability", "microservices"],
    createdAt: BigInt(Date.now() - 30 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/"
          data-ocid="project.back_link"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Projects
        </Link>
      </motion.div>

      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`glass-panel rounded-xl p-6 mb-6 ${incognito ? "incognito-blur" : ""}`}
        data-ocid="project.panel"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1
              className="font-display text-2xl font-bold text-foreground mb-2 text-glow-subtle"
              style={{ letterSpacing: "-0.02em" }}
            >
              {displayProject.name}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 max-w-2xl">
              {displayProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {displayProject.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="font-mono text-xs"
                  style={{
                    borderColor: "oklch(0.74 0.19 198 / 0.28)",
                    color: "oklch(0.74 0.19 198 / 0.85)",
                    background: "oklch(0.74 0.19 198 / 0.07)",
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          {isAdmin && (
            <Button
              onClick={() => setNewDecisionOpen(true)}
              data-ocid="project.add_decision_button"
              size="sm"
              className="shrink-0 font-mono text-[11px] tracking-wider h-9 px-4 rounded-lg transition-all duration-200"
              style={{
                background: "oklch(0.74 0.19 198 / 0.12)",
                border: "1px solid oklch(0.74 0.19 198 / 0.35)",
                color: "oklch(0.74 0.19 198)",
              }}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Record Decision
            </Button>
          )}
        </div>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Keyword Pulse Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="glass-panel rounded-xl p-4 sticky top-24"
            data-ocid="project.keyword_panel"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Tag
                className="h-3.5 w-3.5"
                style={{
                  color: "oklch(0.74 0.19 198)",
                  filter: "drop-shadow(0 0 4px oklch(0.74 0.19 198 / 0.5))",
                }}
              />
              <span
                className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold"
                style={{ color: "oklch(0.74 0.19 198)" }}
              >
                Keyword Pulse
              </span>
              {activeTag && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveTag(null)}
                  data-ocid="project.filter.close_button"
                  className="h-5 w-5 ml-auto text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground mb-3.5 font-mono">
              Click a tag to filter decisions
            </p>

            {allTags.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                No tags yet
              </p>
            ) : (
              <ScrollArea className="max-h-64">
                <div className="flex flex-col gap-1">
                  {allTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() =>
                        setActiveTag((prev) => (prev === tag ? null : tag))
                      }
                      data-ocid="project.keyword_tab"
                      className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-mono transition-all duration-200 flex items-center gap-2 ${
                        activeTag === tag
                          ? "pulse-glow"
                          : "hover:bg-primary/8 border border-transparent text-muted-foreground hover:text-foreground/80"
                      }`}
                      style={
                        activeTag === tag
                          ? {
                              background: "oklch(0.74 0.19 198 / 0.12)",
                              border: "1px solid oklch(0.74 0.19 198 / 0.4)",
                              color: "oklch(0.74 0.19 198)",
                            }
                          : {}
                      }
                    >
                      <div
                        className="h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-200"
                        style={{
                          background:
                            activeTag === tag
                              ? "oklch(0.74 0.19 198)"
                              : "oklch(0.74 0.19 198 / 0.3)",
                          boxShadow:
                            activeTag === tag
                              ? "0 0 6px oklch(0.74 0.19 198 / 0.7)"
                              : "none",
                        }}
                      />
                      {tag}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}

            {activeTag && (
              <div
                className="mt-3 pt-3"
                style={{ borderTop: "1px solid oklch(0.74 0.19 198 / 0.12)" }}
              >
                <div
                  className="flex items-center gap-1.5 text-[11px] font-mono"
                  style={{ color: "oklch(0.74 0.19 198 / 0.9)" }}
                >
                  <Filter className="h-3 w-3" />
                  <span>
                    Filtering: <strong>{activeTag}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Logic History Timeline */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold">
                Logic History
              </h2>
              {decisions && (
                <span className="text-xs font-mono text-muted-foreground">
                  ({filteredDecisions.length} decision
                  {filteredDecisions.length !== 1 ? "s" : ""})
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
              <Clock className="h-3 w-3" />
              Newest First
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="search.input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search decisions..."
              className="pl-9 bg-input/50 border-border/60 focus:border-primary/60 text-sm"
            />
          </div>

          {/* Decisions List */}
          {decisionsLoading ? (
            <div className="space-y-4" data-ocid="project.decision_list">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="h-40 skeleton-shimmer rounded-xl"
                  data-ocid="project.loading_state"
                />
              ))}
            </div>
          ) : displayDecisions.length === 0 ? (
            <div
              className="glass-panel rounded-xl p-10 text-center"
              data-ocid="project.empty_state"
            >
              <GitBranch className="h-10 w-10 text-primary/30 mx-auto mb-4" />
              <h3 className="font-display text-base font-semibold mb-2">
                {activeTag || search
                  ? "No matching decisions"
                  : "No Decisions Yet"}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {activeTag || search
                  ? "Try adjusting your filter or search term"
                  : "Start recording decisions to build your team's Logic History"}
              </p>
              {isAdmin && !activeTag && !search && (
                <Button
                  onClick={() => setNewDecisionOpen(true)}
                  size="sm"
                  className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Record First Decision
                </Button>
              )}
            </div>
          ) : (
            <div
              className={`${incognito ? "incognito-blur" : ""}`}
              data-ocid="project.decision_list"
            >
              {displayDecisions.map((decision, idx) => (
                <DecisionCard
                  key={decision.id}
                  decision={decision}
                  index={idx}
                  isAdmin={isAdmin ?? false}
                  activeTag={activeTag}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <NewDecisionModal
        open={newDecisionOpen}
        onClose={() => setNewDecisionOpen(false)}
        projectId={id}
      />
    </main>
  );
}
