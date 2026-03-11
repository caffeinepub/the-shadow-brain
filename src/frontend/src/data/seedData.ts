import type { Principal } from "@icp-sdk/core/principal";
import type { Decision, Project } from "../backend.d";

export interface SeedProject extends Project {
  teamMembers: { name: string; role: string }[];
  clientName: string;
  clientIndustry: string;
  clientRequirements: string[];
  clientSatisfactionRating: number;
}

export interface SeedDecision extends Decision {}

const anon = {} as unknown as Principal;

export const seedProjects: SeedProject[] = [
  {
    id: "seed-1",
    name: "Platform Architecture Overhaul",
    description:
      "Complete re-architecture of the core platform to microservices, addressing scalability bottlenecks that emerged at 10M users. The system needed to handle 5x growth while maintaining strict financial-grade reliability.",
    tags: [
      "infrastructure",
      "scalability",
      "microservices",
      "fintech",
      "compliance",
    ],
    createdAt: BigInt(Date.now() - 30 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Sarah Chen", role: "Lead Architect" },
      { name: "Marcus Webb", role: "Backend Engineer" },
      { name: "Priya Nair", role: "DevOps" },
      { name: "Tyler Rhodes", role: "Security" },
    ],
    clientName: "NovaBanq Financial Services",
    clientIndustry: "Fintech",
    clientRequirements: [
      "99.99% uptime SLA across all environments",
      "GDPR and PCI-DSS compliance throughout",
      "Sub-100ms API latency at p99",
      "Horizontal scaling to support 50M+ users",
    ],
    clientSatisfactionRating: 4.8,
  },
  {
    id: "seed-2",
    name: "Zero-Trust Security Initiative",
    description:
      "Implementing zero-trust network architecture across all internal services following Q3 security audit findings. Every service call requires cryptographic identity verification regardless of network location.",
    tags: ["security", "zero-trust", "compliance", "identity", "networking"],
    createdAt: BigInt(Date.now() - 55 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Jordan Blake", role: "CISO" },
      { name: "Fatima Al-Hassan", role: "Network Security" },
      { name: "Dev Patel", role: "Identity Engineer" },
      { name: "Lena Kowalski", role: "Compliance Analyst" },
    ],
    clientName: "AeroDyne Defense Corp",
    clientIndustry: "Defense & Aerospace",
    clientRequirements: [
      "DoD IL4 compliance certification",
      "Zero standing privileges — just-in-time access only",
      "Full immutable audit trail for all service calls",
      "mTLS enforcement on every internal communication",
    ],
    clientSatisfactionRating: 4.9,
  },
  {
    id: "seed-3",
    name: "ML Pipeline Redesign",
    description:
      "Rebuilding the machine learning data pipeline to reduce training latency from 6 hours to under 45 minutes. Genomic dataset volumes exceed 10TB daily and require reproducible, auditable model lineage.",
    tags: [
      "machine-learning",
      "data-pipeline",
      "performance",
      "biotech",
      "hipaa",
    ],
    createdAt: BigInt(Date.now() - 42 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Dr. Yuki Tanaka", role: "ML Lead" },
      { name: "Arjun Sharma", role: "Data Engineer" },
      { name: "Chloe Martin", role: "Research Scientist" },
      { name: "Ben Okafor", role: "Platform Engineer" },
    ],
    clientName: "GenomixAI Biotech",
    clientIndustry: "Biotechnology",
    clientRequirements: [
      "Process 10TB+ genomic datasets daily without degradation",
      "Fully reproducible experiment runs with locked seeds",
      "End-to-end model lineage tracking from data to artifact",
      "HIPAA-compliant data handling and audit logging",
    ],
    clientSatisfactionRating: 4.7,
  },
  {
    id: "seed-4",
    name: "Real-Time Analytics Dashboard",
    description:
      "Building a sub-second analytics dashboard for retail decision-makers. Supports 500 concurrent users, custom KPI widgets, and one-click CSV/Excel exports tied to live data streams.",
    tags: ["analytics", "real-time", "frontend", "dashboard", "retail"],
    createdAt: BigInt(Date.now() - 18 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Nina Vasquez", role: "Product Engineer" },
      { name: "Sam Oduya", role: "Data Analyst" },
      { name: "Grace Liu", role: "Frontend Lead" },
      { name: "Rick Tanner", role: "Backend" },
    ],
    clientName: "RetailPulse Inc",
    clientIndustry: "Retail & E-commerce",
    clientRequirements: [
      "Sub-second dashboard refresh on live data",
      "Support 500 concurrent users without degradation",
      "Drag-and-drop custom KPI widget builder",
      "One-click CSV and Excel export for any chart",
    ],
    clientSatisfactionRating: 4.6,
  },
  {
    id: "seed-5",
    name: "Decentralized Identity System",
    description:
      "Designing a government-grade decentralized identity verification system using W3C DID standards. Citizens can verify documents offline with privacy-preserving zero-knowledge proofs.",
    tags: ["blockchain", "identity", "government", "privacy", "accessibility"],
    createdAt: BigInt(Date.now() - 67 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Omar Farouk", role: "Blockchain Architect" },
      { name: "Irene Nakamura", role: "Protocol Engineer" },
      { name: "Luis Torres", role: "UX Lead" },
      { name: "Mei Zhang", role: "Security Auditor" },
    ],
    clientName: "CivicChain Government Solutions",
    clientIndustry: "Government & Public Sector",
    clientRequirements: [
      "Full W3C DID standard compliance",
      "Offline-capable credential verification with no server dependency",
      "Accessibility at WCAG 2.1 AA — serving citizens with disabilities",
      "Privacy by design — no PII stored on chain",
    ],
    clientSatisfactionRating: 4.5,
  },
  {
    id: "seed-6",
    name: "Mobile Payments Rebrand",
    description:
      "Redesigning the mobile payments experience with biometric-first authentication and offline mode support. Target markets include low-connectivity regions across Southeast Asia and Sub-Saharan Africa.",
    tags: ["mobile", "payments", "pci-dss", "biometrics", "ux"],
    createdAt: BigInt(Date.now() - 25 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Amara Diallo", role: "Product Manager" },
      { name: "Kyle Jensen", role: "iOS Lead" },
      { name: "Preet Soni", role: "Android Lead" },
      { name: "Hannah Brooks", role: "UX Designer" },
    ],
    clientName: "Payvra Technologies",
    clientIndustry: "Payments & Fintech",
    clientRequirements: [
      "PCI-DSS Level 1 compliance for all cardholder data",
      "Biometric authentication (Face ID, fingerprint) as primary flow",
      "Full offline mode for regions with intermittent connectivity",
      "Sub-2 second end-to-end transaction confirmation",
    ],
    clientSatisfactionRating: 4.8,
  },
  {
    id: "seed-7",
    name: "Supply Chain Visibility Platform",
    description:
      "A multi-tenant SaaS platform giving logistics operators real-time GPS tracking, IoT sensor feeds, and predictive delay alerts across global freight routes.",
    tags: ["iot", "supply-chain", "real-time", "multi-tenant", "predictive"],
    createdAt: BigInt(Date.now() - 50 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Carlos Reyes", role: "Solutions Architect" },
      { name: "Anika Bose", role: "IoT Engineer" },
      { name: "Stefan Müller", role: "Backend Lead" },
      { name: "Tina Cho", role: "Data Scientist" },
    ],
    clientName: "GlobalFreight Logistics",
    clientIndustry: "Logistics & Supply Chain",
    clientRequirements: [
      "Real-time GPS tracking with under 30-second update intervals",
      "IoT sensor integration for temperature, humidity, and shock",
      "Predictive delay alerts with 85%+ accuracy",
      "Strict tenant isolation in a multi-tenant SaaS architecture",
    ],
    clientSatisfactionRating: 4.4,
  },
  {
    id: "seed-8",
    name: "AI-Powered Customer Support Bot",
    description:
      "Building a privacy-first AI support bot with 90%+ intent accuracy across 12 languages. Integrates natively with Zendesk and Salesforce and escalates gracefully to human agents.",
    tags: ["ai", "nlp", "customer-support", "integration", "multilingual"],
    createdAt: BigInt(Date.now() - 10 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Rosa Kim", role: "AI Engineer" },
      { name: "Ethan Powell", role: "NLP Researcher" },
      { name: "Daria Ivanova", role: "Integration Specialist" },
      { name: "Marco Eze", role: "QA Lead" },
    ],
    clientName: "HelperDesk SaaS",
    clientIndustry: "Customer Service & SaaS",
    clientRequirements: [
      "90%+ intent recognition accuracy on production traffic",
      "Multi-language support across 12 languages",
      "Seamless handoff to human agents with full context transfer",
      "Native Zendesk and Salesforce integrations",
    ],
    clientSatisfactionRating: 4.9,
  },
  {
    id: "seed-9",
    name: "Healthcare Data Exchange Hub",
    description:
      "A HIPAA-compliant data exchange hub enabling real-time EHR synchronization across hospital networks with HL7 FHIR R4. Patients manage their own consent through a self-service portal.",
    tags: ["healthcare", "fhir", "hl7", "interoperability", "compliance"],
    createdAt: BigInt(Date.now() - 35 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Dr. Aisha Obi", role: "Clinical Informatics" },
      { name: "Patrick Brennan", role: "Integration Architect" },
      { name: "Suki Hayashi", role: "FHIR Engineer" },
      { name: "Joel Carter", role: "Security" },
    ],
    clientName: "MedNexus Health Systems",
    clientIndustry: "Healthcare",
    clientRequirements: [
      "HL7 FHIR R4 compliance for all data exchange",
      "Real-time EHR sync with sub-5-second propagation",
      "Patient-controlled consent management portal",
      "99.9% uptime SLA with zero-downtime deployments",
    ],
    clientSatisfactionRating: 4.7,
  },
  {
    id: "seed-10",
    name: "EdTech Personalization Engine",
    description:
      "An adaptive learning platform that builds personalized knowledge graphs per student, integrates with any LMS via LTI 1.3, and surfaces real-time progress analytics for educators.",
    tags: [
      "edtech",
      "personalization",
      "machine-learning",
      "lti",
      "accessibility",
    ],
    createdAt: BigInt(Date.now() - 8 * 24 * 3600 * 1000) * BigInt(1_000_000),
    createdBy: anon,
    teamMembers: [
      { name: "Bianca Ferreira", role: "Product Lead" },
      { name: "Noah Lindqvist", role: "ML Engineer" },
      { name: "Zara Ahmed", role: "Curriculum Designer" },
      { name: "Jason Wu", role: "Platform Architect" },
    ],
    clientName: "LearnForge Academy",
    clientIndustry: "Education Technology",
    clientRequirements: [
      "Adaptive learning paths that respond to student performance in real time",
      "Real-time progress analytics for instructors and administrators",
      "LTI 1.3 integration with major LMS platforms (Canvas, Moodle, Blackboard)",
      "Full accessibility support for 15+ interface languages",
    ],
    clientSatisfactionRating: 4.6,
  },
];

