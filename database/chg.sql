update player set image = substr(image,1,26) || '.avif' where image like '/assets/images/players/%';
update race set image = substr(image,1,24) || '.avif' where image like '/assets/images/races/%';