-- Table: public.osm_addresses

-- DROP TABLE IF EXISTS public.osm_addresses;

CREATE TABLE IF NOT EXISTS public.osm_addresses
(
    osm_id numeric NOT NULL,
    amenity character varying(250) COLLATE pg_catalog."default",
    house_number character varying(250) COLLATE pg_catalog."default",
    road character varying(250) COLLATE pg_catalog."default",
    suburb character varying(250) COLLATE pg_catalog."default",
    city_district character varying(250) COLLATE pg_catalog."default",
    district character varying(250) COLLATE pg_catalog."default",
    state character varying(250) COLLATE pg_catalog."default",
    postcode character varying(250) COLLATE pg_catalog."default",
    country character varying(250) COLLATE pg_catalog."default",
    iso3166 character varying(250) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.osm_addresses
    OWNER to postgres;