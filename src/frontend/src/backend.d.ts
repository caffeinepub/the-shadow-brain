import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Decision {
    id: string;
    title: string;
    createdAt: Time;
    createdBy: Principal;
    tags: Array<string>;
    importance: bigint;
    reasoning: string;
    projectId: string;
    outcome: string;
}
export type Time = bigint;
export interface Project {
    id: string;
    name: string;
    createdAt: Time;
    createdBy: Principal;
    tags: Array<string>;
    description: string;
}
export interface ContextFragment {
    id: string;
    content: string;
    decisionId: string;
    createdAt: Time;
    createdBy: Principal;
    projectId: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createContextFragment(id: string, decisionId: string, projectId: string, content: string): Promise<void>;
    createDecision(id: string, projectId: string, title: string, reasoning: string, outcome: string, tags: Array<string>, importance: bigint): Promise<void>;
    createProject(id: string, name: string, description: string, tags: Array<string>): Promise<void>;
    deleteContextFragment(id: string): Promise<void>;
    deleteDecision(id: string): Promise<void>;
    deleteProject(id: string): Promise<void>;
    getAllProjects(): Promise<Array<Project>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContextFragment(id: string): Promise<ContextFragment | null>;
    getDecisionContextFragments(decisionId: string): Promise<Array<ContextFragment>>;
    getHighImpactDecisions(projectId: string): Promise<Array<Decision>>;
    getProject(id: string): Promise<Project | null>;
    getProjectDecisions(projectId: string): Promise<Array<Decision>>;
    getProjectTags(projectId: string): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchDecisions(keyword: string): Promise<Array<Decision>>;
    updateContextFragment(id: string, content: string): Promise<void>;
    updateProject(id: string, name: string, description: string, tags: Array<string>): Promise<void>;
}
