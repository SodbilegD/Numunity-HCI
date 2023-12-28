CREATE TABLE IF NOT EXISTS public.web_user
(
    id integer NOT NULL DEFAULT nextval('web_user_id_seq'::regclass),
    loginname character varying(20) COLLATE pg_catalog."default" NOT NULL,
    password character varying(32) COLLATE pg_catalog."default" NOT NULL,
    fullname character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT web_user_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.web_user
    OWNER to webdev;