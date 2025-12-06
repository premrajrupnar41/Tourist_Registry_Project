CREATE TABLE IF NOT EXISTS attractions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(2000),
  latitude DOUBLE,
  longitude DOUBLE,
  city VARCHAR(255),
  district VARCHAR(255),
  state VARCHAR(255),
  country VARCHAR(255),
  media_url VARCHAR(1000),
  ticket_price DOUBLE,
  category VARCHAR(255),
  rating DOUBLE,
  timings VARCHAR(255),
  contact  VARCHAR(15),
  created_at TIMESTAMP
 
);
