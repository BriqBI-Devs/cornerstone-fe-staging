/** Sample categories: access is the one team (audience) or person who manages the folder; empty means no one is assigned yet. */
export const CATEGORIES = [
  { name: "Help Centers", description: "IT Help Desk, HR Help Center, and live IT systems status.", access: "IT team", featured: true },
  { name: "Accounting + Finance", description: "Expense approvals, vendor payment procedures, and wire transfer protocols.", access: "Accounting team", featured: false },
  { name: "Building Envelope + Sustainability", description: "Roof surveys, parapet reports, and site inspection procedures.", access: "", featured: false },
  { name: "Community Investment", description: "Volunteer program guidelines, donation requests, and partnership resources.", access: "Community Investment team", featured: false },
  { name: "Employee Policies", description: "Employee Handbook, benefits, code of conduct, and remote work policy.", access: "HR team", featured: false },
  { name: "Facilities + Forms", description: "Parking + badge access, common forms, and the org directory.", access: "Operations team", featured: false },
  { name: "Marketing Resources", description: "Brand assets, logo packs, letterhead templates, and the company guide.", access: "Marketing team", featured: false },
  { name: "Operations + IT", description: "Expense + travel policy, IT acceptable use, and password + MFA guidance.", access: "IT team", featured: false },
  { name: "Risk + Insurance", description: "Vendor insurance requirements, incident reporting, and claims procedures.", access: "", featured: false },
  { name: "Safety + Compliance", description: "Site safety protocols and emergency procedures.", access: "", featured: false },
  { name: "Training + Onboarding", description: "New hire checklists, LMS access, and role-specific training paths.", access: "HR team", featured: false },
  { name: "Vendor + Contracts", description: "Vendor agreements, procurement forms, and contract templates.", access: "", featured: false },
];

/** The raise-a-ticket button shown on the featured card and the home page. */
export const TICKET = { label: "Raise a ticket", url: "https://lmdevpartners.sysaidit.com/sysai/ui/#/ui/" };
