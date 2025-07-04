--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Debian 16.9-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: element_move_detail_fromlocationtype_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.element_move_detail_fromlocationtype_enum AS ENUM (
    'construction',
    'deposit'
);


ALTER TYPE public.element_move_detail_fromlocationtype_enum OWNER TO admin;

--
-- Name: element_move_detail_tolocationtype_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.element_move_detail_tolocationtype_enum AS ENUM (
    'construction',
    'deposit'
);


ALTER TYPE public.element_move_detail_tolocationtype_enum OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: architect; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.architect (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "paymentLevelId" integer
);


ALTER TABLE public.architect OWNER TO admin;

--
-- Name: architect_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.architect_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.architect_id_seq OWNER TO admin;

--
-- Name: architect_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.architect_id_seq OWNED BY public.architect.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.category OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: construction; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.construction (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "architectId" integer
);


ALTER TABLE public.construction OWNER TO admin;

--
-- Name: construction_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.construction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.construction_id_seq OWNER TO admin;

--
-- Name: construction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.construction_id_seq OWNED BY public.construction.id;


--
-- Name: construction_snapshot; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.construction_snapshot (
    id integer NOT NULL,
    "snapshotData" jsonb NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "eventId" integer
);


ALTER TABLE public.construction_snapshot OWNER TO admin;

--
-- Name: construction_snapshot_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.construction_snapshot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.construction_snapshot_id_seq OWNER TO admin;

--
-- Name: construction_snapshot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.construction_snapshot_id_seq OWNED BY public.construction_snapshot.id;


--
-- Name: construction_worker; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.construction_worker (
    id integer NOT NULL,
    name character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "architectId" integer,
    "constructionId" integer
);


ALTER TABLE public.construction_worker OWNER TO admin;

--
-- Name: construction_worker_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.construction_worker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.construction_worker_id_seq OWNER TO admin;

--
-- Name: construction_worker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.construction_worker_id_seq OWNED BY public.construction_worker.id;


--
-- Name: deposit; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.deposit (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "architectId" integer
);


ALTER TABLE public.deposit OWNER TO admin;

--
-- Name: deposit_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.deposit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.deposit_id_seq OWNER TO admin;

--
-- Name: deposit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.deposit_id_seq OWNED BY public.deposit.id;


--
-- Name: element; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.element (
    id integer NOT NULL,
    name character varying NOT NULL,
    brand character varying NOT NULL,
    provider character varying NOT NULL,
    "buyDate" date NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "categoryId" integer,
    "architectId" integer,
    "noteId" integer
);


ALTER TABLE public.element OWNER TO admin;

--
-- Name: element_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.element_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.element_id_seq OWNER TO admin;

--
-- Name: element_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.element_id_seq OWNED BY public.element.id;


--
-- Name: element_location; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.element_location (
    id integer NOT NULL,
    "locationType" character varying NOT NULL,
    "locationId" integer NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "elementId" integer
);


ALTER TABLE public.element_location OWNER TO admin;

--
-- Name: element_location_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.element_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.element_location_id_seq OWNER TO admin;

--
-- Name: element_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.element_location_id_seq OWNED BY public.element_location.id;


--
-- Name: element_move_detail; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.element_move_detail (
    id integer NOT NULL,
    "fromLocationType" public.element_move_detail_fromlocationtype_enum NOT NULL,
    "fromLocationId" integer NOT NULL,
    "toLocationType" public.element_move_detail_tolocationtype_enum NOT NULL,
    "toLocationId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "eventId" integer,
    "elementId" integer
);


ALTER TABLE public.element_move_detail OWNER TO admin;

--
-- Name: element_move_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.element_move_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.element_move_detail_id_seq OWNER TO admin;

--
-- Name: element_move_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.element_move_detail_id_seq OWNED BY public.element_move_detail.id;


