
\restrict ksNeOHbP1yj52rUjm2HrI6OOgypOTosbfFNLrIw8pk5FIZbKWxEMa2ml1pkknbX

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict ksNeOHbP1yj52rUjm2HrI6OOgypOTosbfFNLrIw8pk5FIZbKWxEMa2ml1pkknbX

RESET ALL;
