import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Principal } from "@icp-sdk/core/principal";
import { Link } from "@tanstack/react-router";
import { Brain, Clock, FolderOpen, Layers, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Project } from "../backend.d";
import { ContextBurstPanel } from "../components/ContextBurstPanel";
import { NewProjectModal } from "../components/NewProjectModal";
import { useAppContext } from "../context/AppContext";
import { useGetAllProjects } from "../hooks/useQueries";
import { useIsAdmin } from "../hooks/useQueries";

function formatTime(bigintTime: bigint): string {
  const ms = Number(bigintTime) / 1_000_000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ProjectCard({
  project,
  index,
  isIncognito,
}: {
  project: Project;
  index: number;
  isIncognito: boolean;
}) {
  const [showBurst, setShowBurst] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="relative"
      onMouseEnter={() => !isIncognito && setShowBurst(true)}
      onMouseLeave={() => setShowBurst(false)}
      data-ocid={`dashboard.project_card.${index + 1}`}
    >
      <Link to="/project/$id" params={{ id: project.id }}>
        <div
          className={`glass-panel glass-panel-hover rounded-xl p-5 h-full cursor-pointer flex flex-col ${isIncognito ? "incognito-blur" : ""}`}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between mb-3">
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{
                background: "oklch(0.74 0.19 198 / 0.1)",
                border: "1px solid oklch(0.74 0.19 198 / 0.2)",
              }}
            >
              <FolderOpen
                className="h-4 w-4"
                style={{
                  color: "oklch(0.74 0.19 198)",
                  filter: "drop-shadow(0 0 4px oklch(0.74 0.19 198 / 0.5))",
                }}
              />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
              <Clock className="h-3 w-3" />
              {formatTime(project.createdAt)}
            </div>
          </div>

          {/* Name + Description */}
          <h3
            className="font-display font-semibold text-[15px] text-foreground mb-1.5 line-clamp-1 leading-snug"
            style={{ letterSpacing: "-0.015em" }}
          >
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">
            {project.description || "No description provided."}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[11px] py-0.5 font-mono"
                  style={{
                    borderColor: "oklch(0.74 0.19 198 / 0.22)",
                    color: "oklch(0.74 0.19 198 / 0.8)",
                    background: "oklch(0.74 0.19 198 / 0.06)",
                  }}
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-[11px] py-0.5 border-muted-foreground/25 text-muted-foreground"
                >
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid oklch(0.74 0.19 198 / 0.1)" }}
          >
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground group-hover:text-primary/70 transition-colors">
              <Layers
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.74 0.19 198 / 0.55)" }}
              />
              <span className="font-mono">View Logic History</span>
            </div>
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{
                background: "oklch(0.74 0.19 198 / 0.7)",
                boxShadow: "0 0 6px oklch(0.74 0.19 198 / 0.6)",
              }}
            />
          </div>
        </div>
      </Link>

      {/* Context Burst */}
      <ContextBurstPanel
        projectId={project.id}
        visible={showBurst}
        positionClass="top-full left-0 mt-2 w-80"
      />
    </motion.div>
  );
}

export function DashboardPage() {
  const { incognito } = useAppContext();
  const { data: projects, isLoading } = useGetAllProjects();
  const { data: isAdmin } = useIsAdmin();
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = (projects || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  const anon = {} as unknown as Principal;
  const seedProjects: Project[] = [
    {
      id: "seed-1",
      name: "Platform Architecture Overhaul",
      description:
        "Complete re-architecture of the core platform to microservices, addressing scalability bottlenecks that emerged at 10M users.",
      tags: ["infrastructure", "scalability", "microservices"],
      createdAt: BigInt(Date.now() - 30 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "seed-2",
      name: "Zero-Trust Security Initiative",
      description:
        "Implementing zero-trust network architecture across all internal services following Q3 security audit findings.",
      tags: ["security", "zero-trust", "compliance"],
      createdAt: BigInt(Date.now() - 14 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "seed-3",
      name: "ML Pipeline Redesign",
      description:
        "Rebuilding the machine learning data pipeline to reduce training latency from 6 hours to under 45 minutes.",
      tags: ["machine-learning", "data-pipeline", "performance"],
      createdAt: BigInt(Date.now() - 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ];

  const displayProjects =
    !isLoading && (!projects || projects.length === 0)
      ? seedProjects
      : filtered;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="h-4 w-4 text-primary/70" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Knowledge Repository
              </span>
            </div>
            <h1
              className="font-display text-3xl font-bold text-foreground text-glow"
              style={{ letterSpacing: "-0.025em" }}
            >
              Projects
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Hover any project card to preview its most impactful decisions
            </p>
          </div>

          {isAdmin && (
            <Button
              onClick={() => setNewProjectOpen(true)}
              data-ocid="dashboard.primary_button"
              className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 hover:border-primary/60 hover:shadow-glow-sm transition-all shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative mt-5 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            data-ocid="search.input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, tags..."
            className="pl-9 bg-input/50 border-border/60 focus:border-primary/60 font-body"
          />
        </div>
      </motion.div>

      {/* Incognito overlay */}
      {incognito && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-30">👁️</div>
            <p className="font-display text-2xl font-semibold text-amber-400/40 tracking-wider">
              INCOGNITO MODE
            </p>
            <p className="text-muted-foreground/30 text-sm mt-2">
              Content is blurred for privacy
            </p>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="dashboard.project_list"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className="h-52 rounded-xl skeleton-shimmer"
              data-ocid="dashboard.loading_state"
            />
          ))}
        </div>
      ) : displayProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="dashboard.empty_state"
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="glass-panel rounded-2xl p-12 max-w-sm">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
              <Brain className="relative h-14 w-14 text-primary/50 mx-auto" />
            </div>
            <h2 className="font-display text-xl font-semibold mb-2">
              No Projects Yet
            </h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Create your first project to start capturing the "Why" behind your
              team's decisions.
            </p>
            {isAdmin && (
              <Button
                onClick={() => setNewProjectOpen(true)}
                data-ocid="dashboard.create_first_project_button"
                className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="dashboard.project_list"
        >
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isIncognito={incognito}
            />
          ))}
        </div>
      )}

      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
      />
    </main>
  );
}
