import * as z from "zod";

export const WorkspaceSettingsSchema = z.object({
  aiEnabled: z.boolean().default(true),
  visibility: z.enum(["private", "public"]).default("private"),
  membershipRestrictions: z.object({
    type: z.enum(["anybody", "specific_domains"]).default("anybody"),
    allowedDomains: z.string().optional(),
  }),
  boardCreation: z.object({
    public: z.enum(["any", "admin", "nobody"]).default("any"),
    workspaceVisible: z.enum(["any", "admin", "nobody"]).default("any"),
    private: z.enum(["any", "admin", "nobody"]).default("any"),
  }),
  boardDeletion: z.object({
    public: z.enum(["any", "admin", "nobody"]).default("any"),
    workspaceVisible: z.enum(["any", "admin", "nobody"]).default("any"),
    private: z.enum(["any", "admin", "nobody"]).default("any"),
  }),
  guestSharing: z.enum(["anybody", "members_only"]).default("anybody"),
});

export type WorkspaceSettingsValues = z.infer<typeof WorkspaceSettingsSchema>;
