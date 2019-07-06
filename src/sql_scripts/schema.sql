CREATE TABLE Users ( 
    Id int NOT NULL AUTO_INCREMENT,
    Uuid varchar(255) NOT NULL,
    BalanceRs float DEFAULT 0,
    BalanceOsrs float DEFAULT 0,
    IsCashier BOOLEAN DEFAULT FALSE,
    MaxCashIn float DEFAULT 0,
    MinBalance float DEFAULT 0,
    DateJoined datetime default CURRENT_TIMESTAMP,
    LastUpdated datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    UNIQUE (Uuid) 
);

CREATE TABLE Pairs ( 
    Id int NOT NULL AUTO_INCREMENT,
    UserId int NOT NULL,
    ServerSeed varchar(1000) NOT NULL,
    ServerHash varchar(1000) NOT NULL,
    UserSeed varchar(1000) NOT NULL,
    Result varchar(1000) NOT NULL,
    Used BOOLEAN DEFAULT FALSE,
    DateAdded datetime default CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Games ( 
    Id int NOT NULL AUTO_INCREMENT,
    PairId int NOT NULL,
    Amount float NOT NULL,
    Win BOOLEAN DEFAULT FALSE,
    GameType int NOT NULL,
    Server varchar(255) NOT NULL,
    DateAdded datetime default CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    FOREIGN KEY (PairId) REFERENCES Pairs(Id)
);

CREATE TABLE Transactions ( 
    Id int NOT NULL AUTO_INCREMENT,
    CashierUuid varchar(255) NOT NULL,
    UserId int NOT NULL,
    Amount float DEFAULT 0,
    Server varchar(255) NOT NULL,
    CashIn BOOLEAN DEFAULT FALSE,
    DateAdded datetime default CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);