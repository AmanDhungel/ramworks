import * as z from "zod";

export const WorkspaceSettingsSchema = z.object({
  aiEnabled: z.boolean(),
  visibility: z.enum(["private", "public"]),
  membershipRestrictions: z.object({
    type: z.enum(["anybody", "specific_domains"]),
    allowedDomains: z.string().optional(),
  }),
  boardCreation: z.object({
    public: z.enum(["any", "admin", "nobody"]),
    workspaceVisible: z.enum(["any", "admin", "nobody"]),
    private: z.enum(["any", "admin", "nobody"]),
  }),
  boardDeletion: z.object({
    public: z.enum(["any", "admin", "nobody"]),
    workspaceVisible: z.enum(["any", "admin", "nobody"]),
    private: z.enum(["any", "admin", "nobody"]),
  }),
  guestSharing: z.enum(["anybody", "members_only"]),
});

export type WorkspaceSettingsValues = z.infer<typeof WorkspaceSettingsSchema>;