export const seedDecisionsByProject: Record<string, SeedDecision[]> = {
  "seed-1": [
    {
      id: "sd-1-1",
      projectId: "seed-1",
      title: "Chose Kubernetes over bare-metal orchestration",
      reasoning:
        "We evaluated bare-metal deployments and several managed container runtimes. Kubernetes won because our team already had operational expertise with it, the declarative config model aligned with our GitOps strategy, and auto-scaling would be critical when handling traffic spikes above 10M concurrent sessions.",
      outcome:
        "Deployment times dropped from 45 minutes to under 6 minutes. Auto-scaling events now handle 3x traffic spikes with zero manual intervention. Infra cost reduced by 22% through bin-packing.",
      tags: ["infrastructure", "kubernetes", "devops"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 28 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-1-2",
      projectId: "seed-1",
      title: "Adopted event sourcing for all audit logs",
      reasoning:
        "NovaBanq's compliance team required a tamper-evident audit trail for every state mutation. Traditional UPDATE-based models lose history. Event sourcing gives us an immutable append-only log from which we can reconstruct any past state — essential for financial regulatory audits.",
      outcome:
        "Passed GDPR Article 30 audit with zero findings. Replay capability allowed us to retroactively fix a data bug in 2 hours rather than the estimated 3-week manual reconciliation.",
      tags: ["architecture", "compliance", "fintech"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 22 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-1-3",
      projectId: "seed-1",
      title: "Selected gRPC over REST for inter-service communication",
      reasoning:
        "With 40+ microservices communicating at high frequency, REST's text-based JSON overhead became a measurable bottleneck. gRPC's binary Protobuf encoding and HTTP/2 multiplexing cut per-call overhead by 65%, and the strongly-typed contracts eliminated an entire class of integration bugs.",
      outcome:
        "Inter-service latency dropped from 18ms average to 4ms. Contract violations caught at compile time reduced production incidents by 31% in the first quarter post-migration.",
      tags: ["microservices", "performance", "architecture"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 15 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-2": [
    {
      id: "sd-2-1",
      projectId: "seed-2",
      title: "Selected HashiCorp Vault for secrets management",
      reasoning:
        "AeroDyne required zero standing secrets in any environment. We evaluated AWS Secrets Manager and CyberArk — Vault won because of its dynamic secrets engine (credentials exist only for the duration of a request), open-source auditability required by DoD, and its SPIFFE integration path.",
      outcome:
        "Long-lived credentials eliminated across 100% of services. Secret rotation from quarterly to per-request. DoD IL4 pre-authorization granted after Vault architecture review.",
      tags: ["security", "secrets", "compliance"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 50 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-2-2",
      projectId: "seed-2",
      title: "Adopted SPIFFE/SPIRE for workload identity",
      reasoning:
        "Service-to-service calls needed cryptographic identity that could not be spoofed by a compromised container. SPIFFE/SPIRE issues short-lived X.509 SVIDs to workloads automatically, removing the human from the secret-distribution chain — which was the primary attack vector identified in the Q3 audit.",
      outcome:
        "Identity spoofing attack surface eliminated. SVID lifetime set to 1 hour with automatic renewal. Zero workload identity incidents since deployment.",
      tags: ["identity", "zero-trust", "networking"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 44 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-2-3",
      projectId: "seed-2",
      title: "Chose BeyondCorp model over traditional VPN",
      reasoning:
        "VPNs create a trusted perimeter — once inside, lateral movement is trivial. BeyondCorp moves the access decision to the device and user identity level, regardless of network. Given AeroDyne's insider-threat model, device-trust plus continuous re-evaluation was non-negotiable.",
      outcome:
        "VPN decommissioned across all campuses. 100% of resource access now device-and-identity gated. Mean time to revoke access on offboarding dropped from 4 hours to 90 seconds.",
      tags: ["zero-trust", "networking", "security"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 38 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-3": [
    {
      id: "sd-3-1",
      projectId: "seed-3",
      title: "Adopted Apache Arrow for in-memory genomic data interchange",
      reasoning:
        "Serialization between pipeline stages was consuming 40% of total wall-clock time. Pandas DataFrames copied data on every inter-process boundary. Apache Arrow's zero-copy columnar format eliminates serialization for same-process and shared-memory scenarios — critical when shuffling 500GB+ partitions.",
      outcome:
        "Stage-to-stage handoff time reduced by 78%. Peak memory usage dropped 35% due to columnar compression efficiency. Full daily pipeline now completes in 38 minutes, down from 6 hours 12 minutes.",
      tags: ["performance", "data-pipeline", "machine-learning"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 40 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-3-2",
      projectId: "seed-3",
      title: "Chose MLflow for experiment tracking over custom tooling",
      reasoning:
        "The research team was using spreadsheets to track hyperparameters across runs — an approach that failed HIPAA's audit trail requirements and caused two reproducibility failures in clinical submissions. MLflow's artifact logging, parameter capture, and model registry provided an auditable paper trail without requiring researchers to change their workflow.",
      outcome:
        "100% of experiments now have reproducible records. FDA pre-submission audit passed with no findings on data lineage. Researcher onboarding time cut from 2 weeks to 2 days.",
      tags: ["machine-learning", "reproducibility", "hipaa"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 33 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-3-3",
      projectId: "seed-3",
      title: "Migrated distributed training from Spark to Ray",
      reasoning:
        "Spark was designed for batch ETL, not iterative ML training. Its driver-worker model created bottlenecks when gradient-sharing needed sub-second coordination. Ray's actor model and shared memory object store align with how distributed ML frameworks like PyTorch distribute work.",
      outcome:
        "Distributed training throughput increased by 4.2x. Ray's autoscaler reduced idle GPU costs by 41%. Team was able to run 8 parallel experiment variants simultaneously instead of 2.",
      tags: ["machine-learning", "performance", "biotech"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 25 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-4": [
    {
      id: "sd-4-1",
      projectId: "seed-4",
      title: "Chose Apache Kafka for event streaming over RabbitMQ",
      reasoning:
        "RetailPulse needed event replay — if a dashboard widget had a bug, we needed to re-process historical events to correct stored aggregates. RabbitMQ deletes messages post-consumption. Kafka's durable log with configurable retention gave us a 7-day event replay window critical for retroactive data corrections.",
      outcome:
        "Event replay capability saved 3 data incidents from becoming customer-visible bugs. Peak event throughput of 2.1M events/second sustained without degradation. Partition lag alarms enabled proactive scaling before user impact.",
      tags: ["analytics", "real-time", "architecture"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 16 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-4-2",
      projectId: "seed-4",
      title: "Adopted WebSockets over HTTP polling for live dashboard updates",
      reasoning:
        "Polling at 1-second intervals from 500 concurrent users generated 500 req/s of unnecessary load even when data hadn't changed. WebSockets allow server-push on data change events only, dramatically reducing backend load and enabling true real-time UI updates without the poll latency floor.",
      outcome:
        "Backend API load reduced by 84% at peak. Dashboard refresh latency improved from 1-second poll floor to under 120ms server-push. Battery drain on mobile clients reduced measurably.",
      tags: ["frontend", "real-time", "performance"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 10 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-4-3",
      projectId: "seed-4",
      title: "Selected ClickHouse over PostgreSQL for OLAP workloads",
      reasoning:
        "Multi-dimensional retail KPI queries across 18-month event histories were taking 8-12 seconds in PostgreSQL even with aggressive indexing. ClickHouse's columnar storage and vectorized execution engine reduced the same queries to under 200ms — the sub-second requirement became achievable.",
      outcome:
        "Dashboard query p99 now sits at 180ms. Storage costs reduced 6x due to columnar compression on event data. New KPI widget development time cut in half — no query tuning needed.",
      tags: ["analytics", "database", "performance"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 5 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-5": [
    {
      id: "sd-5-1",
      projectId: "seed-5",
      title: "Adopted W3C DID:web over self-sovereign identity (SSI)",
      reasoning:
        "Full SSI required citizens to manage private keys on personal devices — an accessibility and support nightmare for government use. DID:web anchors identifiers to government-controlled domain DNS, preserving verifiability while allowing key recovery through existing government identity verification processes.",
      outcome:
        "Onboarding success rate 94% vs. estimated 60% for self-custodied SSI. Government IT teams can support lost-key scenarios without blockchain transactions. W3C compliance certification passed.",
      tags: ["identity", "blockchain", "government"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 64 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-5-2",
      projectId: "seed-5",
      title: "Chose Verifiable Credentials with JSON-LD over JWT-VC",
      reasoning:
        "JWT-VCs lack semantic interoperability — two implementations can have the same claim mean different things. JSON-LD's linked data contexts provide machine-readable semantic precision required for cross-agency credential exchange. The EU eIDAS 2.0 alignment also required JSON-LD.",
      outcome:
        "Cross-agency credential exchange implemented with zero disambiguation errors. eIDAS 2.0 readiness confirmed by EU interoperability lab. Credential schema registry adopted by 4 partner government agencies.",
      tags: ["identity", "privacy", "interoperability"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 55 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-5-3",
      projectId: "seed-5",
      title: "Selected IPFS for document anchoring over centralized storage",
      reasoning:
        "Government documents anchored to a single centralized server create a single point of failure and a trust dependency on the operator. IPFS content-addressing means the document hash IS the address — any node can verify authenticity, and the document survives any single point of failure.",
      outcome:
        "Document tamper detection time reduced to zero — any modification is immediately detectable by hash mismatch. System survived two data center incidents without document availability loss.",
      tags: ["blockchain", "privacy", "infrastructure"],
      importance: BigInt(3),
      createdAt: BigInt(Date.now() - 48 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-6": [
    {
      id: "sd-6-1",
      projectId: "seed-6",
      title: "Adopted FIDO2 over SMS OTP for authentication",
      reasoning:
        "SMS OTP is vulnerable to SIM-swap attacks — a known vector in mobile payments fraud. FIDO2 passkeys bind authentication to a physical device using asymmetric cryptography, making remote phishing and SIM-swap attacks cryptographically impossible. PCI-DSS 4.0 is also moving toward phishing-resistant MFA.",
      outcome:
        "Account takeover incidents dropped to zero post-launch in pilot markets. Authentication step time reduced from 14 seconds (SMS OTP) to 1.2 seconds (biometric). PCI-DSS 4.0 multi-factor requirement satisfied.",
      tags: ["security", "biometrics", "payments"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 23 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-6-2",
      projectId: "seed-6",
      title:
        "Chose offline-first SQLite sync over server-dependent architecture",
      reasoning:
        "Target markets in Southeast Asia and Sub-Saharan Africa have 30-60% intermittent connectivity rates. A server-dependent architecture would make the app unusable for the primary customer segment. SQLite with conflict-resolution sync allows transactions to queue locally and sync when connectivity returns.",
      outcome:
        "App usable in fully offline conditions for 72-hour windows. Transaction success rate in low-connectivity pilot markets: 98.3% vs. 67% with the old server-dependent flow. 2.1M transactions processed in first pilot month.",
      tags: ["mobile", "offline-first", "ux"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 18 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-6-3",
      projectId: "seed-6",
      title: "Selected React Native over native iOS/Android development",
      reasoning:
        "Maintaining two native codebases would require separate iOS and Android teams, doubling engineering cost. React Native's bridge allowed 87% code sharing between platforms while still rendering native UI components. Payvra's 3-month launch deadline made a single codebase essential.",
      outcome:
        "Launched iOS and Android simultaneously, 3 days ahead of deadline. 87% code sharing achieved. Bug fix propagation now takes 1 day instead of coordinating two parallel releases.",
      tags: ["mobile", "ux", "architecture"],
      importance: BigInt(3),
      createdAt: BigInt(Date.now() - 12 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-7": [
    {
      id: "sd-7-1",
      projectId: "seed-7",
      title: "Chose MQTT over HTTP for IoT sensor telemetry",
      reasoning:
        "HTTP's request-response model requires a client to initiate each data transfer — inappropriate for 50,000+ sensors sending location and condition data every 10 seconds. MQTT's publish-subscribe model over persistent TCP connections reduced per-message overhead by 92% and halved battery drain on solar-powered edge devices.",
      outcome:
        "IoT network now sustains 500K messages/second without bottleneck. Edge device battery life extended from 18 months to 4 years. Message delivery reliability improved from 94% to 99.97%.",
      tags: ["iot", "real-time", "performance"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 48 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-7-2",
      projectId: "seed-7",
      title: "Adopted digital twin pattern for freight container modeling",
      reasoning:
        "Operators needed to query current AND historical state of 200K+ containers without hitting physical sensors. Digital twins maintain a virtual replica that persists the last-known state, enabling complex queries and simulations without sensor round-trips. The pattern also enables predictive modeling against the twin.",
      outcome:
        "Query latency for container state dropped from 4 seconds to 12ms. Predictive delay model trains against twin history, achieving 87% accuracy — exceeding the 85% client requirement.",
      tags: ["iot", "supply-chain", "predictive"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 40 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-7-3",
      projectId: "seed-7",
      title: "Selected TimescaleDB over InfluxDB for time-series storage",
      reasoning:
        "InfluxDB's Flux query language has a steep learning curve and poor JOIN support — problematic when correlating sensor events with shipping manifest data stored in PostgreSQL. TimescaleDB extends PostgreSQL with time-series hypertables, allowing our team to use standard SQL for both transactional and time-series queries.",
      outcome:
        "Single query language across all data types reduced onboarding time for new engineers by 60%. Complex correlated queries that required ETL pipelines now run in-database in under 500ms.",
      tags: ["supply-chain", "database", "multi-tenant"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 32 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-8": [
    {
      id: "sd-8-1",
      projectId: "seed-8",
      title: "Selected fine-tuned LLaMA over OpenAI GPT API for inference",
      reasoning:
        "HelperDesk's customers include healthcare and legal SaaS companies with strict data residency requirements. Sending customer support conversations to a third-party API was a non-starter. A locally hosted LLaMA fine-tune keeps all PII within the customer's infrastructure boundary while still achieving GPT-3.5 level performance on intent classification.",
      outcome:
        "Data residency requirement met for all 23 enterprise customers. Fine-tuned model achieved 91.4% intent accuracy vs. 88.2% for vanilla GPT-3.5 on the domain-specific test set.",
      tags: ["ai", "privacy", "nlp"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 8 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-8-2",
      projectId: "seed-8",
      title: "Adopted RAG architecture over parametric knowledge base",
      reasoning:
        "Baking product knowledge into model weights requires a full fine-tuning cycle every time a customer updates their documentation. RAG decouples knowledge from the model — documents are embedded in a vector store and retrieved at inference time. This lets customers update their knowledge base in minutes, not weeks.",
      outcome:
        "Knowledge base update cycle from 3 weeks to under 5 minutes. Hallucination rate on product-specific queries dropped from 12% to 1.8%. Customers now update documentation themselves without engineering involvement.",
      tags: ["ai", "nlp", "integration"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 6 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-8-3",
      projectId: "seed-8",
      title: "Chose LangChain for AI orchestration over custom pipeline code",
      reasoning:
        "Building custom orchestration for multi-step AI workflows — intent classification, entity extraction, tool-calling, memory management — would have taken 3 months of engineering. LangChain's LCEL (LangChain Expression Language) let us compose these steps declaratively with built-in retry logic, streaming support, and observability via LangSmith.",
      outcome:
        "Core bot orchestration built in 3 weeks vs. estimated 3 months. LangSmith tracing identified 4 critical prompt failures that would have been invisible in custom code. New intent type deployment time: 4 hours.",
      tags: ["ai", "customer-support", "multilingual"],
      importance: BigInt(3),
      createdAt: BigInt(Date.now() - 4 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-9": [
    {
      id: "sd-9-1",
      projectId: "seed-9",
      title: "Adopted SMART on FHIR for application authorization",
      reasoning:
        "EHR vendors have heterogeneous auth models. Without a standard, we would need custom integrations for each of the 12 EHR systems in MedNexus's network. SMART on FHIR is the de-facto standard for delegated authorization to FHIR resources — all major EHRs (Epic, Cerner, Allscripts) support it, eliminating 11 custom auth integrations.",
      outcome:
        "EHR integration time from 3 months per vendor to 2 weeks. Epic and Cerner integrations live within 30 days. Passed ONC certification for SMART on FHIR compliance.",
      tags: ["healthcare", "fhir", "interoperability"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 32 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-9-2",
      projectId: "seed-9",
      title: "Chose HAPI FHIR server over custom FHIR implementation",
      reasoning:
        "Building a FHIR R4-compliant server from scratch would require 18 months of work to handle edge cases in the 4,000-page specification. HAPI FHIR is the reference implementation — well-tested, actively maintained by the HL7 community, and already used by Epic and major academic medical centers.",
      outcome:
        "FHIR server deployed and certified in 6 weeks vs. 18-month custom estimate. Full R4 conformance statement generated automatically. Community support resolved two edge-case bugs that would have taken weeks to find independently.",
      tags: ["healthcare", "hl7", "compliance"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 26 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-9-3",
      projectId: "seed-9",
      title: "Selected AWS HealthLake over self-managed FHIR datastore",
      reasoning:
        "Self-managing a FHIR-native datastore with HIPAA BAA, audit logging, encryption at rest and in transit, and automated backup would require dedicated DevOps effort. AWS HealthLake handles all compliance infrastructure and provides integrated NLP for unstructured clinical note extraction — a feature the clinical team requested for Phase 2.",
      outcome:
        "HIPAA BAA signed in 48 hours. Infrastructure compliance burden eliminated. Clinical NLP feature delivered in Phase 1 ahead of schedule, extracting structured data from 1.2M unstructured notes.",
      tags: ["healthcare", "compliance", "infrastructure"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 18 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
  "seed-10": [
    {
      id: "sd-10-1",
      projectId: "seed-10",
      title: "Adopted knowledge graph over flat syllabus for learning model",
      reasoning:
        "Flat syllabi treat all concepts as independent units. Students who fail a prerequisite concept silently carry that gap into dependent concepts. A knowledge graph models concept dependencies explicitly — if a student struggles with fractions, the system can detect that as a prerequisite failure and route them to remediation before progressing.",
      outcome:
        "Student concept mastery rates improved 34% in pilot cohorts. Prerequisite gap detection reduced curriculum completion dropout by 28%. Curriculum design time cut by 40% using graph visualizations instead of spreadsheets.",
      tags: ["edtech", "machine-learning", "personalization"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-10-2",
      projectId: "seed-10",
      title: "Chose spaced repetition (SM-2 algorithm) for review scheduling",
      reasoning:
        "Presenting all review material uniformly wastes study time on already-mastered concepts. The SM-2 spaced repetition algorithm schedules reviews based on proven memory decay curves — concepts reviewed just before forgetting are retained with minimal sessions. Duolingo's 30-year track record using this approach gave us confidence in the model.",
      outcome:
        "Retention rates at 30-day follow-up improved from 54% to 81% in A/B test. Average daily study time reduced by 25% while maintaining equivalent assessment scores. Learner engagement (DAU/MAU) improved from 0.31 to 0.48.",
      tags: ["edtech", "personalization", "machine-learning"],
      importance: BigInt(5),
      createdAt: BigInt(Date.now() - 5 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
    {
      id: "sd-10-3",
      projectId: "seed-10",
      title: "Selected xAPI (Tin Can) over SCORM for learning record store",
      reasoning:
        "SCORM is tied to LMS-hosted content and cannot capture learning events outside the LMS (mobile app, offline, third-party simulations). xAPI uses a RESTful triple-statement model ('Actor → Verb → Object') that works anywhere with an HTTP connection. This allows LearnForge to capture learning events from partner simulators, mobile apps, and classroom tools.",
      outcome:
        "Learning event coverage increased from 40% of student interactions to 94%. Cross-platform learning continuity enabled — students can switch between web, mobile, and partner tools seamlessly. LRS integration completed with 3 external simulation vendors.",
      tags: ["edtech", "lti", "accessibility"],
      importance: BigInt(4),
      createdAt: BigInt(Date.now() - 2 * 24 * 3600 * 1000) * BigInt(1_000_000),
      createdBy: anon,
    },
  ],
};
