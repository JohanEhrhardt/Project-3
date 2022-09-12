-- View: public.meta_operators_v

 DROP VIEW public.meta_operators_v;

CREATE OR REPLACE VIEW public.meta_operators_v
 AS 
 SELECT ah.lat,
    ah.lon,
    ah.osm_id,
    ah.completeness,
    COALESCE(ah.loc_amenity, ah.meta_operator) AS loc_amenity,
    ah.access_hours,
    ah.addr_postcode,
    ah.loc_name,
    spc.state,
    ah.meta_operator,
    ah.meta_speciality,
    ah.meta_emergency,
    ah.contact_url,
    ah.meta_operator_type,
    ah.contact_phone,
    ah.meta_wheelchair
   FROM australia_healthsites ah
   JOIN osm_addresses spc ON spc.osm_id = ah.osm_id
  WHERE length(ah.meta_operator) <> 0
    AND length(ah.loc_name) <>0