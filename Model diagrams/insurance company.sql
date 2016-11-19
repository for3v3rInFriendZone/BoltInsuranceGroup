/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     11/19/2016 1:03:37 PM                        */
/*==============================================================*/


drop index HOME_PK;

drop table HOME;

drop index VEHICLE_INSURANCE_FK;

drop index HOME_INSURANCE_FK;

drop index TYPE_OF_INSURANCE_FK;

drop index INSURANCE_PK;

drop table INSURANCE;

drop index RIZICI_NA_OSIGURANJU2_FK;

drop index RIZICI_NA_OSIGURANJU_FK;

drop index RIZICI_NA_OSIGURANJU_PK;

drop table INSURANCE_RISK;

drop index PRICE_PK;

drop table PRICE;

drop index TYPE_OF_RISK_FK;

drop index RISK_PRICE_FK;

drop index RISK_PK;

drop table RISK;

drop index RISK_SUBGROUP_FK;

drop index SUBGROUP_PK;

drop table SUBGROUP;

drop index TYPE_PK;

drop table TYPE;

drop index USER_PK;

drop table "USER";

drop index RELATIONSHIP_3_FK;

drop index RELATIONSHIP_2_FK;

drop index USER_OF_INSURANCE_PK;

drop table USER_OF_INSURANCE;

drop index TYPE_OF_VEHICLE_FK;

drop index VEHICLE_PK;

drop table VEHICLE;

drop index VEHICLE_TYPE_PK;

drop table VEHICLE_TYPE;

/*==============================================================*/
/* Table: HOME                                                  */
/*==============================================================*/
create table HOME (
   HO_ID                SERIAL not null,
   HO_NAME              VARCHAR(50)          not null,
   HO_SURNAME           VARCHAR(50)          not null,
   HO_JMBG              NUMERIC(13)          not null,
   HO_ADDRESS           VARCHAR(50)          not null,
   constraint PK_HOME primary key (HO_ID)
);

/*==============================================================*/
/* Index: HOME_PK                                               */
/*==============================================================*/
create unique index HOME_PK on HOME (
HO_ID
);

/*==============================================================*/
/* Table: INSURANCE                                             */
/*==============================================================*/
create table INSURANCE (
   IN_ID                SERIAL not null,
   HO_ID                INT4                 null,
   VE_ID                INT4                 null,
   TY_ID                INT4                 null,
   IN_START             DATE                 not null,
   IN_END               DATE                 not null,
   IN_AMOUNT            DECIMAL(10,2)        not null,
   constraint PK_INSURANCE primary key (IN_ID)
);

/*==============================================================*/
/* Index: INSURANCE_PK                                          */
/*==============================================================*/
create unique index INSURANCE_PK on INSURANCE (
IN_ID
);

/*==============================================================*/
/* Index: TYPE_OF_INSURANCE_FK                                  */
/*==============================================================*/
create  index TYPE_OF_INSURANCE_FK on INSURANCE (
TY_ID
);

/*==============================================================*/
/* Index: HOME_INSURANCE_FK                                     */
/*==============================================================*/
create  index HOME_INSURANCE_FK on INSURANCE (
HO_ID
);

/*==============================================================*/
/* Index: VEHICLE_INSURANCE_FK                                  */
/*==============================================================*/
create  index VEHICLE_INSURANCE_FK on INSURANCE (
VE_ID
);

/*==============================================================*/
/* Table: INSURANCE_RISK                                        */
/*==============================================================*/
create table INSURANCE_RISK (
   IN_ID                INT4                 not null,
   RI_ID                INT4                 not null,
   constraint PK_INSURANCE_RISK primary key (IN_ID, RI_ID)
);

/*==============================================================*/
/* Index: RIZICI_NA_OSIGURANJU_PK                               */
/*==============================================================*/
create unique index RIZICI_NA_OSIGURANJU_PK on INSURANCE_RISK (
IN_ID,
RI_ID
);

/*==============================================================*/
/* Index: RIZICI_NA_OSIGURANJU_FK                               */
/*==============================================================*/
create  index RIZICI_NA_OSIGURANJU_FK on INSURANCE_RISK (
IN_ID
);

