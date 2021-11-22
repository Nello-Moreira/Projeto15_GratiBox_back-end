CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"plan_id" integer,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "addresses" (
	"id" serial NOT NULL,
	"street_name" TEXT NOT NULL,
	"zip_code" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "states" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"initials" TEXT NOT NULL,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"type" TEXT NOT NULL UNIQUE,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "monthly_dalivery_options" (
	"id" serial NOT NULL,
	"day" integer NOT NULL UNIQUE,
	CONSTRAINT "monthly_dalivery_options_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "weekly_dalivery_options" (
	"id" serial NOT NULL,
	"weekday" TEXT NOT NULL UNIQUE,
	CONSTRAINT "weekly_dalivery_options_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_products" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	CONSTRAINT "users_products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "deliveries" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	CONSTRAINT "deliveries_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "feedbacks" (
	"id" serial NOT NULL,
	"delivery_id" integer NOT NULL,
	"grade_id" integer NOT NULL,
	"on_time" bool DEFAULT 'TRUE',
	"liked" bool DEFAULT 'TRUE',
	"comment" TEXT,
	CONSTRAINT "feedbacks_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ratings" (
	"id" serial NOT NULL,
	"grade" bool NOT NULL,
	CONSTRAINT "ratings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");

ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("state_id") REFERENCES "states"("id");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");






ALTER TABLE "users_products" ADD CONSTRAINT "users_products_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_products" ADD CONSTRAINT "users_products_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("id");

ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_fk0" FOREIGN KEY ("delivery_id") REFERENCES "deliveries"("id");
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_fk1" FOREIGN KEY ("grade_id") REFERENCES "ratings"("id");


ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


INSERT INTO "states" ("name", "initials") VALUES 
('Acre', 'AC'),
('Alagoas', 'AL'),
('Amapá', 'AP'),
('Amazonas', 'AM'),
('Bahia', 'BA'),
('Ceará', 'CE'),
('Distrito Federal', 'DF'),
('Espírito Santo', 'ES'),
('Goiás', 'GO'),
('Maranhão', 'MA'),
('Mato Grosso', 'MT'),
('Mato Grosso do Sul', 'MS'),
('Minas Gerais', 'MG'),
('Pará', 'PA'),
('Paraíba', 'PB'),
('Paraná', 'PR'),
('Pernambuco', 'PE'),
('Piauí', 'PI'),
('Rio de Janeiro', 'RJ'),
('Rio Grande do Norte', 'RN'),
('Rio Grande do Sul', 'RS'),
('Rondônia', 'RO'),
('Roraima', 'RR'),
('Santa Catarina', 'SC'),
('São Paulo', 'SP'),
('Sergipe', 'SE'),
('Tocantins', 'TO');

INSERT INTO "products" ("name") VALUES 
('Chás'),
('Produtos orgânicos'),
('Incensos');

INSERT INTO "ratings" ("grade") VALUES 
(true),
(false);

INSERT INTO "plans" ("type") VALUES 
('Semanal'),
('Mensal');

INSERT INTO "weekly_dalivery_options" ("weekday") VALUES 
('Segunda-feira'),
('Quarta-feira'),
('Sexta-feira');

INSERT INTO "monthly_dalivery_options" ("day") VALUES 
(1),
(10),
(20);
