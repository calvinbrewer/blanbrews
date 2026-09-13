CREATE TABLE "website_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"settings" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE "website_settings" ENABLE ROW LEVEL SECURITY;
