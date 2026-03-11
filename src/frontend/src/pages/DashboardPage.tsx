import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Brain,
  Building2,
  Clock,
  FolderOpen,
  Layers,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Project } from "../backend.d";
import { ContextBurstPanel } from "../components/ContextBurstPanel";
import { NewProjectModal } from "../components/NewProjectModal";
import { useAppContext } from "../context/AppContext";
import { type SeedProject, seedProjects } from "../data/seedData";
import { useGetAllProjects, useIsAdmin } from "../hooks/useQueries";

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
  const seedProject = project as SeedProject;
  const hasSeedData = "clientName" in project;

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
          <h3
            className="font-display font-semibold text-[15px] text-foreground mb-1.5 line-clamp-1 leading-snug"
            style={{ letterSpacing: "-0.015em" }}
          >
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">
            {project.description || "No description provided."}
          </p>
          {hasSeedData && (
            <div className="flex flex-col gap-1 mb-3">
              <div
                className="flex items-center gap-1.5 text-[11px]"
                data-ocid="dashboard.project.client_info"
              >
                <Building2
                  className="h-3 w-3 shrink-0"
                  style={{ color: "oklch(0.74 0.19 198 / 0.55)" }}
                />
                <span className="text-muted-foreground font-mono truncate">
                  <span style={{ color: "oklch(0.74 0.19 198 / 0.75)" }}>
                    {seedProject.clientName}
                  </span>
                  <span className="text-muted-foreground/60 mx-1">·</span>
                  {seedProject.clientIndustry}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 text-[11px]"
                data-ocid="dashboard.project.team_info"
              >
                <Users
                  className="h-3 w-3 shrink-0"
                  style={{ color: "oklch(0.74 0.19 198 / 0.55)" }}
                />
                <span className="text-muted-foreground font-mono">
                  {seedProject.teamMembers.length} team member
                  {seedProject.teamMembers.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
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
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid oklch(0.74 0.19 198 / 0.1)" }}
          >
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
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
  const displayProjects =
    !isLoading && (!projects || projects.length === 0)
      ? seedProjects
      : filtered;

  return (
    <main>
      {/* Hero Banner */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src="/assets/generated/dashboard-hero.dim_1200x400.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.55, filter: "saturate(1.3)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0 0 0 / 0.1) 0%, oklch(0.09 0.018 265 / 0.9) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain
                className="h-5 w-5"
                style={{
                  color: "oklch(0.74 0.19 198)",
                  filter: "drop-shadow(0 0 6px oklch(0.74 0.19 198 / 0.8))",
                }}
              />
              <span
                className="text-[11px] font-mono uppercase tracking-[0.22em]"
                style={{ color: "oklch(0.74 0.19 198 / 0.8)" }}
              >
                Knowledge Repository
              </span>
            </div>
            <h1
              className="font-display text-4xl font-bold"
              style={{
                color: "oklch(0.95 0.02 210)",
                letterSpacing: "-0.03em",
                textShadow:
                  "0 0 40px oklch(0.74 0.19 198 / 0.4), 0 2px 20px oklch(0 0 0 / 0.5)",
              }}
            >
              The Shadow Brain
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.65 0.01 240 / 0.8)" }}
            >
              Hover any project card to preview its most impactful decisions
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                data-ocid="search.input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, tags..."
                className="pl-9 bg-input/50 border-border/60 focus:border-primary/60 font-body"
              />
            </div>
            {isAdmin && (
              <Button
                onClick={() => setNewProjectOpen(true)}
                data-ocid="dashboard.primary_button"
                className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 hover:border-primary/60 transition-all shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            )}
          </div>
        </motion.div>

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
              <Brain className="h-14 w-14 text-primary/50 mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold mb-2">
                No Projects Yet
              </h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Create your first project to start capturing the "Why" behind
                your team's decisions.
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
      </div>

      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
      />
    </main>
  );
}
