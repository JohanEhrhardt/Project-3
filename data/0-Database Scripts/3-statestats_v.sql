create or replace view statestats_v as
Select (select distinct state from statepostcodes spc Where spc.abbreviation = substr(oa.iso3166,4,6) ) state,
       substr(oa.iso3166,4,6) statecode,
       case when ah.loc_amenity = 'doctor' Then 'doctors' 
       Else
           ah.loc_amenity End
          type,
       count(*) rowcount
  From osm_addresses oa
  Join australia_healthsites ah On oa.osm_id = ah.osm_id  
 Where oa.iso3166 is not null
   and length(oa.iso3166 ) <> 0
   and length(ah.loc_amenity) <> 0
  Group By oa.state,
       oa.iso3166,
       case when ah.loc_amenity = 'doctor' Then 'doctors' 
       Else
           ah.loc_amenity End
Order By 1, 3        