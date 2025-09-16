
\restrict yerME1kYFLfaxXjySIEKRwwa8hXCpbVBLC8dEx9f04bwI9Got5wXt2nv5BrBudl

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict yerME1kYFLfaxXjySIEKRwwa8hXCpbVBLC8dEx9f04bwI9Got5wXt2nv5BrBudl

RESET ALL;
