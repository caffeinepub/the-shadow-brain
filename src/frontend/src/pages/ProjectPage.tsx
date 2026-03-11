import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  ClipboardList,
  Clock,
  ExternalLink,
  Filter,
  GitBranch,
  Plus,
  Search,
  Star,
  Tag,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { DecisionCard } from "../components/DecisionCard";
import { KeywordLogicDialog } from "../components/KeywordLogicDialog";
import { NewDecisionModal } from "../components/NewDecisionModal";
import { useAppContext } from "../context/AppContext";
import {
  type SeedProject,
  seedDecisionsByProject,
  seedProjects,
} from "../data/seedData";
import {
  useGetProject,
  useGetProjectDecisions,
  useGetProjectTags,
  useIsAdmin,
} from "../hooks/useQueries";

function SatisfactionStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className="h-3.5 w-3.5"
            style={{
              color:
                n <= full
                  ? "oklch(0.82 0.18 80)"
                  : partial > 0 && n === full + 1
                    ? "oklch(0.82 0.18 80 / 0.5)"
                    : "oklch(0.4 0.01 240 / 0.4)",
              fill: n <= full ? "oklch(0.82 0.18 80)" : "transparent",
            }}
          />
        ))}
      </div>
      <span
        className="text-[12px] font-mono font-semibold"
        style={{ color: "oklch(0.82 0.18 80)" }}
      >
        {rating}
      </span>
    </div>
  );
}