/*==============================================================*/
/* Index: RIZICI_NA_OSIGURANJU2_FK                              */
/*==============================================================*/
create  index RIZICI_NA_OSIGURANJU2_FK on INSURANCE_RISK (
RI_ID
);

/*==============================================================*/
/* Table: PRICE                                                 */
/*==============================================================*/
create table PRICE (
   PR_ID                SERIAL not null,
   PR_START             DATE                 not null,
   PR_END               DATE                 null,
   constraint PK_PRICE primary key (PR_ID)
);

/*==============================================================*/
/* Index: PRICE_PK                                              */
/*==============================================================*/
create unique index PRICE_PK on PRICE (
PR_ID
);

/*==============================================================*/
/* Table: RISK                                                  */
/*==============================================================*/
create table RISK (
   RI_ID                SERIAL not null,
   TY_ID                INT4                 not null,
   PR_ID                INT4                 null,
   RI_NAME              VARCHAR(50)          not null,
   constraint PK_RISK primary key (RI_ID)
);

/*==============================================================*/
/* Index: RISK_PK                                               */
/*==============================================================*/
create unique index RISK_PK on RISK (
RI_ID
);

/*==============================================================*/
/* Index: RISK_PRICE_FK                                         */
/*==============================================================*/
create  index RISK_PRICE_FK on RISK (
PR_ID
);

/*==============================================================*/
/* Index: TYPE_OF_RISK_FK                                       */
/*==============================================================*/
create  index TYPE_OF_RISK_FK on RISK (
TY_ID
);

/*==============================================================*/
/* Table: SUBGROUP                                              */
/*==============================================================*/
create table SUBGROUP (
   SG_ID                SERIAL not null,
   RI_ID                INT4                 null,
   SG_COEFFICIENT       VARCHAR(50)          not null,
   SG_NAME              VARCHAR(100)         null,
   constraint PK_SUBGROUP primary key (SG_ID)
);

/*==============================================================*/
/* Index: SUBGROUP_PK                                           */
/*==============================================================*/
create unique index SUBGROUP_PK on SUBGROUP (
SG_ID
);

/*==============================================================*/
/* Index: RISK_SUBGROUP_FK                                      */
/*==============================================================*/
create  index RISK_SUBGROUP_FK on SUBGROUP (
RI_ID
);

/*==============================================================*/
/* Table: TYPE                                                  */
/*==============================================================*/
create table TYPE (
   TY_ID                SERIAL not null,
   TY_NAME              VARCHAR(50)          not null,
   constraint PK_TYPE primary key (TY_ID)
);

/*==============================================================*/
/* Index: TYPE_PK                                               */
/*==============================================================*/
create unique index TYPE_PK on TYPE (
TY_ID
);

/*==============================================================*/
/* Table: "USER"                                                */
/*==============================================================*/
create table "USER" (
   US_ID                SERIAL not null,
   US_IME               VARCHAR(20)          not null,
   US_SURNAME           VARCHAR(20)          not null,
   US_JMBG              NUMERIC(13)          not null,
   US_ADDRESS           VARCHAR(50)          not null,
   US_PASSPORT          NUMERIC(9)           not null,
   US_PHONE             VARCHAR(50)          null,
   US_MAIL              VARCHAR(50)          not null,
   constraint PK_USER primary key (US_ID)
);

/*==============================================================*/
/* Index: USER_PK                                               */
/*==============================================================*/
create unique index USER_PK on "USER" (
US_ID
);

/*==============================================================*/
/* Table: USER_OF_INSURANCE                                     */
/*==============================================================*/
create table USER_OF_INSURANCE (
   US_ID                INT4                 not null,
   IN_ID                INT4                 not null,
   UOI_OWNER            BOOL                 not null,
   constraint PK_USER_OF_INSURANCE primary key (US_ID, IN_ID)
);