--
-- Name: events_history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.events_history (
    id integer NOT NULL,
    "tableName" character varying NOT NULL,
    "recordId" integer NOT NULL,
    action character varying NOT NULL,
    "oldData" jsonb,
    "newData" jsonb,
    "changedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "changedBy" integer NOT NULL,
    "changedByType" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events_history OWNER TO admin;

--
-- Name: events_history_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.events_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_history_id_seq OWNER TO admin;

--
-- Name: events_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.events_history_id_seq OWNED BY public.events_history.id;


--
-- Name: missing; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.missing (
    id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "constructionWorkerId" integer,
    "constructionId" integer,
    "architectId" integer
);


ALTER TABLE public.missing OWNER TO admin;

--
-- Name: missing_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.missing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.missing_id_seq OWNER TO admin;

--
-- Name: missing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.missing_id_seq OWNED BY public.missing.id;


--
-- Name: note; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.note (
    id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    "createdBy" integer NOT NULL,
    "createdByType" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.note OWNER TO admin;

--
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.note_id_seq OWNER TO admin;

--
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;


--
-- Name: plan_limit; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.plan_limit (
    id integer NOT NULL,
    name character varying NOT NULL,
    "maxElements" integer NOT NULL,
    "maxDeposits" integer NOT NULL,
    "maxConstructions" integer NOT NULL,
    "maxWorkers" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.plan_limit OWNER TO admin;

--
-- Name: plan_limit_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.plan_limit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plan_limit_id_seq OWNER TO admin;

--
-- Name: plan_limit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.plan_limit_id_seq OWNED BY public.plan_limit.id;


--
-- Name: architect id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.architect ALTER COLUMN id SET DEFAULT nextval('public.architect_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: construction id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction ALTER COLUMN id SET DEFAULT nextval('public.construction_id_seq'::regclass);


--
-- Name: construction_snapshot id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_snapshot ALTER COLUMN id SET DEFAULT nextval('public.construction_snapshot_id_seq'::regclass);


--
-- Name: construction_worker id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_worker ALTER COLUMN id SET DEFAULT nextval('public.construction_worker_id_seq'::regclass);


--
-- Name: deposit id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.deposit ALTER COLUMN id SET DEFAULT nextval('public.deposit_id_seq'::regclass);


--
-- Name: element id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element ALTER COLUMN id SET DEFAULT nextval('public.element_id_seq'::regclass);


--
-- Name: element_location id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_location ALTER COLUMN id SET DEFAULT nextval('public.element_location_id_seq'::regclass);


--
-- Name: element_move_detail id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_move_detail ALTER COLUMN id SET DEFAULT nextval('public.element_move_detail_id_seq'::regclass);


--
-- Name: events_history id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.events_history ALTER COLUMN id SET DEFAULT nextval('public.events_history_id_seq'::regclass);


--
-- Name: missing id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.missing ALTER COLUMN id SET DEFAULT nextval('public.missing_id_seq'::regclass);


--
-- Name: note id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);


--
-- Name: plan_limit id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.plan_limit ALTER COLUMN id SET DEFAULT nextval('public.plan_limit_id_seq'::regclass);


--
-- Name: architect PK_54557cabef3d97c2c1fb9facccd; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.architect
    ADD CONSTRAINT "PK_54557cabef3d97c2c1fb9facccd" PRIMARY KEY (id);


--
-- Name: construction_worker PK_55df214164a11799a9b0f41b122; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_worker
    ADD CONSTRAINT "PK_55df214164a11799a9b0f41b122" PRIMARY KEY (id);


--
-- Name: deposit PK_6654b4be449dadfd9d03a324b61; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.deposit
    ADD CONSTRAINT "PK_6654b4be449dadfd9d03a324b61" PRIMARY KEY (id);


--
-- Name: missing PK_6aacd5e58479513a9375dcee690; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.missing
    ADD CONSTRAINT "PK_6aacd5e58479513a9375dcee690" PRIMARY KEY (id);


--
-- Name: element PK_6c5f203479270d39efaad8cd82b; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element
    ADD CONSTRAINT "PK_6c5f203479270d39efaad8cd82b" PRIMARY KEY (id);


--
-- Name: element_location PK_74b29fad70614cccb3e516ae131; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_location
    ADD CONSTRAINT "PK_74b29fad70614cccb3e516ae131" PRIMARY KEY (id);


--
-- Name: events_history PK_79409efdf19dfb2f529be3bfda4; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.events_history
    ADD CONSTRAINT "PK_79409efdf19dfb2f529be3bfda4" PRIMARY KEY (id);


--
-- Name: note PK_96d0c172a4fba276b1bbed43058; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: element_move_detail PK_a2af3a4dcae6f3ca17f218c1583; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_move_detail
    ADD CONSTRAINT "PK_a2af3a4dcae6f3ca17f218c1583" PRIMARY KEY (id);


--
-- Name: construction PK_a5cda010137b093411b2db04df1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction
    ADD CONSTRAINT "PK_a5cda010137b093411b2db04df1" PRIMARY KEY (id);


--
-- Name: plan_limit PK_ac540f576d7f6af41575dedef54; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.plan_limit
    ADD CONSTRAINT "PK_ac540f576d7f6af41575dedef54" PRIMARY KEY (id);


--
-- Name: construction_snapshot PK_f8bf6bde792fce36b549b8037de; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_snapshot
    ADD CONSTRAINT "PK_f8bf6bde792fce36b549b8037de" PRIMARY KEY (id);


--
-- Name: element REL_0df3ae2d56bd36ac1a333d2b87; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element
    ADD CONSTRAINT "REL_0df3ae2d56bd36ac1a333d2b87" UNIQUE ("noteId");


--
-- Name: category UQ_23c05c292c439d77b0de816b500; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name);


--
-- Name: architect UQ_4522b02e5d1488e4b34da9daf98; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.architect
    ADD CONSTRAINT "UQ_4522b02e5d1488e4b34da9daf98" UNIQUE (email);


--
-- Name: plan_limit UQ_f3db86efbdd0807a4c1cd739c6d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.plan_limit
    ADD CONSTRAINT "UQ_f3db86efbdd0807a4c1cd739c6d" UNIQUE (name);


--
-- Name: element_move_detail FK_0595ae1d70027bf11544b46f02c; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_move_detail
    ADD CONSTRAINT "FK_0595ae1d70027bf11544b46f02c" FOREIGN KEY ("elementId") REFERENCES public.element(id);


--
-- Name: element FK_0df3ae2d56bd36ac1a333d2b872; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element
    ADD CONSTRAINT "FK_0df3ae2d56bd36ac1a333d2b872" FOREIGN KEY ("noteId") REFERENCES public.note(id);


--
-- Name: element FK_22a2edf440ce737c1b9a9f878c0; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element
    ADD CONSTRAINT "FK_22a2edf440ce737c1b9a9f878c0" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: architect FK_36421f206e5f4df347ff132ce99; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.architect
    ADD CONSTRAINT "FK_36421f206e5f4df347ff132ce99" FOREIGN KEY ("paymentLevelId") REFERENCES public.plan_limit(id);


--
-- Name: construction_worker FK_39a4d96f0eeb48c0cc949231038; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_worker
    ADD CONSTRAINT "FK_39a4d96f0eeb48c0cc949231038" FOREIGN KEY ("constructionId") REFERENCES public.construction(id);


--
-- Name: construction_worker FK_3e828f45aacd1cdf396604a95e1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_worker
    ADD CONSTRAINT "FK_3e828f45aacd1cdf396604a95e1" FOREIGN KEY ("architectId") REFERENCES public.architect(id);


--
-- Name: missing FK_58c9920e16a0d0580396ec60818; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.missing
    ADD CONSTRAINT "FK_58c9920e16a0d0580396ec60818" FOREIGN KEY ("constructionId") REFERENCES public.construction(id);


--
-- Name: construction FK_6e403f67e93fc123b5f4f7304d5; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction
    ADD CONSTRAINT "FK_6e403f67e93fc123b5f4f7304d5" FOREIGN KEY ("architectId") REFERENCES public.architect(id);


--
-- Name: missing FK_6fe3c8c4a3953d961c7705faae9; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.missing
    ADD CONSTRAINT "FK_6fe3c8c4a3953d961c7705faae9" FOREIGN KEY ("architectId") REFERENCES public.architect(id);


--
-- Name: construction_snapshot FK_775f006bbfc58419c6868393c36; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.construction_snapshot
    ADD CONSTRAINT "FK_775f006bbfc58419c6868393c36" FOREIGN KEY ("eventId") REFERENCES public.events_history(id);


--
-- Name: element_location FK_7f59992a82cf318195b91b174a6; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_location
    ADD CONSTRAINT "FK_7f59992a82cf318195b91b174a6" FOREIGN KEY ("elementId") REFERENCES public.element(id);


--
-- Name: element FK_b71188d8a0fecb9014e11dad227; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element
    ADD CONSTRAINT "FK_b71188d8a0fecb9014e11dad227" FOREIGN KEY ("architectId") REFERENCES public.architect(id);


--
-- Name: deposit FK_c545b4aed17e60c80de16732c84; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.deposit
    ADD CONSTRAINT "FK_c545b4aed17e60c80de16732c84" FOREIGN KEY ("architectId") REFERENCES public.architect(id);


--
-- Name: missing FK_f455c13de588b93f4bbbf8be3bb; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.missing
    ADD CONSTRAINT "FK_f455c13de588b93f4bbbf8be3bb" FOREIGN KEY ("constructionWorkerId") REFERENCES public.construction_worker(id);


--
-- Name: element_move_detail FK_f928c1ecf7f7a8f4fba6e474cf1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.element_move_detail
    ADD CONSTRAINT "FK_f928c1ecf7f7a8f4fba6e474cf1" FOREIGN KEY ("eventId") REFERENCES public.events_history(id);


--
-- PostgreSQL database dump complete
--