export function ProjectPage() {
  const { id } = useParams({ from: "/project/$id" });
  const { incognito } = useAppContext();
  const [newDecisionOpen, setNewDecisionOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dialogTag, setDialogTag] = useState<string | null>(null);

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

  const projectSeedDecisions = seedDecisionsByProject[id] || [];

  const displayDecisions =
    !decisionsLoading && (!decisions || decisions.length === 0)
      ? filteredDecisions.length === 0 && !search && !activeTag
        ? projectSeedDecisions
        : filteredDecisions
      : filteredDecisions;

  const seedTagsForProject = Array.from(
    new Set(projectSeedDecisions.flatMap((d) => d.tags)),
  );
  const allTags =
    tags && tags.length > 0
      ? tags
      : !decisionsLoading && (!decisions || decisions.length === 0)
        ? seedTagsForProject
        : tags || [];

  const allProjectDecisions =
    !decisionsLoading && (!decisions || decisions.length === 0)
      ? projectSeedDecisions
      : [...(decisions || []), ...projectSeedDecisions];

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

  const displayProject =
    project ||
    (seedProjects.find((p) => p.id === id) as SeedProject | undefined) ||
    seedProjects[0];

  // Previous client projects (same client or same industry)
  const currentSeedProject = seedProjects.find((p) => p.id === id);
  const previousClientProjects = currentSeedProject
    ? seedProjects.filter(
        (p) =>
          p.id !== id &&
          (p.clientName === currentSeedProject.clientName ||
            p.clientIndustry === currentSeedProject.clientIndustry),
      )
    : [];

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
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Keyword Pulse */}
          <div
            className="glass-panel rounded-xl overflow-hidden sticky top-24"
            data-ocid="project.keyword_panel"
          >
            {/* Panel image */}
            <div className="relative h-20 overflow-hidden">
              <img
                src="/assets/generated/feature-keyword-pulse.dim_600x400.jpg"
                alt=""
                className="w-full h-full object-cover"
                style={{ opacity: 0.45, filter: "saturate(1.4)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, oklch(0 0 0 / 0.1) 0%, oklch(0.12 0.02 258 / 0.9) 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-end pb-3 px-4">
                <div className="flex items-center gap-2">
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
                      className="h-5 w-5 ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-[10px] text-muted-foreground mb-3 font-mono">
                Click a tag to filter ·{" "}
                <span style={{ color: "oklch(0.74 0.19 198 / 0.7)" }}>
                  hover to preview full history
                </span>
              </p>

              {allTags.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  No tags yet
                </p>
              ) : (
                <ScrollArea className="max-h-56">
                  <div className="flex flex-col gap-1">
                    {allTags.map((tag) => {
                      const count = allProjectDecisions.filter((d) =>
                        d.tags.includes(tag),
                      ).length;
                      return (
                        <div key={tag} className="flex gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveTag((prev) =>
                                prev === tag ? null : tag,
                              )
                            }
                            data-ocid="project.keyword_tab"
                            className={`flex-1 text-left px-3 py-2 rounded-lg text-[12px] font-mono transition-all duration-200 flex items-center gap-2 ${
                              activeTag === tag
                                ? "pulse-glow"
                                : "hover:bg-primary/8 border border-transparent text-muted-foreground hover:text-foreground/80"
                            }`}
                            style={
                              activeTag === tag
                                ? {
                                    background: "oklch(0.74 0.19 198 / 0.12)",
                                    border:
                                      "1px solid oklch(0.74 0.19 198 / 0.4)",
                                    color: "oklch(0.74 0.19 198)",
                                  }
                                : {}
                            }
                          >
                            <div
                              className="h-1.5 w-1.5 rounded-full shrink-0"
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
                            <span className="flex-1 truncate">{tag}</span>
                            {count > 0 && (
                              <span
                                className="ml-auto shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded"
                                style={{
                                  background: "oklch(0.74 0.19 198 / 0.1)",
                                  color: "oklch(0.74 0.19 198 / 0.65)",
                                  border:
                                    "1px solid oklch(0.74 0.19 198 / 0.18)",
                                }}
                              >
                                {count}
                              </span>
                            )}
                          </button>
                          {/* Open full logic dialog */}
                          <button
                            type="button"
                            onClick={() => setDialogTag(tag)}
                            title="View full logic history"
                            data-ocid="project.keyword_dialog_open"
                            className="px-2 rounded-lg transition-all text-muted-foreground hover:text-primary hover:bg-primary/10"
                            style={{ fontSize: "10px" }}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
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
          </div>

          {/* Team Members */}
          {"teamMembers" in displayProject && (
            <div
              className="glass-panel rounded-xl p-4 mt-4"
              data-ocid="project.team_panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <Users
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
                  Team
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {(displayProject as SeedProject).teamMembers.map(
                  (member, i) => (
                    <div
                      key={member.name}
                      className="flex flex-col"
                      data-ocid={`project.team.item.${i + 1}`}
                    >
                      <span className="text-[12px] font-semibold text-foreground leading-snug">
                        {member.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {member.role}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Client Info */}
          {"clientName" in displayProject && (
            <div
              className="glass-panel rounded-xl p-4 mt-4"
              data-ocid="project.client_panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <Building2
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
                  Client
                </span>
              </div>
              <p className="text-[13px] font-semibold text-foreground mb-2 leading-snug">
                {(displayProject as SeedProject).clientName}
              </p>
              <Badge
                variant="outline"
                className="text-[10px] font-mono py-0.5"
                style={{
                  borderColor: "oklch(0.74 0.19 198 / 0.25)",
                  color: "oklch(0.74 0.19 198 / 0.8)",
                  background: "oklch(0.74 0.19 198 / 0.07)",
                }}
              >
                {(displayProject as SeedProject).clientIndustry}
              </Badge>
              {"clientSatisfactionRating" in displayProject && (
                <div
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid oklch(0.74 0.19 198 / 0.1)" }}
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Our Satisfaction Rating
                  </p>
                  <SatisfactionStars
                    rating={
                      (displayProject as SeedProject).clientSatisfactionRating
                    }
                  />
                </div>
              )}
            </div>
          )}

          {/* Client Requirements */}
          {"clientRequirements" in displayProject && (
            <div
              className="glass-panel rounded-xl p-4 mt-4"
              data-ocid="project.requirements_panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList
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
                  Requirements
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {(displayProject as SeedProject).clientRequirements.map(
                  (req, i) => (
                    <li
                      key={req}
                      className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed"
                      data-ocid={`project.requirement.item.${i + 1}`}
                    >
                      <span
                        className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                        style={{ background: "oklch(0.74 0.19 198 / 0.5)" }}
                      />
                      {req}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
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
              className={incognito ? "incognito-blur" : ""}
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

          {/* Previous Work for Client */}
          {previousClientProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Building2
                  className="h-4 w-4"
                  style={{ color: "oklch(0.74 0.19 198)" }}
                />
                <h2 className="font-display text-lg font-semibold">
                  Previous Work
                  {currentSeedProject && (
                    <span className="font-normal text-muted-foreground text-base ml-2">
                      — {currentSeedProject.clientIndustry}
                    </span>
                  )}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previousClientProjects.map((prev, idx) => (
                  <motion.div
                    key={prev.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + idx * 0.07 }}
                    data-ocid={`previous_work.item.${idx + 1}`}
                  >
                    <Link to="/project/$id" params={{ id: prev.id }}>
                      <div
                        className="rounded-xl p-4 h-full transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.14 0.02 258 / 0.9) 0%, oklch(0.12 0.018 265 / 0.95) 100%)",
                          border: "1px solid oklch(0.74 0.19 198 / 0.15)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-display font-semibold text-[13px] text-foreground leading-snug line-clamp-2">
                            {prev.name}
                          </h4>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                          {prev.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-mono py-0"
                              style={{
                                borderColor: "oklch(0.74 0.19 198 / 0.2)",
                                color: "oklch(0.74 0.19 198 / 0.7)",
                              }}
                            >
                              {prev.clientIndustry}
                            </Badge>
                          </div>
                          <div className="flex flex-col items-end gap-0.5">
                            <SatisfactionStars
                              rating={prev.clientSatisfactionRating}
                            />
                            <span className="text-[9px] font-mono text-muted-foreground/50">
                              client satisfaction
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <NewDecisionModal
        open={newDecisionOpen}
        onClose={() => setNewDecisionOpen(false)}
        projectId={id}
      />

      {/* Keyword Logic Dialog */}
      <KeywordLogicDialog
        tag={dialogTag}
        decisions={allProjectDecisions}
        onClose={() => setDialogTag(null)}
      />
    </main>
  );
}
