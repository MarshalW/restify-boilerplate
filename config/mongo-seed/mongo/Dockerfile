FROM mongo

COPY init.json /init.json 
CMD mongo --host mongo hello --eval "db.dropDatabase()" && mongoimport --host mongo --db hello --collection users --type json --file /init.json --jsonArray
#CMD ping localhost
