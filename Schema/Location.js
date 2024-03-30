const locationSchema = `

CREATE TABLE IF NOT EXISTS location_history_db (
    userID INT NOT NULL ,
    longitude INT NOT NULL ,
    latitude INT NOT NULL ,
    timestamp DATE
    
)


`;


module.exports = locationSchema