/*==============================================================*/
/* Index: USER_OF_INSURANCE_PK                                  */
/*==============================================================*/
create unique index USER_OF_INSURANCE_PK on USER_OF_INSURANCE (
US_ID,
IN_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_2_FK on USER_OF_INSURANCE (
US_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_3_FK on USER_OF_INSURANCE (
IN_ID
);

/*==============================================================*/
/* Table: VEHICLE                                               */
/*==============================================================*/
create table VEHICLE (
   VE_ID                SERIAL not null,
   VT_ID                INT4                 not null,
   VE_NAME              VARCHAR(20)          not null,
   VE_SURNAME           VARCHAR(20)          not null,
   VE_ADDRESS           VARCHAR(50)          not null,
   VE_JMBG              NUMERIC(13)          not null,
   VE_YEAR              NUMERIC(4)           not null,
   VE_REGISTRATION      VARCHAR(10)          not null,
   VE_CHASSIES          VARCHAR(20)          not null,
   VE_BRAND             VARCHAR(50)          not null,
   constraint PK_VEHICLE primary key (VE_ID)
);

/*==============================================================*/
/* Index: VEHICLE_PK                                            */
/*==============================================================*/
create unique index VEHICLE_PK on VEHICLE (
VE_ID
);

/*==============================================================*/
/* Index: TYPE_OF_VEHICLE_FK                                    */
/*==============================================================*/
create  index TYPE_OF_VEHICLE_FK on VEHICLE (
VT_ID
);

/*==============================================================*/
/* Table: VEHICLE_TYPE                                          */
/*==============================================================*/
create table VEHICLE_TYPE (
   VT_ID                SERIAL not null,
   VT_NAME              VARCHAR(50)          not null,
   constraint PK_VEHICLE_TYPE primary key (VT_ID)
);

/*==============================================================*/
/* Index: VEHICLE_TYPE_PK                                       */
/*==============================================================*/
create unique index VEHICLE_TYPE_PK on VEHICLE_TYPE (
VT_ID
);

alter table INSURANCE
   add constraint FK_INSURANC_HOME_INSU_HOME foreign key (HO_ID)
      references HOME (HO_ID)
      on delete cascade on update cascade;

alter table INSURANCE
   add constraint FK_INSURANC_TYPE_OF_I_TYPE foreign key (TY_ID)
      references TYPE (TY_ID)
      on delete cascade on update cascade;

alter table INSURANCE
   add constraint FK_INSURANC_VEHICLE_I_VEHICLE foreign key (VE_ID)
      references VEHICLE (VE_ID)
      on delete cascade on update cascade;

alter table INSURANCE_RISK
   add constraint FK_INSURANC_RIZICI_NA_INSURANC foreign key (IN_ID)
      references INSURANCE (IN_ID)
      on delete cascade on update cascade;

alter table INSURANCE_RISK
   add constraint FK_INSURANC_RIZICI_NA_RISK foreign key (RI_ID)
      references RISK (RI_ID)
      on delete cascade on update cascade;

alter table RISK
   add constraint FK_RISK_RISK_PRIC_PRICE foreign key (PR_ID)
      references PRICE (PR_ID)
      on delete cascade on update cascade;

alter table RISK
   add constraint FK_RISK_TYPE_OF_R_TYPE foreign key (TY_ID)
      references TYPE (TY_ID)
      on delete cascade on update cascade;

alter table SUBGROUP
   add constraint FK_SUBGROUP_RISK_SUBG_RISK foreign key (RI_ID)
      references RISK (RI_ID)
      on delete cascade on update cascade;

alter table USER_OF_INSURANCE
   add constraint FK_USER_OF__RELATIONS_USER foreign key (US_ID)
      references "USER" (US_ID)
      on delete cascade on update cascade;

alter table USER_OF_INSURANCE
   add constraint FK_USER_OF__RELATIONS_INSURANC foreign key (IN_ID)
      references INSURANCE (IN_ID)
      on delete cascade on update cascade;

alter table VEHICLE
   add constraint FK_VEHICLE_TYPE_OF_V_VEHICLE_ foreign key (VT_ID)
      references VEHICLE_TYPE (VT_ID)
      on delete cascade on update cascade;

