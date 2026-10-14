export type ResourceKind = "pdf" | "doc" | "xls" | "zip" | "link" | "folder";

export interface ResourceItem {
  title: string;
  kind: ResourceKind;
  href: string;
  owner?: string;
  /** Creation date, ISO (YYYY-MM-DD). */
  created?: string;
  size?: string;
  /** Only for kind "folder": the resources shown when the folder is opened. */
  items?: ResourceItem[];
}

export interface ResourceCategory {
  slug: string;
  name: string;
  description: string;
  items: ResourceItem[];
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    slug: "help-centers",
    name: "Help Centers",
    description: "IT Help Desk, HR Help Center, and live IT systems status.",
    items: [
      {
        title: "HR",
        kind: "folder",
        href: "#",
        owner: "Priya Shah",
        created: "2025-11-12",
        items: [{ title: "HR Help Center", kind: "link", href: "https://www.google.com", owner: "Priya Shah", created: "2025-11-18" }],
      },
      {
        title: "IT",
        kind: "folder",
        href: "#",
        owner: "Marcus Lee",
        created: "2025-11-12",
        items: [
          { title: "IT Help Desk", kind: "link", href: "https://www.google.com", owner: "Marcus Lee", created: "2025-11-18" },
          { title: "IT Systems Status", kind: "link", href: "https://www.google.com", owner: "Marcus Lee", created: "2025-12-02" },
          { title: "IT Help Desk — Contact Guide.pdf", kind: "pdf", href: "#", owner: "Marcus Lee", created: "2026-07-02", size: "180 KB" },
        ],
      },
    ],
  },
  {
    slug: "marketing-resources",
    name: "Marketing Resources",
    description: "Brand assets, logo packs, letterhead templates, and the company guide.",
    items: [
      { title: "Brand Guidelines.pdf", kind: "pdf", href: "#", owner: "Elena Torres", created: "2026-08-15", size: "8.7 MB" },
      { title: "Logo Pack.zip", kind: "zip", href: "#", owner: "Elena Torres", created: "2026-08-15", size: "4.2 MB" },
      { title: "Letterhead Template.doc", kind: "doc", href: "#", owner: "Elena Torres", created: "2026-08-10", size: "150 KB" },
    ],
  },
  {
    slug: "safety-compliance",
    name: "Safety + Compliance",
    description: "Site safety protocols and emergency procedures.",
    items: [
      { title: "Site Safety Protocols.pdf", kind: "pdf", href: "#", owner: "David Kim", created: "2026-08-02", size: "2.1 MB" },
      { title: "Emergency Procedures.pdf", kind: "pdf", href: "#", owner: "David Kim", created: "2026-06-24", size: "960 KB" },
    ],
  },
  {
    slug: "employee-policies",
    name: "Employee Policies",
    description: "Employee Handbook, benefits, code of conduct, and remote work policy.",
    items: [
      { title: "Employee Handbook 2026.pdf", kind: "pdf", href: "#", owner: "Priya Shah", created: "2026-09-03", size: "1.1 MB" },
      { title: "Benefits Enrollment Worksheet.xlsx", kind: "xls", href: "#", owner: "Priya Shah", created: "2026-08-28", size: "340 KB" },
      { title: "Code of Conduct.pdf", kind: "pdf", href: "#", owner: "Priya Shah", created: "2026-08-20", size: "410 KB" },
      { title: "Remote Work Policy.doc", kind: "doc", href: "#", owner: "Priya Shah", created: "2026-08-05", size: "190 KB" },
    ],
  },
  {
    slug: "operations-it",
    name: "Operations + IT",
    description: "Expense + travel policy, IT acceptable use, and password + MFA guidance.",
    items: [
      { title: "Expense + Travel Policy.pdf", kind: "pdf", href: "#", owner: "Marcus Lee", created: "2026-07-22", size: "300 KB" },
      { title: "IT Acceptable Use Policy.docx", kind: "doc", href: "#", owner: "Marcus Lee", created: "2026-07-18", size: "220 KB" },
      { title: "Password + MFA Guidance.pdf", kind: "pdf", href: "#", owner: "Marcus Lee", created: "2026-07-10", size: "260 KB" },
    ],
  },
  {
    slug: "facilities-forms",
    name: "Facilities + Forms",
    description: "Parking + badge access, common forms, and the org directory.",
    items: [
      { title: "Parking + Badge Access", kind: "link", href: "https://www.google.com", owner: "Sara Whitman", created: "2025-09-24" },
      { title: "Org Directory", kind: "link", href: "https://www.google.com", owner: "Sara Whitman", created: "2025-09-24" },
      { title: "Common Forms Library.pdf", kind: "pdf", href: "#", owner: "Sara Whitman", created: "2026-07-10", size: "1.4 MB" },
      { title: "Org Directory.xlsx", kind: "xls", href: "#", owner: "Sara Whitman", created: "2026-06-15", size: "410 KB" },
    ],
  },
  {
    slug: "training-onboarding",
    name: "Training + Onboarding",
    description: "New hire checklists, LMS access, and role-specific training paths.",
    items: [
      { title: "New Hire Checklist.pdf", kind: "pdf", href: "#", owner: "Jordan Ellis", created: "2026-06-12", size: "210 KB" },
      { title: "LMS Access Guide.pdf", kind: "pdf", href: "#", owner: "Jordan Ellis", created: "2026-06-05", size: "180 KB" },
      { title: "Role-Specific Training Paths.xlsx", kind: "xls", href: "#", owner: "Jordan Ellis", created: "2026-06-01", size: "260 KB" },
    ],
  },
  {
    slug: "vendor-contracts",
    name: "Vendor + Contracts",
    description: "Vendor agreements, procurement forms, and contract templates.",
    items: [
      { title: "Vendor Agreement Template.doc", kind: "doc", href: "#", owner: "Anika Patel", created: "2026-05-20", size: "230 KB" },
      { title: "Procurement Form.pdf", kind: "pdf", href: "#", owner: "Anika Patel", created: "2026-05-12", size: "150 KB" },
    ],
  },
  {
    slug: "building-envelope-sustainability",
    name: "Building Envelope + Sustainability",
    description: "Roof surveys, parapet reports, and site inspection procedures.",
    items: [
      { title: "Roof Survey Template.pdf", kind: "pdf", href: "#", owner: "Tom Reyes", created: "2026-06-18", size: "1.2 MB" },
      { title: "Parapet Report.pdf", kind: "pdf", href: "#", owner: "Tom Reyes", created: "2026-06-10", size: "980 KB" },
      { title: "Site Inspection Checklist.xlsx", kind: "xls", href: "#", owner: "Tom Reyes", created: "2026-06-04", size: "190 KB" },
      { title: "Sustainability Guidelines.pdf", kind: "pdf", href: "#", owner: "Tom Reyes", created: "2026-05-28", size: "2.3 MB" },
    ],
  },
  {
    slug: "risk-insurance",
    name: "Risk + Insurance",
    description: "Vendor insurance requirements, incident reporting, and claims procedures.",
    items: [
      { title: "Vendor Insurance Requirements.pdf", kind: "pdf", href: "#", owner: "Rachel Nguyen", created: "2026-05-22", size: "340 KB" },
      { title: "Incident Report Form.pdf", kind: "pdf", href: "#", owner: "Rachel Nguyen", created: "2026-05-14", size: "160 KB" },
      { title: "Claims Procedure Guide.doc", kind: "doc", href: "#", owner: "Rachel Nguyen", created: "2026-05-08", size: "210 KB" },
    ],
  },
  {
    slug: "accounting-finance",
    name: "Accounting + Finance",
    description: "Expense approvals, vendor payment procedures, and wire transfer protocols.",
    items: [
      { title: "Expense Approval Policy.pdf", kind: "pdf", href: "#", owner: "Chris Walker", created: "2026-04-18", size: "220 KB" },
      { title: "Vendor Payment Procedure.doc", kind: "doc", href: "#", owner: "Chris Walker", created: "2026-04-10", size: "190 KB" },
    ],
  },
  {
    slug: "community-investment",
    name: "Community Investment",
    description: "Volunteer program guidelines, donation requests, and partnership resources.",
    items: [
      { title: "Volunteer Program Guidelines.pdf", kind: "pdf", href: "#", owner: "Maya Brooks", created: "2026-03-15", size: "280 KB" },
      { title: "Donation Request Form", kind: "link", href: "https://www.google.com", owner: "Maya Brooks", created: "2025-10-06" },
    ],
  },
];
