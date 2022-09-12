CREATE TABLE IF NOT EXISTS public.StatePostCodes
(
    State character varying(250) COLLATE pg_catalog."default",
    Abbreviation character varying(10) COLLATE pg_catalog."default",
    PostCode_Low numeric,
    PostCode_High numeric
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.StatePostCodes
    OWNER to postgres;