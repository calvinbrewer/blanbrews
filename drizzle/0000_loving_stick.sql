CREATE TABLE "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text,
	"has_rsvped" boolean DEFAULT false NOT NULL,
	"is_attending" boolean,
	"dietary_restrictions" text,
	"wants_own_housing" boolean DEFAULT false NOT NULL,
	"rsvped_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plus_one_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"primary_guest_id" uuid NOT NULL,
	"plus_one_guest_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "plus_one_relationships" ADD CONSTRAINT "plus_one_relationships_primary_guest_id_guests_id_fk" FOREIGN KEY ("primary_guest_id") REFERENCES "public"."guests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plus_one_relationships" ADD CONSTRAINT "plus_one_relationships_plus_one_guest_id_guests_id_fk" FOREIGN KEY ("plus_one_guest_id") REFERENCES "public"."guests"("id") ON DELETE cascade ON UPDATE no action;